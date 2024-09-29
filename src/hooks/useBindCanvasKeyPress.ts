import { useDispatch } from 'react-redux'
import { useKeyPress } from 'ahooks'
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

  return activeElem === document.body
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
}

export default useBindCanvasKeyPress
