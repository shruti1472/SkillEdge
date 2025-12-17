import React from 'react'
import { useSelector } from 'react-redux'
import ReviewCard from './ReviewCard'

function ReviewPage() {
  const { reviewData } = useSelector(state => state.review)
  const latestReview = reviewData?.slice(0, 6)

  return (
    <div className='flex items-center justify-center flex-col'>
      <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]'>
        Real Reviews for Real Courses
      </h1>

      <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]'>
        See how Skill Edge is helping students and professionals turn skills into confidence
        through structured learning and real practice.
      </span>

      <div className='w-full min-h-[100vh] flex items-center justify-center flex-wrap gap-[50px]
      lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]'>

        {latestReview && latestReview.map((review, index) => (
            <ReviewCard
              key={review._id}
              comment={review.comment}
              rating={Number(review.rating)}
              photoUrl={review.user?.photoUrl}
              courseTitle={review.course?.title}
              description={review.user?.description}
              name={review.user?.name}
            />
        ))}
       
      </div>
    </div>
  )
}

export default ReviewPage
