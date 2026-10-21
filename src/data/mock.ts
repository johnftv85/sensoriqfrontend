export type Status = 'online' | 'alert' | 'offline'

export interface Sensor {
  id: string
  name: string
  code: string
}

export const equipment: Sensor[] = [
  { id: 'm1', name: 'Motor 1', code: 'T-001' },
  { id: 'm2', name: 'Motor 2', code: 'T-002' },
  { id: 'b1', name: 'Bomba 1', code: 'P-001' },
  { id: 'b2', name: 'Bomba 2', code: 'P-002' },
  { id: 'c1', name: 'Compresor', code: 'V-001' },
  { id: 't1', name: 'Tanque 1', code: 'N-001' },
]

export const variables = ['Temperatura', 'Presión', 'Humedad', 'Vibración', 'Nivel']

export const seriesColors: Record<string, string> = {
  m1: '#2563eb',
  m2: '#f97316',
  b1: '#22c55e',
  b2: '#a855f7',
  c1: '#ef4444',
  t1: '#14b8a6',
}

// Serie determinista (sin Math.random) para que el gráfico no cambie en cada render.
const hours = Array.from({ length: 25 }, (_, i) => i)
export const temperatureSeries = hours.map((h) => ({
  hora: `${String(h).padStart(2, '0')}:00`,
  m1: Math.round(60 + 14 * Math.sin(h / 3) + 5 * Math.sin(h * 1.7)),
  m2: Math.round(66 + 12 * Math.sin(h / 2.6 + 1) + 6 * Math.cos(h * 1.3)),
  b1: Math.round(45 + 9 * Math.sin(h / 3.4 + 2) + 4 * Math.sin(h * 2.1)),
  b2: Math.round(52 + 8 * Math.cos(h / 3)),
  c1: Math.round(70 + 10 * Math.sin(h / 4)),
  t1: Math.round(35 + 6 * Math.sin(h / 5)),
}))

export const sensorStatus = [
  { name: 'En línea', value: 42, color: '#22c55e' },
  { name: 'En alerta', value: 5, color: '#fbbf24' },
  { name: 'Fuera de línea', value: 3, color: '#ef4444' },
]

export const alarms = [
  { id: 1, kind: 'danger', title: 'Temperatura alta - Motor 2', detail: '88.5 °C (Límite: 80 °C)', time: '10:24 a. m.' },
  { id: 2, kind: 'warning', title: 'Presión baja - Bomba 1', detail: '2.1 bar (Límite: 2.5 bar)', time: '09:17 a. m.' },
  { id: 3, kind: 'danger', title: 'Vibración alta - Compresor', detail: '6.8 mm/s (Límite: 5.0 mm/s)', time: '08:52 a. m.' },
  { id: 4, kind: 'info', title: 'Equipo en mantenimiento', detail: 'Caldera 1', time: '07:30 a. m.' },
  { id: 5, kind: 'success', title: 'Sensor restablecido', detail: 'Motor 3 - Temperatura', time: '06:12 a. m.' },
] as const

export interface Measurement {
  fecha: string
  sensor: string
  variable: string
  valor: string
  estado: Status
}

export const measurements: Measurement[] = [
  { fecha: '14/10/2026 12:40', sensor: 'Motor 1', variable: 'Temperatura', valor: '76.2 °C', estado: 'online' },
  { fecha: '14/10/2026 12:38', sensor: 'Bomba 1', variable: 'Presión', valor: '4.7 bar', estado: 'online' },
  { fecha: '14/10/2026 12:36', sensor: 'Motor 2', variable: 'Temperatura', valor: '88.5 °C', estado: 'alert' },
  { fecha: '14/10/2026 12:34', sensor: 'Compresor', variable: 'Vibración', valor: '6.8 mm/s', estado: 'alert' },
  { fecha: '14/10/2026 12:32', sensor: 'Tanque 1', variable: 'Nivel', valor: '82 %', estado: 'online' },
]

export const mapPins: { x: number; y: number; status: Status }[] = [
  { x: 42, y: 28, status: 'online' },
  { x: 62, y: 18, status: 'online' },
  { x: 22, y: 52, status: 'online' },
  { x: 72, y: 46, status: 'offline' },
  { x: 32, y: 72, status: 'offline' },
  { x: 62, y: 76, status: 'online' },
  { x: 14, y: 40, status: 'alert' },
]

export const statusLabel: Record<Status, string> = {
  online: 'En línea',
  alert: 'Alerta',
  offline: 'Fuera de línea',
}
