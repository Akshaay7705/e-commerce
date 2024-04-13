import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import user_img from '../img/user.png';
import { sellerAuthContext } from "../App";
import axios from "axios";
import ShowProducts from "../components/products.component";

const ViewProducts = () => {
    let { id } = useParams();
    const { sellerDetails: { seller_access_token , name } } = useContext(sellerAuthContext);
    const [product, setProduct] = useState(null);

    const fetchProductsData = () => {
        axios.post(import.meta.env.VITE_SERVER_ROUTE + '/get-seller-products', { seller_id: id })
            .then(({ data }) => {
                setProduct(data.products);
                console.log(data.products);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchProductsData();
    }, []);

    return (

        seller_access_token ? 
        <div>
            <div className="fixed top-[20%] left-[20%] flex gap-4 z-0 rounded-lg border border-grey p-4">
                <div className="rounded-full border border-grey p-2">
                    <img src={user_img} className="w-[50px] h-[50px] object-fit" alt="" />
                </div>

                <div className="mt-2">
                    <h1 className="text-text text-2xl">Welcome</h1>
                    <p className="capitalize text-dark-grey text-xl pl-3">{name}</p>
                </div>
            </div>
            <div className="w-[75%] h-[55vh] border border-grey fixed top-[42%] left-[20%] overflow-x-hidden overflow-y-scroll scroll-smooth z-0">
                <h1 className="p-4 text-3xl  font-light text-dark-grey ">View Your Products </h1>
                <hr className="text-grey" />

                <div className="m-10">
                    {
                        product ?  product.map((data, i) => (
                            <ShowProducts type={'seller'} content={data} key={i} />
                        )) : <h1 className="text-2xl text-dark-grey font-light"> Please add products to view them...</h1>
                        
                    }
                </div>
            </div>
        </div> : <Navigate to="/" />
    );
};

export default ViewProducts;
