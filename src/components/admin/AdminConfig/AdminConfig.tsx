import React, { useState } from "react";
import TurnType from "./TurnType/Category";
import AdminDayConfig from "./AdminDaysConfig";
function AdminConfig() {
  const [DisponilibityDiv, setDisponilibityDiv] = useState(false);
  const [CategoriasDiv, setCategoriasDiv] = useState(false);

  return (
    !DisponilibityDiv && !CategoriasDiv ?
      <div className="config w-100 p-4 ">
        <div className="option fw-bold flex py-4 fs-5 w-100 cursor-pointer" style={{
          background: "#00000010",
          borderRadius: "4px"
        }}
          onClick={() => setDisponilibityDiv(true)}
        >
          Disponibilidad
        </div>
        <div className="option fw-bold mt-3 flex py-4 fs-5 w-100 cursor-pointer" style={{
          background: "#00000010",
          borderRadius: "4px"
        }}
          onClick={() => setCategoriasDiv(true)}
        >
          Categorias
        </div>
      </div>
      :
      <>
        {DisponilibityDiv && <AdminDayConfig />}
        {CategoriasDiv && <TurnType />}
      </>

  )
}
export default AdminConfig
