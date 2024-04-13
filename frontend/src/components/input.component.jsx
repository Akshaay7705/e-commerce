import { useState } from "react"

const Input = ({name, type, id, value, placeholder, icon}) =>{
    const [ ispassword, setisPassword] = useState(false)
    return (
        <>
        <div className="relative w-100% mb-4">
         <input 
         name={name} 
         type={type == "password" ? ispassword ? "text" : "password" : type}
         id={id}
         placeholder={placeholder}
         defaultValue={value}
         className="input-box ml-[40px] "
         />

         <i className={"fi "+ icon  +" input-icon"}></i>

         {
             type == "password" ? <i className={"fi fi-rr-eye" + (!ispassword ? "-crossed" : "") +" input-icon left-[100%]  cursor-pointer "}
             onClick={() => { setisPassword(currentVal => !currentVal)}}
             ></i> : ""
         }
        </div>

     </>
    )
}
export default Input