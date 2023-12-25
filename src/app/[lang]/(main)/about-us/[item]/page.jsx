import AboutVideo from '@/components/Common/Video'
import fetchData from '@/data/fetchData'
import { GET_WHO_WE_ARE_DATA, WHO_ARE_WE_SLUG } from '@/graphql/aboutUs/who-we-are/queries'
import Banner from '@/pageComponent/AboutUs/Banner/Banner'
import Statistics from '@/pageComponent/AboutUs/who-we-are/Statistics'
import Staffs from '@/pageComponent/AboutUs/who-we-are/staffs/Staffs'
import {
  ABOUT_US_QUERY,
  ABOUT_US_SLUG_QUERY,
  GET_RESPONSIBLE_TRAVEL_DATA,
  RESPONSIBLE_TRAVEL_SLUG
} from '@/graphql/aboutUs/responsible-travel/queries'
import Responsible from '@/pageComponent/AboutUs/responsible-travel/Responsible'

import { GET_REVIEWS_DATA, REVIEWS_SLUG_QUERY } from '@/graphql/aboutUs/reviews/queries'
import { DATA_TAXONOMIES_COUNTRY } from '@/graphql/filter/queries'
import IndexAboutUs from '@/pageComponent/AboutUs'

const getYearReview = `query {
  allYears {
    nodes {
      name
    }
  }
}`

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams({ params }) {
  const [{ data: responsible }, { data: reviews }, { data: whoRWe }] = await Promise.all([
    fetchData(RESPONSIBLE_TRAVEL_SLUG, { language: params.lang?.toUpperCase() }),
    fetchData(REVIEWS_SLUG_QUERY, { language: params.lang?.toUpperCase() }),
    fetchData(WHO_ARE_WE_SLUG, { language: params.lang?.toUpperCase() })
  ])
  
  return [
    { item: responsible?.page?.translation?.responsibleTravel?.banner?.slug },
    { item: reviews?.page?.translation?.aboutUsReviews?.banner?.slug },
    { item: whoRWe?.page?.translation?.who_we_are?.banner?.slug }
  ]
}

export default async function page({ params }) {
  const { data } = await fetchData(ABOUT_US_QUERY)

  const listSlugPage = data?.page?.listslugaboutus?.listslugpage
  let id = ''
  let index = ''
  listSlugPage?.forEach((slugItem, idx) => {
    if (slugItem?.itempage?.find((e) => e?.slugs?.includes(params?.item))) {
      id = slugItem?.itempage?.find((e) => e?.slugs?.includes(params?.item))?.id
      index = idx
    }
  })
  if (index === 1) {
    const res = await fetchData(GET_RESPONSIBLE_TRAVEL_DATA, { language: params?.lang?.toUpperCase() })
    const bannerData = res?.data?.page?.translation?.responsibleTravel?.banner
    const contentData = res?.data?.page?.translation?.responsibleTravel?.main
    return (
      <div>
        <Banner data={bannerData} />
        <Responsible data={contentData} />
      </div>
    )
  }
  if (index === 2) {
    const res = await fetchData(GET_REVIEWS_DATA, { language: params?.lang?.toUpperCase() })
    const dataCountry = await fetchData(DATA_TAXONOMIES_COUNTRY, { language: params?.lang?.toUpperCase() })
    const dataYear = await fetchData(getYearReview)
    const arrCountry = dataCountry?.data?.allCountries?.nodes || []
    arrCountry?.sort(function (a, b) {
      var numA = parseInt(a?.country?.priority)
      var numB = parseInt(b?.country?.priority)
      return numA - numB
    })
    const arrYear = dataYear?.data?.allYears?.nodes?.map((item) => item?.name)
    return (
      <IndexAboutUs
        res={res}
        lang={params?.lang}
        arrCountry={arrCountry}
        arrYear={arrYear}
      />
    )
  }
  const res = await fetchData(GET_WHO_WE_ARE_DATA, { language: params?.lang?.toUpperCase() })
  const bannerData = res?.data?.page?.translation?.who_we_are?.banner
  const contentData = res?.data?.page?.translation?.who_we_are?.content
  return (
    <div className='w-full'>
      <Banner data={bannerData} />
      <Statistics data={contentData} />
      <AboutVideo data={contentData?.descriptionVideo} lang={params?.lang}/>
      <Staffs data={contentData?.staffs} />
    </div>
  )
}
