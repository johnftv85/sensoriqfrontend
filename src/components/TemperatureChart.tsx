import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { equipment, seriesColors, temperatureSeries } from '../data/mock'

interface Props {
  sensorIds: string[]
  height?: number
}

export default function TemperatureChart({ sensorIds, height = 240 }: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={temperatureSeries} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
        <CartesianGrid stroke="#e8edf5" vertical={false} />
        <XAxis dataKey="hora" tick={{ fontSize: 11, fill: '#64748b' }} interval={5} tickLine={false} />
        <YAxis domain={[20, 120]} tick={{ fontSize: 11, fill: '#64748b' }} unit=" °C" tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(v) => {
            const e = equipment.find((x) => x.id === v)
            return <span style={{ fontSize: 12, color: '#475569' }}>{e ? `${e.name} (${e.code})` : v}</span>
          }}
        />
        {sensorIds.map((id) => (
          <Line key={id} dataKey={id} stroke={seriesColors[id]} strokeWidth={2} dot={false} type="monotone" />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
