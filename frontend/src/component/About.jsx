import React from 'react'
import about from "../assets/about1.png"
import video from "../assets/video.mp4"
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { IoMdCheckboxOutline } from "react-icons/io";


function About() {
  return (
    <div className='w-[100vw] lg:h-[70vh] min-h-[50vh] flex flex-wrap items-center justify-center gap-2 mb-[30px]'>
        
        {/* for image area */}
        <div className='lg:w-[40%] md:w-[80%] w-[100%] h-[100%] flex items-center justify-center relative'>
            <img src={about} className='w-[80%] h-[90%] rounded-lg'/>
            <div className='max-w-[350px] mx-auto p-4 absolute top-[55%] left-[50%]'>
            <video src={video} className='w-full rounded-xl shadow-lg border-2 border-white' controls autoPlay loop/>
            </div>
        </div>

        {/* for about area */}
        <div className='lg:w-[50%] md:w-[70%] w-[100%] h-[100%] flex items-start justify-center flex-col px-[35px] md:px-[80px]'>
            <div className='flex text-[20px] items-center justify-center gap-[20px]'>About Us
            <TfiLayoutLineSolid className='w-[40px] h-[40px]' />
        </div>

        <div className='md:text-[40px] text-[35px] font-semibold'>
            We Are Maximize Your Learning Growth
        </div>

        <div className='text-[15px]'>
         We provide a modern Learning Management System to simplify online education, track progress, and enhance student-instructor collaboration efficiently.
        </div>

        <div className='w-[100%] lg:w-[60%]'>
            <div className='flex items-center justify-between mt-[40px]'>
               <div className='flex items-center justify-center gap-[10px]'><IoMdCheckboxOutline className='w-[20px] h-[20px]' />
               Simplified Leaning</div>
               <div className='flex items-center justify-center gap-[10px]'><IoMdCheckboxOutline className='w-[20px] h-[20px]' />
               Expert Educator</div>
            </div>
             <div className='flex items-center justify-between mt-[40px]'>
                <div className='flex items-center justify-center gap-[10px]'><IoMdCheckboxOutline className='w-[20px] h-[20px]' />
                LifeTime Access</div>
                <div className='flex items-center justify-center gap-[10px]'><IoMdCheckboxOutline className='w-[20px] h-[20px]' />
                Quality Content</div>
            </div>   
        </div>
    </div>
    </div>
  )
}

export default About