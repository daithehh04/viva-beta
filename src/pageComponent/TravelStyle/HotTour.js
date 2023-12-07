'use client'

import TourSlides from '@/components/Common/SlideTour'
import Reason from './Reason'
import Button from '@/components/Common/Button'
import Link from 'next/link'
import { DATA_WHY_TRAVEL, GET_HOT_TOUR_TRAVEL_STYLE } from '@/graphql/travelStyle/queries'
import fetchData from '@/data/fetchData'
import { useQueryState } from 'next-usequerystate'
import { DATA_TAXONOMIES_COUNTRY_GQL } from '@/graphql/filter/queries'
import { useQuery } from '@apollo/client'

const HotTour = ({ slug, lang, dictionary }) => {
  const [destination] = useQueryState('destination')

  const { data: countries } = useQuery(DATA_TAXONOMIES_COUNTRY_GQL, {
    variables: {
      language: lang?.toUpperCase(),
    }
  })
  function handleTaxonomiesName(data) {
    const newArrDataTaxonomies = []
    data?.map((item) => {
      newArrDataTaxonomies.push(item?.name)
    })
    return newArrDataTaxonomies
  }
  const newArrDataTaxonomiesCountry = handleTaxonomiesName(countries?.allCountries?.nodes)

  const { data: getPageInfo } = useQuery(GET_HOT_TOUR_TRAVEL_STYLE, {
    variables: {
      language: lang?.toUpperCase(),
      taxonomyValue: slug,
      destinationSlug: destination ?? newArrDataTaxonomiesCountry
    }
  })

  const hotTour = getPageInfo?.allTours?.nodes
  const data = getPageInfo?.data?.tourStyle?.translation?.banner?.groupbutton?.buttonseemore

  const { data: dataWhyTravel } = useQuery(DATA_WHY_TRAVEL, {
    variables: {
      language: lang?.toUpperCase()
    }
  })
  const reason = dataWhyTravel?.page?.translation?.tourStyle?.whytravel

  return (
    <div className='w-[83.75%] ml-auto mr-auto max-md:w-full'>
      <div className='md:mt-[3.12vw] mt-[14.67vw]'>
        {hotTour?.length !== 0 &&  <p className='heading-1 mb-[1.5vw] max-md:pl-[4.27vw]'>{dictionary?.home?.best_tour}</p>}
        {hotTour?.length !== 0 && <div className='max-md:mt-[6.4vw] mb-[3.5vw] max-md:mb-[7.7vw]'>
          <TourSlides
            data={hotTour}
            lang={lang}
          />
        </div>}
        {hotTour?.length !== 0 && <div className='flex justify-center'>
          <Link href={`${lang !== 'en' ? `/${lang}` : ''}/search?seller=best-seller-tours&style=${slug}${destination ? `&country=${destination}` : ''}`}>
            <Button
              className='btn-secondary'
              content={data ? data : dictionary.home.see_more}
            >
              <span>{data ? data : dictionary.home.see_more}</span>
            </Button>
          </Link>
        </div>}
      </div>
      <div className='mt-[8.62vw] flex flex-col max-md:px-[4.27vw] md:mb-[6.25vw] mb-[16.21vw] '>
        <span className='font-optima md:text-[4vw] text-[4.8vw] font-semibold leading-[130%] capitalize text-[#171717] mb-[3vw] '>
          {reason?.text}
          {/* Why Travel with Asia Viva Travel */}
        </span>
        <div className='grid md:grid-cols-4 md:grid-rows-1 md:gap-[2vw] gap-[4.27vw] grid-cols-2 grid-rows-2'>
          {reason?.reason?.map((choose, index) => {
            return (
              <Reason
                key={index}
                icon={choose?.image?.sourceUrl}
                title={choose?.title}
                desc={choose?.content}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HotTour
