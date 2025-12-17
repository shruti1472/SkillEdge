import React from 'react'
import { FaStar } from "react-icons/fa"
import { FaRegStar } from "react-icons/fa6"
import image from '../assets/person.png';

function ReviewCard({ comment, rating, photoUrl, name, description, courseTitle }) {
  return (
    <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full'>

      {/* Rating Stars */}
      <div className="flex items-center mb-3 text-yellow-400 text-sm">
        {Array(5).fill(0).map((_, i) => (
          <span key={i}>
            {i < Number(rating) ? <FaStar /> : <FaRegStar />}
          </span>
        ))}
      </div>

      <p className='text-gray-500 text-xs mb-1'>
        Review for: <span className='font-medium'>{courseTitle}</span>
      </p>

      <p className='text-gray-700 text-sm mb-5'>
        {comment}
      </p>

      <div className='flex items-center gap-3'>
           <img
                src={photoUrl ? photoUrl : image}
                alt={name || "User"}
                className='w-10 h-10 rounded-full object-cover'
           />



        <div>
          <h2 className='font-semibold text-gray-800 text-sm'>
            {name}
          </h2>
          <p className='text-xs text-gray-500'>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
