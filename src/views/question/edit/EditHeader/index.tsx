import type { ChangeEvent, FC } from 'react'
import { useState } from 'react'
import { Button, Input, Space, Typography } from 'antd'
import { CheckOutlined, EditOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useKeyPress, useRequest } from 'ahooks'
import styles from './index.module.scss'
import EditToolbar from './EditToolbar'
import { useGetPageInfo } from '@/hooks/useGetPageInfo.ts'
import { changePageTitle } from '@/store/pageInfoReducer.ts'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo.ts'
import { updateQuestionItemApi } from '@/api/question.ts'

const { Title } = Typography
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const dispatch = useDispatch()

  const [editState, setEditState] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle)
      return

    dispatch(changePageTitle(newTitle))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onChange={handleChange}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
      />
    )
  }

  return (
    <Space>
      <Title>{title}</Title>
      <Button
        icon={<EditOutlined />}
        type="text"
        onClick={() => setEditState(true)}
      >
      </Button>
    </Space>
  )
}

const SaveButton: FC = () => {
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { loading, run: save } = useRequest(
    async () => {
      if (!id)
        return

      await updateQuestionItemApi(id, { ...componentList, ...pageInfo })
    },
    {
      manual: true
    }
  )

  // 快捷键保存
  useKeyPress(['ctrl.s', 'meta.s'], (event) => {
    // 阻止网页保存
    event.preventDefault()
    if (!loading)
      save()
  })

  return (
    <Button
      icon={<CheckOutlined />}
      loading={loading}
      onClick={save}
    >
      保存
    </Button>
  )
}

const EditHeader: FC = () => {
  const navigate = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => navigate(-1)}
            >
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
