import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ReportBuilder from './pages/ReportBuilder'
import Placeholder from './pages/Placeholder'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="reportes" element={<ReportBuilder />} />
        <Route path="*" element={<Placeholder />} />
      </Route>
    </Routes>
  )
}
