import moment from 'moment';
import React, { useContext, useMemo } from 'react';
import ThemeContext from '../../../context/CalendaryContext';
import TurnResponseContext from '../../../context/turnResponseContext';
import SelectTime from '../SelectTime/SelectTime';
import "./CalendaryMonth.sass";

const CalendaryMonth = ({ isAdmin = false, selectedType, selectedTime, setSelectedTime }: { isAdmin?: boolean, selectedType?: any, selectedTime?: any, setSelectedTime?: any }) => {
  const { selectedMonth, setSelectedMonth, setSelectedDay, selectedDay } = useContext<any>(ThemeContext)
  /*Calculates days in this month and previous month, to have a perfect 6 x 6 grid
    and memorize the value of days */
  const { data, setData } = useContext<any>(TurnResponseContext)
  const days = useMemo(() => {
    let startOfMonth = selectedMonth.clone().startOf('month')
    let finishOfMonth = selectedMonth.clone().endOf('month')
    const days = []
    //Find the first date to show on calendary
    while (startOfMonth.day() !== 0) {
      startOfMonth.subtract(1, "days")
    }
    //Find the last date to show on calendary
    while (finishOfMonth.day() !== 6) {
      finishOfMonth.add(1, "days")
    }
    //Push days to calendary
    while (startOfMonth.isSameOrBefore(finishOfMonth)) {
      days.push({
        date: moment(startOfMonth),
        isInCurrentMonth: selectedMonth.month() === startOfMonth.month()
      })
      startOfMonth.add(1, "days")
    }
    return days
  }, [selectedMonth])
  return (
    <div className="SelectDate column d-flex">
      <div className={`CalendaryMonth ${isAdmin && "w-100"}`} >
        <h5 className="fw-bold mb-3">Selecciona una fecha {!isAdmin && "& horario"} </h5>
        <header className="mb-3 flex px-2 justify-content-between">
          <h4 className="fw-bold"> {
            selectedMonth.format("MMMM") === "January" ? "Enero" :
              selectedMonth.format("MMMM") === "February" ? "Febrero" :
                selectedMonth.format("MMMM") === "March" ? "Marzo" :
                  selectedMonth.format("MMMM") === "April" ? "Abril" :
                    selectedMonth.format("MMMM") === "May" ? "Mayo" :
                      selectedMonth.format("MMMM") === "June" ? "Junio" :
                        selectedMonth.format("MMMM") === "July" ? "Julio" :
                          selectedMonth.format("MMMM") === "August" ? "Agosto" :
                            selectedMonth.format("MMMM") === "September" ? "Septiembre" :
                              selectedMonth.format("MMMM") === "October" ? "Octubre" :
                                selectedMonth.format("MMMM") === "November" ? "Noviembre" :
                                  selectedMonth.format("MMMM") === "December" ? "Diciembre" : ""
          } </h4>
          <h6>
            <i
              className="fas arrow fa-chevron-left mx-2"
              onClick={() => { setSelectedMonth(selectedMonth.clone().subtract(1, "months")) }}
            ></i>
            <i
              className="fas arrow fa-chevron-right mx-3"
              onClick={() => { setSelectedMonth(selectedMonth.clone().add(1, "months")) }}
            ></i>
          </h6>
        </header>
        <div className="weeks">
          <span className="dayTitle w-100 text-center text-serif2">DOM</span>
          <span className="dayTitle w-100 text-center text-serif2">LUN</span>
          <span className="dayTitle w-100 text-center text-serif2">MAR</span>
          <span className="dayTitle w-100 text-center text-serif2">MIER</span>
          <span className="dayTitle w-100 text-center text-serif2">JUE</span>
          <span className="dayTitle w-100 text-center text-serif2">VIE</span>
          <span className="dayTitle w-100 text-center text-serif2">SAB</span>
          {days.map((day, i) =>
            <div key={i} className={`
            day text-center flex
            ${!day.isInCurrentMonth ? "isNotInMonth" : "inMonth"}
            ${day.isInCurrentMonth
              && day.date.valueOf() >= moment().subtract(1, "days").valueOf()
              && "available"
              }
            ${day.isInCurrentMonth && selectedDay.format("DDMMYY") === day.date.format("DDMMYY") && "actual"}
            ${data?.result?.mensaje && "success"}
            `}
              onClick={() => {
                if (isAdmin) setSelectedDay(day.date.clone())
                if (day.isInCurrentMonth && day.date.valueOf() >= moment().subtract(1, "days").valueOf()) {
                  setSelectedDay(day.date.clone())
                  if (data?.result?.mensaje) setData(null)
                }
              }}
            >
              {day.date.format("DD")}
            </div>
          )}
        </div>
      </div>
      {
        !isAdmin && <SelectTime selectedType={selectedType} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
      }
    </div>
  )
}
export default CalendaryMonth
