import React from 'react';
import logo from '../assets/logo1.png';
import { IoPersonCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";





function Nav() {
    const {userData} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show,setShow] = React.useState(false);
    const [showHam,setShowHam] = React.useState(false);
    const [previewImg, setPreviewImg] = React.useState(null);

    

    const handleLogout = async () => {
    try {
        const response = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
        dispatch(setUserData(null));
        toast.success(response.data.message || "Logged out successfully");
        navigate("/Login"); // optional: redirect to login after logout
    } catch (error) {
        console.log("Logout Error: ", error);
        toast.error(error.response?.data?.message || "Logout failed");
    }
};

 const goToLogin = () => {
        navigate("/login");
    };

 // ===== Modal component with close-on-backdrop or ESC =====
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setPreviewImg(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ImagePreviewModal = () => {
    if (!previewImg) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[9999]"
        onClick={() => setPreviewImg(null)}
      >
        <div
          className="bg-white p-2 rounded-lg max-w-[90%] max-h-[90%]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={previewImg}
            alt="preview"
            className="max-h-[85vh] max-w-[85vw] object-contain"
          />
        </div>
      </div>
    );
  };


    return (

        <div>
            <div className='w-[100%] h-[70px] fixed top-0 px-[20px]
            py-[10px] flex items-center justify-between bg-[#00000047] z-10'>

                <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
                    <img src={logo} alt="" className='w-[60px] rounded-[5px] border-2 border-white ' />
                </div>
                <div className='w-[30%] lg:flex items-center justify-center gap-4 hidden'>
                    {userData ? (
                     userData.photoUrl ? (
                    // CASE 1 → userData exists + photoUrl exists
                     <img 
                    src={userData.photoUrl}
                    className="w-[50px] h-[50px] rounded-full object-cover border-2 border-white cursor-pointer"
                    onClick={() => setShow(prev => !prev)}
                    />
                    ) : (
                    // CASE 2 → userData exists but photoUrl missing → show initial
                   <div 
                    className="flex items-center justify-center w-[50px] h-[50px] rounded-full text-white text-[20px] border-2 bg-black border-white cursor-pointer"
                    onClick={() => setShow(prev => !prev)}
                     >
                    {userData.name?.charAt(0).toUpperCase()}
                    </div>
                    )
                    ) : (
                    // CASE 3 → No userData → show icon
                    <IoPersonCircle 
                    className="w-[50px] h-[50px] fill-black cursor-pointer"
                    onClick={() => setShow(prev => !prev)}
                     />
                    )}

                    {userData?.role == "educator" && <div className='px-[20px] py-[10px] border-2 border-white text-white bg-[black] rounded-[10px] text-[16px] font-light cursor-pointer ' onClick={()=>navigate("/dashboard")} >Dashboard</div>}

                    {userData ? 
                    <span className='px-[20px] py-[10px] border-2 border-white text-black bg-[white] rounded-[10px] text-[16px] font-light cursor-pointer' onClick={handleLogout}>Logout</span> :
                    <span className='px-[20px] py-[10px] text-black bg-white rounded-[10px] shadow-sm shadow-black text-[16px] cursor-pointer' onClick={goToLogin}>Login</span>}


                {show && <div className='absolute top-[110%]  right-[15%] bg-[white] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md px-[15px] py-[10px] border-[2px] border-black  hover:border-white hover:text-white hover:bg-black cursor-pointer'>
                   <span className='bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 ' onClick={()=> navigate("/Profile")}>My Profile</span>
                    <span className='bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 ' onClick={()=>navigate("/mycourses")}>My Courses</span>
                   
                   <span className='bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600' onClick={() => {
                        if (userData?.photoUrl) { setPreviewImg(userData.photoUrl); } 
                        else {
                            const firstLetter = userData?.name?.charAt(0)?.toUpperCase() || "U";
                            const svg = `<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100%" height="100%" fill="black"/>
                            <text x="50%" y="50%" font-size="200" fill="white" text-anchor="middle" dominant-baseline="central">
                            ${firstLetter}
                            </text>
                            </svg>`;
                            const svgUrl = "data:image/svg+xml;base64," + btoa(svg);
                            setPreviewImg(svgUrl);
                            }}}>Show Profile Pic</span>

                   
                </div>}
                </div>
                 <GiHamburgerMenu  className='w-[30px] h-[30px] lg:hidden fill-white cursor-pointer' onClick={() =>setShowHam(prev=>!prev)}/>

                 <div className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 lg:hidden z-10  ${showHam ? "translate-x-0 transition-transform duration-600":"translate-x-[-100%] transition-transform duration-600"} `}>
                <ImCross className='w-[35px] h-[35px] fill-white absolute top-5 right-[4%] '  onClick={() =>setShowHam(prev=>!prev)}  />

                {userData ? (userData.photoUrl ? (
                <img src={userData.photoUrl} className="w-[50px] h-[50px] rounded-full object-cover border-2 border-white cursor-pointer"
                onClick={() => setPreviewImg(userData.photoUrl)}/>
                ) : (
                <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full text-white text-[20px] border-2 border-white bg-black cursor-pointer" onClick={() => {
                const letter = userData?.name?.[0]?.toUpperCase() || "U";
                const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'>
                <rect width='100%' height='100%' fill='black'/>
                <text x='50%' y='50%' font-size='200' fill='white' text-anchor='middle' dominant-baseline='central'>${letter}</text>
                </svg>`;
                setPreviewImg("data:image/svg+xml;base64," + btoa(svg));}}>
                {userData.name?.charAt(0).toUpperCase()}
                </div>
                )
                ) : (
                 <IoPersonCircle className="w-[50px] h-[50px] text-white" />
                )}


                <div className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-[black] rounded-[10px] text-[16px] font-light cursor-pointer ' onClick={()=>navigate("/Profile")}>My Profile</div>

                <div className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-[black] rounded-[10px] text-[16px] font-light cursor-pointer ' onClick={()=>navigate('/mycourses')}>My Courses</div>

                {userData?.role == "educator" && <div className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-[black] rounded-[10px] text-[16px] font-light cursor-pointer ' onClick={()=>navigate("/dashboard")}>Dashboard</div>}


                {userData ? 
                <span className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-[black] rounded-[10px] text-[16px] font-light cursor-pointer ' onClick={handleLogout}>Logout</span> :
                <span className='w-[200px] h-[65px] flex items-center justify-center border-2 border-white text-white bg-[black] rounded-[10px] text-[16px] font-light cursor-pointer ' onClick={goToLogin}>Login</span>}

                    


                

                 </div>
            </div>
            {ImagePreviewModal()}   {/* ← ADD THIS HERE */}
           
        </div>

        
    );
}

export default Nav;