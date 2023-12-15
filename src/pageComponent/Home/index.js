import BookingProcessSteps from '@/components/Common/BookingProcessSteps'
import OurBlogHomePage from '@/components/Common/OurBlogHomePage'
import AboutVideo from '@/components/Common/Video'
import Banner from './Banner'
import BestTour from './BestTour'
import InspectionTrip from './InspectionTrip/InspectionTrip'
import TouristRepresentative from './Representative/TouristRepresentative'
import Review from './Reviews/Review'
import Surveys from './Surveys'
import TravelStyle from './TravelStyle/TravelStyle'
import TravelStyleMb from './TravelStyle/TravelStyleMb'
import { getDictionary } from '@/get-dictionary'
import { DATA_TAXONOMIES_BUDGET_GQL_SERVER, DATA_TAXONOMIES_COUNTRY_GQL_SERVER, DATA_TAXONOMIES_DURATION_GQL_SERVER, DATA_TAXONOMIES_TOUR_STYLE_GQL_SERVER } from '@/graphql/filter/queries'
export default async function Home({
  data,
  lang,
  nextStep,
  dataBookTour,
  arrayDesInit,
  arrayCateInit
}) {

  const language = lang?.toUpperCase() || 'EN'

  // =================================================================
  const dictionary = await getDictionary(lang)
  const [
    budgets,
    durations,
    styles,
    countries,
  ] = await Promise.all([

    fetchData(DATA_TAXONOMIES_BUDGET_GQL_SERVER, { language }),
    fetchData(DATA_TAXONOMIES_DURATION_GQL_SERVER, { language }),
    fetchData(DATA_TAXONOMIES_TOUR_STYLE_GQL_SERVER, { language }),
    fetchData(DATA_TAXONOMIES_COUNTRY_GQL_SERVER , { language }),

  ])

  const dataFilter = {
    countries: countries?.data?.allCountries?.nodes,
    style: styles?.data?.allTourStyle?.nodes,
    budget: budgets?.data?.allBudget?.nodes,
    duration: durations?.data?.allDuration?.nodes
  }
  return (
    <div>
      <Banner
        lang={lang}
        data={banner}
        dataFilter={dataFilter}
      />
      <div className='body-wrapper'>
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
          <BestTour
            finalData={finalData}
            button={button}
            dictionary={dictionary}
            dataFilter={dataFilter}
          />
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
          <AboutVideo data={aboutVideo} />
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
    </div>
  )
}
