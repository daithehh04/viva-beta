'use client'
import calendar from '@/assets/images/calendarFilter.svg'
import searchIcon from '@/assets/images/search-normal.svg'
import styleIcon from '@/assets/images/style-travel.svg'
import wallet from '@/assets/images/wallet.svg'
import Button from '@/components/Common/Button'
import { DATA_TAXONOMIES_BUDGET, DATA_TAXONOMIES_BUDGET_GQL, DATA_TAXONOMIES_COUNTRY, DATA_TAXONOMIES_COUNTRY_GQL, DATA_TAXONOMIES_DURATION, DATA_TAXONOMIES_DURATION_GQL, DATA_TAXONOMIES_TOUR_STYLE, DATA_TAXONOMIES_TOUR_STYLE_GQL } from '@/graphql/filter/queries'
import { gql, useQuery } from '@apollo/client'
import { createTheme } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { sortBy } from 'lodash'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
function FilterBanner() {
  const [travelStyle, setTravelStyle] = useState('')
  const [duration, setDuration] = useState('')
  const [budget, setBudget] = useState('')
  const router = useRouter()
  const { lang, slug } = useParams()

  const { data: dataTaxonomiesStyleTour } = useQuery(DATA_TAXONOMIES_TOUR_STYLE_GQL, {
    variables: { language: lang?.toUpperCase() }
  })

  const { data: dataTaxonomiesBudget } = useQuery(DATA_TAXONOMIES_BUDGET_GQL, {
    variables: { language: lang?.toUpperCase() }
  })

  const { data: dataTaxonomiesDuration } = useQuery(DATA_TAXONOMIES_DURATION_GQL, {
    variables: { language: lang?.toUpperCase() }
  })

  const { data: dataTaxonomiesCountry } = useQuery(DATA_TAXONOMIES_COUNTRY_GQL, {
    variables: { language: lang?.toUpperCase() }
  })



  // ==== Get name filter ====
  const arrDataTaxonomiesBudget = dataTaxonomiesBudget?.allBudget?.nodes
  const arrDataTaxonomiesDuration = dataTaxonomiesDuration?.allDuration?.nodes
  const arrDataTaxonomiesStyleTour = dataTaxonomiesStyleTour?.allTourStyle?.nodes
  const arrDataTaxonomiesCountry = dataTaxonomiesCountry?.allCountries?.nodes


  const dataFilter = {
    style: arrDataTaxonomiesStyleTour,
    budget: arrDataTaxonomiesBudget,
    duration: arrDataTaxonomiesDuration,
    country: arrDataTaxonomiesCountry
  }

  const handleChangeTravelStyle = (event) => {
    setTravelStyle(event.target.value)
  }
  const handleChangeDuration = (event) => {
    setDuration(event.target.value)
  }
  const handleChangeBudget = (event) => {
    setBudget(event.target.value)
  }

  const handleSort = (fn = []) => {
    let clone = [...fn]
    if (clone?.length > 0) {
      clone = sortBy(clone, item => {
        return +item?.name.split('-')[0]
      })
    }
    return clone
  }
  const arrBudget = handleSort(dataFilter?.budget)

  const arrDuration = handleSort(dataFilter?.duration)


  const arrStyle = sortBy(dataFilter?.style, item => item?.banner?.travelStyleInfo?.priority)

  function handleSearch(e) {
    const arrParams = []
    if (travelStyle || duration || budget) {

      if (travelStyle) {
        arrParams.push({ 'style': travelStyle })
      }
      if (duration) {
        arrParams.push({ 'duration': duration })
      }
      if (budget) {
        arrParams.push({ 'budget': budget })
      }
      const resultObject = {};
      arrParams.forEach(obj => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            resultObject[key] = obj[key];
          }
        }
      });
      const queryString = new URLSearchParams(resultObject).toString();
      let link = `/search?&country=${slug}&${queryString}`
      if (lang !== 'en') {
        link = `/${lang}/search?&country=${slug}&${queryString}`
      }
      router.push(link)
    } else {
      router.push(`/${lang}/search`)
    }
  }

  const option = {
    destination: 'Destination',
    budget: 'Budget',
    style: 'Travel Style',
    duration: 'Duration',
    day: 'day',
    search: 'Search',
    price: '$'
  }
  if (lang === 'fr') {
    option.duration = 'Durée'
    option.style = ' Types de voyages'
    option.day = 'Jour'
    option.search = 'Rechercher'
    option.price = '€'
  }
  if (lang === 'it') {
    option.style = 'Tipo di viaggio'
    option.duration = 'Durata'
    option.budget = 'Budget'
    option.destination = 'Destinazione'
    option.day = 'Giorno'
    option.search = 'Cerca'
    option.price = '€'
  }

  const theme = createTheme({
    breakpoints: {
      values: {
        sm: 768
      }
    }
  })
  return (
    <div className='flex gap-x-[1.75vw]'>
      <div className='flex max-md:grid max-md:grid-cols-2 max-md:gap-[2.67vw] md:gap-x-[1.87vw] gap-y-[3.2vw] gap-x-[2.67vw] md:flex-nowrap flex-wrap md:justify-normal justify-between'>
        <div className='flex items-start flex-col select md:rounded-0 rounded-[1.06667vw] flex-shrink-0 md:w-auto w-[48vw] max-md:bg-white max-md:w-full pl-0 md:pl-[1.87vw]'>
          <span className='text-[#9B9B9B] uppercase text-[0.875vw] md:block hidden'>{option.style}</span>
          <div className='flex items-center select-mobile'>
            <Image
              src={styleIcon}
              width={100}
              height={100}
              alt='style'
              className='md:w-[1.875vw] md:h-[1.875vw] w-[3.73333vw] h-[3.73333vw] object-cover'
            />
            <FormControl
              sx={{
                minWidth: '8.75vw',
                '&.MuiFormControl-root': {
                  margin: 0
                },
                '& .MuiInputBase-root': {
                  fontSize: '1.0625vw',
                  fontWeight: 500
                },
                [theme.breakpoints.down('sm')]: {
                  '& .MuiSelect-select': {
                    fontSize: '3.73vw',
                    lineHeight: '1.5',
                    marginLeft: '4px'
                  }
                },
              }}
            >
              <Select
                value={travelStyle}
                onChange={handleChangeTravelStyle}
                displayEmpty
                inputprops={{ 'aria-label': 'Without label' }}
                renderValue={() => {
                  let name = option?.style
                  if (travelStyle !== "") {
                    const nameCountry = arrStyle?.find((item, index) => item?.slug === travelStyle)
                    name = nameCountry?.name
                  }
                  return name
                }}
                sx={{
                  height: '2.5rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '& .MuiSvgIcon-root': {
                    right: 0
                  },
                  '& .MuiSelect-outlined': {
                    padding: 0,
                    paddingLeft: '0.62vw'
                  }
                }}
              >
                {arrStyle?.map((item, index) => (
                  <MenuItem value={item?.slug} key={index}>
                    <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                      {item?.name}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className='flex items-start flex-col select md:rounded-0 rounded-[1.06667vw] flex-shrink-0 md:w-auto w-[48vw] max-md:bg-white max-md:w-full pl-0 md:pl-[1.87vw]'>
          <span className='text-[#9B9B9B] uppercase text-[0.875vw] md:block hidden'>{option.duration}</span>
          <div className='flex items-center select-mobile'>
            <Image
              src={calendar}
              width={100}
              height={100}
              alt='style'
              className='md:w-[1.875vw] md:h-[1.875vw] w-[3.73333vw] h-[3.73333vw] object-cover'
            />
            <FormControl
              sx={{
                minWidth: '8.75vw',
                '&.MuiFormControl-root': {
                  margin: 0
                },
                '& .MuiInputBase-root': {
                  fontSize: '1.0625vw',
                  fontWeight: 500
                },
                [theme.breakpoints.down('sm')]: {
                  '& .MuiSelect-select': {
                    fontSize: '3.73vw',
                    lineHeight: '1.5',
                    marginLeft: '4px'
                  }
                },
              }}
            >
              <Select
                value={duration}
                onChange={handleChangeDuration}
                displayEmpty
                inputprops={{ 'aria-label': 'Without label' }}
                renderValue={() => {
                  let name = option?.duration
                  if (duration !== "") {
                    const nameCountry = arrDuration?.find((item, index) => item?.name === duration)
                    name = nameCountry?.name + " " + option?.day
                  }
                  return name
                }}
                sx={{
                  height: '2.5rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '& .MuiSvgIcon-root': {
                    right: 0
                  },
                  '& .MuiSelect-outlined': {
                    padding: 0,
                    paddingLeft: '0.62vw'
                  }
                }}
              >
                {arrDuration?.map((item, index) => (
                  <MenuItem value={item?.name} key={index}>
                    <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                      {item?.name} {option.day}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className='flex items-start flex-col select md:rounded-0 rounded-[1.06667vw] flex-shrink-0 md:w-auto w-[48vw] max-md:bg-white max-md:w-full pl-0 md:pl-[1.87vw]'>
          <span className='text-[#9B9B9B] uppercase text-[0.875vw] md:block hidden'>{option.budget}</span>
          <div className='flex items-center select-mobile'>
            <Image
              src={wallet}
              width={100}
              height={100}
              alt='style'
              className='md:w-[1.875vw] md:h-[1.875vw] w-[3.73333vw] h-[3.73333vw] object-cover'
            />
            <FormControl
              sx={{
                minWidth: '8.75vw',
                '&.MuiFormControl-root': {
                  margin: 0
                },
                '& .MuiInputBase-root': {
                  fontSize: '1.0625vw',
                  fontWeight: 500
                },
                [theme.breakpoints.down('sm')]: {
                  '& .MuiSelect-select': {
                    fontSize: '3.73vw',
                    lineHeight: '1.5',
                    marginLeft: '4px'
                  }
                },
              }}
            >
              <Select
                value={budget}
                onChange={handleChangeBudget}
                displayEmpty
                inputprops={{ 'aria-label': 'Without label' }}
                renderValue={() => {
                  let name = option?.budget
                  if (budget !== "") {
                    const nameCountry = arrBudget?.find((item, index) => item?.name === budget)
                    name = nameCountry?.name + " " + option.price
                  }
                  return name
                }}
                sx={{
                  height: '2.5rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '& .MuiSvgIcon-root': {
                    right: 0
                  },
                  '& .MuiSelect-outlined': {
                    padding: 0,
                    paddingLeft: '0.62vw'
                  }
                }}
              >
                {arrBudget?.map((item, index) => (
                  <MenuItem value={item?.name} key={index}>
                    <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                      {item?.name} {option.price}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <Button
        onClick={handleSearch}
        className='btn-primary'
      >
        <Image
          src={searchIcon}
          width={50}
          height={50}
          alt='search'
          className='w-[1.25vw] h-[1.25vw]'
        />
        {option.search}
      </Button>
    </div>
  )
}

export default FilterBanner
