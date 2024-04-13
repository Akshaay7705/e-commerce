import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { userAuthContext } from "../App";
import axios from "axios";
import Input from "../components/input.component";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const userStructure = {
    fullname: "",
    email: "",
    number: "",
    pincode: "",
    address: "",
  };
  const [userData, setUserData] = useState(userStructure);
  const { userDetails: { access_token, username, fullname } } = useContext(userAuthContext);
  const navigate = useNavigate();

  const fetchData = () => {
    axios.post(import.meta.env.VITE_SERVER_ROUTE + '/get-user', { username })
      .then(({ data }) => {
        setUserData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  let { id } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
        username : username,
        fullname: userData.fullname,
        email: userData.email,
        number: userData.number,
        pincode: userData.pincode,
        address: userData.address,

    }

    axios.post(import.meta.env.VITE_SERVER_ROUTE + '/update-user', data)
    .then(({data}) => {
        toast.success(data.data);
    })
    .catch((error) => {
        console.log(error);
    })
    
    
  };

  return access_token ? (
    <>
      <div className="absolute shadow-sm p-3 top-[14%] left-[12%] flex gap-5">
        <Toaster />
        <i className="fi fi-rr-mode-portrait text-text text-3xl"></i>
        <h1 className="capitalize text-text text-2xl">Hello, {fullname}</h1>
      </div>

      <div className="absolute top-[25%] left-[12%] overflow-y-scroll w-[40%] scroll-smooth h-[60vh]">
        <h1 className="text-2xl mb-8">Account Details</h1>
        <h1 className="text-text p-2">Name</h1>
        <div className="capitalize w-[250px] p-4 h-[60px] bg-grey cursor-not-allowed border border-grey ">{userData.fullname}</div>


        <h1 className="text-text mt-7 p-2">Email</h1>
        <div className="w-[250px] p-4 h-[60px] bg-grey cursor-not-allowed border border-grey ">{userData.email}</div>


        <h1 className="text-text mt-7 p-2">Phone Number</h1>
        <input
          name="number"
          className="capitalize w-[250px] p-4 h-[60px] bg-grey border border-grey "
          value={userData.number}
          onChange={handleInputChange}
          placeholder="Phone number"
        />

        <h1 className="text-text mt-7 p-2">Address</h1>
        <textarea
          name="address"
          className="capitalize w-[450px] p-4 h-[200px] bg-grey border border-grey "
          value={userData.address}
          onChange={handleInputChange}
          placeholder="Address"
        />

        <h1 className="text-text mt-7 p-2">Pincode</h1>
        <input
          name="pincode"
          className="capitalize w-[250px] p-4 h-[60px] bg-grey border border-grey "
          value={userData.pincode}
          onChange={handleInputChange}
          placeholder="Pincode"
        />

        <button onClick={handleSubmit} className="bg-button1 border border-button1 capitalize w-[150px] p-2 text-bg mt-9 rounded-lg ml-10 hover:bg-button1/60">Submit</button> 
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default Profile;
