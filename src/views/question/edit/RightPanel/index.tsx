import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentProp from '@/views/question/edit/RightPanel/ComponentProp.tsx'
import PageSetting from '@/views/question/edit/RightPanel/PageSetting.tsx'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo.ts'

enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting'
}
const RightPanel: FC = () => {
  const { selectedId } = useGetComponentInfo()

  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)

  useEffect(() => {
    const key = selectedId ? TAB_KEYS.PROP_KEY : TAB_KEYS.SETTING_KEY
    setActiveKey(key)
  }, [selectedId])

  const tabItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: '属性',
      icon: <FileTextOutlined />,
      children: <ComponentProp />
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: '页面设置',
      icon: <SettingOutlined />,
      children: <PageSetting />
    }
  ]

  return <Tabs items={tabItems} activeKey={activeKey}></Tabs>
}

export default RightPanel
