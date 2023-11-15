import NotFound from '@/components/Common/NotFound'
import fetchData from '@/data/fetchData'
import {
  DATA_COUNTRY,
  DATA_ICONS_COUNTRY,
  DATA_SLIDE_OTHER_TOUR,
  GET_DATA_BEST_SELLER_OURTOUR
} from '@/graphql/country/queries'
import { GET_ALL_REVIEWS } from '@/graphql/customersReview/queries'
import {
  DATA_TAXONOMIES_BUDGET,
  DATA_TAXONOMIES_COUNTRY,
  DATA_TAXONOMIES_DURATION,
  DATA_TAXONOMIES_TOUR_STYLE
} from '@/graphql/filter/queries'
import Banner from './Banner'
import CustomerReview from './CustomerReview'
import FilterPopup from './FilterPopup'
import OurBlog from './OurBlog'
import SectionActions from './SectionActions'
import SlideDestination from './SlideDestination'
async function index({ lang, slug }) {
  const [
    dataCountry,
    dataIcons,
    dataOtherTypeTrip,
    res,
    dataBestSeller,
    dataTaxonomiesStyleTour,
    dataTaxonomiesBudget,
    dataTaxonomiesDuration,
    dataTaxonomiesCountry
  ] = await Promise.all([
    fetchData(DATA_COUNTRY, {
      language: lang?.toUpperCase(),
      taxonomyValue: slug
    }),
    fetchData(DATA_ICONS_COUNTRY, { language: lang.toUpperCase(), slug: "cG9zdDozMDQ1" }),
    fetchData(DATA_SLIDE_OTHER_TOUR, {
      language: lang?.toUpperCase(),
      taxonomyValue: slug,
      taxonomyName: 'COUNTRIES',
    }),
    fetchData(GET_ALL_REVIEWS, { language: lang?.toUpperCase() }),
    fetchData(GET_DATA_BEST_SELLER_OURTOUR, {
      language: lang?.toUpperCase(),
      taxonomyValue: slug,
      taxonomyName: 'COUNTRIES',
    }),
    fetchData(DATA_TAXONOMIES_TOUR_STYLE, { language: lang?.toUpperCase() }),
    fetchData(DATA_TAXONOMIES_BUDGET, { language: lang?.toUpperCase() }),
    fetchData(DATA_TAXONOMIES_DURATION, { language: lang?.toUpperCase() }),
    fetchData(DATA_TAXONOMIES_COUNTRY, { language: lang?.toUpperCase() }),
  ])

  const dataOtherTypeTripNotNull = dataOtherTypeTrip?.data?.allTours?.nodes.filter(item => {
    return item?.translation !== null && item?.translation?.slug !== null
  })
  //get all reviews
  const reviewsList = res?.data?.allCustomerReview?.nodes

  const dataReviews = reviewsList?.filter((item) =>
    item?.translation?.customerReview?.tours?.countries?.nodes?.some((subItem) => subItem?.slug === slug)
  )
  const dataBestSellerNoNull = dataBestSeller?.data?.allTours?.nodes?.filter(item => {
    return item?.translation !== null && item?.translation?.slug !== null
  })

  const data = dataCountry?.data?.countries?.translation
  // ==== Get name filter ====
  const arrDataTaxonomiesBudget = dataTaxonomiesBudget?.data?.allBudget?.nodes
  const arrDataTaxonomiesDuration = dataTaxonomiesDuration?.data?.allDuration?.nodes
  const arrDataTaxonomiesStyleTour = dataTaxonomiesStyleTour?.data?.allTourStyle?.nodes
  const arrDataTaxonomiesCountry = dataTaxonomiesCountry?.data?.allCountries?.nodes

  const dataFilter = {
    style: arrDataTaxonomiesStyleTour,
    budget: arrDataTaxonomiesBudget,
    duration: arrDataTaxonomiesDuration,
    country: arrDataTaxonomiesCountry
  }

  if (!data) {
    return <NotFound lang={lang} />
  }
  return (
    <div>
      <Banner
        data={data?.country?.banner}
        slug={slug}
        dataFilter={dataFilter}
        lang={lang}
      />
      <FilterPopup
        dataFilter={dataFilter}
        slug={slug}
        lang={lang}
      />
      <SectionActions listActions={dataIcons?.data?.page?.translation} infoCountry={data?.country?.info} />
      <SlideDestination
        // data={dataOtherTrip?.data?.allTours?.nodes}
        data={dataBestSellerNoNull}
        dataOtherType={dataOtherTypeTripNotNull}
        dataTitle={data}
        lang={lang}
      />
      <CustomerReview
        data={dataReviews?.slice(0, 4)}
        dataInfo={data?.ourTour}
        lang={lang}
      />
      <OurBlog
        data={data}
        lang={lang}
      />
    </div>
  )
}

export default index