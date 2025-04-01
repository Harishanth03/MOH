import validator from 'validator'
import bycrypt from 'bcrypt'
//====================================== Register User ==================================================

const registerUser = async(req , res) => {

    const {name , email , password} = req.body;
    
    if(!name || !email || !password)
    {
        return res.json({success:false , message:"Missing Data!"});

    }

    if(!validator.isEmail(email))
    {
        return res.json({success:false , messsage:"Invalid Email"})
    }

    if(password.length < 8)
    {
        return res.json({success:false , messsage:"Please enter a strong Password"})
    }

    //hash user password
    const salt = await bycrypt.genSalt(10)

    const hashPassword = await bycrypt.hash(password , salt);

    const userData = {
        name,
        email,
        password : hashPassword
    }
}