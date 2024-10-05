import type { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import {
  changeComponentHidden,
  changeComponentLocked,
  copyComponent,
  moveComponent,
  pasteComponent,
  removeSelectedComponent
} from '@/store/componentsReducer'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo.ts'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { componentList, selectedId, selectedComponent, copiedComponent } = useGetComponentInfo()

  const len = componentList.length
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

  const isFirst = selectedIndex <= 0 // 当前选中的组件是第一个
  const isLast = selectedIndex >= len - 1 // 当前选中的组件是最后一个
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

  // 复制组件
  function handleCopy() {
    dispatch(copyComponent())
  }

  // 粘贴组件
  function handlePaste() {
    dispatch(pasteComponent())
  }

  // 上移组件
  function handleMoveUp() {
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }

  // 下移组件
  function handleMoveDown() {
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
  }

  // 撤销
  function handleUndo() {
    dispatch(ActionCreators.undo())
  }

  // 重做
  function handleRedo() {
    dispatch(ActionCreators.redo())
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
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={!copiedComponent}
        >
        </Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          onClick={handleMoveUp}
          disabled={isFirst}
        >
        </Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={handleMoveDown}
          disabled={isLast}
        >
        </Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button
          shape="circle"
          icon={<UndoOutlined />}
          onClick={handleUndo}
        >
        </Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button
          shape="circle"
          icon={<RedoOutlined />}
          onClick={handleRedo}
        >
        </Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
