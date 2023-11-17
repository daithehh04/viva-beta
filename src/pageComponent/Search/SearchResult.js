'use client'
import React, { useEffect, useRef, useState } from 'react'
import TourItem from '@/components/Common/TourItem'
import TourItemMobile from '@/components/Common/TourItemMobile'
import { Skeleton } from '@mui/material'

const SearchResult = ({ lang, className,refetch,allTours, results,loading,totalPage }) => {
  let foundResultsText = results?.split(' ')
  const eleRef = useRef()
  const [activePage, setActivePage] = useState(0)
  const handleChangePage = (index) => {
    setActivePage(index)
    refetch({
      offset: index * 9,
      size: 9
    })
  }
  useEffect(() => {
    window.scrollTo(0,0)
  },[])
  useEffect(() => {
    window.scrollTo(0,0)
  }, [activePage])
  return (
    <div ref={eleRef}>
      {!loading ? (
        <h2 className={`text-[2vw] font-medium leading-[2.2vw] mb-[1.5vw] max-md:hidden ${className}`}>
          {foundResultsText && foundResultsText[0]} {allTours?.length} {foundResultsText && foundResultsText[1]}
        </h2>
      ) : (
        <Skeleton
          variant='rectangular'
          width={'40%'}
          height={50}
          style={{ marginBottom: '1.75vw' }}
        />
      )}
      <div className='grid md:grid-cols-3 grid-cols-1 md:gap-[1.5vw] gap-[4.27vw] relative'>
        <div className='absolute inset-0 z-[-1] bg-[#F3F6FB] md:hidden'></div>
        {allTours?.map((tour, index) => (
          <div key={index}>
            <div className='max-md:hidden'>
              <TourItem
                data={tour}
                lang={lang}
                loading={loading}
              />
            </div>
            <div className='md:hidden'>
              <TourItemMobile
                data={tour}
                lang={lang}
                loading={loading}
              />
            </div>
          </div>
        ))}
      </div>
      <div className='flex md:gap-[0.75vw] gap-[3.2vw] justify-center items-center relative md:mt-[4.5vw] mt-[8.53vw]'>
        {Array.from({ length: totalPage }, (_, index) => (
          <div
            key={index}
            onClick={() => handleChangePage(index)}
            className={`${totalPage > 1
              ? 'cursor-pointer md:w-[2.125vw] md:h-[2.125vw] w-[9.07vw] h-[9.07vw] rounded-[50%] flex justify-center items-center bg-primaryColor'
              : 'hidden'
              }  ${activePage === index ? 'bg-textColor  opacity-[1]' : ' opacity-[0.1]'}`}
          >
            <span className={`${activePage === index ? 'text-white' : 'text-textColor'}`}>{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResult
