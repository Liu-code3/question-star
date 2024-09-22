import type { FC } from 'react'
import './index.css'

const Loading: FC = () => {
  return (
    <div className="loader">
      <div className="loader__balls">
        <div className="loader__balls__group">
          <div className="ball item1"></div>
          <div className="ball item1"></div>
          <div className="ball item1"></div>
        </div>
        <div className="loader__balls__group">
          <div className="ball item2"></div>
          <div className="ball item2"></div>
          <div className="ball item2"></div>
        </div>
        <div className="loader__balls__group">
          <div className="ball item3"></div>
          <div className="ball item3"></div>
          <div className="ball item3"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
