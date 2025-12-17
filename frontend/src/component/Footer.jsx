import React from 'react'
import logo from '../assets/logo1.png';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";



function Footer() {
  const navigate = useNavigate()
  return (
    <div className='bg-blue-950 text-gray-300 py-10 px-6'>
        <div className='max-w-7xl mx-auto flex lg:items-center items-start
         justify-center gap-[40px] lg:gap-[150px] flex-col lg:flex-row'>
          {/* Logo + Description */}
                <div className='lg-w[40%] md:w-[50%] w-[100%]'>
                  <img src={logo} className='h-10 mb-3 border-1 rounded-[5px]'/>
                  <h2 className='text-xl font-bold text-white mb-3'>Skill Edge</h2>
                  <p className=''>AI-powered learning platform to help you grow smarter, Learn anything anytime, anywhere</p>  
                </div>


           {/* Quick Links */}
              <div className='lg:w-[30%] md:w-[100%]'>
                <h3 className="text-white font-semibold mb-2">Quick Links</h3>
                <ul className=' space-y-1 text-sm'>
                  <li className='hover:text-white cursor-pointer' onClick={()=>navigate("/")} >Home</li>
                  <li className='hover:text-white cursor-pointer' onClick={()=>navigate("/allcourses")}>ALL Courses</li>
                  <li className='hover:text-white cursor-pointer' onClick={()=>navigate("/login")}>Login</li>
                  <li className='hover:text-white cursor-pointer' onClick={()=>navigate("/Profile")}>My Profile</li>
                </ul>
              </div>

           {/* Explore Categories */}
              <div className="lg:w-[30%] md:w-[100%]">
                <h3 className="text-white font-semibold mb-2">Explore Categories</h3>
                <ul className="space-y-1 text-sm">
                  <li className="hover:text-white">Web Development</li>
                  <li className="hover:text-white">AI/ML</li>
                  <li className="hover:text-white">Data Science</li>
                  <li className="hover:text-white">UI/UX Design</li>
                </ul>
              </div>

          
        </div>
       
        <div className='border-t border-gray-700 pt-5 mb-10 mt-3 text-sm text-center text-gray-500'>
           © {new Date().getFullYear()} LearnAI All rights reserved
        </div>
    </div>
  )
}

export default Footer