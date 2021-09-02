import React, { useContext, useEffect, useRef } from 'react';
import ThemeContext from '../../../context/CalendaryContext';
import SelectedDataContext from '../../../context/SelectedDataContext';
import userContext from '../../../context/userContext';
import { url, useFetchPost } from '../../../helpers&hooks/useFetch';
import './UserInputs.sass'
const UserInputs = () => {
  const { selectedType, selectedTime } = useContext<any>(SelectedDataContext)
  const { selectedDay } = useContext<any>(ThemeContext)
  const { user, setUser } = useContext(userContext)
  const nextSlideRef = useRef<any>(null)
  const {Post, data, loading} = useFetchPost();
  useEffect(()=>{
    if(data?.status === "ok") nextSlideRef.current.click()
  },[data])
  const onSubmit = (e: any) => {
    e.preventDefault()
    let diaDeLaSemana = selectedDay.day()
    if (diaDeLaSemana === 0) diaDeLaSemana = 7
    let parsedTime: any = selectedTime
    parsedTime?.toString().length > 5 ?
      parsedTime = parsedTime?.toString().substring(0, 2) + ":" + parsedTime?.toString().substring(2, 4)
      :
      parsedTime = "0" + parsedTime?.toString().substring(0, 1) + ":" + parsedTime?.toString().substring(1, 3)
    const body = {
      NegocioId: "1",
      UsuarioId: "1",
      email: user.email,
      telefono: user.telefono,
      dia: diaDeLaSemana,
      fecha: selectedDay.format("yyyy/MM/DD"),
      hora: parsedTime,
      nombre_usuario: user.nombre,
      nombre_negocio: "nombre",
      duracion_minutos: selectedType.duracion_minutos,
      precio: selectedType.costo,
      categoria: selectedType.nombre,
    }
    localStorage.setItem("_us", JSON.stringify(user))
    Post({ url: `${url}crear_turno.php`, body })
  }
  return (
    <form className="UserInputs d-flex" onSubmit={onSubmit} >
      <div className="leftCol">
        <i className="fs-4 fas cursor-pointer review-swiper-button-prev text-primary fa-arrow-left fs-4"></i>
        <h6 className="mt-2 mb-1 fw-bold" style={{ color: "#727272" }}>Gustavo Mercado</h6>
        <h2 className="fw-bold typeName">{selectedType?.nombre}</h2>
        <h5 className="d-flex align-items-center fw-bold my-3" style={{ color: "#727272" }}>
          <i className="fs-4 fas fa-money-bill-wave"></i>
          <span className="my-auto mx-1">${selectedType?.costo.split(".")[0]} </span>
        </h5>
        <h6 className="text-primary my-3 fw-bold d-flex">
          <i className="fs-4 fas fa-calendar-week"></i>
          <span className="mx-2 text-serif fs-6">
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
        <h5 className="d-flex fw-bold my-2" style={{ color: "#727272" }}>
          <i className="fs-4 fas fa-clock my-auto"></i>
          <span className="mx-2">{selectedType?.duracion_minutos} min </span>
        </h5>
      </div>
      <div className="rightCol">
        <h5 className="fw-bold">Introduce tus datos</h5>
        <h6 className="fw-bold mt-4">Nombre Completo:</h6>
        <input required type="text" value={user.nombre} onChange={(e) => {
          setUser({ ...user, nombre: e.target.value })
        }}
        />
        <h6 className="fw-bold mt-4">Email:</h6>
        <input required type="email" value={user.email} onChange={(e) => {
          setUser({ ...user, email: e.target.value })
        }} />
        <h6 className="fw-bold mt-4">Celular (opcional):</h6>
        <input type="text" value={user.telefono} onChange={(e) => {
          setUser({ ...user, telefono: e.target.value })
        }} />
        <div className="flex">
          <button
            type="submit"
            className="btn btn-primary fw-bold"
            disabled={loading || data ? true : false}
          >
            Confirmar
            {
              loading && <div className="loading"></div>
            }
          </button>
          <input type="hidden" className="review-swiper-button-next" ref={nextSlideRef} />
        </div>
      </div>
    </form>
  )
}
export default UserInputs
