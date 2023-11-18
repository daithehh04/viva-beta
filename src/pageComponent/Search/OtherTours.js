'use client'
import React, { useEffect } from 'react'
import SearchResult from './SearchResult'
import warningIcon from '@/assets/images/search/warning.svg'
import Image from 'next/image'
import { DATA_BEST_TOUR } from '@/graphql/filter/queries'
import { useQuery } from '@apollo/client'

function OtherTours({dataQuery,dataFilter, searchInfo,results, lang}) {
  
  const {data:dataBestTours, refetch, loading} = useQuery(DATA_BEST_TOUR, {
    variables: {
      language: lang?.toUpperCase(),
      countrySlug: dataQuery.country ,
      styleTourSlug:dataQuery.style,
      budget: dataQuery.budget,
      duration: dataQuery.duration,
      offset: 0,
      size: 9
    }
  })
  let allTours = dataBestTours?.allTours?.nodes
  const pageInfo = dataBestTours?.allTours?.pageInfo?.offsetPagination?.total
  const totalPage = Math.ceil(pageInfo / 9)
  useEffect(() => {
    window.scrollTo(0,0)
  },[])
  return (
    <div>
      <div className='w-[100%] rounded-[0.5vw] h-[4.4375vw] 
      bg-gradient-to-b from-[#FFF9DF] to-[#FFF1BC] pl-[2.44vw]
       flex items-center mb-[2.63vw] max-md:mx-[4.27vw] max-md:h-auto max-md:w-auto max-md:py-[2vw] max-md:rounded-[1.2vw] max-md:my-[2.4vw]'>
        <Image src={warningIcon} alt='warningIcon' className='mr-[1.8vw]' />
        <p className='text-[1.5vw] font-medium leading-[1.65vw] max-md:text-[3.2vw] max-md:px-[4.27vw] max-md:leading-normal'>{searchInfo?.noResult?.title}</p>
      </div>
      <div className='pb-[6.25vw]'>
        {allTours?.length !== 0 ? (
          <div>
            <h3 className='text-[2.5vw] font-[500] max-md:text-[3.2vw] max-md:px-[4.27vw]'>{searchInfo?.noResult?.content}</h3>
            <SearchResult 
              pageInfo={pageInfo}
              totalPage={totalPage}
              refetch={refetch}
              allTours={allTours}
              results={results}
              dataFilter={dataFilter}
              lang={lang}
              loading={loading} 
              quantity={6} 
              text={'You may also like:'} className='hidden'/>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default OtherTours
