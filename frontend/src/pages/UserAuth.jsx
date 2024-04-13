import { Link, Navigate, useNavigate } from "react-router-dom"
import Input from "../components/input.component"
import { useContext, useRef } from "react"
import { createSession, getSession } from "../common/Session"
import { userAuthContext } from "../App"
import {toast, Toaster} from "react-hot-toast"
import axios from "axios";

const UserAuth = ({ type }) =>{
    const AuthForm = useRef();
    let navigate = useNavigate()
    const {userDetails,userDetails : {access_token}, setUserDetails } = useContext(userAuthContext);



    const connectToServer = (route, data) => {
        console.log(import.meta.env.VITE_SERVER_ROUTE + route);
        axios.post(import.meta.env.VITE_SERVER_ROUTE + route, data)
        .then(({data}) => {
            createSession('user', JSON.stringify(data.data));
            setUserDetails(data.data);
            toast.success("Logged in successfully")
            setTimeout(() => {
                navigate("/")
            }, 1500);
        })
        .catch (({response}) => {
            toast.error(response.data.error)
        })
    }


    const handleSubmitBtn = (e) => {
        e.preventDefault();

        let Route = type == "sign-in" ? "/signin" : "/signup"
        let form = new FormData(AuthForm.current);
        
        let formData = {}
        for (let [key, val] of form.entries()){
            formData[key] = val
        }

        const { fullname, email, password } = formData
         let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
         let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
         if (fullname) {
            if (fullname.length < 3) {
                return toast.error( "Fullname must be atleast 3 letters long");
            }
         }
         if (!email.length) {
             return toast.error("Enter the email");
         }
         if (!emailRegex.test(email)) {
             return toast.error( "Invalid email");
         }
         if (!password.length) {
            return toast.error("Enter the password");
        }
         if (!passwordRegex.test(password)) {
             return toast.error( "Password should atleast be 6-12 characters long and should contain atleast 1 capital letter");
         }
        
         connectToServer(Route, formData);
        
        

    }
    return (

        access_token ? <Navigate to="/"/> :
        <div className="absolute top-[13%] left-[10%] ">
            <Toaster />
            <h1 className="capitalize text-text text-3xl mb-10 pl-8">{
               type == 'sign-in' ?  "Welcome back!" : "join us today"
            }
            </h1>

            <form ref={AuthForm}>

            {
                type == "sign-up" ? <Input  name="fullname" type="text" placeholder="Enter your name" icon="fi fi-rr-user"/> : ""
            }
            <Input  name="email" type="text" placeholder="Enter your email" icon="fi fi-rr-envelope"/>
            <Input  name="password" type="password" placeholder="Enter your password" icon="fi fi-rr-key"/>

            <button onClick={handleSubmitBtn} className="bg-button1 border border-button1 capitalize w-[80%] p-2 text-bg mt-9 rounded-lg ml-10 hover:bg-button1/60" >{`${type.split('-')[0]} ${type.split('-')[1]}`}</button>
        
            {
                type == 'sign-in' ? <div className="mt-4 ml-10">
                    <h1 className="p-2 text-xl">Don't have an account?</h1>
                    <Link className="relative bottom-8 left-[75%]" to="/signup"><p className="underline">Signup</p></Link>
                </div> :<div className="mt-4 ml-10">
                    <h1 className="p-2 text-xl">Already a member?</h1>
                    <Link className="relative bottom-8 left-[65%]" to="/signin"><p className="underline">Signin</p></Link>
                </div>
            }
            </form>
        </div>
    )
}

export default UserAuth