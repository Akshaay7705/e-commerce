import { useContext, useState } from "react";
import IndianFormattedNumber from "../common/Convert";
import { editStateContext, productContext, userAuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ShowProducts = ({ content, type }) => {
    const { product_name, product_id, product_img, product_price, brand_name, payment_options, product_key_features } = content;
    const { setSellerProducts } = useContext(productContext);
    const { userDetails: { username } } = useContext(userAuthContext);
    const { setEditState } = useContext(editStateContext);
    const [like, setLike] = useState(false);
    const navigate = useNavigate();

    const handleEditBtn = (e) => {
        e.preventDefault();
        setSellerProducts(content);
        setEditState(true);
        if (type === 'seller') {
            navigate("/add-products");
        } else {
            navigate(`/view-products/${product_id}`);
        }
    };

    const handleLike = () => {
        setLike(prevLike => !prevLike); // Toggle like state

        axios.post(import.meta.env.VITE_SERVER_ROUTE + '/add-liked', { product_id: product_id, username: username })
            .then((response) => {
               toast.success(response.data.data);
            })
            .catch((error) => {
                console.error('Error adding liked product:', error);
            });
    };

    return (
        <>
            <div className="w-full h-[40vh] bg-bg ">
                <Toaster /> 
                <img src={product_img[0]} className="relative right-6 w-[25%] h-full object-cover" alt="" />
                <div className="relative bottom-[90%] left-[30%]">
                    <h1 className="text-3xl text-text font-light">{product_name}</h1>
                    <h1 className="text-xl text-dark-grey mt-4 ml-10">{brand_name}</h1>
                    <div className="m-5">
                        <ul>
                            {product_key_features.slice(0, 4).map((feat, i) => (
                                <li className="list-disc text-dark-grey p-2" key={i}>{feat}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative bottom-4 flex gap-4">
                        <button onClick={handleEditBtn} className="bg-button1 border border-button1 capitalize w-[150px] mb-2 p-2 text-bg rounded-lg hover:bg-button1/60">
                            {type === 'seller' ? "Edit Product" : 'View Product'}
                        </button>
                        {type === 'home' && (
                            <button onClick={handleLike} className={`text-grey ml-5 mt-2 ${like ? 'liked' : ''}`}>
                                <i className="fi fi-ss-heart text-3xl"></i>
                            </button>
                        )}
                    </div>
                </div>
                <div className="relative bottom-[190%] left-[88%]">
                    <h1>₹<IndianFormattedNumber number={product_price} /></h1>
                    <div className="mt-8">
                        <h1 className="text-dark-grey capitalize">payments options</h1>
                        <ul>
                            {payment_options.map((opt, i) => (
                                <li className="list-disc text-dark-grey p-2" key={i}>{opt}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="text-grey my-10" />
        </>
    );
};

export default ShowProducts;
