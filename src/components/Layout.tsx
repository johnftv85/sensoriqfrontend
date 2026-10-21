import { NavLink, Outlet } from 'react-router-dom'
import {
  Activity, AudioWaveform, Bell, ChevronDown, Cpu, FileText, Home, LayoutDashboard,
  Search, Settings, Wrench, BarChart3,
} from 'lucide-react'

const nav = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/sensores', label: 'Sensores', icon: Cpu },
  { to: '/equipos', label: 'Equipos', icon: Wrench },
  { to: '/tiempo-real', label: 'Monitoreo en tiempo real', icon: Activity },
  { to: '/informes', label: 'Informes', icon: FileText, chevron: true },
  { to: '/reportes', label: 'Reportes personalizados', icon: LayoutDashboard, badge: 'Nuevo' },
  { to: '/alarmas', label: 'Alarmas', icon: Bell },
  { to: '/configuracion', label: 'Configuración', icon: Settings },
]

export default function Layout() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <AudioWaveform size={34} />
          <div>
            <strong>Sensoriq</strong>
            <span>Sensores que generan valor</span>
          </div>
        </div>
        <nav>
          {nav.map(({ to, label, icon: Icon, badge, chevron }) => (
            <NavLink key={to} to={to} end={to === '/'} className="nav-item">
              <Icon size={18} />
              <span>{label}</span>
              {badge && <em className="badge">{badge}</em>}
              {chevron && <ChevronDown size={14} className="push" />}
            </NavLink>
          ))}
        </nav>
        <div className="side-card">
          <BarChart3 size={28} />
          <div>
            <strong>Sensoriq</strong>
            <span>Análisis, monitoreo e informes de sensores industriales</span>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <label className="search">
            <Search size={16} />
            <input placeholder="Buscar sensores, equipos, informes..." />
          </label>
          <button className="icon-btn" aria-label="Notificaciones">
            <Bell size={20} />
            <i className="dot" />
          </button>
          <div className="user">
            <span className="avatar">JP</span>
            <div>
              <strong>Juan Pérez</strong>
              <span>Administrador</span>
            </div>
            <ChevronDown size={14} />
          </div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
