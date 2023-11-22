import { LANGUAGE_BOOK_IDS } from '@/configs/global-config'
import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { GET_ALL_REVIEWS } from '@/graphql/customersReview/queries'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'
import { GET_LIST_PROMOTION_TOUR, PROMOTION_TOUR_SLUG_QUERY } from '@/graphql/hotDeal/queries'
import { GET_TOUR_META_DATA } from '@/graphql/metaData/queries'
import { GET_TOUR_DETAIL, GET_TOUR_DETAIL_HEADER } from '@/graphql/tourDetail/queries'
import Promotion from '@/pageComponent/HotDeal'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params: { slug, lang } }) {
  const res = await fetchData(GET_TOUR_META_DATA, {
    language: lang?.toUpperCase(),
    slug
  })
  const tourDetail = res?.data?.tours?.translation?.tourDetail
  const featuredImage = res?.data?.page?.translation?.featuredImage
  const title = tourDetail?.meta?.title
  const excerpt = tourDetail?.meta?.description
  return getMeta(title, excerpt, featuredImage)
}

// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams({ params }) {
//   const { data } = await fetchData(PROMOTION_TOUR_SLUG_QUERY, { language: params.lang?.toUpperCase() })

//   const hotDeals = data?.page?.translation?.hotDeals?.promotionList || []

//   return hotDeals.map((hotDeal) => ({
//     slug: hotDeal?.translation?.slug
//   }))
// }

export default async function page({ params: { lang, slug } }) {
  const [
    result,
    headerData,
    res,
    result4,
    dataBookTour
  ] = await Promise.all([
    fetchData(GET_TOUR_DETAIL, { slug: slug, language: lang?.toUpperCase() }),
    fetchData(GET_TOUR_DETAIL_HEADER, { language: lang?.toUpperCase() }),
    fetchData(GET_LIST_PROMOTION_TOUR, { language: lang?.toUpperCase() }),
    fetchData(GET_ALL_REVIEWS, { language: lang?.toUpperCase() }),
    fetchData(GET_DATA_FORM_BOOKTOUR, { id: LANGUAGE_BOOK_IDS[lang], language: lang?.toUpperCase() })
  ])
  const promotionList = res?.data?.page?.hotDeals?.promotionList
  // get Default list Reviews
  const reviewsList = result4?.data?.allCustomerReview?.nodes
  const otherPromotionTours = promotionList?.filter(
    (item) => item?.translation?.id != result?.data?.tours?.translation?.id
  )
  if (!result?.data?.tours?.translation?.tourDetail) {
    notFound()
  }
  return (
    <Promotion
      data={result?.data?.tours?.translation?.tourDetail || {}}
      headerData={headerData?.data?.page?.translation?.tourDetailHeading}
      relatedTours={otherPromotionTours}
      reviewsList={reviewsList}
      slug={slug}
      lang={lang}
      dataBookTour={dataBookTour}
    />
  )
}
