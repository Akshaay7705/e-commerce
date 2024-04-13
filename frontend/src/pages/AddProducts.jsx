import { Link } from "react-router-dom"
import logo from '../img/ekart-logo.png'
import { useContext } from "react"
import { editStateContext } from "../App"
import Edit from "../components/edit.component"
const AddProducts = () => {
    const {editState, setEditState} = useContext(editStateContext)
     return (

        <>
        <div className="w-full h-[60px] bg-navbar shadow-lg fixed top-0">
            <Link to="/"><img className="h-[60px] pl-[80px]" src={logo} alt="" /></Link>
        </div>

        <Edit />  
        
        </>
        
        
     )
}

export default AddProducts