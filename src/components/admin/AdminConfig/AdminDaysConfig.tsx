import React, { useEffect, useState } from 'react';
import useFetch, { url, useFetchPost } from '../../../helpers&hooks/useFetch';
import './AdminDaysConfig.sass'
import DayConfig from './DayConfig';
import { week } from './initWeekValue';

const InitValue = week

const AdminDayConfig = () => {
  const [week, setWeek] = useState(InitValue)
  const { Post, data } = useFetchPost()
  const [firstRender, setFirstRender] = useState(true);
  const previousConfig: any = useFetch(`${url}configuracion_listar`)
  const addTurn = (DayIndex: number) => {
    setWeek(() => {
      week[DayIndex].turnos.push({ inicio: "14:00", fin: "18:00" })
      if (week[DayIndex].turnos.length > 2) week[DayIndex].turnos.length = 2
      return [...week]
    })
  }
  const onValueChange = (value: string, dayIndex: number, turnIndex: number, isInicio: boolean) => {
    if (isInicio) week[dayIndex].turnos[turnIndex].inicio = value
    if (!isInicio) week[dayIndex].turnos[turnIndex].fin = value
    setWeek([...week])
  }
  useEffect(() => {
    if (Array.isArray(previousConfig.data) && previousConfig?.data?.length > 0) {
      if(!firstRender)return;
      setFirstRender(false)
      const configCloned = { ...previousConfig }
      const weekParsed: any = configCloned.data.map((day: any) => {
        const turnos = []
        if (day.desde !== "00:00:00") turnos.push({ inicio: day.desde, fin: day.hasta })
        if (day.desde_1 !== "00:00:00") turnos.push({ inicio: day.desde_1, fin: day.hasta_1 })
        delete day.hasta
        delete day.desde
        delete day.hasta_1
        delete day.desde_1
        day.turnos = turnos
        return day
      })
      setWeek(weekParsed)
    }
  }, [previousConfig,firstRender])
  const removeTurn = (DayIndex: number, turnIndex: number) => {
    setWeek((week: any) => {
      week[DayIndex].turnos.splice(turnIndex, 1)
      return [...week]
    })
  }
  const onSubmit = (e: any) => {
    e.preventDefault()
    const weekParsed = [...week].map((day: any) => {
      if (day.turnos[0]) {
        day.desde = day.turnos[0].inicio
        day.hasta = day.turnos[0].fin
      } else {
        day.desde = "00:00"
        day.hasta = "00:00"
      }
      if (day.turnos[1]) {
        day.desde_1 = day.turnos[1].inicio
        day.hasta_1 = day.turnos[1].fin
      } else {
        day.desde_1 = "00:00"
        day.hasta_1 = "00:00"
      }
      day.intervalo = "15"
      return day
    })
    console.log(weekParsed)
    Post({ url: `${url}configuracion_registrar`, body: weekParsed })
  }
  return (
    <form onSubmit={onSubmit} className="config">
      <h2 className="fw-bold text-center pb-2"> Disponibilidad </h2>
      <div className="mt-5">
        {week.map((day: any, i: number) =>
          <DayConfig day={day} removeTurn={removeTurn} i={i} key={i} addTurn={addTurn} onValueChange={onValueChange} />
        )
        }
      </div>
      {data &&
        <p className="text-success text-center fw-bold my-4">{data?.result?.mensaje}</p>
      }
      <div className="flex mt-5">
        <button className="btn w-75 btn-primary mb-4">
          <h5 className="flex fw-bold p-0 m-0 ">Guardar</h5>
        </button>
      </div>
    </form>
  )
}
export default AdminDayConfig
