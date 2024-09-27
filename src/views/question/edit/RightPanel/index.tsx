import type { FC } from 'react'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentProp from '@/views/question/edit/RightPanel/ComponentProp.tsx'

const RightPanel: FC = () => {
  const tabItems = [
    {
      key: 'prop',
      label: '属性',
      icon: <FileTextOutlined />,
      children: <ComponentProp />
    },
    {
      key: 'setting',
      label: '页面设置',
      icon: <SettingOutlined />,
      children: <div>页面设置</div>
    }
  ]

  return <Tabs items={tabItems} defaultActiveKey="prop"></Tabs>
}

export default RightPanel
