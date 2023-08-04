"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { ShowMoreProps } from '@/types'
import CustomButton from '../Custom Button/CustomButton'
import { updateSearchParams } from '@/app/utils'

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter()

  const handelNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    const newPathname = updateSearchParams("limit", newLimit.toString());
    router.push(newPathname);
  }
  return (
    <div className='w-full flex-center gap-5 mt-10'>
      {!isNext && (
        <CustomButton title="Show More"
          btnType='button'
          containerStyles='bg-primary-blue rounded-full text-white'
          handleClick={handelNavigation}
        />
      )
      }
    </div>
  )
}

export default ShowMore