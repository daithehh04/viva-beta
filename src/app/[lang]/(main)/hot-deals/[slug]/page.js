import Promotion from '@/pageComponent/HotDeal'
import getTourDetail from '@/data/tourDetail/getTourDetail'
import getTourDetailHeader from '@/data/tourDetail/getTourDetailHeader'
import { GET_TOUR_DETAIL } from '@/graphql/tourDetail/queries'
import getListPromotionTour from '@/data/hotDeal/getListPromotionTour'
import getMetaDataTour from '@/data/metaData/getMetaData'
import { GET_TOUR_META_DATA } from '@/graphql/metaData/queries'
import { getMeta } from '@/data/metaData/getMeta'
import getDataPost from '@/data/getDataPost'
import { GET_ALL_REVIEWS } from '@/graphql/customersReview/queries'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'
import getDataFormBookTour from '@/data/formBookTour/getDataFormBookTour'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params: { slug, lang } }) {
  const res = await getMetaDataTour(GET_TOUR_META_DATA, lang, slug)

  const tourDetail = res?.data?.tours?.translation?.tourDetail
  const featuredImage = res?.data?.page?.translation?.featuredImage
  const title = tourDetail?.meta?.title
  const excerpt = tourDetail?.meta?.description
  return getMeta(title, excerpt, featuredImage)
}

export default async function page({ params: { lang, slug } }) {
  const ID = cG9zdDoxNDIy
  const [
    result,
    headerData,
    res,
    result4,
    dataBookTour
  ] = await Promise.all([
    getTourDetail(GET_TOUR_DETAIL, slug, lang),
    getTourDetailHeader(lang),
    getListPromotionTour(lang),
    getDataPost(lang, GET_ALL_REVIEWS),
    getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, ID, lang)
  ])
  const promotionList = res?.data?.page?.hotDeals?.promotionList
  // get Default list Reviews
  const reviewsList = result4?.data?.allCustomerReview?.nodes
  const otherPromotionTours = promotionList?.filter(
    (item) => item.translation.id != result?.data?.tours?.translation?.id
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
