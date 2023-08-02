"use client"
import React from 'react'
import Image from 'next/image'
import { CustomButtonProps } from '@/types'

const CustomButton = (props: CustomButtonProps) => {
  const { title, containerStyles, handleClick,btnType } = props
  return (
    <button
      disabled={false}
      type={btnType || "button"}
      className={`custom-btn ${containerStyles}`}
      onClick={() => { handleClick }}
    >
      <span className={`flexx-1`}>
        {title}
      </span>
    </button>
  )
}

export default CustomButton