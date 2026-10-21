import { statusLabel, type Measurement } from '../data/mock'

export default function MeasurementsTable({ rows }: { rows: Measurement[] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Fecha y hora</th>
          <th>Sensor</th>
          <th>Variable</th>
          <th>Valor</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.fecha}>
            <td>{r.fecha}</td>
            <td>{r.sensor}</td>
            <td>{r.variable}</td>
            <td>{r.valor}</td>
            <td>
              <span className="status">
                <i className={`pt ${r.estado}`} />
                {statusLabel[r.estado]}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
