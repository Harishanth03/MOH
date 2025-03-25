import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {type:String , required:true},

    email: {type:String , required:true},

    dob: {type:String , required:true},

    image: {type:String }, //patient can add / update later

    address: {type:Object , default:{}},

    phone_number: {type:Number , required:true}

} , {minimize:false});

const patientModel = mongoose.models.patient || mongoose.model('doctor' , userSchema);

export default patientModel;