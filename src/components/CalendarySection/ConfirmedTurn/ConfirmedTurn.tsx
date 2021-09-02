import React, { useContext } from 'react';
import ThemeContext from '../../../context/CalendaryContext';
import SelectedDataContext from '../../../context/SelectedDataContext';
import './ConfirmedTurn.sass'
const ConfirmedTurn = () => {
  const { selectedDay } = useContext<any>(ThemeContext)
  const { selectedType, selectedTime } = useContext<any>(SelectedDataContext)
  return (
    <div className="ConfirmedTurn d-flex align-items-center w-100 flex-column">
      <h6 className="fw-bold" style={{ fontSize: "24px" }}>Confirmado</h6>
      <div className="card mt-4">
        {/* <h6 className="mt-2 mb-1 fw-bold" style={{ color: "#727272" }}>Gustavo Mercado</h6> */}
        <h3 className="fw-bold typeName d-flex align-items-center">
          <i className="text-success fs-5 fas fa-circle" style={{ marginRight: "5px" }}></i>
          {selectedType?.nombre}
        </h3>
        <h6 className="text-success my-3 fw-bold d-flex">
          <i className="fs-4 fas fa-calendar-week"></i>
          <span className="mx-2 text-serif fs-5">
            {selectedTime?.toString().length > 5 ?
              selectedTime?.toString().substring(0, 2) + ":" + selectedTime?.toString().substring(2, 4)
              :
              "0" + selectedTime?.toString().substring(0, 1) + ":" + selectedTime?.toString().substring(1, 3)
            }{" "}
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
            } de {selectedDay.format("yyyy")}
          </span>
        </h6>
        <div className="d-flex justify-content-between align-items-center my-2">
          <h5 className="fw-bold" style={{ color: "#727272" }}>
            <i className="fs-4 fas fa-clock my-auto"></i>
            <span className="mx-2">{selectedType?.duracion_minutos} min </span>
          </h5>
          <h5 className="d-flex align-items-center fw-bold my-3" style={{ color: "#727272" }}>
            <i className="fs-4 fas fa-money-bill-wave"></i>
            <span className="my-auto mx-1">${selectedType?.costo.split(".")[0]} </span>
          </h5>
        </div>
        <h5 className="fw-bold text-center mt-3"> Un email fué enviado a tu dirección de email con toda la información </h5>
      </div>
    </div>
  )
}
export default ConfirmedTurn
