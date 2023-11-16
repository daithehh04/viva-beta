import fetchData from '@/data/fetchData'
import {DATA_COUNTRY_BANNER } from '@/graphql/country/queries'
import ScrollNextSection from '@/sections/our-tour/banner/scroll-next-section'
import Box from '@mui/material/Box'
import Image from 'next/image'
import FilterBanner from './FilterBanner'

const Banner = async ({ slug, lang }) => {
  const [
    dataCountry,
  ] = await Promise.all([
    fetchData(DATA_COUNTRY_BANNER, {
      language: lang?.toUpperCase(),
      taxonomyValue: slug
    }),
  ])

  const data = dataCountry?.data?.countries?.translation?.country?.banner

  return (
    <Box
      sx={{
        height: {
          xs: '74.4vw', // For extra-small (mobile) screens
          sm: '74.4vw', // For small screens
          md: '100vh' // For medium screens
        }
      }}
    >
      <div className='relative h-[100%] flex justify-center items-center bannerOurtour'>
        <div className='flex flex-col justify-center text-center items-center absolute z-[10] '>
          <span className='text-center md:text-[1.94vw] text-[3.2vw] md:font-bold font-medium leading-normal text-[#fff] md:mb-[0.62vw] mb-[1.07vw] font-sans '>
            {data?.explore}
          </span>
          <span className='font-optima text-[#fff] md:text-[4.5vw] text-[6.4vw] text-justify font-semibold leading-[120%] uppercase '>
            {data?.nameCountry}
          </span>
          <span className='md:w-[43vw] max-md:w-[90%] max-md:mt-[1.6vw] w-[66.27vw] text-center font-sans md:text-[1.5vw] text-[3.773vw] font-medium leading-[151%] text-[#fff] '>
            {data?.text}
          </span>

          <div className='filter-tour hidden md:flex gap-x-[1.75vw] ml-auto mr-auto mt-[1.94vw] bg-white w-max py-[1.5vw] pl-[2.87vw] pr-[2vw] rounded-[1.125vw]'>
            <FilterBanner />
          </div>
          <ScrollNextSection lang={lang} />
        </div>
        <Image
          src={data?.img?.sourceUrl}
          width={1500}
          height={1000}
          alt={data?.img?.altText || 'img-destination'}
          className='absolute inset-0 object-cover w-full h-full z-[-1]'
        />
        <div
          className='absolute top-0 left-0 w-full h-full z-100'
          style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 45.44%, rgba(0, 0, 0, 0.35) 69.74%)' }}
        ></div>

        {/* animation button filter tour */}
        <div
          id='explore'
          className='absolute bottom-0 h-[12.4vw] w-full hidden md:flex flex-shrink-0 items-center bg-overlayBanner2 py-[4vw] pr-[3.31vw] '
        ></div>
      </div>

    </Box>
  )
}

export default Banner
