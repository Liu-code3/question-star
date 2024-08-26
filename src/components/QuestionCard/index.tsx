import type { FC } from 'react'
import { useState } from 'react'
import { CopyOutlined, DeleteOutlined, EditOutlined, LineChartOutlined, StarOutlined } from '@ant-design/icons'
import { Button, Divider, Popconfirm, Space, Tag } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

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
  const { _id, title, createdAt, answerCount, isPublished, isStar } = props
  const [isStarState] = useState(isStar)
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/${_id}` : `/manage/question/${_id}`}
          >
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
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
            >
              {isStarState ? '取消星标' : '标星'}
            </Button>
            <Popconfirm
              title="是否要复制问卷"
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="text"
                icon={<CopyOutlined />}
                size="small"
              >
                复制
              </Button>
            </Popconfirm>

            <Button
              type="text"
              icon={<DeleteOutlined />}
              size="small"
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
