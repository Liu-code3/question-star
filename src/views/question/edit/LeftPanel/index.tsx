import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import type { FC } from 'react'
import ComponentLib from './ComponentLib'
import Layers from './Layers'

const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: 'componentLib',
      icon: <AppstoreOutlined />,
      label: (
        <span>
          组件库
        </span>
      ),
      children: <ComponentLib />
    },
    {
      key: 'layers',
      icon: <BarsOutlined />,
      label: (
        <span>
          图层
        </span>
      ),
      children: <Layers />
    }
  ]

  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />
}

export default LeftPanel
