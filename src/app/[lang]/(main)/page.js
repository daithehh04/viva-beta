import BookingProcessSteps from '@/components/Common/BookingProcessSteps'
import OurBlogHomePage from '@/components/Common/OurBlogHomePage'
import AboutVideo from '@/components/Common/Video'
import { LANGUAGE_BOOK_IDS, LANGUAGE_IDS } from '@/configs/global-config'
import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { getDictionary } from '@/get-dictionary'
import {
  DATA_TAXONOMIES_BUDGET_GQL_SERVER,
  DATA_TAXONOMIES_COUNTRY_GQL_SERVER,
  DATA_TAXONOMIES_DURATION_GQL_SERVER,
  DATA_TAXONOMIES_TOUR_STYLE_GQL_SERVER
} from '@/graphql/filter/queries'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'
import {
  GET_DATA_iNSEPECT,
  GET_HOME_PAGE,
  GET_INITIAL_FILTER,
  GET_META_DATA,
  GET_NEXT_STEP
} from '@/graphql/home/queries'
import Banner from '@/pageComponent/Home/Banner'
import BestTour from '@/pageComponent/Home/BestTour'
import InspectionTrip from '@/pageComponent/Home/InspectionTrip/InspectionTrip'
import TouristRepresentative from '@/pageComponent/Home/Representative/TouristRepresentative'
import Review from '@/pageComponent/Home/Reviews/Review'
import Surveys from '@/pageComponent/Home/Surveys'
import TravelStyle from '@/pageComponent/Home/TravelStyle/TravelStyle'
import TravelStyleMb from '@/pageComponent/Home/TravelStyle/TravelStyleMb'
import { Suspense } from 'react'

export async function generateMetadata({ params: { lang } }) {
  const res = await fetchData(GET_META_DATA, {
    language: lang?.toUpperCase()
  })

  const home = res?.data?.page?.translation?.home
  const featuredImage = res?.data?.page?.translation?.featuredImage
  const title = home?.meta?.title
  const excerpt = home?.meta?.description
  return getMeta(title, excerpt, featuredImage)
}

export default async function page({ params, searchParams }) {
  const lang = params?.lang
  const language = lang?.toUpperCase() || 'EN'

  const [nextStep, data, dataBookTour, dataInit, budgets, durations, styles, countries] = await Promise.all([
    fetchData(GET_NEXT_STEP, { language }),
    fetchData(GET_HOME_PAGE, { id: LANGUAGE_IDS[lang] }),
    fetchData(GET_DATA_FORM_BOOKTOUR, { id: LANGUAGE_BOOK_IDS[lang], language }),
    fetchData(GET_INITIAL_FILTER, { language }),

    fetchData(DATA_TAXONOMIES_BUDGET_GQL_SERVER, { language }),
    fetchData(DATA_TAXONOMIES_DURATION_GQL_SERVER, { language }),
    fetchData(DATA_TAXONOMIES_TOUR_STYLE_GQL_SERVER, { language }),
    fetchData(DATA_TAXONOMIES_COUNTRY_GQL_SERVER, { language })
  ])

  const metaDestination = dataInit?.data?.allCountries?.nodes || []
  const metaCategories = dataInit?.data?.categories?.nodes || []

  const arrayDesInit = metaDestination?.map((des) => des?.slug)
  const arrayCateInit = metaCategories?.map((cate) => cate?.slug)

  const categorySlug = arrayCateInit.filter((item, index) => item !== 'blog')

  const res = await fetchData(GET_DATA_iNSEPECT, { language, categorySlug, destinationSlug: arrayDesInit })

  const finalData = data?.data?.page?.home

  const banner = finalData?.banner
  const survey = finalData?.survey
  const inspection = finalData?.inspectionTrip
  const representative = finalData?.representative
  const customerReview = finalData?.customerReview
  const aboutVideo = finalData?.video
  const travelStyleList = finalData?.travelStyle
  const blog = finalData?.blogs
  const nextStepBookTour = nextStep?.data?.page?.translation?.aboutUsReviews?.steps
  const button = finalData?.groupbutton
  const dictionary = await getDictionary(lang)

  const dataFilter = {
    countries: countries?.data?.allCountries?.nodes,
    style: styles?.data?.allTourStyle?.nodes,
    budget: budgets?.data?.allBudget?.nodes,
    duration: durations?.data?.allDuration?.nodes
  }
  return (
    <main>
      <Banner
        lang={lang}
        data={banner}
        dataFilter={dataFilter}
      />
      <div
        id='home-wrapper'
        className='body-wrapper'
      >
        <div className='style-mb'>
          <TravelStyleMb
            lang={lang}
            data={travelStyleList}
            title={travelStyleList?.title}
          />
        </div>
        <div className='survey-wrapper'>
          <Surveys
            data={survey}
            lang={lang}
            button={button}
            dataBookTour={dataBookTour}
            dictionary={dictionary}
          />
        </div>
        <div className='trip-wrapper'>
          <InspectionTrip
            data={inspection}
            dataSlide={res?.data?.posts?.nodes}
            lang={lang}
          />
        </div>
        <div className='bg-home34'>
          <Suspense fallback={<div>Loading...</div>}>
            <BestTour
              finalData={finalData}
              button={button}
              dictionary={dictionary}
              dataFilter={dataFilter}
            />
          </Suspense>

          <TravelStyle
            data={travelStyleList?.travelStyleList}
            title={travelStyleList?.title}
            desc={travelStyleList?.desc}
            lang={lang}
          />
        </div>
        <div className='represent-wrapper'>
          <TouristRepresentative data={representative} />
        </div>
        <div>
          <AboutVideo data={aboutVideo} lang={lang}/>
        </div>
        <div className='review-wrapper'>
          <Review
            data={customerReview}
            button={button}
            lang={lang}
          />
        </div>
        <div className='relative bg-home67'>
          <div className='max-md:mt-[15.12vw] mt-[8.62vw]'>
            <BookingProcessSteps data={nextStepBookTour} />
          </div>
          <div
            className='pt-[7.31vw]'
            data-aos-once='true'
            data-aos-disabled='true'
            data-aos='fade-up'
            data-aos-duration='1000'
            data-aos-offset='-1200'
          >
            <OurBlogHomePage
              data={blog}
              button={button}
              lang={lang}
            />
          </div>
          <div className='absolute bottom-0 left-0 right-0 bg-overlayBanner2 h-[6.62vw] max-md:hidden'></div>
        </div>
      </div>
    </main>
  )
}
