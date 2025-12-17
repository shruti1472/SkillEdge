import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";





function EditProfile() {
    const navigate = useNavigate();
    const {userData}= useSelector((state) => state.user);
    const [name,setName] = useState(userData.name || "");
    const [description,setDescription] = useState(userData.description || "");
    const[photoUrl,setPhotoUrl] = useState(null)
    const[loading,setLoading] = useState(false);

    const dispatch= useDispatch();

    


const handleEditProfile = async() => {

    const formData = new FormData();
    formData.append("name",name);
    formData.append("description",description);
    formData.append("photoUrl",photoUrl);
    
    setLoading(true);
    try{
        const result= await axios.post(serverUrl + "/api/user/profile" , formData , {withCredentials:true} )
        dispatch(setUserData(result.data))
        setLoading(false);
        navigate("/")
        toast.success("profile updated")

        
    }catch(error){
        setLoading(false);
        console.error(error);
        toast.error(error.response.data.message)

    }
}



    
    
   

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
            <FaArrowLeftLong className="absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer" onClick={()=>navigate("/Profile")}/>
                 
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Profile</h2>
            
                <form action="" className="space-y-5" onSubmit={(e)=>e.preventDefault}>
                    {/* for profile  */}
                    <div className="flex flex-col items-center text center">
                    {userData?.photoUrl ? <img src={userData?.photoUrl} className='w-24 h-24 rounded-full object-cover border-4 border-[black]' alt=""/>:
                    <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white'>
                       {userData?.name?.charAt(0).toUpperCase()}
                    </div>}
                    </div>
                   {/* for avatar upload */}
                    <div>
                        <label htmlFor="image" className="text-sm font-medium text-gray-700">Select Avatar</label>
                        <input id="image" type="file" input='photoUrl' accept="image/*" placeholder="photoUrl" className="w-full px-4 py-2 border rounded-md text-sm"  onChange={(e)=> setPhotoUrl(e.target.files[0])}/>
                    </div>

                    {/* for name */}
                     <div>
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">User Name</label>
                        <input id="name" type="text" placeholder={userData.name} className="w-full px-4 py-2 border rounded-md text-sm"  onChange={(e)=>setName(e.target.value)} value={name}/>
                    </div>

                    {/* for email */}
                     <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input readOnly placeholder={userData.email} className="w-full px-4 py-2 border rounded-md text-sm" />
                    </div>

                     {/* for bio/description */}
                     <div>
                        <label  className="text-sm font-medium text-gray-700">Bio</label>
                        <textarea placeholder="Tell us about yourself" className="w-full mt-1 px-4 py-2 border border-gray-300  rounded-md resize-none focus:ring-2 focus:ring-[black] "  onChange={(e)=>setDescription(e.target.value)} value={description}/>
                    </div>

                     <button className="w-full bg-[black] active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer" disabled={loading} onClick={handleEditProfile}>{loading?<ClipLoader size={30} color='white'/> : "Save Changes"}</button>

                    
                </form>
            </div>

        </div>

    )
}

export default EditProfile;