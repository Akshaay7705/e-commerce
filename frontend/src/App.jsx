import {  Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar.component"
import UserAuth from "./pages/UserAuth"

import { createContext, useEffect, useState } from "react"
import { getSession } from "./common/Session";
import Profile from "./pages/Profile";
import Seller from "./pages/Seller";
import ViewProducts from "./pages/ViewProducts";
import AddProducts from "./pages/AddProducts";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";



export const userAuthContext = createContext({ });
export const sellerAuthContext = createContext({ });
export const editStateContext = createContext({ });
export const productContext = createContext({ });
const App = () => {

  const ProductStructure = {
    product_id : "",
    product_name : "",
    product_price: "",
    product_description: [],
    product_img: [],
    product_category: [],
    brand_name: "",
    payment_options: [],
    product_key_features: []
}

    const [userDetails, setUserDetails] = useState({ });
    const [sellerDetails, setSellerDetails] = useState({ });
    const [editState, setEditState] = useState(false);
    const [sellerProduct, setSellerProducts] = useState(ProductStructure)

    useEffect(()=>{
      let currentSession = getSession('user');
      currentSession ? setUserDetails(JSON.parse(currentSession)) : setUserDetails({access_token : null});

      let currentSellerSession = getSession('seller')
      currentSellerSession ? setSellerDetails(JSON.parse(currentSellerSession)) : setSellerDetails({ seller_access_token : null })
    },[])

  return (
    <userAuthContext.Provider value={{userDetails, setUserDetails}}>
    <sellerAuthContext.Provider value={{ sellerDetails, setSellerDetails}}>
    <editStateContext.Provider value={{editState, setEditState}} >
    <productContext.Provider value={{sellerProduct, setSellerProducts}}>
    <Routes >
      <Route path="/" element={<Navbar />}>
         <Route path="signin" element={<UserAuth type="sign-in"/>}/>
         <Route path="signup" element={<UserAuth type="sign-up"/>}/>
         <Route path="seller" element={<Seller />} />
         <Route index element={<HomePage /> } />
         <Route path="profile/:id" element={<Profile />} />
         <Route path="products/:id" element={<ViewProducts />} />
      </Route>
      <Route path="add-products" element={<AddProducts />}/>
      <Route path="/view-products/:id" element={<Products />} />
      
    </Routes>
    </productContext.Provider>
    </editStateContext.Provider>
    </sellerAuthContext.Provider>
    </userAuthContext.Provider>
  )
}

export default App
