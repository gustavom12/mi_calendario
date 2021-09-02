import React, { FormEvent, useContext, useEffect, useState } from 'react';
import ThemeContext from '../../../context/CalendaryContext';
import useFetch, { url, useFetchPost } from '../../../helpers&hooks/useFetch';
import DayConfig from '../AdminConfig/DayConfig';
import './AdminDayExeption.sass'
const AdminDayExeption = () => {
  const { selectedDay } = useContext<any>(ThemeContext)
  const fecha = selectedDay.format("yyyy/MM/DD")
  const [dayConfig, setDayConfig] = useState<any>({
    dia: "1",
    nombre: "Lunes",
    short: "Lun",
    turnos: [
      { inicio: "09:00", fin: "13:00" }
    ]
  });
  let dia = selectedDay.day()
  if (dia === 0) dia = 7
  //previus config
  const { data }: { data: any } = useFetch(`${url}fecha_turnos_config.php?fecha="${fecha}"&dia="${dia}"`);
  const postData = useFetchPost()
  useEffect(() => {
    if (!data?.config) return;
    const day = data.config[0]
    let dayParsed = {...day}
    dayParsed.turnos = []
    if(day.desde !== "00:00:00"){
      dayParsed.turnos = [{inicio: day.desde, fin: day.hasta}]
    }
    if(day.desde_1 !== "00:00:00"){
      dayParsed.turnos = [...dayParsed.turnos, {inicio: day.desde_1, fin: day.hasta_1}]
    }
    setDayConfig(dayParsed)
  }, [data])

  const addTurn = () => {
    setDayConfig({ ...dayConfig, turnos: [...dayConfig.turnos, { inicio: "14:00", fin: "18:00" }] })
  }
  const onValueChange = (value: string, _: any, turnIndex: number, isInicio: boolean) => {
    if (isInicio) dayConfig.turnos[turnIndex].inicio = value
    if (!isInicio) dayConfig.turnos[turnIndex].fin = value
    setDayConfig({ ...dayConfig })
  }
  const removeTurn = (_: any, indexTurno: number) => {
    dayConfig.turnos.splice(indexTurno, 1)
    setDayConfig({ ...dayConfig })
  }
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (dayConfig.turnos[0]) {
      dayConfig.desde = dayConfig.turnos[0].inicio
      dayConfig.hasta = dayConfig.turnos[0].fin
    } else {
      dayConfig.desde = "00:00"
      dayConfig.hasta = "00:00"
    }
    if (dayConfig.turnos[1]) {
      dayConfig.desde_1 = dayConfig.turnos[1].inicio
      dayConfig.hasta_1 = dayConfig.turnos[1].fin
    } else {
      dayConfig.desde_1 = "00:00"
      dayConfig.hasta_1 = "00:00"
    }
    dayConfig.intervalo = "15"
    dayConfig.fecha = selectedDay.format("yyyy-MM-DD")
    postData.Post({url: `${url}fecha_config_registrar.php`, body: dayConfig})
  }
  return (
    <form onSubmit={onSubmit} className="AdminDayExeption w-100" style={{ height: "300px" }} >
      <h4 className="fw-bold mb-4"> Configurar horario del {selectedDay.format("DD/MM/YY")} </h4>
      <DayConfig day={dayConfig} addTurn={addTurn} i={0} onValueChange={onValueChange} removeTurn={removeTurn} />
      <h5 className="fw-bold text-success text-center"> {postData.data?.result?.mensaje} </h5>
      <div className="flex">
        <button className="btn fw-bold btn-primary w-75">
          Guardar
        </button>
      </div>
    </form>
  )
}
export default AdminDayExeption
