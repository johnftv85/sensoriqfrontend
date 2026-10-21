import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import {
  BarChart3, CalendarDays, Database, Gauge, LayoutGrid, LineChart, MapPin, PieChart as PieIcon,
  Plus, Save, Search, Table2, Thermometer, PlayCircle,
} from 'lucide-react'
import StatCard from '../components/StatCard'
import TemperatureChart from '../components/TemperatureChart'
import MeasurementsTable from '../components/MeasurementsTable'
import { equipment, mapPins, measurements, sensorStatus, seriesColors, variables } from '../data/mock'

type Viz = 'line' | 'bar' | 'table' | 'cards' | 'pie' | 'map'

const vizOptions: { id: Viz; label: string; icon: typeof LineChart }[] = [
  { id: 'line', label: 'Gráfica de líneas', icon: LineChart },
  { id: 'bar', label: 'Gráfica de barras', icon: BarChart3 },
  { id: 'table', label: 'Tabla de datos', icon: Table2 },
  { id: 'cards', label: 'Tarjetas de indicadores', icon: LayoutGrid },
  { id: 'pie', label: 'Gráfica de pastel', icon: PieIcon },
  { id: 'map', label: 'Mapa', icon: MapPin },
]

const toggle = <T,>(list: T[], item: T) =>
  list.includes(item) ? list.filter((x) => x !== item) : [...list, item]

export default function ReportBuilder() {
  const [query, setQuery] = useState('')
  const [sensors, setSensors] = useState(['m2', 'b1'])
  const [vars, setVars] = useState(['Temperatura', 'Presión'])
  const [range, setRange] = useState('Últimas 24 horas')
  const [groupBy, setGroupBy] = useState('Hora')
  const [viz, setViz] = useState<Viz[]>(['line', 'table'])

  const visible = useMemo(
    () => equipment.filter((e) => `${e.name} ${e.code}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  )
  const selected = equipment.filter((e) => sensors.includes(e.id))
  const title = `Informe de ${vars.join(' y ').toLowerCase() || 'datos'}`
  const rows = measurements.filter(
    (m) => selected.some((s) => s.name === m.sensor) || selected.length === 0,
  )
  const barData = selected.map((s) => ({ name: s.name, id: s.id, valor: 40 + s.name.length * 4 }))

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Crear informe personalizado</h1>
          <p className="muted">Selecciona los datos, filtros y visualizaciones que necesitas.</p>
        </div>
        <div className="actions">
          <button className="btn outline"><Save size={16} /> Guardar</button>
          <button className="btn primary"><PlayCircle size={16} /> Generar informe</button>
        </div>
      </div>

      <div className="builder">
        <div className="card">
          <h2>1. Selecciona los sensores</h2>
          <label className="search light">
            <Search size={14} />
            <input placeholder="Buscar sensores..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <ul className="checks">
            {visible.map((e) => (
              <li key={e.id}>
                <label>
                  <input type="checkbox" checked={sensors.includes(e.id)} onChange={() => setSensors(toggle(sensors, e.id))} />
                  {e.name} ({e.code})
                </label>
              </li>
            ))}
          </ul>
          <h3>Variables a mostrar</h3>
          <ul className="checks">
            {variables.map((v) => (
              <li key={v}>
                <label>
                  <input type="checkbox" checked={vars.includes(v)} onChange={() => setVars(toggle(vars, v))} />
                  {v}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="col">
          <div className="card">
            <h2>2. Configura los filtros</h2>
            <div className="filters">
              <label>Rango de fechas
                <select value={range} onChange={(e) => setRange(e.target.value)}>
                  <option>Últimas 24 horas</option><option>Últimos 7 días</option><option>Últimos 30 días</option>
                </select>
              </label>
              <label>Agrupar por
                <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                  <option>Hora</option><option>Día</option><option>Semana</option>
                </select>
              </label>
            </div>
            <button className="btn outline small"><Plus size={14} /> Agregar filtro</button>
          </div>

          <div className="card">
            <h2>3. Elige las visualizaciones</h2>
            <div className="viz-grid">
              {vizOptions.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  className={`viz ${viz.includes(id) ? 'on' : ''}`}
                  aria-pressed={viz.includes(id)}
                  onClick={() => setViz(toggle(viz, id))}
                >
                  <Icon size={24} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card preview">
          <h2>Vista previa del informe</h2>
          <div className="report">
            <div className="report-head">
              <div>
                <strong>{title}</strong>
                <span className="muted">{selected.map((s) => s.name).join(', ') || 'Sin sensores'} · {range}</span>
              </div>
              <span className="muted"><CalendarDays size={12} /> 14/10/2026 12:45</span>
            </div>

            {viz.includes('cards') && (
              <div className="grid-3">
                <StatCard tone="red" icon={<Thermometer />} label="Temp. promedio" value="74.2" unit=" °C" delta={2.1} />
                <StatCard tone="blue" icon={<Gauge />} label="Presión promedio" value="4.7" unit=" bar" delta={1.3} />
                <StatCard tone="purple" icon={<Database />} label="Registros" value="1,248" footer="Últimas 24 h" />
              </div>
            )}
            {viz.includes('line') && <TemperatureChart sensorIds={sensors} height={180} />}
            {viz.includes('bar') && (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={barData}>
                  <CartesianGrid stroke="#e8edf5" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Bar dataKey="valor" radius={[4, 4, 0, 0]}>
                    {barData.map((d) => <Cell key={d.id} fill={seriesColors[d.id]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
            {viz.includes('pie') && (
              <PieChart width={180} height={160}>
                <Pie data={sensorStatus} dataKey="value" outerRadius={65} stroke="none">
                  {sensorStatus.map((s) => <Cell key={s.name} fill={s.color} />)}
                </Pie>
              </PieChart>
            )}
            {viz.includes('map') && (
              <div className="map short">
                {mapPins.map((p, i) => (
                  <span key={i} className={`pin ${p.status}`} style={{ left: `${p.x}%`, top: `${p.y}%` }} />
                ))}
              </div>
            )}
            {viz.includes('table') && (
              <>
                <h3>Últimas mediciones</h3>
                <MeasurementsTable rows={rows} />
              </>
            )}
            {viz.length === 0 && <p className="muted center">Elige al menos una visualización.</p>}
          </div>
        </div>
      </div>
    </>
  )
}
