import { useContext, useState } from "react"
import { editStateContext, productContext, sellerAuthContext } from "../App"
import backdrop from '../img/backdrop.png'
import add from '../img/add.jpeg'
import Image from "./image.component"
import toast, { Toaster } from "react-hot-toast"
import Lists from "./lists.components"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Edit = () => {
    const { sellerProduct,sellerProduct  : { product_name, product_id, product_img, product_price, product_description , product_category, brand_name, payment_options, product_key_features}, setSellerProducts } = useContext(productContext);
    const {sellerDetails: {seller_access_token}} = useContext(sellerAuthContext)
    const {editState} = useContext(editStateContext)
    const [currImage, setCurrImage] = useState(product_img[0] || backdrop); // Initialize with the first image or logo
    const [currnum, setCurrNum] = useState(0); // Store the index of the current image
    const [description, setDescription] = useState("");
    const [features, setfeatures] = useState("");
    const [category, setcategory] = useState("");
    const [payment, setpayment] = useState("");
    let navigate = useNavigate()
    const handleNameChange = (e) => {
        setSellerProducts({ ...sellerProduct, product_name: e.target.value });
    };

    const handleImgClick = (currkey) => {
        setCurrImage(product_img[currkey]); // Update the current image
        setCurrNum(currkey); // Update the index of the current image
    };

    const handleBrandChange = (e) => {
        setSellerProducts({ ...sellerProduct, brand_name: e.target.value });
    }

    const handlePriceChange = (e) => {
        setSellerProducts({ ...sellerProduct, product_price: e.target.value });
    }

    const handleAddBtn = (type) => {
        if (type === 'desc') {
            setSellerProducts({ ...sellerProduct, product_description: [...product_description, description] });
            setDescription(""); 
        }
        if (type === 'feat') {
            setSellerProducts({ ...sellerProduct, product_key_features: [...product_key_features, features] });
            setfeatures(""); 
        }

        if (type === 'cat') {
            setSellerProducts({ ...sellerProduct, product_category: [...product_category, category] });
            setcategory(""); 
        }

        if (type === 'opt') {
            setSellerProducts({ ...sellerProduct, payment_options: [...payment_options, payment] });
            setpayment(""); 
        }
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

    const handleSubmit = (e) =>{
       e.preventDefault()

       if (!product_name) {
          return toast.error("Please provide title for your product")
       }
       if (!brand_name) {
        return toast.error("Please provide brand name for your product")
       }

       if (!product_price) {
        return toast.error("Please provide price for your product")
       }

       if (!product_img.length ) {
        return toast.error("Provide atleast 3 images of your product")
       }
       if (!product_description.length || product_description.length < 5) {
        return toast.error("Please provide atleast 5 description of your product")
       }

       if (!product_category.length ) {
        return toast.error("Please categories of your product")
       }
       if (!product_key_features.length || product_key_features.length < 5) {
        return toast.error("Please provide atleast 5 key features of your product")
       }

       if (!payment_options.length ) {
        return toast.error("Please payment options of your product")
       }

       if (editState) {
        let load = toast.loading("Adding...")
        axios.post(import.meta.env.VITE_SERVER_ROUTE + '/edit-products', sellerProduct)
        .then((data) => {
            toast.dismiss(load)
            toast.success("Data updated successfully")

            setTimeout(() => {
              navigate("/")
            }, 3000)
        })
        .catch(({response}) => {
            toast.dismiss(load)
            toast.error(response.error)

        })
       }
       else{

        let load = toast.loading("Adding...")
        axios.post(import.meta.env.VITE_SERVER_ROUTE + '/add-products', sellerProduct,{
            headers : {
             'Authorization' : `Bearer ${seller_access_token}`
            }
        })
        .then((data) => {
            
            toast.dismiss(load)
            toast.success("Data added successfully")

            setTimeout(() => {
              navigate("/")
            }, 3000)
        })
        .catch(({response}) => {
            toast.dismiss(load)
            toast.error(response.error)

        })
       }
       
    }
    return (
        <div className={"fixed overflow-x-hidden overflow-y-scroll top-[10%]  w-[80%] h-[80vh] left-[10%]" }>
            <Toaster />
            <div className="relative w-[80%] object-fill aspect-video bg-white border-4 border-grey hover:opacity-80">
                <label>
                    <img src={currImage} className="z-20" alt="" />
                </label>
            </div>
            <div className="flex flex-col gap-3 absolute top-[5%] left-[83%]">
    {product_img.length ? 
    <>
        {product_img.map((img, i) => (
            <Image img={img} key={i} currkey={i} handleImgChange={handleImgChange} handleImgClick={handleImgClick} currimg={currnum} />
        ))} 
        <label className="border w-[120px] border-grey hover:cursor-pointer hover:opacity-80">
        <img src={add} className="z-20 w-[120px]" alt="" />
        <input 
            type="file" 
            id="uploadBanner" 
            accept=".png, .jpg, .jpeg"
            name="foo"
            onChange={handleImgChange}
            hidden/>
    </label>
    </>
        :
        <label className="border w-[120px] border-grey hover:cursor-pointer hover:opacity-80">
            <img src={add} className="z-20 w-[120px]" alt="" />
            <input 
                type="file" 
                id="uploadBanner" 
                accept=".png, .jpg, .jpeg"
                name="foo"
                onChange={handleImgChange}
                hidden
            />
        </label>
    }
</div>
            <h1 className="text-dark-grey py-3 mt-[35px] text-2xl">Title</h1>
            <input type="text" className="input " name="name" value={product_name} placeholder="Enter product title..." onChange={handleNameChange} />
            
            <h1 className="text-dark-grey py-3 mt-[35px] text-2xl">Brand Name</h1>
            <input type="text" className="input " name="name" value={brand_name} placeholder="Enter brand name..." onChange={handleBrandChange} />
            
            <h1 className="text-dark-grey py-3 mt-[35px] text-2xl">Price</h1>
            <input type="text" className="input " name="name" value={product_price} placeholder="Enter product price..." onChange={handlePriceChange} />
            
            <h1 className="text-dark-grey py-3 mt-[35px] text-2xl">Description</h1>
            <input type="text" className="input" value={description} onChange={(e) => setDescription(e.target.value)} name="name"  placeholder="Add description..."  />
            <button onClick={() => handleAddBtn('desc')} className="bg-button1 border ml-3 border-button1 capitalize w-[150px] mb-2 p-4 text-bg rounded-lg hover:bg-button1/60">Add</button>

            {
                product_description.length ? 
                <div className="w-[80%]">
                   {
                    product_description.map((desc, i) => (
                        <Lists key={i} data={desc}/>
                    ))
                   }
                </div> : ""
            }

<h1 className="text-dark-grey py-3 mt-[35px] text-2xl">Key features</h1>
            <input type="text" className="input" value={features} onChange={(e) => setfeatures(e.target.value)} name="name"  placeholder="Add description..."  />
            <button onClick={() => handleAddBtn('feat')} className="bg-button1 border ml-3 border-button1 capitalize w-[150px] mb-2 p-4 text-bg rounded-lg hover:bg-button1/60">Add</button>

            {
                product_key_features.length ? 
                <div className="w-[80%]">
                   {
                    product_key_features.map((desc, i) => (
                        <Lists key={i} data={desc}/>
                    ))
                   }
                </div> : ""
            }


<h1 className="text-dark-grey py-3 mt-[35px] text-2xl">Payment methods</h1>
            <input type="text" className="input" value={payment} onChange={(e) => setpayment(e.target.value)} name="name"  placeholder="Add payment options..."  />
            <button onClick={() => handleAddBtn('opt')} className="bg-button1 border ml-3 border-button1 capitalize w-[150px] mb-2 p-4 text-bg rounded-lg hover:bg-button1/60">Add</button>

            {
                payment_options.length ? 
                <div className="w-[80%]">
                   {
                    payment_options.map((desc, i) => (
                        <Lists key={i} data={desc}/>
                    ))
                   }
                </div> : ""
            }


            <h1 className="text-dark-grey py-3 mt-[35px] text-2xl">Categories</h1>
            <input type="text" className="input" value={category} onChange={(e) => setcategory(e.target.value)} name="name"  placeholder="Add categories..."  />
            <button onClick={() => handleAddBtn('cat')} className="bg-button1 border ml-3 border-button1 capitalize w-[150px] mb-2 p-4 text-bg rounded-lg hover:bg-button1/60">Add</button>

            {
                product_category.length ? 
                <div className="w-[80%]">
                   {
                    product_category.map((desc, i) => (
                        <Lists key={i} data={desc}/>
                    ))
                   }
                </div> : ""
            } 

        <div className="">
        <button onClick={handleSubmit}  className="bg-button1 border ml-3 border-button1 capitalize w-[450px] mb-2 mt-6 p-4 text-bg rounded-lg hover:bg-button1/60">{ editState ? "Edit" : "Submit"}</button>
        </div>
        </div>
    )
}

export default Edit
