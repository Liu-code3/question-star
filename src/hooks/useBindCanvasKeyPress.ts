import { useDispatch } from 'react-redux'
import { useKeyPress } from 'ahooks'
import { ActionCreators } from 'redux-undo'
import {
  copyComponent,
  pasteComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent
} from '@/store/componentsReducer'

/**
 * 判断当前激活元素是否为body 光标所在的元素
 */
function isActiveElementValid() {
  const activeElem = document.activeElement

  // 'div[role="button"]' 是 @dnd-kit包装的组件
  return activeElem === document.body || activeElem?.matches('div[role="button"]')
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()

  // 删除组件
  useKeyPress(['BackSpace', 'delete'], () => {
    if (!isActiveElementValid())
      return
    dispatch(removeSelectedComponent())
  })

  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid)
      return
    dispatch(copyComponent())
  })

  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    // TODO 在右侧面板输入框中使用cv的时候 会触发这个事件
    if (!isActiveElementValid)
      return
    dispatch(pasteComponent())
  })

  // 选中上一个组件
  useKeyPress('uparrow', () => {
    if (!isActiveElementValid)
      return
    dispatch(selectPrevComponent())
  })

  //   选中下一个组件
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid)
      return
    dispatch(selectNextComponent())
  })

  // 撤销
  useKeyPress(['ctrl.z', 'meta.z'], () => {
    if (!isActiveElementValid)
      return
    dispatch(ActionCreators.undo())
  }, {
    exactMatch: true // 严格匹配 例如 ctrl.shift.z也能触发此hook 所以需要严格匹配
  })

  // 重做
  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    if (!isActiveElementValid)
      return
    dispatch(ActionCreators.redo())
  }, {
    exactMatch: true // 严格匹配
  })
}

export default useBindCanvasKeyPress
