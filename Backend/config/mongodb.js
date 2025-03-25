import mongoose from "mongoose";

const connectDatabase = async() => {

    mongoose.connection.on('connected', () => console.log("Database Connected"));

    await mongoose.connect(`${process.env.MONGODB_URI}/MOH`);

}

export default connectDatabase;