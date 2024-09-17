import type { FC } from 'react'
import { useRef } from 'react'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined
} from '@ant-design/icons'
import { Button, Divider, Modal, Popconfirm, Space, Tag, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import styles from './index.module.scss'
import { duplicateQuestionApi, updateQuestionItemApi } from '@/api/question.ts'

const { confirm } = Modal
export interface PropsType {
  // MARK:服务端mongodb会自动生成_id，且不会重复。创建问卷这个主要是服务端来实现
  _id: string // 服务端 mongodb ，自动，_id 不重复
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}
const QuestionCard: FC<PropsType> = (props) => {
  const navigate = useNavigate()
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props

  /** 处理星标 */
  const isStarState = useRef(isStar)
  const { run: changeStar, loading: changeStarLoading } = useRequest(async () => {
    const res = await updateQuestionItemApi(_id, { isStar: !isStarState.current })
    isStarState.current = !isStarState.current
    return res
  }, {
    manual: true
  })

  /** 处理复制 */
  const { run: duplicate, loading: duplicateLoading } = useRequest(
    async () => await duplicateQuestionApi(_id),
    {
      manual: true,
      onSuccess() {
        message.success('复制成功')
      }
    }
  )

  /** 处理删除 */
  const isDeleteState = useRef(false)
  const { run: deleteQuestionItem, loading: deleteLoading } = useRequest(
    async () => await updateQuestionItemApi(_id, { isDelete: !isDeleteState.current }),
    {
      manual: true,
      onSuccess() {
        isDeleteState.current = true
        message.success('删除成功')
      }
    }
  )
  function del() {
    confirm({
      title: '确定删除该问卷吗? ',
      icon: <ExclamationCircleOutlined />,
      onOk: () => deleteQuestionItem()
    })
  }

  // 已经被删除的就不再渲染卡片了
  if (isDeleteState.current)
    return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStarState.current && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            <div className={styles.right}>
              {
                isPublished
                  ? (
                      <Tag color="processing">已发布</Tag>
                    )
                  : (
                      <Tag>未发布</Tag>
                    )
              }
            </div>
            <span>
              答卷:
              { answerCount }
            </span>
            <span>{ createdAt }</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }}></Divider>
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => navigate(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              disabled={!isPublished}
              onClick={() => navigate(`/question/stat/${_id}`)}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              icon={<StarOutlined />}
              size="small"
              onClick={changeStar}
              disabled={changeStarLoading}
            >
              {isStarState.current ? '取消星标' : '标星'}
            </Button>
            <Popconfirm
              title="是否要复制问卷"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button
                type="text"
                icon={<CopyOutlined />}
                size="small"
                disabled={duplicateLoading}
              >
                复制
              </Button>
            </Popconfirm>

            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              onClick={del}
              disabled={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
