import fetchData from "@/data/fetchData"
import { i18n } from "../../../i18n-config"
import { PROMOTION_TOUR_SLUGS } from "@/graphql/tourDetail/queries"
import { BLOGS_SLUG_QUERY } from "@/graphql/home/queries"
import { TRAVEL_STYLE_SLUG_QUERY } from "@/graphql/travelStyle/queries"
import { DATA_MENU_COUNTRY } from "@/graphql/country/queries"
import { SERVICES_SLUG_QUERY } from "@/data/getDataRcmServices"
import { RESPONSIBLE_TRAVEL_SLUG } from "@/graphql/aboutUs/responsible-travel/queries"
import { WHO_ARE_WE_SLUG } from "@/graphql/aboutUs/who-we-are/queries"
import { REVIEWS_SLUG_QUERY } from "@/graphql/aboutUs/reviews/queries"
import { RECOMMENDED_SERVICES_POST_SLUGS } from "@/graphql/post/queries"

const GET_POSTS = `{
  posts(first: 100){
    nodes{
      slug
      date
    }
  }
}`

export const TOURS_SLUG_QUERY = `
query ($language: LanguageCodeEnum!) {
  allTours(first: 1000){
    nodes{
      translation(language: $language) {
        slug
        date
        language {
          id
        }
      }
    }
  }
}
`

export default async function sitemap() {
  const { locales } = i18n
  const posts = await fetchData(GET_POSTS)
  const arrLocales = [{ value: 'en', id: 'TGFuZ3VhZ2U6ZW4=' }, { value: 'it', id: 'TGFuZ3VhZ2U6aXQ=' }, { value: 'fr', id: 'TGFuZ3VhZ2U6ZnI=' }]

  const [
    countriesEn,
    tourStylesEn,
    allToursEn,
    categoriesEn,
    hotDealsEn,
    recommendServiceEn,
    countriesFr,
    tourStylesFr,
    allToursFr,
    categoriesFr,
    hotDealsFr,
    recommendServiceFr,
    countriesIt,
    tourStylesIt,
    allToursIt,
    categoriesIt,
    hotDealsIt,
    recommendServiceIt,
    aboutUsTravelEn,
    aboutUsReviewsEn,
    aboutUsWhoAreWeEn,
    aboutUsTravelFr,
    aboutUsReviewsFr,
    aboutUsWhoAreWeFr,
    aboutUsTravelIt,
    aboutUsReviewsIt,
    aboutUsWhoAreWeIt,
  ] = await Promise.all([
    fetchData(DATA_MENU_COUNTRY, { language: "EN" }),
    fetchData(TRAVEL_STYLE_SLUG_QUERY, { language: "EN" }),
    fetchData(TOURS_SLUG_QUERY, { language: "EN" }),
    fetchData(BLOGS_SLUG_QUERY, { language: "EN" }),
    fetchData(PROMOTION_TOUR_SLUGS, { language: "EN" }),
    fetchData(SERVICES_SLUG_QUERY, { language: "EN" }),

    fetchData(DATA_MENU_COUNTRY, { language: "FR" }),
    fetchData(TRAVEL_STYLE_SLUG_QUERY, { language: "FR" }),
    fetchData(TOURS_SLUG_QUERY, { language: "FR" }),
    fetchData(BLOGS_SLUG_QUERY, { language: "FR" }),
    fetchData(PROMOTION_TOUR_SLUGS, { language: "FR" }),
    fetchData(SERVICES_SLUG_QUERY, { language: "FR" }),

    fetchData(DATA_MENU_COUNTRY, { language: "IT" }),
    fetchData(TRAVEL_STYLE_SLUG_QUERY, { language: "IT" }),
    fetchData(TOURS_SLUG_QUERY, { language: "IT" }),
    fetchData(BLOGS_SLUG_QUERY, { language: "IT" }),
    fetchData(PROMOTION_TOUR_SLUGS, { language: "IT" }),
    fetchData(SERVICES_SLUG_QUERY, { language: "IT" }),

    fetchData(RESPONSIBLE_TRAVEL_SLUG, { language: "EN" }),
    fetchData(REVIEWS_SLUG_QUERY, { language: "EN" }),
    fetchData(WHO_ARE_WE_SLUG, { language: "EN" }),
    fetchData(RESPONSIBLE_TRAVEL_SLUG, { language: "FR" }),
    fetchData(REVIEWS_SLUG_QUERY, { language: "FR" }),
    fetchData(WHO_ARE_WE_SLUG, { language: "FR" }),
    fetchData(RESPONSIBLE_TRAVEL_SLUG, { language: "IT" }),
    fetchData(REVIEWS_SLUG_QUERY, { language: "IT" }),
    fetchData(WHO_ARE_WE_SLUG, { language: "IT" })
  ])
  let initArrRecommendDetail = [];

  let mergeArrRecommendService = recommendServiceEn?.data?.categories?.nodes.concat(
    recommendServiceFr?.data?.categories?.nodes,
    recommendServiceIt?.data?.categories?.nodes);

  const recommendPost = arrLocales.map(lang => {
    return mergeArrRecommendService?.map(item => ({
      lang: lang?.value,
      category: item?.slug,
      slug: RECOMMENDED_SERVICES_POST_SLUGS,
      variables: { categorySlug: item?.slug, language: lang?.value?.toUpperCase() }
    })
    )
  })
  const flatArr = recommendPost.flat()
  const dataRecommends = await Promise.all(flatArr.map(item => fetchData(item.slug, item.variables)))

  const rcPosts = dataRecommends.map(({ data }) => data?.posts?.nodes)

  rcPosts.forEach((post, index) => {
    post.forEach(e => {
      if(e?.translation){
        initArrRecommendDetail.push({
          url: `${process.env.DOMAIN}${flatArr[index].lang === "en" ? '' : `/${flatArr[index].lang}`}/recommended-services/${flatArr[index].category}/${e?.translation?.slug}`,
          lastModified: new Date(),
          priority: 0.8
        })
      }
    })

  })

  let mergeArrCountry = countriesEn?.data?.allCountries?.nodes.concat(
    countriesFr?.data?.allCountries?.nodes,
    countriesIt?.data?.allCountries?.nodes);

  let mergeArrStyle = tourStylesEn?.data?.allTourStyle?.nodes.concat(
    tourStylesFr?.data?.allTourStyle?.nodes,
    tourStylesIt?.data?.allTourStyle?.nodes);

  let mergeArrCategory = categoriesEn?.data?.blogs?.nodes.concat(
    categoriesFr?.data?.blogs?.nodes,
    categoriesIt?.data?.blogs?.nodes);

  let mergeArrHotDeal = hotDealsIt?.data?.promotionTours?.nodes.concat(
    hotDealsFr?.data?.promotionTours?.nodes,
    hotDealsEn?.data?.promotionTours?.nodes);

  let mergeArrAllTour = allToursEn.data?.allTours?.nodes.concat(
    allToursFr?.data?.allTours?.nodes,
    allToursIt?.data?.allTours?.nodes);

  let mergeArrAboutUsReview = [].concat(
    aboutUsReviewsEn?.data?.page?.translation,
    aboutUsReviewsFr?.data?.page?.translation,
    aboutUsReviewsIt?.data?.page?.translation);

  let mergeArrAboutUsWhoAreWe = [].concat(
    aboutUsWhoAreWeEn?.data?.page?.translation,
    aboutUsWhoAreWeFr?.data?.page?.translation,
    aboutUsWhoAreWeIt?.data?.page?.translation);

  let mergeArrAboutUsTravel = [].concat(aboutUsTravelEn?.data?.page.translation,
    aboutUsTravelFr?.data?.page.translation,
    aboutUsTravelIt?.data?.page.translation)

  let initArrCommon = [];

  let initArrCountry = [];
  let initArrStyle = [];
  let initArrCategory = [];
  let initArrHotDeal = [];
  let initAllTour = [];
  let initArrRecommendService = [];
  let initArrAboutUsReview = [];
  let initArrAboutUsWhoAreWe = [];
  let initArrAboutUsTravel = [];

  arrLocales?.map(async (lang) => {
    mergeArrCountry?.map((e) => {
      if (e && lang?.id === e?.language?.id) {
        initArrCountry.push({
          url: `${process.env.DOMAIN}${lang.value === "en" ? '' : `/${lang.value}`}/destinations/${e?.slug}`,
          lastModified: new Date(),
          priority: 0.8
        })
      }
    })

    mergeArrStyle?.map((e) => {
      if (e?.translation && lang?.id === e?.translation?.language?.id) {
        initArrStyle.push({
          url: `${process.env.DOMAIN}${lang.value === "en" ? '' : `/${lang.value}`}/types-of-trips/${e?.translation?.slug}`,
          lastModified: new Date(),
          priority: 0.8
        })
      }
    })

    mergeArrHotDeal?.map((e) => {
      if (e?.translation && lang?.id === e?.translation?.language?.id) {
        initArrHotDeal.push({
          url: `${process.env.DOMAIN}${lang.value === "en" ? '' : `/${lang.value}`}/hot-deals/${e?.translation?.slug}`,
          lastModified: new Date(),
          priority: 0.8
        })
      }
    })

    mergeArrCategory?.map((e) => {
      if (e?.translation && lang?.id === e?.translation?.language?.id) {
        initArrCategory.push({
          url: `${process.env.DOMAIN}${lang.value === "en" ? '' : `/${lang.value}`}/blog/${e?.translation?.slug}`,
          lastModified: new Date(),
          priority: 0.8
        })
      }
    })

    mergeArrAllTour?.map((e) => {
      if (e?.translation && lang?.id === e?.translation?.language?.id) {
        initAllTour.push({
          url: `${process.env.DOMAIN}${lang.value === "en" ? '' : `/${lang.value}`}/${e?.translation?.slug}`,
          lastModified: new Date(),
          priority: 0.8
        })
      }
    })

    mergeArrRecommendService?.map((e) => {
      if (e && lang?.id === e?.language?.id) {
        initArrRecommendService.push({
          url: `${process.env.DOMAIN}${lang.value === "en" ? '' : `/${lang.value}`}/recommended-services/${e?.slug}`,
          lastModified: new Date(),
          priority: 0.8
        })
      }
    })

    mergeArrAboutUsReview?.map((e) => {
      if (e && lang?.id === e?.language?.id) {
        initArrAboutUsReview.push({
          url: `${process.env.DOMAIN}${lang.value === "en" ? '' : `/${lang.value}`}/about-us/${e?.aboutUsReviews.banner?.slug}`,
          lastModified: new Date(),
          priority: 0.8
        })
      }
    })
    mergeArrAboutUsTravel?.map((e) => {
      if (e && lang?.id === e?.language?.id) {
        initArrAboutUsTravel.push({
          url: `${process.env.DOMAIN}${lang.value === "en" ? '' : `/${lang.value}`}/about-us/${e?.responsibleTravel.banner?.slug}`,
          lastModified: new Date(),
          priority: 0.8
        })
      }
    })
    mergeArrAboutUsWhoAreWe?.map((e) => {
      if (e && lang?.id === e?.language?.id) {
        initArrAboutUsWhoAreWe.push({
          url: `${process.env.DOMAIN}${lang.value === "en" ? '' : `/${lang.value}`}/about-us/${e?.who_we_are.banner?.slug}`,
          lastModified: new Date(),
          priority: 0.8
        })
      }
    })
  })
  const DEFAULT_VALUE_DOMAIN = ['hot-deals', 'check-visa', 'blog']
  locales?.map((lang) => {
    const langDomain = `${process.env.DOMAIN}${lang === 'en' ? '' : `/${lang}`}`
    DEFAULT_VALUE_DOMAIN.map((value) => {
      initArrCommon.push({
        url: `${langDomain}/${value}`,
        lastModified: new Date(),
        priority: 0.9
      })

    })

  })
  return [
    {
      url: process.env.DOMAIN,
      lastModified: new Date(),
      priority: 1
    },
    ...initArrCommon,
    ...initAllTour,
    ...initArrCountry,
    ...initArrStyle,
    ...initArrCategory,
    ...initArrHotDeal,
    ...initArrRecommendService,
    ...initArrAboutUsReview,
    ...initArrAboutUsTravel,
    ...initArrAboutUsWhoAreWe,
    ...initArrRecommendDetail
  ]
}
