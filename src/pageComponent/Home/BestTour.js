'use client'
import imgTour from '@/assets/images/img-more.png'
import Button from '@/components/Common/Button'
import FilterTour from '@/components/Common/FilterTour'
import TourItem from '@/components/Common/TourItem'
import TourItemMobile from '@/components/Common/TourItemMobile'
import { DATA_BEST_TOUR_HOME_PAGE, DATA_TAXONOMIES_COUNTRY_GQL, DATA_TAXONOMIES_TOUR_STYLE_GQL } from '@/graphql/filter/queries'
import { useQuery } from '@apollo/client'
import { useQueryState } from 'next-usequerystate'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function BestTour({
  button,
  finalData,
}) {
  const { lang } = useParams()
  const [destination] = useQueryState('destination')
  const [budget] = useQueryState('budget')
  const [duration] = useQueryState('duration')
  const [style] = useQueryState('style')

  const { data: contries } = useQuery(DATA_TAXONOMIES_COUNTRY_GQL, {
    variables: {
      language: lang?.toUpperCase(),
    }
  })
  const { data: styles } = useQuery(DATA_TAXONOMIES_TOUR_STYLE_GQL, {
    variables: {
      language: lang?.toUpperCase(),
    }
  })

  const styleSlugs = styles?.allTourStyle?.nodes?.map(item => item.slug) || []
  const countrySlugs = contries?.allCountries?.nodes?.map(item => item.name) || []

  const { data: bestTours, loading } = useQuery(DATA_BEST_TOUR_HOME_PAGE, {
    variables: {
      language: lang?.toUpperCase(),
      countrySlug: destination || countrySlugs,
      styleTourSlug: style || styleSlugs,
      bestSellerSlug: ['best-seller-tours']
    }
  })

  let allTours = bestTours?.allTours?.nodes || []

  if (budget) {
    allTours = allTours?.filter((tour) => {
      let priceTour = tour?.translation?.tourDetail?.priceTour
      if (!priceTour) return
      const arrBudget = budget.split('-')
      const minBudget = arrBudget[0]
      const maxBudget = arrBudget[1]
      return priceTour >= +minBudget && priceTour <= +maxBudget
    })
  }
  if (duration) {
    allTours = allTours?.filter((tour) => {
      let numTour = tour?.translation?.tourDetail?.numberDay
      if (!numTour) return
      const arrDuration = duration.split('-')
      const minDay = arrDuration[0]
      const maxDay = arrDuration[1]
      return numTour >= +minDay && numTour <= +maxDay
    })
  }

  let other = 'Other tours'
  let notFound = 'Not Found Tour !!'
  if (lang === 'fr') {
    other = 'Autres visites'
    notFound = 'Visite introuvable !!'
  }
  if (lang === 'it') {
    other = 'Altri tour'
    notFound = 'Tour non trovato!!'
  }
  return (
    <div className='best-tours pt-[8.13vw] relative'>
      <div className='absolute top-0 h-[50vw] w-full bg-white md:hidden'></div>
      <div className='max-md:pl-[4.27vw] pl-[8.125vw] max-md:pr-[4.27vw] '>
        <h2
          className='heading-1 max-md:relative max-md:text-center'
          data-aos-once='true'
          data-aos-disabled='true'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          {finalData?.bestTour?.title}
        </h2>
        <div
          data-aos-once='true'
          data-aos-disabled='true'
          data-aos='fade-up'
          data-aos-duration='1000' className='bg-white mt-[2vw] w-max rounded-[1.125vw] px-[2.38vw] py-[2vw] max-md:mt-[4.27vw] max-md:p-0 max-md:bg-transparent max-md:w-full'>
          <FilterTour
            className={'filterMobile'}
            contries={contries}
            styles={styles}
          />
        </div>
      </div>

      <div
        className={`${allTours?.length === 0
          ? `w-full block md:mt-[1.88vw] mt-[7.73vw]`
          : 'grid grid-cols-4 relative gap-[2.5vw] md:mt-[1.88vw] mt-[7.73vw] max-md:grid-cols-1 w-[83.75%] ml-auto mr-auto max-md:w-full'
          }`}
      >
        <div className='md:hidden bg-tourMobile'></div>
        {allTours?.length !== 0 ? (
          allTours?.slice(0, 7).map((tour, index) => (
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
          <div className='text-center text-[3.5vw] font-[600] w-full text-[#c23a3a] font-optima max-md:text-[5.67vw]'>
            {notFound}
          </div>
        )}
        {allTours?.length > 7 && !loading ? (
          <div className='lg:h-[24.5vw] md:h-[28vw] h-[62.7vw] rounded-[1vw] relative hidden md:flex  justify-center items-center lastItem'>
            <Image
              src={imgTour}
              alt='img-tour'
              fill
              className='object-cover h-full rounded-[1vw]'
            />
            <div className='absolute flex flex-col items-center justify-center'>
              <div className='inline-flex gap-[0.3125vw] justify-center items-center'>
                <span className='text-justify font-optima text-[2vw] font-normal leading-[130%] text-white'>+</span>
                <span className='text-white heading-1'>{allTours.length - 7}</span>
              </div>
              <span className='text-white text-justify font-optima text-[1.5vw] block font-medium leading-[150%]'>
                {other}
              </span>
              <div className='flex justify-center max-md:hidden mt-[1.25vw] max-md:mt-[8.53vw]'>
                <Link
                  href={`/${lang}/search`}
                  className='btn-secondary'
                  content={button?.buttonseemore}
                >
                  <span>{button?.buttonseemore}</span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='flex justify-center md:hidden mt-[8.53vw] mb-[7.93vw]'>
        <Link href={`/${lang}/search`}>
          <Button className='btn-secondary'>{button?.buttonseemore}</Button>
        </Link>
      </div>
    </div>
  )
}

export default BestTour
