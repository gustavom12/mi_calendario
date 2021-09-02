import React, { useContext, useEffect, useMemo, useState, } from 'react';
import ThemeContext from '../../../context/CalendaryContext';
import useFetch, { url } from '../../../helpers&hooks/useFetch';
import Loader from '../../a_minicomponents/loader/loader';
import AvailableTurns from './calculateAvailableTurns';
const SelectTime = ({ selectedType, selectedTime, setSelectedTime }: { selectedType?: any, selectedTime: any, setSelectedTime: any }) => {
  const { selectedDay } = useContext<any>(ThemeContext)
  const fecha = selectedDay.format("yyyy-MM-DD")
  let dia = selectedDay.day()
  if (dia === 0) dia = 7
  const [endpoint, setEndpoint] = useState(`${url}fecha_turnos_config.php?fecha="${fecha}"&dia="${dia}"`);
  const { data, loading } = useFetch(endpoint)
  useEffect(() => {
    const fechaSelected = selectedDay.format("yyyy-MM-DD")
    let diaDeLaSemana = selectedDay.day()
    if (diaDeLaSemana === 0) diaDeLaSemana = 7
    setEndpoint(`${url}fecha_turnos_config.php?fecha="${fechaSelected}"&dia="${diaDeLaSemana}"`)
  }, [selectedDay])
  const availableTurns = useMemo(() => {
    if (!data || !selectedType) return null;
    return AvailableTurns(Number(selectedType.duracion_minutos), data)
  }, [data, selectedType])
  return (
    <div className="SelectTime column">
      <h6 className="mb-4" style={{ fontSize: "18px", fontWeight: 600 }}>
        {
          selectedDay.format("dddd") === "Monday" ? "Lunes" :
            selectedDay.format("dddd") === "Tuesday" ? "Martes" :
              selectedDay.format("dddd") === "Wednesday" ? "Miercoles" :
                selectedDay.format("dddd") === "Thursday" ? "Jueves" :
                  selectedDay.format("dddd") === "Friday" ? "Viernes" :
                    selectedDay.format("dddd") === "Saturday" ? "Sábado" :
                      selectedDay.format("dddd") === "Sunday" ? "Domingo" :
                        ""
        }
        {" "}
        {selectedDay.format("DD")}
        {" De "}
        {
          selectedDay.format("MMMM") === "January" ? "Enero" :
            selectedDay.format("MMMM") === "February" ? "Febrero" :
              selectedDay.format("MMMM") === "March" ? "Marzo" :
                selectedDay.format("MMMM") === "April" ? "Abril" :
                  selectedDay.format("MMMM") === "May" ? "Mayo" :
                    selectedDay.format("MMMM") === "June" ? "Junio" :
                      selectedDay.format("MMMM") === "July" ? "Julio" :
                        selectedDay.format("MMMM") === "August" ? "Agosto" :
                          selectedDay.format("MMMM") === "September" ? "Septiembre" :
                            selectedDay.format("MMMM") === "October" ? "Octubre" :
                              selectedDay.format("MMMM") === "November" ? "Noviembre" :
                                selectedDay.format("MMMM") === "December" ? "Diciembre" : ""
        }
      </h6>
      <div className="scrollable" id="scrollable">
        {loading ? <div className="flex mt-5"><Loader /></div> :
          availableTurns?.length ?
            availableTurns?.map((time: number, i: number) =>
              <div
                className={`
                  fw-bold flex time text-primary ${selectedTime === time && "active"}
                  `} key={i}
                onClick={() => {
                  setSelectedTime(time)
                }}
              >
                {time?.toString().length > 5 ?
                  time?.toString().substring(0, 2) + ":" + time?.toString().substring(2, 4)
                  :
                  "0" + time?.toString().substring(0, 1) + ":" + time?.toString().substring(1, 3)
                }
              </div>
            )
            :
            <h6 className="text-center text-danger fw-bold my-5">No hay turnos disponibles</h6>
        }
      </div>
      <div className="flex mt-auto buttonSubmitContainer">
        <button
          className={`
            btn btn-primary text-white review-swiper-button-next buttonSubmit w-100 fw-bold mb-4 mt-4
            `}
          style={{
            transition: "all linear 0.3s ",
          }}
          disabled={!selectedTime ? true : false}
          type="button"
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}
export default SelectTime
