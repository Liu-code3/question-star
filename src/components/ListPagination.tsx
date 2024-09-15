import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_DEFAULT_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '@/constant'

interface TProps {
  total: number
}
const ListPagination: FC<TProps> = (props: TProps) => {
  const { total = 0 } = props
  const [searchParams] = useSearchParams()
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    const page = Number.parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '1')
    const size = Number.parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || LIST_DEFAULT_PAGE_SIZE)
    setCurrent(page)
    setPageSize(size)
  }, [searchParams])

  // 当page pageSize 改变时  跳转也没(改变url参数)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handlePageChange = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())

    navigate({
      pathname,
      search: searchParams.toString()
    })
  }

  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handlePageChange}
    />
  )
}

export default ListPagination
