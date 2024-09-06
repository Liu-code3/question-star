import type { ChangeEvent, FC } from 'react'
import { useEffect, useState } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '@/constant'

const { Search } = Input
const ListSearch: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState('')

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  // 获取 url 参数, 并设置到 input  value
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const newVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(newVal)
  }, [searchParams])
  function handleSearch(value: string) {
    //  跳转页面, 增加 url  参数
    navigate({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`
    })
  }

  return (
    <Search
      allowClear
      placeholder="请输入关键字"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
    />
  )
}

export default ListSearch
