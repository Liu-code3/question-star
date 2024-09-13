import type { FC } from 'react'
import { useParams } from 'react-router-dom'

const Edit: FC = () => {
  const { id } = useParams()
  return (
    <div>
      编辑问卷
      <h2>{ id }</h2>
    </div>
  )
}

export default Edit
