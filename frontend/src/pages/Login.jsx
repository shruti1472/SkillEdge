import React, { useState } from 'react';
import logo1 from '../assets/logo1.png';
import google from '../assets/google.jpg';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useSelector } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';


function
 Login() {
      const [showPassword, setShowPassword] = useState(false);
      const[email,setEmail] = useState("");
      const[password,setPassword] = useState("");
      const[loading,setLoading] = useState(false);
      const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const handleLogin = async() => {
        setLoading(true);
        try{
            const result = await axios.post(serverUrl + "/api/auth/login" , {password, email} ,{withCredentials:true}) 
            dispatch(setUserData(result.data));
            setLoading(false);
          toast.success("Login Successful");
          navigate("/");
        }catch(error){
            console.log("Login failed", error);
            setLoading(false);
            toast.error(error.response?.data?.message || error.message || "Login failed");
        }
    }

    const googleLogin= async () => {
            try{
                  const response = await signInWithPopup(auth, provider)
                  let user = response.user;
                  let Gname = user.displayName;
                  let Gemail = user.email;
                  let role = ""
    
                  const result = await axios.post(serverUrl + "/api/auth/googleauth" , {name:Gname, email:Gemail ,role},{withCredentials: true} )
                  dispatch(setUserData(result.data));
                  navigate("/");
                  toast.success("Login Successful");
                }catch(error){
                  console.log(error)
                  toast.error(error.response.data.message)
            }
      }

      return (
        <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center flex-col gap-3">
          <form className="w-[90%] md:w-[800px] h-[600px] bg-white shadow-xl rounded-2xl flex overflow-hidden" onSubmit={(e) => e.preventDefault()}>
            
            {/* Left Div */}
            <div className="md:w-[50%] w-[100%] h-full flex flex-col items-center justify-center gap-4 px-4">
              <div className="text-center">
                <h1 className="font-semibold text-black text-2xl">Welcome Back</h1>
                <h2 className="text-[#999797] text-[18px]">Login to your account</h2>
              </div>
    
              
    
              {/* Email */}
              <div className="flex flex-col gap-1 w-[80%]">
                <label htmlFor="email" className="font-semibold">Email</label>
                <input
                  id="email"
                  type="email"
                  className="border w-full h-[35px] border-[#e7e6e6] text-[15px] px-[10px] rounded"
                  placeholder="Your email" onChange={(e) => setEmail(e.target.value)} value={email}
                />
              </div>
    
              {/* Password */}
              <div className="flex flex-col gap-1 w-[80%] relative">
                <label htmlFor="password" className="font-semibold">Password</label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="border w-full h-[35px] border-[#e7e6e6] text-[15px] px-[10px] rounded"
                  placeholder="Your password" onChange={(e) => setPassword(e.target.value)} value={password}
                />
                <span
                  className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEye /> : <IoEyeOutline />}
                </span>
              </div>
    
              
    
              {/* Login Button */}
              <button className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px] mt-3" disabled={loading} onClick={handleLogin}>
                {loading ? <ClipLoader size={30} color='white'/> : "Login"}
              </button>
              <span className='text-[13px] cursor-pointer text-[#585757]' onClick={()=>navigate("/forget")}>Forget Password?</span>
    
              {/* Divider */}
              <div className="w-[80%] flex items-center gap-2 mt-2">
                <div className="flex-1 h-[0.5px] bg-[#c4c4c4]" />
                <div className="text-[15px] text-[#6f6f6f]">Or Continue</div>
                <div className="flex-1 h-[0.5px] bg-[#c4c4c4]" />
              </div>
    
              {/* Google Signup */}
              <div className="w-[80%] h-[40px] border border-black rounded-[5px] flex items-center justify-center gap-2 mt-2 cursor-pointer hover:bg-gray-100" onClick={googleLogin}>
                <img src={google} alt="Google" className="w-[25px]" />
                <span className="text-[15px]">Sign up with Google</span>
              </div>
               <div className="text-[#6f6f6f]">Create new account
            <span className='underline underline-offset-1 text-[black]' onClick={() => navigate("/SignUp")}>Signup</span>
          </div>
            </div>
    
            {/* Right Div */}
            <div className="hidden md:flex w-[50%] h-full bg-black rounded-r-2xl items-center justify-center flex-col text-white gap-3">
              <img src={logo1} alt="logo" className="w-[150px] shadow-2xl rounded-full" />
              <span className="text-2l font-semibold">Skill Edge</span>
              <span className="text-2l font-semibold">MASTER YOUR POTENTIAL</span>
            </div>
          </form>
        </div>
    );  
}

export default Login;