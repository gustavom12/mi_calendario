import React, { } from "react";

function DayConfig({ day, removeTurn, i, addTurn, onValueChange }: { day: any, removeTurn: any, i: number, addTurn: any, onValueChange: any }) {
  return (
    <div className="d-flex day mb-3">
      <h5 className="fw-bold"> {day.nombre?.substring(0,3)} </h5>
      <div>
        {
          !day.turnos.length ?
            <h6 className="fw-bold text-danger mx-5"> Dia sin turnos </h6> :
            <>
              {day.turnos.map((turno: any, iTurno: number) =>
                <div className="d-flex" key={iTurno}>
                  <OptionsSelect value={turno.inicio} onChange={(e: any) => {
                    onValueChange(e.target.value, i, iTurno, true)
                  }} />
                  <OptionsSelect value={turno.fin} onChange={(e: any) => {
                    onValueChange(e.target.value, i, iTurno, false)
                  }} />
                  <i className="fas fa-trash ml-auto my-auto text-danger mt-2 cursor-pointer" onClick={() => {
                    removeTurn(i, iTurno)
                  }}></i>
                </div>
              )}
            </>
        }
      </div>
      {day.turnos.length < 2 &&
        <i
          style={{ height: 30, width: 30, background: "#0000001a", borderRadius: "50%" }}
          className="fas flex fs-5 fa-plus cursor-pointer ml-auto my-auto"
          onClick={() => {
            addTurn(i)
          }}></i>
      }
    </div>
  )
}

function OptionsSelect(props: any) {

  return (
    <select {...props} className={`form-select form-select mb-3 ${props.className}`}>
      <option >{props.value}</option>
      <option value="8:00">8:00</option>
      <option value="8:30">8:30</option>
      <option value="9:00">9:00</option>
      <option value="9:30">9:30</option>
      <option value="10:00">10:00</option>
      <option value="10:30">10:30</option>
      <option value="11:00">11:00</option>
      <option value="11:30">11:30</option>
      <option value="12:00">12:00</option>
      <option value="12:30">12:30</option>
      <option value="13:00">13:00</option>
      <option value="13:30">13:30</option>
      <option value="14:00">14:00</option>
      <option value="14:30">14:30</option>
      <option value="15:00">15:00</option>
      <option value="15:30">15:30</option>
      <option value="16:00">16:00</option>
      <option value="16:30">16:30</option>
      <option value="17:00">17:00</option>
      <option value="17:30">17:30</option>
      <option value="18:00">18:00</option>
      <option value="18:30">18:30</option>
      <option value="19:00">19:00</option>
      <option value="19:30">19:30</option>
      <option value="20:00">20:00</option>
      <option value="20:30">20:30</option>
      <option value="21:00">21:00</option>
      <option value="21:30">21:30</option>
      <option value="22:00">22:00</option>
      <option value="22:30">22:30</option>
      <option value="23:00">23:00</option>
      <option value="23:30">23:30</option>
      <option value="0:00">0:00</option>
    </select>
  )
}
export default DayConfig
