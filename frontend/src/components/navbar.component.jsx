import { Link, Outlet, useNavigate } from "react-router-dom"
import logo from '../img/ekart-logo.png'
import { useContext, useEffect, useRef, useState } from "react"
import { userAuthContext } from "../App"
import toast, { Toaster } from "react-hot-toast"
import UserNavigation from "./user-navigation.component"
const Navbar = () => {

    const [userPanel, setUserPanel] = useState(false);
    const profileRef = useRef(null);

    const {userDetails:{access_token, username}} = useContext(userAuthContext)
    let navigate = useNavigate();
    const handleCartClick = (e) => {
        e.preventDefault();
        if (!access_token) {
            return toast.error("Please login to see cart")
        }
        
        navigate(`/cart/${username}`)
    }

    

    

    const handlePanelClick = () => {
        setUserPanel(val => !val);
    }


    const handleMouseLeave = () => {
        setUserPanel(false);
    };


    return (
        <>
        <div className="w-full h-[60px] bg-navbar shadow-lg fixed top-0">
            <Toaster />
            <div className="flex gap-[80px]">
            <Link to="/"><img className="h-[60px] pl-[80px]" src={logo} alt="" /></Link>

            <input type="text" placeholder="Search for products, brands or category....." className="w-[310px] p-2 h-[40px] mt-[10px] border border-dark-grey placeholder:text-text outline-none text-sm focus:border-button1 rounded-sm" />
            <i className="fi fi-rr-search absolute top-5 left-[40%] text-dark-grey"></i>
            </div>

            <div onClick={handlePanelClick} onBlur={handleMouseLeave} className="absolute top-5 flex gap-[120px] left-[50%]">

            {
                access_token ? 
                
                <button  className="mb-5 p-1 hover:bg-dark-grey/5 cursor-pointer">
                    <h1 className="capitalize">my account</h1>
                    { userPanel ? <UserNavigation /> : "" }
                </button> 
                
                : <Link to="/signin" className="flex gap-1 ">
                <i className="fi fi-rr-circle-user text-2xl"></i>
                <h1 className="text-text text-xl">Login</h1>
                </Link>
            }    
            

            <Link to="/seller">
                <h1>Become a seller</h1>
            </Link>


            

            </div>
        </div>

        <Outlet />
        </>
    )
}

export default Navbar