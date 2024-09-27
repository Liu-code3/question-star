import type { FC } from 'react'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo.ts'
import { getComponentConfigByType } from '@/components/QuestionComponent'

const NoProp: FC = () => {
  return <div className="text-center">未选中组件</div>
}
const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentInfo()
  if (!selectedComponent)
    return <NoProp />

  const { type, props } = selectedComponent
  const componentConf = getComponentConfigByType(type)
  if (!componentConf)
    return <NoProp />

  const { PropComponent } = componentConf
  return <PropComponent {...props} />
}

export default ComponentProp
