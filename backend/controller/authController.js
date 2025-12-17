import User from '../model/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import genToken from '../config/token.js';
import sendMail from '../config/sendMail.js';



export const signUp = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;
        let existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:"User already exists"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Invalid email address"});
        }
        if(password.length < 8){
            return res.status(400).json({message:"Password must be at least 8 characters long"});
        }
    let hashPassword = await bcrypt.hash(password,10);
    const user =  await User.create({
        name,
        email,
        password:hashPassword,
        role
    })
    let token = await genToken(user._id);
    res.cookie("token", token, {
        httpOnly:true,
        secure:false,
        sameSite: "Strict",
        maxAge: 7*24*60*60*1000
    })
    return res.status(201).json(user);

}catch(error){
   return res.status(500).json({message:`Signup failed ${error.message}`});
}
}

export const login = async (req, res) => {

    try{
        const {email, password} = req.body;
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"});
        }
        let token = await genToken(user._id);
       res.cookie("token", token, {
        httpOnly: true,
        secure: false,     // localhost can be insecure
        sameSite: "Lax",   // allows cookie on refresh/navigation
        maxAge: 7*24*60*60*1000
      })
        return res.status(200).json(user);
    }catch(error){
           return res.status(500).json({message:`login failed ${error.message}`});  
   }
}

export const logout = async (req, res) => {
  try{
     await res.clearCookie("token", {});
    return res.status(200).json({message:"Logout successful"});
  }
  catch(error){
      return res.status(500).json({message:`logout failed ${error.message}`});
  }
}  


export const sendOTP = async (req, res) => {
    try{
       const{email} = req.body;
       const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        user.resetOtp = otp,
        user.otpExpires = Date.now() + 5*60*1000, // 5 minutes
        user.isotpVerified = false

        await user.save();
        await sendMail(user.email, otp);
        return res.status(200).json({message:"OTP sent to your email address"});
    }catch(error){
        return res.status(500).json({message:`Sending OTP failed ${error.message}`});

    }
}


export const verifyOTP = async (req, res) => {
    try{
            const {email, otp} = req.body;
            const user = await User.findOne({email})
            if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
                return res.status(400).json({message:"Invalid or expired OTP"});
            }
            
            user.isotpVerified = true;
            user.resetOtp = undefined;
            user.otpExpires = undefined // 5 minutes
            
            await user.save();
            return res.status(200).json({message:"OTP verified successfully"});

    }catch(error){
       return res.status(500).json({message:`OTP verification failed ${error.message}`});
    }
}

export const resetPassword = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user || !user.isotpVerified){
            return res.status(400).json({message:"OTP not verified"});
        }
       
        const hashPassword = await bcrypt.hash(password,10);
        user.password = hashPassword;
        user.isotpVerified = false;
        
        await user.save();
        return res.status(200).json({message:"Password reset successfully"});
    }catch(error){
         return res.status(500).json({message:`Password reset failed ${error.message}`});

    }

}

export const googleAuth =  async (req, res)=>{
    try{
        const {name, email , role} = req.body;
        const user = await User.findOne({email});
        if(!user){
             user = await User.create({
                name,
                email,
                role
             })
    }
    let token = await genToken(user._id);
    res.cookie("token", token, {
        httpOnly:true,
        secure:false,
        sameSite: "Strict",
        maxAge: 7*24*60*60*1000
    })
    return res.status(201).json(user);

    }catch(error){
        return res.status(500).json({message:`Google Auth failed ${error.message}`});

    }
}