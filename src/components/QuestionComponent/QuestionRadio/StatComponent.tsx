import type { FC } from 'react'
import { useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import type { IQuestionRadioStatProps } from './type'
import { STAT_COLORS } from '@/constant'

function format(n: number) {
  return (n * 100).toFixed(2)
}

const StatComponent: FC<IQuestionRadioStatProps> = ({ stat = [] }) => {
  const sum = useMemo(() => {
    return stat.reduce((acc, cur) => acc + cur.count, 0)
  }, [stat])

  return (
    <div className="h-100 w-75">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            data={stat}
            cx="50%" // x轴 偏移量
            cy="50%" // y轴 偏移量
            outerRadius={80} // 直径
            fill="#8884d8"
            label={i => `${i.name}:${format(i.count / sum)}%`}
          >
            {stat.map((item, index) => {
              return (
                <Cell
                  key={item.name}
                  fill={STAT_COLORS[index % STAT_COLORS.length]}
                />
              )
            })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
