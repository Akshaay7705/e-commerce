import express from 'express';
import { signin, signup } from '../Controllers/auth-controllers.js';
import { addProduct, addSeller, editProduct, getAllProducts, getProduct, getSellerProducts, getUser, updateUser, verifyJWT } from '../Controllers/products-controllers.js';


export const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/add-seller").post(addSeller);
router.route("/add-products").post(verifyJWT,addProduct);
router.route("/get-user").post(getUser)
router.route("/update-user").post(updateUser)
router.route("/get-seller-products").post(getSellerProducts)
router.route("/edit-products").post(editProduct)
router.route('/get-all-products').get(getAllProducts)
router.route('/get-product').post(getProduct)