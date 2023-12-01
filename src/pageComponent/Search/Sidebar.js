'use client'
import locationIcon from '@/assets/images/search/location.svg'
import moneyIcon from '@/assets/images/search/money.svg'
import { Checkbox, useMediaQuery } from '@mui/material'
import OptionCustomer from '@/components/tag/OptionCustomer'
import OptionBudget from '@/components/tag/OptionBuget'
import { useEffect, useRef, useState } from 'react'
import theme from '@/components/ThemeRegistry/theme'
import { sortBy } from 'lodash'

const handleSort = (fn = []) => {
  let clone = [...fn]
  if (clone?.length > 0) {
    clone = sortBy(clone, item => {
      return +item?.name.split('-')[0]
    })
  }
  return clone
}

const sortCountry = (arr) => {
  let clone = [...arr]
  if (clone?.length > 0) {
    clone = sortBy(clone, item => {
      return item?.country?.priority
    })
  }

  return clone
}

const sortStyle = (arr) => {
  const clone = [...arr]
  clone?.sort(function (a, b) {
    var numA = parseInt(a?.banner?.travelStyleInfo?.priority);
    var numB = parseInt(b?.banner?.travelStyleInfo?.priority);
    return numA - numB;
  });
  return clone
}

export default function Sidebar({
  dataFilter,
  searchInfo,
  params,
  onDestination,
  onTravelStyle,
  onBudget,
  onDay,
  lang,
  dictionary
}) {
  // const [travelStyle, setTravelStyle] = useState([])
  const refStyle = useRef()
  function handleCheckStyle(e) {
    const value = e.target.value
    if (e.target.checked) {
      // setTravelStyle([...travelStyle, value])
      if (params?.style) {
        onTravelStyle([...params?.style, value])
      } else {
        onTravelStyle([value])
      }
    } else {
      var rs = params?.style?.filter((item) => item !== value)
      // setTravelStyle(rs)
      onTravelStyle(rs)
    }
  }
  // const [duration, setDuration] = useState([])
  const refDuration = useRef()
  function handleCheckDuration(e) {
    const value = e.target.value
    if (e.target.checked) {
      // setDuration([...duration, value])
      console.log({ value });
      if (params?.day) {
        onDay([...params?.day, value])
      } else {
        onDay([value])
      }
    } else {
      console.log("params?.day", params?.day);
      var rs = params?.day?.filter((item) => item !== value)
      // setDuration(rs)
      onDay(rs)
    }
  }

  const allBudget = handleSort(dataFilter?.budget || [])
  const allDuration = handleSort(dataFilter?.duration || [])
  const allCountries = sortCountry(dataFilter?.countries || [])
  const allTourStyle = sortStyle(dataFilter?.style || [])

  // useEffect(() => {
  //   const list = refStyle?.current?.children
  //   Array.from(list).forEach((item) => {
  //     const value = item.querySelector('label').getAttribute('for')
  //     if (value === params.style) {
  //       setTravelStyle([value])
  //     }
  //   })
  //   setTravelStyle([params.style])
  // }, [params.style])

  // useEffect(() => {
  //   const list = refDuration?.current?.children
  //   Array.from(list).forEach((item) => {
  //     const value = item.querySelector('label').getAttribute('for')
  //     if (value === params.day) {
  //       setDuration([value])
  //     }
  //   })
  //   setDuration([params.day])
  // }, [params.day])

  const onlySmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  let day = 'Days'
  if (lang === 'fr') {
    day = 'Jours'
  }
  if (lang === 'it') {
    day = 'Giorni'
  }
  return (
    <div className={`w-[20vw] flex flex-col max-md:overflow-y-scroll max-md:h-[70vh]
    max-md:w-auto max-md:rounded-t-[2vw] max-md:pt-[11.46vw]`}>
      <h2 className='text-[1.375vw] leading-[1.5125vw] font-medium mb-[1vw] max-md:hidden'>{searchInfo?.navbar?.selectYourInformation}</h2>
      <div
        className='search-option mb-[1.88vw] pt-[1.5vw] pb-[2vw] w-full px-[1.8vw] border 
        max-md:px-[4.26vw] max-md:mx-[4.26vw] max-md:pt-[6.4vw] max-md:rounded-[2.66vw] max-md:w-auto max-md:pb-[5.2vw] max-md:mb-[8vw]'
        style={{ boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.08)' }}
      >
        <h3 className='flex mb-[1.5vw] font-bold text-[1.25vw] leading-[1.64288vw] max-md:text-[5.33vw] max-md:leading-normal'>{
          searchInfo?.navbar?.duration?.title
        }</h3>
        <div className='flex flex-col justify-center gap-[0.75vw] max-md:gap-[3.2vw]' ref={refDuration}>
          {allDuration?.map((item, index) => (
            <div className='flex items-center justify-between' key={index}>
              <div className='flex gap-[0.4375vw] items-center cursor-pointer max-md:gap-[1.86vw]'>
                <Checkbox
                  checked={params?.day?.includes(item?.name)}
                  value={item?.name}
                  color='info'
                  id={item?.name}
                  sx={{
                    color: '#C7D0D9',
                    '& .MuiSvgIcon-root': { fontSize: onlySmallScreen ? '5.5vw' : '1.25vw' },
                    '&.Mui-checked': {
                      color: '#228B22'
                    }
                  }}
                  className='w-[1.25vw] h-[1.25vw]'
                  onChange={handleCheckDuration}
                />
                <label className='text-[0.875vw] cursor-pointer max-md:text-[3.73vw]' for={item?.name}>
                  {item?.name} {day}
                </label>
              </div>
              <p className='text-[0.875vw] max-md:text-[3.73vw]'>{item?.quantity}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className='search-option px-[1.8vw] mb-[1.88vw] w-full border pb-[2vw] pt-[1.5vw] 
        max-md:mx-[4.26vw] max-md:pt-[7.46vw] max-md:px-[4.26vw] max-md:rounded-[2.66vw] max-md:w-auto max-md:mb-[8vw] max-md:pb-[8.53vw]'
        style={{ boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.08)' }}
      >
        <h3 className='mb-[1.32vw] text-[1.25vw] font-bold max-md:text-[5.33vw] max-md:mb-[5.6vw]'>{searchInfo?.navbar?.travelStyles}</h3>
        <div className='flex flex-col justify-center gap-[0.75vw] max-md:gap-[3.2vw]' ref={refStyle}>
          {allTourStyle?.map((item, index) => (
            <div className='flex items-center justify-between' key={index}>
              <div className='flex gap-[0.4375vw] items-center cursor-pointer max-md:gap-[1.86vw]'>
                <Checkbox
                  checked={params?.style?.includes(item?.slug)}
                  value={item?.slug}
                  color='info'
                  id={item?.slug}
                  sx={{
                    color: '#C7D0D9',
                    '& .MuiSvgIcon-root': { fontSize: onlySmallScreen ? '5.5vw' : '1.25vw' },
                    '&.Mui-checked': {
                      color: '#228B22'
                    }
                  }}
                  className='w-[1.25vw] h-[1.25vw]'
                  onChange={handleCheckStyle}
                />
                <label className='text-[0.875vw] cursor-pointer max-md:text-[3.73vw]' for={item?.slug}>
                  {item?.name}
                </label>
              </div>
              <p className='text-[0.875vw] max-md:text-[3.73vw]'>{item?.quantity}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className='search-option px-[1.8vw] mb-[1.88vw] w-full border pb-[2vw] pt-[1.5vw] 
        max-md:mx-[4.26vw] max-md:pt-[7.46vw] max-md:px-[4.26vw] max-md:rounded-[2.66vw] max-md:w-auto max-md:mb-[8vw] max-md:pb-[8.53vw]'
        style={{ boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.08)' }}
      >
        <h3 className='mb-[1.32vw] text-[1.25vw] font-bold max-md:text-[5.33vw] max-md:mb-[5.6vw]'>{dictionary?.home?.best_seller}</h3>
        <div className='flex flex-col justify-center gap-[0.75vw] max-md:gap-[3.2vw]' ref={refStyle}>
          <div className='flex items-center justify-between'>
            <div className='flex gap-[0.4375vw] items-center cursor-pointer max-md:gap-[1.86vw]'>
              <Checkbox
                // checked={params?.style?.includes("bestseller")}
                value={"bestseller"}
                color='info'
                id={"bestseller"}
                sx={{
                  color: '#C7D0D9',
                  '& .MuiSvgIcon-root': { fontSize: onlySmallScreen ? '5.5vw' : '1.25vw' },
                  '&.Mui-checked': {
                    color: '#228B22'
                  }
                }}
                className='w-[1.25vw] h-[1.25vw]'
                // onChange={handleCheckStyle}
              />
              <label className='text-[0.875vw] cursor-pointer max-md:text-[3.73vw]' for={"bestseller"}>
                {dictionary?.home?.best_seller}
              </label>
            </div>
            {/* <p className='text-[0.875vw] max-md:text-[3.73vw]'>{item?.quantity}</p> */}
          </div>
        </div>
      </div>
      <div
        className='search-option pt-[1.88vw] pb-[1.72vw] px-[1.25vw] 
        max-md:px-[4.26vw] max-md:mx-[4.26vw] max-md:rounded-[2.66vw] max-md:pt-[8vw] max-md:mb-[8vw]'
        style={{ boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.08)' }}
      >
        <h3 className='font-medium leading-[1.375vw] mb-[1.05vw] text-[1.25vw] 
        max-md:text-[5.33vw] max-md:leading-normal max-md:mb-[4.53vw]'>{searchInfo?.navbar?.selectYourInformation}</h3>
        <div className='mb-[0.94vw] max-md:mb-[4vw]'>
          <OptionCustomer
            onSelect={(data) => onDestination(data)}
            icon={locationIcon}
            list={allCountries}
            defaultValue={params?.country}
            lang={lang}
          />
        </div>
        <div className='mb-[0.94vw] max-md:mb-[7.29vw]'>
          <OptionBudget
            onSelect={(data) => onBudget(data)}
            icon={moneyIcon}
            defaultValue={params?.budget}
            list={allBudget}
            lang={lang}
          />
        </div>
      </div>
    </div>
  )
}
