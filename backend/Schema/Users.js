import mongoose, { Schema }  from "mongoose";


const userschema = mongoose.Schema({
    fullname : {
        type : String,
        required : true,
        minlength: [3, 'fullname must be 3 letters long'],
        lowercase: true,
    },
    email : {
        type : String,
        required : true,
        lowercase:true,
    },
    username : {
        type : String,
        required : true,
        lowercase:true,
    },
    password : {
        type : String,
        required : true,
    },
    number : {
        type : String,
        default : ''
    },
    
    pincode : {
        type : String,
        default : ''
    },
    address : {
        type: String,
        default : ''
    },
    isSeller : {
        type : Boolean,
        default : false
    },
    carts : {
        type: [],
    },
    orders : {
        type: [],
    },
    liked : {
        type : [],
    },
    saved_payment_methods : {
        type : [],
    }
})

export default mongoose.model('users', userschema);