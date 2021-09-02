import React, { useRef } from "react";
import './textHover.sass'
//To use this, needs to put className "textFather" to parent element
function TextHover(
  { message, className }:
  { message: string, position?: string, className?: string }) {
  const msgRef:any = useRef()
  return (
    <span ref={msgRef} className={`bg-primary flex text-center textHover ${className}`}>
      {message}
    </span>
  )
}
export default TextHover


