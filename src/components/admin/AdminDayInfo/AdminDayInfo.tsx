import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../../../context/CalendaryContext';
import useFetch, { url, useFetchPost } from '../../../helpers&hooks/useFetch';
import './AdminDayInfo.sass'

const AdminDayInfo = () => {
  const { Post } = useFetchPost()
  const [turns, setTurns] = useState<any>(null);
  const { selectedDay, } = useContext<any>(ThemeContext)
  const fecha = selectedDay.format("yyyy-MM-DD")
  let dia = selectedDay.day()
  if (dia === 0) dia = 7
  const [endpoint, setEndpoint] = useState(`${url}fecha_turnos_config.php?fecha="${fecha}"&dia="${dia}"`);
  useEffect(() => {
    const fechaSelected = selectedDay.format("yyyy-MM-DD")
    let diaDeLaSemana = selectedDay.day()
    if (diaDeLaSemana === 0) diaDeLaSemana = 7
    setEndpoint(`${url}fecha_turnos_config.php?fecha="${fechaSelected}"&dia="${diaDeLaSemana}"`)
  }, [selectedDay])
  const { data, }: { data: any } = useFetch(endpoint)
  useEffect(() => {
    if (!data) return;
    setTurns(data.turnos)
  }, [data])

  return (
    <div className="AdminDayInfo d-flex aling-items-center flex-column">
      <h3 className="fw-bold text-center">Turnos </h3>
      <h5 className="text-serif2 text-center"> {selectedDay.clone().format("DD")}/{selectedDay.format("MM")} </h5>
      { data?.config &&
        data?.config[0]?.hasta === "00:00:00" ? null :
          <div className="flex justify-content-around">
            <h6> <span>Desde:</span> {data?.config[0]?.desde.substring(0, 5)}</h6>
            <h6> <span>Hasta:</span> {data?.config[0]?.hasta.substring(0, 5)}</h6>
          </div>
      }
      { data?.config &&
        data?.config[0]?.hasta_1 === "00:00:00" ? null :
          <div className="flex justify-content-around">
            <h6> <span>Desde:</span> {data?.config[0]?.desde_1.substring(0, 5)}</h6>
            <h6> <span>Hasta:</span> {data?.config[0]?.hasta_1.substring(0, 5)}</h6>
          </div>
      }
      <div className="scrollable">
        {!turns?.length &&
          <div className="flex">
            <h4 className="text-center text-serif text-danger my-5">No hay turnos en este día</h4>
          </div>
        }
        {turns?.map((turno: any, i: number) =>
          <div className="turnoInfo d-flex mt-2 align-items-center flex-column" key={i}>
            <div className="d-flex w-100 align-items-center justify-content-between">
              <a href={`mailto:${turno.email}`} target="_blank" rel="noreferrer" className="flex">
                <i className={`fas fa-envelope`} aria-hidden="true" />
              </a>
              <h5 className="text-serif2 m-0 text-center">{turno.nombre_usuario}</h5>
              <a
                target="_blank" rel="noreferrer"
                href={`https://api.whatsapp.com/send?phone=${turno.telefono}`}
                className="my-auto flex"
              >
                <i className={`fab fa-whatsapp`} aria-hidden="true" />
              </a>
            </div>
            <h6 className="fw-bold m-0">{turno.categoria}</h6>
            <div className="d-flex fw-bold">
              <span >{turno.hora.substring(0, 5)}</span>
            </div>
            <div className="flex justify-content-around">
              <div className="mx-2">
                <i className="fas fa-clock my-auto"></i>
                <span className="fw-bold">{turno.duracion_minutos}min</span>
              </div>
              <div className="mx-2">
                <i className="fas fa-money-bill-wave"></i>
                <span className="fw-bold  ">${turno.precio}</span>
              </div>
            </div>
            <p
              className="text-danger m-0 cursor-pointer flex textFather"
              onClick={() => {
                Post({ url: `${url}eliminar_turno?TurnoId="${turno.TurnoId}"`, body: {} })
                setTurns((prevData: any) => prevData.filter((a: any) => a.TurnoId !== turno.TurnoId))
              }}
            >
              Cancelar turno
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
export default AdminDayInfo
