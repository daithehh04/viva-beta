import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { GET_META_DATA, GET_REVIEWS_DATA } from '@/graphql/aboutUs/reviews/queries'
import { DATA_TAXONOMIES_COUNTRY } from '@/graphql/filter/queries'
import IndexAboutUs from '@/pageComponent/AboutUs'

const getYearReview = `query {
  allYears {
    nodes {
      name
    }
  }
}`
export async function generateMetadata({ params: { lang } }) {
  const res = await fetchData(GET_META_DATA, {
    language: lang?.toUpperCase()
  })

  const { aboutUsReviews } = res?.data?.page?.translation

  const featuredImage = res?.data?.page?.translation?.featuredImage
  const title = aboutUsReviews?.meta?.title
  const excerpt = aboutUsReviews?.meta?.description
  return getMeta(title, excerpt, featuredImage)
}

export default async function page({ params: { lang } }) {
  const res = await fetchData(GET_REVIEWS_DATA, {language: lang?.toUpperCase()})
  const dataCountry = await fetchData(DATA_TAXONOMIES_COUNTRY, { language: lang?.toUpperCase() })
  const dataYear = await fetchData(getYearReview)
  const arrCountry = dataCountry?.data?.allCountries?.nodes || []
  arrCountry?.sort(function(a, b) {
    var numA = parseInt(a?.country?.priority);
    var numB = parseInt(b?.country?.priority);
    return numA - numB;
  });
  const arrYear = dataYear?.data?.allYears?.nodes?.map(item => item?.name)
  return (
    <IndexAboutUs
      res={res}
      lang={lang}
      arrCountry={arrCountry}
      arrYear={arrYear}
    />
  )
}
