import mongoose, { Schema }  from "mongoose";


const productschema = mongoose.Schema({
    seller_id : {
        type : String,
        required : true,
    },
    seller_name : {
        type : String,
        required : true,
    },
    seller_email : {
        type : String,
        required : true,
    },
    seller_number : {
        type : String,
        required : true,
    },
    seller_products : {
        type: [],
    }
})

export default mongoose.model('sellers', productschema);