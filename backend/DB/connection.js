import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL)
        console.log("Databse connected")
    } catch (error) {
        console.log(error.message);
    }
};

export default connectDB;
