import React,{} from 'react';
import './Select.sass'
const Select = (props:any)=>{
  const { className, children } = props
  return(
    <div className={`${className} customSelect`}>
      <div className="dropdown">
        {children}
      </div>
    </div>
  )
}
export default Select
