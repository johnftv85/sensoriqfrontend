import { Link } from 'react-router-dom'
import { Cell, Pie, PieChart } from 'recharts'
import {
  AlertTriangle, CalendarDays, CheckCircle2, ChevronRight, Download, Droplet, FileBarChart,
  FolderOpen, Gauge, Info, Maximize2, Thermometer, TimerReset,
} from 'lucide-react'
import StatCard from '../components/StatCard'
import TemperatureChart from '../components/TemperatureChart'
import MeasurementsTable from '../components/MeasurementsTable'
import { alarms, mapPins, measurements, sensorStatus } from '../data/mock'

const alarmIcon = {
  danger: <AlertTriangle size={16} />,
  warning: <AlertTriangle size={16} />,
  info: <Info size={16} />,
  success: <CheckCircle2 size={16} />,
}

const quick = [
  { icon: <FileBarChart size={18} />, tone: 'purple', title: 'Generar informe personalizado', desc: 'Crea tus propios informes con los datos que necesitas.', to: '/reportes' },
  { icon: <FolderOpen size={18} />, tone: 'green', title: 'Ver reportes guardados', desc: 'Accede a tus informes y configura nuevos.', to: '/informes' },
  { icon: <Download size={18} />, tone: 'blue', title: 'Exportar datos', desc: 'Descarga en PDF o Excel.', to: '/informes' },
  { icon: <TimerReset size={18} />, tone: 'orange', title: 'Programar informes', desc: 'Recibe tus informes por correo automáticamente.', to: '/informes' },
]

export default function Dashboard() {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>¡Hola, Juan!</h1>
          <p className="muted">Aquí tienes un resumen del estado de tus equipos y sensores.</p>
        </div>
        <div className="date">
          <CalendarDays size={20} />
          <div>
            <strong>14 de octubre de 2026</strong>
            <span>Última actualización: 12:45 p. m.</span>
          </div>
        </div>
      </div>

      <section className="grid-4">
        <StatCard tone="red" icon={<Thermometer />} label="Temperatura promedio" value="72.4" unit=" °C" delta={2.1} />
        <StatCard tone="blue" icon={<Gauge />} label="Presión promedio" value="4.8" unit=" bar" delta={1.3} />
        <StatCard tone="green" icon={<Droplet />} label="Humedad promedio" value="56.2" unit=" %" delta={-0.8} />
        <StatCard tone="orange" icon={<AlertTriangle />} label="Alarmas activas" value="3" footer="de 28 sensores" />
      </section>

      <section className="grid-main">
        <div className="card span-2">
          <div className="card-head">
            <h2>Evolución de la temperatura</h2>
            <div className="selects">
              <select><option>Todos los sensores</option></select>
              <select><option>Últimas 24 horas</option></select>
            </div>
          </div>
          <TemperatureChart sensorIds={['m1', 'm2', 'b1']} height={260} />
        </div>

        <div className="card">
          <h2>Estado de los sensores</h2>
          <div className="donut">
            <PieChart width={170} height={170}>
              <Pie data={sensorStatus} dataKey="value" innerRadius={55} outerRadius={80} startAngle={90} endAngle={-270} stroke="none">
                {sensorStatus.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
            </PieChart>
            <div className="donut-label"><strong>50</strong><span>Sensores</span></div>
          </div>
          <ul className="legend">
            {sensorStatus.map((s) => (
              <li key={s.name}><i style={{ background: s.color }} />{s.name}<b>{s.value}</b></li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div className="card-head">
            <h2>Alarmas recientes</h2>
            <Link to="/alarmas" className="link">Ver todas</Link>
          </div>
          <ul className="alarms">
            {alarms.map((a) => (
              <li key={a.id}>
                <span className={`alarm-icon ${a.kind}`}>{alarmIcon[a.kind]}</span>
                <div><strong>{a.title}</strong><span>{a.detail}</span></div>
                <time>{a.time}</time>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>Mapa de sensores</h2>
          <div className="map">
            {mapPins.map((p, i) => (
              <span key={i} className={`pin ${p.status}`} style={{ left: `${p.x}%`, top: `${p.y}%` }} />
            ))}
            <button className="map-fs" aria-label="Pantalla completa"><Maximize2 size={14} /></button>
          </div>
          <ul className="legend inline">
            <li><i className="pt online" />En línea</li>
            <li><i className="pt alert" />En alerta</li>
            <li><i className="pt offline" />Fuera de línea</li>
          </ul>
        </div>

        <div className="card span-2 row-2">
          <div className="card-head">
            <h2>Últimas mediciones</h2>
            <Link to="/alarmas" className="link">Ver todas</Link>
          </div>
          <MeasurementsTable rows={measurements} />
        </div>

        <div className="card quick">
          <h2><FileBarChart size={18} /> Informe rápido</h2>
          <ul>
            {quick.map((q) => (
              <li key={q.title}>
                <Link to={q.to}>
                  <span className={`q-icon tone-${q.tone}`}>{q.icon}</span>
                  <div><strong>{q.title}</strong><span>{q.desc}</span></div>
                  <ChevronRight size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
