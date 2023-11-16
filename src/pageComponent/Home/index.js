'use client'
import BookingProcessSteps from '@/components/Common/BookingProcessSteps'
import OurBlogHomePage from '@/components/Common/OurBlogHomePage'
import AboutVideo from '@/components/Common/Video'
import { GET_DATA_iNSEPECT } from '@/graphql/home/queries'
import { useQuery } from '@apollo/client'
import AOS from 'aos'
import { useEffect } from 'react'
import Banner from './Banner'
import BestTour from './BestTour'
import InspectionTrip from './InspectionTrip'
import TouristRepresentative from './Representative/TouristRepresentative'
import Review from './Reviews/Review'
import Surveys from './Surveys'
import TravelStyle from './TravelStyle/TravelStyle'
import TravelStyleMb from './TravelStyle/TravelStyleMb'
export default function Home({
  data,
  lang,
  nextStep,
  dataBookTour,
  arrayDesInit,
  arrayCateInit
}) {

  const newArrCate = arrayCateInit.filter((item,index) => item !== "blog")

  const language = lang?.toUpperCase() || 'EN'
  const res = useQuery(GET_DATA_iNSEPECT, {
    variables: {
      language: language,
      categorySlug: newArrCate,
      destinationSlug: arrayDesInit
    }
  })

  useEffect(() => {
    AOS.init({
      disable: function () {
        var maxWidth = 769
        return window.innerWidth < maxWidth
      }
    })
    AOS.refresh()
  }, [])
  if (!data) {
    return <p>Loading....</p>
  }
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

  // =================================================================


  return (
    <div>
      <Banner
        lang={lang}
        data={banner}
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
