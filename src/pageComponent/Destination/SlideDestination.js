import Button from '@/components/Common/Button'
import SlideTour from '@/components/Common/SlideTour'
import TourItem from '@/components/Common/TourItem'
import TourItemMobile from '@/components/Common/TourItemMobile'
import fetchData from '@/data/fetchData'
import { DATA_COUNTRY_TITLE, DATA_SLIDE_OTHER_TOUR, GET_DATA_BEST_SELLER_OURTOUR } from '@/graphql/country/queries'
import { GET_INITIAL_FILTER } from '@/graphql/home/queries'
import '@/scss/pages/_slideDestination.scss'
import { Skeleton } from '@mui/material'
import Link from 'next/link'

async function SlideDestination({ lang, slug }) {
  const dataAllCountry = await fetchData(GET_INITIAL_FILTER, { language: lang?.toUpperCase() })
  let arraySlugCountry = []
  await dataAllCountry?.data?.allCountries?.nodes.map((value) => {
    if (value.slug !== slug) {
      arraySlugCountry.push(value.slug)
    }
  })
  const [
    dataOtherTypeTrip,
    dataBestSeller,
    dataCountry,
  ] = await Promise.all([
    fetchData(DATA_SLIDE_OTHER_TOUR, {
      language: lang?.toUpperCase(),
      taxonomyValue: arraySlugCountry,
      taxonomyName: 'COUNTRIES',
    }),
    fetchData(GET_DATA_BEST_SELLER_OURTOUR, {
      language: lang?.toUpperCase(),
      taxonomyValue: arraySlugCountry,
      taxonomyName: 'COUNTRIES',
    }),
    fetchData(DATA_COUNTRY_TITLE, {
      language: lang?.toUpperCase(),
      taxonomyValue: slug
    })
  ])


  const dataTitle = dataCountry?.data?.countries?.translation

  const dataOtherType = dataOtherTypeTrip?.data?.allTours?.nodes

  const dataTours = dataBestSeller?.data?.allTours?.nodes

  const totalTour = dataBestSeller?.data?.allTours?.pageInfo?.offsetPagination?.total

  return (
    <div className='relative'>
      <div className='absolute inset-0 z-[-1] slideDestination md:block hidden'></div>
      <div className="flex flex-col md:mt-[6.94vw] content">
        <span className='heading-1 md:mb-[3vw] md:pl-0 pl-[4.27vw]'>{dataTitle?.ourTour?.titleTrips}</span>
        <div className='max-md:mt-[6.4vw]'>
          <SlideTour
            data={dataOtherType}
            lang={lang}
          />
        </div>
        <div className='flex justify-center md:mt-[3.5vw] mt-[10.1vw]'>
          <Link href={`${lang !== 'en' ? `/${lang}` : ''}/search?country=${dataTitle?.name}`}>
            <Button className='btn-secondary' content={dataTitle?.ourTour?.btn}><span>{dataTitle?.ourTour?.btn}</span></Button>
          </Link>
        </div>

        <div className='flex flex-col md:mt-[7.5vw] mt-[11.2vw] '>
          <span className='heading-1 md:mb-[3vw] md:pl-0 pl-[4.27vw]'>{dataTitle?.ourTour?.titleTours}</span>
          <div>
            <div className='grid md:grid-cols-4 gap-x-[2.5vw] gap-y-[3vw] md:bg-transparent bg-[#F3F6FB]'>
              {dataTours?.map((tour, index) => {
                return (
                  <div key={index}>
                    <div className='hidden md:block'>
                      <TourItem
                        data={tour}
                        lang={lang}
                      />
                    </div>
                    <div className='md:hidden'>
                      <TourItemMobile
                        data={tour}
                        lang={lang}
                      />
                    </div>
                  </div>
                )
              })}
              {totalTour > 7 && (
                <div className='lg:h-[24.5vw] md:h-[28vw] h-[62.7vw] rounded-[1vw] relative hidden md:flex  justify-center items-center lastItem'>
                  <div className='absolute flex flex-col items-center justify-center'>
                    <div className='inline-flex gap-[0.3125vw] justify-center items-center'>
                      <span className='text-justify font-optima text-[2vw] font-normal leading-[130%] text-white'>
                        +
                      </span>
                      <span className='text-white heading-1'>{totalTour - 7}</span>
                    </div>
                    <span className='text-white text-justify font-optima text-[1.5vw] block font-medium leading-[150%]'>
                      {dataTitle?.ourTour?.subtitle}
                    </span>
                    <div className='flex justify-center mt-[1.25vw]'>
                      <Link
                        href={`${lang !== 'en' ? `/${lang}` : ''}/search?seller=best-seller-tours&country=${dataTitle?.name}`}
                        className='btn-secondary'
                        content={dataTitle?.ourTour?.btn}
                      >
                        <span>{dataTitle?.ourTour?.btn}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
        {totalTour <= 7 && <div className='flex justify-center md:mt-[3.5vw] mt-[10.1vw]'>
          {totalTour > 0 && <Link href={`${lang !== 'en' ? `/${lang}` : ''}/search?seller=best-seller-tours&country=${dataTitle?.name}`}>
            <Button className='btn-secondary' content={dataTitle?.ourTour?.btn}><span>{dataTitle?.ourTour?.btn}</span></Button>
          </Link>}

        </div>}
      </div>
    </div>
  )
}

SlideDestination.Skeleton = function SlideDestinationSkeleton() {
  return (
    <div className='relative'>
      <div className='absolute inset-0 z-[-1] slideDestination md:block hidden'></div>
      <div className="flex flex-col md:mt-[6.94vw] content">
        <span className='heading-1 md:mb-[3vw] md:pl-0 pl-[4.27vw]'>
          <Skeleton
            variant='text'
            width="50%"
            height={100}
          /></span>
        <div className='max-md:mt-[6.4vw] flex place-self-start gap-8'>
          {[...Array(10)].map((_, index) => (
            <Skeleton
              key={index}
              variant='rounded'
              width={300}
              height={400}
            />
          ))}
        </div>
        <div className='flex justify-center md:mt-[3.5vw] mt-[10.1vw]'>
        </div>
      </div>
    </div>
  )
}

export default SlideDestination
