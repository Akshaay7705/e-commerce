import Users from '../Schema/Users.js';
import Sellers from '../Schema/Sellers.js';
import Products from '../Schema/Products.js';
import { nanoid } from 'nanoid';
import  Jwt  from "jsonwebtoken";


const sendSellerData = (seller) => {
    const access_token = Jwt.sign({ id: seller._id }, process.env.SELLER_SECRET_KEY)
    return {
        seller_access_token : access_token,
        seller_id: seller.seller_id,
        name: seller.seller_name,
        email: seller.seller_email,
    }
}


export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({"error" : "No access token is provided."});
    }

    const secretKey = process.env.SELLER_SECRET_KEY;
    if (!secretKey) {
        return res.status(403).json({"error" : "Internal server error: secret key could not be configured"});
    }

    Jwt.verify(token, secretKey, (err, seller) => {
        if (err) {
            return res.status(403).json({"error" : "Access token is invalid"});
        }

        req.user = seller.id
    })
    next()
}



export const addSeller =  (req, res) => {
    let { user_email, seller_email } = req.body;
    if (user_email != seller_email) {
        return res.status(403).json({"error" : "You can become a seller with your own email id only"})
    }
    Users.findOne({email : seller_email})
    .select("fullname username number -_id")
    .then(async(user) => {
        if (!user) {
            return res.status(400).json({"error" : "User does not exists"})
        }
        let seller = await Sellers.findOne({'seller_email' : seller_email})
        if (seller) {
            return res.status(200).json(sendSellerData(seller))
        }
        if (!user.number) {
            return res.status(400).json({"error" : "Please add your mobile number before becoming a seller"})
        }
        let sellerId = user.username + nanoid(9)
        let newSeller = new Sellers({
            seller_id : sellerId,
            seller_name : user.fullname,
            seller_email : seller_email,
            seller_number : user.number
        })

        let sellers = await newSeller.save();
        await Users.updateOne(
            { email: seller_email },
            { $set: { isSeller: true } } 
        );
        return res.status(200).json(sendSellerData(sellers))
    })
    .catch((error) => {

        console.log(error);
        return res.status(400).json({"error" : error})
    })
}



export const addProduct = (req, res) => {
    let sellers_id = req.user
    let { product_name, product_price, product_description, product_img, product_category, brand_name, payment_options, product_key_features } = req.body
    let products_id = product_name + '-' + nanoid(8);
    let newProduct = new Products({
        product_id: products_id,
        product_name, 
        product_price, 
        product_description, 
        product_img, 
        product_category,
        seller_id : sellers_id,
        brand_name, 
        payment_options, 
        product_key_features
        
    })


    newProduct.save()
    .then((product) => {
        Sellers.findOneAndUpdate({_id : sellers_id}, {$push : {"seller_products" : product._id}})
        .then(seller => {
               return res.status(200).json({  "msg" : "Product has been added" });
           })
           .catch(err => {
            console.log(err);
               return res.status(500).json({ "error": "Failed to add new product" });
           });
   }).catch(err => {
      console.log(err);
       return res.status(500).json({ "error": err.message });
    })
}


export const getUser = (req, res) => {

    const {username} = req.body
    Users.findOne({username})
    .select("fullname email number pincode address -_id")
    .then((data) => {
        return res.status(200).json({"data" : data})
    })
    .catch((error) => {
        return res.status(400).json({"error" : error})
    })
}

export const updateUser = (req, res) =>{
    const { username, fullname , email, number, pincode, address } = req.body
    Users.updateOne({ username }, {fullname , email, number, pincode, address})
    .then((data) => {
        return res.status(200).json({"data" : "Updated successfully"})
    })
    .catch((error) => {
        return res.status(400).json({"error" : error})
    })
}


export const getSellerProducts = async (req, res) => {
    try {
        const { seller_id } = req.body;
        const seller = await Sellers.findOne({ seller_id }).select("seller_products -_id");
        if (!seller) {
            return res.status(404).json({ error: "Seller not found" });
        }

        const productIds = seller.seller_products;
        const products = await Products.find({ _id: { $in: productIds } })
            .select("product_id product_name product_price product_description product_img product_category brand_name payment_options product_key_features -_id");

        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const editProduct = (req, res) => {
    const { product_name, product_id, product_img, product_price, product_description , product_category, brand_name, payment_options, product_key_features}= req.body
    Products.updateOne({ product_id }, { product_name, product_img, product_price, product_description , product_category, brand_name, payment_options, product_key_features})
    .then((data) => {
        return res.status(200).json({"data" : "Updated successfully"})
    })
    .catch((error) => {
        return res.status(400).json({"error" : error})
    })
}

export const getAllProducts = (req, res) => {

    Products.find()
    .select("-_id -seller_id")
    .then((data) => {
        return res.status(200).json(data)
    })
    .catch((error) => {
        return res.status(403).json({"error" : "Could not get the data"})
    })
    
}

export const getProduct = (req, res) =>{
    const { product_id } = req.body
    Products.findOne({ product_id })
    .select("-_id -seller_id ")
    .then((data) => {
        return res.status(200).json(data)
    })
    .catch((error) => {
        return res.status(403).json({"error" : "Could not get the data"})
    })
}