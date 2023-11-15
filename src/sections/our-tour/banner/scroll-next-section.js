'use client'
import scrollDown from '@/helpers/scrollDown'
import React, { useRef } from 'react'

const ScrollNextSection = ({ lang }) => {
  const scrollRef = useRef()
  let explore = 'Explore now'
  if (lang === 'fr') {
    explore = 'Explorez maintenant'
  }
  if (lang === 'it') {
    explore = 'Esplora ora'
  }

  return (
    <div
      onClick={() => scrollDown(scrollRef, 'start')}
      className='flex flex-col gap-[0.94vw] text-center cursor-pointer items-center justify-center md:mt-[2.19vw] mt-[4.8vw]'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='arrow-down md:w-[1.375vw] md:h-[1.35vw] w-[3.2vw] h-[3.2vw]'
        viewBox='0 0 24 25'
        fill='none'
      >
        <path
          d='M1 1L12 12L23 1'
          stroke='white'
          strokeWidth='2'
        />
        <path
          d='M1 12L12 23L23 12'
          stroke='white'
          strokeWidth='2'
        />
      </svg>
      <span className='md:block hidden text-center font-manrope text-[0.875vw] not-italic font-semibold tracking-[0.04375vw] uppercase text-[#fff] '>
        {explore}
      </span>
      <div ref={scrollRef}></div>
    </div>
  )
}

export default ScrollNextSection