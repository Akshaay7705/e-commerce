import mongoose, { Schema }  from "mongoose";


const orderschema = mongoose.Schema({
    user : {
        type : [],
    },
    products : {
        type : [],
    },
    order_start_date : {
        type : String,
        default : ""
        
    },
    order_end_date : {
        type : String,
        default : ""
        
    },
    order_status : {
        type : String,
        default : ""
    },
    order_price : {
        type : String,
        default : ""
    },
    mode_of_payment : {
        type : String,
        default : ""
    },
    shipping_address : {
        type : String,
        default : ""
    }
})

export default mongoose.model('orders', orderschema);