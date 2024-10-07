import type { FC } from 'react'
import { useState } from 'react'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { Spin, Table, Typography } from 'antd'
import { getQuestionStatListApi } from '@/api/stat.ts'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo.ts'

interface IProps {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

interface ITableList {
  [key: string]: any
}

const { Title } = Typography
const PageStat: FC<IProps> = (props) => {
  const {
    selectedComponentId,
    setSelectedComponentId,
    setSelectedComponentType
  } = props
  const { id = '' } = useParams()
  const [total, setTotal] = useState(0)
  const [list, setList] = useState<ITableList[]>([])
  const { componentList } = useGetComponentInfo()
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListApi(id, { page: 1, pageSize: 10 })
      return res
    },
    {
      onSuccess(res) {
        const { data } = res || {}
        setTotal(data.total)
        setList(data.list)
      }
    }
  )

  // table组件中的Column 需要使用enum才可以不报错
  enum AlignType {
    CENTER = 'center'
  }

  const columns = componentList.map((c) => {
    const { fe_id, title, props = {}, type } = c
    const colTitle = props!.title || title

    return {
      align: AlignType.CENTER,
      title: (
        <div
          className="cursor-pointer"
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          <span className={`color-${fe_id === selectedComponentId ? '#1890ff' : 'inherit'}`}>
            { colTitle }
          </span>
        </div>
      ),
      dataIndex: fe_id,
      width: fe_id === 'c7' ? 200 : 50,
    }
  })

  const dataSource = list.map(i => ({ ...i, key: i._id }))
  const TableEle = (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  )

  if (loading) {
    return (
      <div className="layout-abs-center h-100% w-100%">
        <Spin />
      </div>
    )
  }

  return (
    <div>
      <Title level={3}>
        答卷数量:
        { !loading && total }
      </Title>
      { TableEle }
    </div>
  )
}

export default PageStat
