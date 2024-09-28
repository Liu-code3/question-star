import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo.ts'
import type { ComponentPropsType } from '@/components/QuestionComponent'
import { getComponentConfigByType } from '@/components/QuestionComponent'
import { changeComponentProps } from '@/store/componentsReducer'

const NoProp: FC = () => {
  return <div className="text-center">未选中组件</div>
}
const ComponentProp: FC = () => {
  const dispatch = useDispatch()
  const { selectedComponent } = useGetComponentInfo()
  if (!selectedComponent)
    return <NoProp />

  const { type, props, fe_id, isHidden, isLocked } = selectedComponent
  const componentConf = getComponentConfigByType(type)
  if (!componentConf)
    return <NoProp />

  const { PropComponent } = componentConf
  function handleChange(newProps: ComponentPropsType) {
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  return <PropComponent {...props} onChange={handleChange} disabled={isLocked || isHidden} />
}

export default ComponentProp
