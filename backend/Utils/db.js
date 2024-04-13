import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB_LOCATION, {
            autoIndex: true
        })
        console.log("Connected to database successfully");
    } catch (error) {
        console.log(`Could not connect to database due to ${error.message}....`);
    }
}

export default connectDB