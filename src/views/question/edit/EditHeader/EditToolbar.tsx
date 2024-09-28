import type { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import { DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { changeComponentHidden, changeComponentLocked, removeSelectedComponent } from '@/store/componentsReducer'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo.ts'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent } = useGetComponentInfo()
  // 删除组件
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  // 隐藏/显示组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }

  // 锁定/解锁组件
  const { isLocked } = selectedComponent || {}
  function handleLocked() {
    dispatch(changeComponentLocked({ fe_id: selectedId }))
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLocked}
          type={isLocked ? 'primary' : 'default'}
        >
        </Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
