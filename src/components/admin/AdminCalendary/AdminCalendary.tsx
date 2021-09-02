import React, { useState } from 'react';
import AdminDayExeption from '../AdminDayExeption/AdminDayExeption';
import Modal from '../../a_minicomponents/modal/modal';
import CalendaryMonth from '../../CalendarySection/CalendaryMonth/CalendaryMonth';
import './AdminCalendary.sass'
// desde hasta 2
// campos obligatorios = nombre telefono y password email
const AdminCalendary = () => {
  const [dayExceptionDiv, setDayExceptionDiv] = useState(false);
  return (
    <div className="AdminCalendary">
      <CalendaryMonth isAdmin={true} />
      <div className="flex">
        {
          !dayExceptionDiv ?
            <button
              className="btn mt-5 text-serif2 w-75 btn-primary"
              onClick={() => setDayExceptionDiv(true)}
            >
              Agregar Excepción de horario
            </button>
            :
            <Modal setModal={setDayExceptionDiv}>
              <AdminDayExeption />
            </Modal>
        }
      </div>
    </div>
  )
}
export default AdminCalendary
