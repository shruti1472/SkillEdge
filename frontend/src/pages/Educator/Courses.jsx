import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import img1 from "../../assets/empty.jpg"
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";




function Courses() {
    const navigate = useNavigate()
    const {creatorCourseData} = useSelector(state=>state.course)
  return (

    <div className="flex min-h-screen bg-gray-100">
        <div className='w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100'>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 ">
            
            <div className='flex items-center justify-center gap-3'><FaArrowLeftLong className=' w-[22px] h-[22px] cursor-pointer' onClick={() => navigate("/dashboard")} />
                <h1 className="text-2xl font-semibold">All Courses</h1>
            </div>
            <button className="bg-[black] text-white px-4 py-2 rounded hover:bg-gray-500" onClick={() => navigate("/createcourse")}>
            Create Course
          </button>
        </div>


        {/* fro large screen */}
        <div className="hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className='min-w-full text-sm'>
          <thead className='border-b bg-gray-50'>
            <tr>
              <th className='text-left py-3 px-4'>Courses</th>
              <th className='text-left py-3 px-4'>Price</th>
              <th className='text-left py-3 px-4'>Status</th>
              <th className='text-left py-3 px-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* mapping the course data */}
          {creatorCourseData?.map((course,index) => (

          // creaing number of index equal to number of course
          <tr key={index} className='border-b hover:bg-gray-50 transition duration-200'>

            {/* 1st table data */}
            <td className='py-3 px-4 flex items-center gap-4'> 

              {/* image /thumbnail setting of course */}
              {course.thumbnail ? <img src={course?.thumbnail} className='w-25 h-14 object-cover rounded-md object-fit' alt="" />:
              <img src={img1} className='w-25 h-14 object-cover rounded-md object-fit' alt="" />}

              {/* title name setting of course */}
              <span>{course?.title}</span>
            </td>

            {/* price setting  2nd table data*/}
           {course?.price ? <td className='px-4 px-3'>₹ {course?.price}</td>:
            <td className='px-4 px-3'>₹ NA</td>}

            {/* 3rd table data  */}
            <td className='px-4 px-3'>
              <span className={`px-3 py-1 rounded-full text-xs ${course.isPublished ?  "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{course.isPublished? "Published" : "Draft"}</span></td>
            <td className='px-4 px-3'>

              <FaEdit className='text-gray-600 hover:text-blue-600 cursor-pointer'  onClick={()=> navigate(`/editcourse/${course?._id}`)}/>
            </td>
          </tr>
          ))}
          </tbody>
        </table>
        <p className='text-center text-sm text-gray-400 mt-6'>List of your recent courses</p>
        </div>

        {/* for smaller screen */}
        <div className='md:hidden space-y-4'>4

          {/* mapping the course data */}
          {creatorCourseData?.map((course,index) => (
          <div key={index} className='bg-white rounded-lg shadow p-4 flex flex-col gap-3'>
                  
              <div className='flex gap-4 items-center'>
                {/* setting thumbnail */}
                 { course?.thumbnail? <img src={course?.thumbnail} className='w-16 h-16 rounded-md object-cover' alt=''/>:
                         <img src={img1} className='w-16 h-16 rounded-md object-cover' alt=''/>}
                  <div className='flex-1'>

                    {/* setting title */}
                    <h2 className='fnot-medium text-sm'>{course?.title}</h2>

                    {/* price */}
                    {course?.price ? <p className='text-gray-600 text-xs mt-1'>₹ {course?.price}</p>:<p className='text-gray-600 text-xs mt-1'>₹ NA</p>}
                  </div>
                  
                  <FaEdit className='text-gray-600 hover:text-blue-600 cursor-pointer' onClick={()=> navigate(`/editcourse/${course?._id}`)} />
              </div>  
                  <span className={`w-fit px-3 py-1 text-xs rounded-full ${course?.isPublished ? "bg-green-100 text-green-600":"bg-red-100 text-red-600"}`}>{course.isPublished? "Published" : "Draft"}</span>
            </div>))}
              
            <p className='text-center text-sm text-gray-400 mt-4'>List of your recent courses</p>
        </div>
        </div>
    </div>
  )
}

export default Courses