import React,{ useRef } from "react";
import './modal.sass'
function Modal ({children, setModal}:{children:any, setModal:any}){
  const modalRef:any = useRef()
  const contentRef:any = useRef()
  const removeModal = ()=>{
    modalRef.current.classList.add("fade-out")
    contentRef.current.classList.add("zoom-out")
    setTimeout(()=> setModal(false) ,1000)
  }
  return(
    <div ref={modalRef} className="modalComponent flex" data-aos="fade">
      <div ref={contentRef} className="content d-flex justify-content-center" data-aos="zoom-in" data-aos-duration="1000">
      <i className="fas fa-times" onClick={removeModal} ></i>
        {children}
      </div>
    </div>
  )
}
export default Modal
