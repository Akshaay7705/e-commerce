
import { useContext } from "react";
import { sellerAuthContext, userAuthContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { removeSession } from "../common/Session";

const UserNavigation = () => {
    const { userDetails: { username }, setUserDetails } = useContext(userAuthContext);
    const { sellerDetails: { seller_access_token, seller_id }, setSellerDetails } = useContext(sellerAuthContext);
    const navigate = useNavigate();

    const handleUserSignout = () => {
        setUserDetails({});
        removeSession('user');

        setSellerDetails({});
        removeSession('seller');
    };

    const handleProfileNav = () => {
        navigate(`/profile/${username}`);
    };

    const handleOrdersNav = () => {
        if (seller_access_token) {
            return navigate(`/products/${seller_id}`);
        }
        navigate(`/orders/${username}`);
    };

    const handleLikedNav = () => {
        navigate(`/liked/${username}`);
    };

    const handleAddNav = () =>{
        navigate(`/add-products`);
    }

    return (
        <div className="w-[30%] z-40 shadow-lg bg-bg absolute top-[85%]">
           
                <div onClick={handleProfileNav} className="flex gap-2 mt-3 pl-4 pb-3 border-b border-grey hover:cursor-pointer hover:opacity-65">
                    <i className="fi fi-rr-circle-user text-text text-2xl"></i>
                    <h1 className="capitalize text-text text-xl">my profile</h1>
                </div>
           

            <div onClick={handleOrdersNav} className="flex gap-2 mt-3 pl-4 pb-3 border-b border-grey hover:cursor-pointer hover:opacity-65">
                <i className="fi fi-rr-apps-sort text-text text-2xl"></i>
                <h1 className="capitalize text-text text-xl">{seller_access_token ? 'view products' : 'orders'}</h1>
            </div>

           {
            seller_access_token ? "" : <div onClick={handleLikedNav} className="flex gap-2 mt-3 pl-4 pb-3 border-b border-grey hover:cursor-pointer hover:opacity-65">
            <i className="fi fi-sr-heart text-text text-2xl"></i>
            <h1 className="capitalize text-text text-xl">liked</h1>
        </div>
           }
            

            {seller_access_token ? 
                <div onClick={handleAddNav} className="flex gap-2 mt-3 pl-4 pb-3 border-b border-grey hover:cursor-pointer hover:opacity-65">
                    <i className="fi fi-br-shopping-cart-add text-text text-2xl"></i>
                    <h1 className="capitalize text-text text-xl">add products</h1>
                </div> 
                : ""
            }

            <div onClick={handleUserSignout} className="flex gap-2 mt-3 pl-4 pb-3 border-b border-grey hover:cursor-pointer hover:opacity-65">
                <i className="fi fi-rr-power text-text text-2xl"></i>
                <h1 className="capitalize text-text text-xl">logout</h1>
            </div>
        </div>
    );
};

export default UserNavigation;
