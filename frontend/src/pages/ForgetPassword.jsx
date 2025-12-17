import React from "react";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";



function ForgetPassword() {
    const [step, setStep] = useState(1); // step 1: enter email, step 2: verify code, step 3: reset password
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [loading, setLoading] = useState(false);


// for step 1: send OTP
     const sendOTP = async () => {
        setLoading(true);
        try{
             const result = await axios.post(serverUrl+ "/api/auth/sendotp",{email});
             console.log(result.data);
             setStep(2);
             toast.success(result.data.message);
                setLoading(false);

        }catch(error){
            console.log(error);
            toast.error(error.response.data.message);
            setLoading(false);
        }
     };

// for step 2: verify OTP
     const verifyOTP = async () => {
        setLoading(true);
        try{
             const result = await axios.post(serverUrl+ "/api/auth/verifyotp",{email,otp}, {withCredentials:true});
             console.log(result.data);
             setLoading(false);
             setStep(3);
             toast.success(result.data.message);
                

        }catch(error){
            console.log(error);
            toast.error(error.response.data.message);
             setLoading(false);
        }
     };


    // for step 3: reset password
     const resetPassword = async () => {
        setLoading(true);
        try{
            if(newPassword !== conPassword){
                return toast.error("Passwords do not match");
            }
             const result = await axios.post(serverUrl+ "/api/auth/resetpassword",{email,password:newPassword}, {withCredentials:true});
             console.log(result.data);
             setLoading(false);
             navigate("/login")
             setStep(3);
             toast.success(result.data.message);
                

        }catch(error){
            console.log(error);
            toast.error(error.response.data.message);
             setLoading(false);
        }
     };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            {/* step 1? */}
            {step==1 && 
            <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forget Password</h2> 
                <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
                    <div >
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Enter Your Email Address</label>
                        <input type="email" id="email" 
                        className="mt-1 w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2
                         focus:ring-[black]"
                            placeholder="you@example.com" required onChange={(e)=>setEmail(e.target.value)} value={email} />
                            
                    </div>
                    <button className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer" disabled={loading} onClick={sendOTP}>{loading?< ClipLoader size={30} color='white'/>:"Send OTP"}</button>
                    </form>

                    <div className="text-sm text-center mt-4 cursor-pointer" onClick={()=>navigate("/login")}>Back to Login</div>


                </div>}

            {/* step 2? */}
             {step==2 &&
             <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Enter OTP</h2> 
                <form className="space-y-4" onSubmit={(e)=>e.preventDefault()} >
                    <div >
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700"> Enter OTP Send to your Email Addresss</label>
                        <input type="text" id="otp" 
                        className="mt-1 w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2
                         focus:ring-[black]"
                            placeholder="XXXXXX" required onChange={(e)=>setOtp(e.target.value)} value={otp} />
                            
                    </div>
                    <button className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer" 
                    disabled={loading} onClick={verifyOTP}>{loading? <ClipLoader size={30} color='white'/>: "Verify OTP"}</button>
                    </form>

                    <div className="text-sm text-center mt-4 cursor-pointer" onClick={()=>navigate("/login")}>Back to Login</div>


                </div>}
            

            {/* step 3? */}
             {step==3 &&
            <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reset Your Password</h2> 
                <p className="text-sm text-gray-500 text-center mb-6">Enter a new password below to regain access to your account</p>
                <form className="space-y-4" onSubmit={(e)=>e.preventDefault()}>
                    <div >
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700"> New Password</label>
                        <input type="text" id="password" 
                        className="mt-1 w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2
                         focus:ring-[black]"
                            placeholder="enter your new password"  required onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} />
                            
                    </div>

                    <div >
                        <label htmlFor="conpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input type="text" id="conpassword" 
                        className="mt-1 w-full px-4 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2
                         focus:ring-[black]"
                            placeholder="confirm new password" required onChange={(e)=>setConPassword(e.target.value)} value={conPassword} />
                            
                    </div>
                    <button className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer"  disabled={loading} onClick={resetPassword}>{loading? <ClipLoader size={30} color='white'/>: "Reset Password"}</button>
                    </form>

                    <div className="text-sm text-center mt-4 cursor-pointer" onClick={()=>navigate("/login")}>Back to Login</div>


                </div>}
            
        </div>
    );
}

export default ForgetPassword;