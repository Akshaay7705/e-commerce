import mongoose, { Schema }  from "mongoose";


const productschema = mongoose.Schema({
    product_id : {
        type : String,
        required : true,
    },
    product_name : {
        type : String,
        required : true,
    },
    product_price : {
        type : String,
        required : true,
    },
    product_description : {
        type : [],
        required : true,
    },
    product_img : {
        type : [],
        required : true,
    },
    product_category : {
        type : [],
        required : true,
    },
    brand_name : {
        type : String,
        required : true,
    },
    payment_options : {
        type : [],
        required : true,
    },
    product_key_features : {
        type : [],
        required : true,
    },
    seller_id : {
        type: Schema.Types.ObjectId,
        required:true,
        ref:'sellers'
    }
})

export default mongoose.model('products', productschema);