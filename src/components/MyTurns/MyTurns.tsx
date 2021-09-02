import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import userContext from '../../context/userContext';
import useFetch, { url, useFetchPost } from '../../helpers&hooks/useFetch';
import Modal from '../a_minicomponents/modal/modal';
import './MyTurns.sass'
const MyTurns = ({ setModal }: { setModal: any }) => {
  const { user } = useContext<any>(userContext)
  const { data }: { data: any } = useFetch(`${url}mis_turnos.php?UsuarioId="${user?.UsuarioId}"`)
  const { Post } = useFetchPost()
  const [turns, setTurns] = useState<any>(null);
  useEffect(() => {
    if (!data) return;
    setTurns(data)
  }, [data])
  return (
    <Modal setModal={setModal}>
      <div className="MyTurns" >
        <h3 className="fw-bold text-center">{user?.Nombre}</h3>
        <div className="scrollable" style={{ height: "400px" }}>
          {turns?.length ? turns.map((turn: any, i: number) =>
            <div className={`
              Turn my-3
              ${Number(moment().format("yyyyMMDD")) <= Number(turn.fecha.replaceAll("-", "")) ? "success" : "danger"}
              `}
              key={i}
            >
              <h3 className="fw-bold text-center m-0">
                {turn.categoria}
              </h3>
              <div className="flex justify-content-around ">
                <span className="fw-bold fecha"> {turn.fecha.split("-")[2]}/{turn.fecha.split("-")[1]}/{turn.fecha.split("-")[0]} </span>
                <span className="fw-bold"> {turn.hora.substring(0, 5)} </span>
              </div>
              <div className="flex fw-bold fs-5 justify-content-around">
                <span>
                  <i className="fas fa-clock mx-1"></i>
                  {turn.duracion_minutos} min
                </span>
                <span>
                  <i className="fas fa-money-bill-wave mx-1"></i>
                  ${turn.precio}
                </span>
              </div>
              <p
                className="text-danger cursor-pointer text-center fw-bold m-0"
                onClick={() => {
                  Post({ url: `${url}eliminar_turno?TurnoId="${turn.TurnoId}"`, body: {} })
                  setTurns((prevData: any) => prevData.filter((a: any) => a.TurnoId !== turn.TurnoId))
                }}
              > Cancelar turno </p>
            </div>
          )
            :
            <h6 className="fw-bold text-danger text-center my-5">
              Aún no tienes turnos
            </h6>}
        </div>
      </div>
    </Modal>
  )
}
export default MyTurns
