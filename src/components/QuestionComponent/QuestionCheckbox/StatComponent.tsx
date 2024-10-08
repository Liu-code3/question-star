import type { FC } from 'react'
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Tooltip } from 'antd'
import type { IQuestionCheckboxStatProps } from './type'

const StatComponent: FC<IQuestionCheckboxStatProps> = ({ stat = [] }) => {
  return (
    <div className="h-100 w-75">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={300}
          height={400}
          data={stat}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="count"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
