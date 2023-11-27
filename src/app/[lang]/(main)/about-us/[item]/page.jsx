import AboutVideo from '@/components/Common/Video'
import fetchData from '@/data/fetchData'
import { GET_WHO_WE_ARE_DATA } from '@/graphql/aboutUs/who-we-are/queries'
import Banner from '@/pageComponent/AboutUs/Banner/Banner'
import Statistics from '@/pageComponent/AboutUs/who-we-are/Statistics'
import Staffs from '@/pageComponent/AboutUs/who-we-are/staffs/Staffs'
import { ABOUT_US_QUERY, GET_RESPONSIBLE_TRAVEL_DATA } from '@/graphql/aboutUs/responsible-travel/queries'
import Responsible from '@/pageComponent/AboutUs/responsible-travel/Responsible'

import { GET_REVIEWS_DATA } from '@/graphql/aboutUs/reviews/queries'
import { DATA_TAXONOMIES_COUNTRY } from '@/graphql/filter/queries'
import IndexAboutUs from '@/pageComponent/AboutUs'

const getYearReview = `query {
  allYears {
    nodes {
      name
    }
  }
}`

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
      <AboutVideo data={contentData?.descriptionVideo} />
      <Staffs data={contentData?.staffs} />
    </div>
  )
}