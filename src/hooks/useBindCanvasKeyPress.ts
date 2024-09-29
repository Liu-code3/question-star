import { useDispatch } from 'react-redux'
import { useKeyPress } from 'ahooks'
import { copyComponent, pasteComponent, removeSelectedComponent } from '@/store/componentsReducer'

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
}

export default useBindCanvasKeyPress
