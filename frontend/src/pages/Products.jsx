import { Link, useNavigate, useParams } from "react-router-dom"
import logo from '../img/ekart-logo.png'
import { productContext } from "../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "../components/image.component";
import IndianFormattedNumber from "../common/Convert";
import toast, { Toaster } from "react-hot-toast";

const Products = () => {
    let { id } = useParams();
    let navigate = useNavigate()
    const { sellerProduct,sellerProduct  : { product_name, product_id, product_img, product_price, product_description , product_category, brand_name, payment_options, product_key_features}, setSellerProducts } = useContext(productContext);
    const [currnum, setCurrNum] = useState(0); 
    const [currImage, setCurrImage] = useState(product_img[0]); 
    
    const getData = () => {
        axios.post(import.meta.env.VITE_SERVER_ROUTE + '/get-product' , { product_id : id})
        .then(({data}) => {
            setSellerProducts(data)
            console.log(sellerProduct);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    useEffect(() =>{
        getData()
        
    },[id])

    const handleImgClick = (currkey) => {
        setCurrImage(product_img[currkey]); // Update the current image
        setCurrNum(currkey); // Update the index of the current image
    };

    const handleImgChange = (e) => {
        let file = e.target.files[0];
        // console.log(img);
    
        const data = new FormData();
        data.append('file', file);
    
        // let result = await axios.post(`${import.meta.env.VITE_SERVER}/uploadFileAPI`, data)
        // let image = result.data.file.filename
            
        if (file) {
    
            let loadingToast = toast.loading("Uploading...");
            const reader = new FileReader();
    
            reader.onloadend = () => {
                const imageData = reader.result;
                setCurrImage(imageData);
                toast.dismiss(loadingToast);
                toast.success("Uploaded successfully");
    
                setSellerProducts({ ...sellerProduct, product_img: [...product_img, imageData] });
            };
    
            reader.readAsDataURL(file);
        }
    };


    const handleBuy = () => {
        toast.success("The product has been purchased")

        setTimeout(() => {
            navigate("/")
        }, 3000);
        
    }

    return (
        <>
        <div className="w-full  h-[60px] bg-navbar shadow-lg fixed top-0">
        <Link to="/"><img className="h-[60px] pl-[80px]" src={logo} alt="" /></Link>
       </div>


       <div className="w-full overflow-x-hidden overflow-y-scroll h-[90vh] absolute top-[15%]">
        <Toaster />
            <div className="relative w-[40%] h-[40%]  aspect-video ">
                
                    <img src={currImage} className="z-20 ml-[80px] aspect-video object-cover w-[40%] h-full " alt="" />
                
            </div>

            <div className="flex  gap-3 absolute top-[45%] left-[5%]">
    {product_img.length ? 
    <>
        {product_img.map((img, i) => (
            <Image img={img} key={i} currkey={i} handleImgChange={handleImgChange} handleImgClick={handleImgClick} currimg={currnum} />
        ))} 
        
    </> : ""
}
</div>


      <div className="">
        <button onClick={handleBuy} className="bg-cart border border-cart text-bg p-3 w-[30%] mt-[200px] ml-10 capitalize hover:bg-cart/60">buy now</button>
      </div>
       <div className="absolute top-[10%] left-[43%]">
           <h1 className="text-dark-grey text-3xl">{product_name}</h1>

           <h1 className="text-2xl my-3">₹{<IndianFormattedNumber number={product_price}/>}</h1>

           <h1 className="text-dark-grey text-xl capitalize mt-6">highlights</h1>
           <div className="mt-6 ml-3">
            <ul>
                {
                    product_key_features.map((feat, i) => (
                        <li className="list-disc text-dark-grey p-1 text-sm">{feat}</li>
                    ))
                }
            </ul>
           </div>
           <div className="absolute w-[100%] top-[40%] left-[160%]">
           <h1 className="text-xl capitalize text-dark-grey">Easy payments options</h1>
           <ul>
                {
                    payment_options.map((feat, i) => (
                        <li className="list-disc text-dark-grey p-1 text-sm">{feat}</li>
                    ))
                }
            </ul>
           </div>
       </div>

       <div className="relative left-[40%]">
                <h1 className="text-3xl text-dark-grey my-6">Description</h1>
                <ul>
                {
                    product_description.map((feat, i) => (
                        <li className="list-disc text-dark-grey p-1 text-sm w-[40%]">{feat}</li>
                    ))
                }
            </ul>
            </div>




            
       </div>
    </>
    )
}

export default Products