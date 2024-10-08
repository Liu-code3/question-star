import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getComponentStatApi } from '@/api/stat.ts'
import { getComponentConfigByType } from '@/components/QuestionComponent'

interface IProps {
  selectedComponentId: string
  selectedComponentType: string
}

const { Title } = Typography
const ChartStat: FC<IProps> = (props) => {
  const { selectedComponentId, selectedComponentType } = props
  const { id = '' } = useParams()

  const [stat, setStat] = useState([])

  const { run } = useRequest(
    async (questionId: string, componentId: string) => await getComponentStatApi(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.data.stat)
      }
    }
  )

  useEffect(() => {
    if (selectedComponentId)
      run(id, selectedComponentId)
  }, [id, selectedComponentId])

  function getStatEle() {
    if (!selectedComponentId)
      return <div>未选中组件</div>
    const { StatComponent } = getComponentConfigByType(selectedComponentType) || {}
    if (!StatComponent)
      return <div>暂无统计组件</div>
    return <StatComponent stat={stat} />
  }

  return (
    <>
      <Title level={3}>图标统计</Title>
      {getStatEle()}
    </>
  )
}

export default ChartStat
