import { useContext, useRef } from "react"
import { sellerAuthContext, userAuthContext } from "../App"
import Input from "../components/input.component";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { createSession } from "../common/Session";

const Seller = () => {
    const {userDetails : { username, email }} = useContext(userAuthContext)
    const {sellerDetails : { seller_access_token }, setSellerDetails } = useContext(sellerAuthContext);
    const SellerForm = useRef()
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username) {   
            setTimeout(() => {
                navigate("/signin")
            }, 3000)
            return (
            toast.error("Please login first to become a seller")
            )
            
        }
        let form = new FormData(SellerForm.current);
        
        let formData = {}
        for (let [key, val] of form.entries()){
            formData[key] = val
        }

        let seller_email = formData.email
        let user_email = email
         
        let senddata = {
            user_email : user_email,
            seller_email : seller_email
        }

        if (!email) {
            return toast.error("Email field cannot be empty")
        }
        axios.post(import.meta.env.VITE_SERVER_ROUTE + '/add-seller', senddata)
        .then(({data}) => {
            setSellerDetails(data)
            createSession('seller', JSON.stringify(data))

            toast.success("Logged in as a seller successfully")
            setTimeout(() => {
                navigate("/")
            }, 2000);
        })
        .catch(({ response }) => {
            // console.log(response);
            toast.error(response.data.error);
        })

    }
    
    return (
    
        seller_access_token ? <Navigate to="/" /> :
     <div className="absolute top-[15%]">
        <Toaster />
        <form ref={SellerForm}>
        <h1 className="p-4 ml-8 text-3xl text-dark-grey">Login as seller</h1>

        <Input name="email" icon="fi fi-rr-envelope" placeholder="email"/>
        <button onClick={handleSubmit} className="p-3 bg-button1 border border-button1 text-bg text-xl ml-10 w-full rounded-lg">Submit</button>
        </form>
     </div>
    
    )
}

export default Seller
