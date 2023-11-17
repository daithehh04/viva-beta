'use client'
import imgTour from '@/assets/images/img-more.png'
import Button from '@/components/Common/Button'
import FilterTour from '@/components/Common/FilterTour'
import TourItem from '@/components/Common/TourItem'
import TourItemMobile from '@/components/Common/TourItemMobile'
import { DATA_BEST_TOUR_HOME_PAGE, DATA_TAXONOMIES_BUDGET_GQL, DATA_TAXONOMIES_COUNTRY_GQL, DATA_TAXONOMIES_DURATION_GQL, DATA_TAXONOMIES_TOUR_STYLE_GQL } from '@/graphql/filter/queries'
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
  const { data: bestTours, loading } = useQuery(DATA_BEST_TOUR_HOME_PAGE, {
    variables: {
      language: lang?.toUpperCase(),
      countrySlug: destination || newArrDataTaxonomiesCountry,
      styleTourSlug: style || newArrDataTaxonomiesStyleTravel,
      bestSellerSlug: ['best-seller-tours'],
      budget: budget || newArrDataTaxonomiesBudget,
      duration: duration || newArrDataTaxonomiesDuration
    }
  })

  let allTours = bestTours?.allTours?.nodes || []
  const totalTour = bestTours?.allTours?.pageInfo?.offsetPagination?.total

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
            dataFilter={dataFilter}
            className={'filterMobile'}
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
          allTours.map((tour, index) => (
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
        {totalTour > 7 && !loading ? (
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
                <span className='text-white heading-1'>{totalTour - 7}</span>
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
