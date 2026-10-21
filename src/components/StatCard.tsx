import type { ReactNode } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'

interface Props {
  tone: 'red' | 'blue' | 'green' | 'orange' | 'purple'
  icon: ReactNode
  label: string
  value: string
  unit?: string
  delta?: number
  footer?: string
}

export default function StatCard({ tone, icon, label, value, unit, delta, footer }: Props) {
  return (
    <div className={`stat tone-${tone}`}>
      <div className="stat-icon">{icon}</div>
      <div>
        <span className="stat-label">{label}</span>
        <div className="stat-value">
          {value}
          {unit && <small>{unit}</small>}
        </div>
        {delta !== undefined && (
          <span className={`delta ${delta >= 0 ? 'up' : 'down'}`}>
            {delta >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            {Math.abs(delta)}% <i>vs. ayer</i>
          </span>
        )}
        {footer && <span className="stat-foot">{footer}</span>}
      </div>
    </div>
  )
}
