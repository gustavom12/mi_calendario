import React, { useEffect, useState } from 'react';
import AdminCalendary from '../../components/admin/AdminCalendary/AdminCalendary';
import Modal from '../../components/a_minicomponents/modal/modal';
import * as AOS from "aos"
import './Admin.sass'
// import TurnType from '../../components/TurnType/TurnType';
import AdminDayInfo from '../../components/admin/AdminDayInfo/AdminDayInfo';
import AdminConfig from '../../components/admin/AdminConfig/AdminConfig';
// import userContext from '../../context/userContext';
// import userContext from '../../context/userContext';
const Admin = () => {
  useEffect(() => {
    //delete loader after DOM loaded
    document.getElementById("loader")?.remove()
    AOS.init({
      duration: 600, // values from 0 to 3000, with step 50ms
      easing: 'ease-in-out', // default easing for AOS animations
      once: true,
      offset: 25,
      anchorPlacement: 'bottom-bottom'
    })
    document.title = "Mi calendario Admin"
  }, [])
  // const { user } = useContext<any>(userContext)
  const [config, setConfig] = useState(false);
  return (
    <>
      {/* {!user  &&
        <div style={{ height: "100vh", width: "100%" }} className="flex">
          <h5 className="fw-bold">No tienes permiso para acceder a esta sección</h5>
        </div>} */}
      {/* CAMBIAR A 1 */}
      {/* {user && user?.RoleId === "2" ? */}
        <div className="Admin flex flex-column m-auto">
          {
            !config ?
              <i
                className="fas fa-cog fs-2 flex cursor-pointer"
                onClick={() => setConfig(true)}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: 20,
                  height: 45,
                  width: 45,
                  borderRadius: "50%",
                  cursor: "pointer",
                  background: "#00000010",
                }}
              ></i>
              : <Modal setModal={setConfig}>
                <AdminConfig />
              </Modal>
          }
          <div className="adminContent d-flex ">
            {/* {typesConfig ? <TurnType /> : ""} */}
            <AdminCalendary />
            <AdminDayInfo />
          </div>
        </div> :
        <div style={{ height: "100vh", width: "100%" }} className="flex">
          <h5 className="fw-bold">No tienes permiso para acceder a esta sección</h5>
        </div>
        {/* } */}
    </>
  )
}
export default Admin
