import mongoose, { Schema }  from "mongoose";


const reviewschema = mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    rating : {
        type : String,
        required : true,
    },
    feedback : {
        type : [],
        required : true,
    },
    review_category : {
        type : String,
        required : true,
    },
    like_count : {
        type: Number,
        default: 0
    },
    dislike_count : {
        type: Number,
        default: 0
    },
    product_id : {
        type: Schema.Types.ObjectId,
        required:true,
        ref:'products'
    }
})

export default mongoose.model('reviews', reviewschema);