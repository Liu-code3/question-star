import type { FC } from 'react'
import { useState } from 'react'
import { Button, Empty, Popconfirm, Space, Switch, Table, Tag, Typography, message } from 'antd'
import { useTitle } from 'ahooks'
import styles from '@/views/manage/common.module.scss'

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
const rawQuestionList = [{
  _id: '1', // 服务端 mongodb ，自动，_id 不重复
  title: '问卷1',
  isStar: true,
  isPublished: true,
  answerCount: 100,
  createdAt: '2024-09-04 22:30'
}]

const Trash: FC = () => {
  useTitle('小星问卷 - 回收站')

  const [questionList] = useState(rawQuestionList)

  const [selectedIds, setSelectedIds] = useState<string[]>([])

  async function del() {
    await message.success('删除成功')
  }

  // 可以把 JSX 片段定义为一个变量
  const TableEle = (
    <>
      <div className="mb-4">
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>恢复</Button>
          <Popconfirm
            title="彻底删除"
            description="删除后不可恢复?"
            onConfirm={del}
            okText="确定"
            cancelText="取消"
          >
            <Button danger disabled={selectedIds.length === 0}>彻底删除</Button>
          </Popconfirm>
        </Space>
      </div>
      <Table
        rowKey="_id"
        pagination={false}
        dataSource={questionList}
        columns={tableColumns}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys) => {
            setSelectedIds(selectedRowKeys as string[])
          }
        }}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          搜索
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        { questionList.length > 0 && TableEle}
      </div>
    </>
  )
}

export default Trash
