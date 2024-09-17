import type { FC } from 'react'
import { useState } from 'react'
import { Button, Empty, Popconfirm, Space, Spin, Switch, Table, Tag, Typography, message } from 'antd'
import { useRequest, useTitle } from 'ahooks'
import styles from '@/views/manage/common.module.scss'
import ListSearch from '@/components/ListSearch.tsx'
import { useLoadQuestionListData } from '@/hooks/useLoadQuestionListData.ts'
import { deleteQuestionByIdsApi, updateQuestionItemApi } from '@/api/question.ts'

const { Title } = Typography

const tableColumns = [
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '是否星标',
    dataIndex: 'isStar',
    render: (isStar: boolean) => {
      return <Switch disabled={isStar} defaultChecked={isStar} />
    }
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
    }
  },
  {
    title: '答卷数量',
    dataIndex: 'answerCount'
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt'
  }
]

const Trash: FC = () => {
  useTitle('小星问卷 - 回收站')

  const { data, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data?.data || {}

  // 记录选中的  id 列表
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      // 遍历选中的问题ID，逐个恢复它们的状态
      for await (const id of selectedIds) {
        // 调用API恢复问题项的状态，将删除标记设为false
        await updateQuestionItemApi(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 300, // 防抖操作 防止重复提交
      onSuccess() {
        resetSelectedIds('恢复成功')
      }
    }
  )

  // 删除
  const { run: deleteQuestionItem } = useRequest(
    async () => await deleteQuestionByIdsApi(selectedIds),
    {
      manual: true,
      debounceWait: 300,
      onSuccess() {
        resetSelectedIds('删除成功')
      }
    }
  )

  /** 重置选中的ID列表 */
  function resetSelectedIds(msg: string) {
    message.success(msg)
    refresh()
    setSelectedIds([])
  }

  // 可以把 JSX 片段定义为一个变量
  const TableEle = (
    <Table
      rowKey="_id"
      pagination={false}
      dataSource={list}
      columns={tableColumns}
      rowSelection={{
        type: 'checkbox',
        onChange: (selectedRowKeys) => {
          setSelectedIds(selectedRowKeys as string[])
        }
      }}
    />
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        <div className="mb-4">
          <Space>
            <Button
              type="primary"
              disabled={selectedIds.length === 0}
              onClick={recover}
            >
              恢复
            </Button>
            <Popconfirm
              title="彻底删除"
              description="删除后不可恢复?"
              onConfirm={deleteQuestionItem}
              okText="确定"
              cancelText="取消"
            >
              <Button danger disabled={selectedIds.length === 0}>彻底删除</Button>
            </Popconfirm>
          </Space>
        </div>
        {loading && <div className="text-center"><Spin /></div>}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableEle}
      </div>
      <h3>
        总条数:
        { total }
      </h3>
    </>
  )
}

export default Trash
