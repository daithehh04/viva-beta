'use client'

import { useEffect, useRef, useState } from 'react'
import { createTheme, useMediaQuery } from '@mui/material'
import { useQuery } from '@apollo/client'
import TourItem from '@/components/Common/TourItem'
import TourItemMobile from '@/components/Common/TourItemMobile'
import FilterTour from '@/components/Common/FilterTour'
import { DATA_BEST_TOUR, DATA_TAXONOMIES_BUDGET_GQL, DATA_TAXONOMIES_COUNTRY_GQL, DATA_TAXONOMIES_DURATION_GQL, DATA_TAXONOMIES_TOUR_STYLE_GQL } from '@/graphql/filter/queries'
import { useQueryState } from 'next-usequerystate'
const tourAll = new Array(8).fill(0)
const theme = createTheme({
  breakpoints: {
    values: {
      sm: 768
    }
  }
})
function TourSlide({
  lang,
  slug,
  tourStyleName,
  dictionary
}) {
  const eleRef = useRef()
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [activePage, setActivePage] = useState(0)
  const [destination] = useQueryState('destination')
  const [budget] = useQueryState('budget')
  const [duration] = useQueryState('duration')
  const [style] = useQueryState('style')
  const { data: budgets } = useQuery(DATA_TAXONOMIES_BUDGET_GQL, {
    variables: {
      language: lang?.toUpperCase(),
    }
  })
  const { data: durations } = useQuery(DATA_TAXONOMIES_DURATION_GQL, {
    variables: {
      language: lang?.toUpperCase(),
    }
  })

  const { data: countries } = useQuery(DATA_TAXONOMIES_COUNTRY_GQL, {
    variables: {
      language: lang?.toUpperCase(),
    }
  })
  const { data: styles } = useQuery(DATA_TAXONOMIES_TOUR_STYLE_GQL, {
    variables: {
      language: lang?.toUpperCase(),
    }
  })
  function handleTaxonomiesSlug(data) {
    const newArrDataTaxonomies = []
    data?.map((item) => {
      newArrDataTaxonomies.push(item?.slug)
    })
    return newArrDataTaxonomies
  }

  function handleTaxonomiesName(data) {
    const newArrDataTaxonomies = []
    data?.map((item) => {
      newArrDataTaxonomies.push(item?.name)
    })
    return newArrDataTaxonomies
  }
  const newArrDataTaxonomiesCountry = handleTaxonomiesName(countries?.allCountries?.nodes)
  const newArrDataTaxonomiesStyleTravel = handleTaxonomiesSlug(styles?.allTourStyle?.nodes)
  const newArrDataTaxonomiesBudget = handleTaxonomiesName(budgets?.allBudget?.nodes)
  const newArrDataTaxonomiesDuration = handleTaxonomiesName(durations?.allDuration?.nodes)
  // =================================================================

  const dataFilter = {
    countries: countries?.allCountries?.nodes,
    style: styles?.allTourStyle?.nodes,
    budget: budgets?.allBudget?.nodes,
    duration: durations?.allDuration?.nodes
  }

  const {data:dataBestTours, refetch, loading} = useQuery(DATA_BEST_TOUR, {
    variables: {
      language: lang?.toUpperCase(),
      countrySlug: destination ?? newArrDataTaxonomiesCountry,
      styleTourSlug: style ?? slug,
      budget: budget ?? newArrDataTaxonomiesBudget,
      duration: duration ?? newArrDataTaxonomiesDuration,
      offset: 0,
      size: 8
    }
  })
  let allTours = dataBestTours?.allTours?.nodes

  if (!allTours) {
    allTours = tourAll
  }
  useEffect(() => {
    eleRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activePage])
  const handleChangePage = (index) => {
    setActivePage(index)
    refetch({
      offset: index * 8,
      size: 8
    })
  }
  const pageInfo = dataBestTours?.allTours?.pageInfo?.offsetPagination?.total
  const totalPage = Math.ceil(pageInfo / 8)
  useEffect(() => {
    window.scrollTo(0,0)
  },[])
  return (
    <div
      className='best-tours pt-[2.5vw] relative max-md:z-10 max-md:top-[-4vw] bg-white max-md:rounded-[4.27vw]'
      ref={eleRef}
    >
      <div className='max-md:pl-[4.27vw] pl-[8.125vw] max-md:pr-[4.27vw] '>
        <h2 className='heading-1 max-md:mt-[9.12vw]'>{tourStyleName}</h2>
        <div className='bg-white mt-[2vw] w-max rounded-[1.125vw] px-[2.38vw] py-[1.19vw] max-md:mt-[4.27vw] max-md:p-0 max-md:bg-transparent max-md:w-full filter-tour'>
          <FilterTour
            dataFilter={dataFilter}
            // onSelectDes={(data) => setDestination(data)}
            // onSelectStyle={(data) => setTravelStyle(data)}
            // onSelectBudget={(data) => setBudget(data)}
            // onSelectDuration={(data) => setDuration(data)}
            travelStyleSlug={slug}
            className={'travelStyle-Mb'}
          />
        </div>
      </div>
      <div
        className={`${
          allTours?.length === 0
            ? `w-full block mt-[3.5vw]`
            : 'grid grid-cols-4 gap-[2.5vw] mt-[3.5vw] max-md:grid-cols-1 w-[83.75%] ml-auto mr-auto max-md:w-full max-md:bg-[#f3f6fb]'
        }`}
      >
        {/* {!dataBestTours.loading ? ( */}
        {allTours?.length ? (
          allTours?.map((tour, index) => (
            <div key={index}>
              <div className='max-md:hidden'>
                <TourItem
                  data={tour}
                  lang={lang}
                  loading={loading}
                />
              </div>
              <div className='hidden max-md:block'>
                <TourItemMobile
                  data={tour}
                  lang={lang}
                  loading={loading}
                />
              </div>
            </div>
          ))
        ) : (
          <div className='text-center text-[3.5vw] w-full text-[#c23a3a] font-optima max-md:text-[5.67vw]'>
            {dictionary?.home?.not_found_tour}
          </div>
        )}
        {/* ) : (
          <div className='flex justify-center w-full col-span-4'>
            <Loading />
          </div>
        )} */}
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
export default TourSlide
