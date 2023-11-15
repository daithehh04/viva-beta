import NotFound from '@/components/Common/NotFound'
import {
  DATA_TAXONOMIES_BUDGET,
  DATA_TAXONOMIES_COUNTRY,
  DATA_TAXONOMIES_DURATION,
  DATA_TAXONOMIES_TOUR_STYLE
} from '@/graphql/filter/queries'
import { DATA_WHY_TRAVEL, GET_INFO_PAGE_TRAVEL_STYLE } from '@/graphql/travelStyle/queries'
import Banner from './Banner'
import HotTour from './HotTour'
import TourSlide from './TourSlide'
import fetchData from '@/data/fetchData'

async function index({ lang, slug }) {
  const getPageInfo = await fetchData(GET_INFO_PAGE_TRAVEL_STYLE, {
    language: lang?.toUpperCase(),
    taxonomyValue: slug,
  })

  const dataWhyTravel = await fetchData(DATA_WHY_TRAVEL, { language: lang?.toUpperCase() })
  const dataWhy = dataWhyTravel?.data?.page?.translation?.tourStyle?.whytravel

  if (!getPageInfo?.data?.tourStyle?.translation?.banner) {
    return <NotFound lang={lang} />
  }

  const dataTaxonomiesCountry = await fetchData(DATA_TAXONOMIES_COUNTRY, { language: lang?.toUpperCase() })
  const dataTaxonomiesStyleTour = await fetchData(DATA_TAXONOMIES_TOUR_STYLE, { language: lang?.toUpperCase() })
  const dataTaxonomiesBudget = await fetchData(DATA_TAXONOMIES_BUDGET, { language: lang?.toUpperCase() })
  const dataTaxonomiesDuration = await fetchData(DATA_TAXONOMIES_DURATION, { language: lang?.toUpperCase() })
  return (
    <div>
      <Banner data={getPageInfo?.data?.tourStyle?.translation?.banner?.banner} />
      <TourSlide
        tourStyleName={getPageInfo?.data?.tourStyle?.translation?.banner?.tourstylename}
        lang={lang}
        slug={getPageInfo?.data?.tourStyle?.translation?.slug}
        dataTaxonomiesCountry={dataTaxonomiesCountry}
        dataTaxonomiesStyleTour={dataTaxonomiesStyleTour}
        dataTaxonomiesBudget={dataTaxonomiesBudget}
        dataTaxonomiesDuration={dataTaxonomiesDuration}
      />
      <HotTour
        lang={lang}
        hotTour={getPageInfo?.data?.tourStyle?.translation?.banner?.hotTour}
        reason={dataWhy}
        data={getPageInfo?.data?.tourStyle?.translation?.banner?.groupbutton?.buttonseemore}
      />
    </div>
  )
}

export default index
