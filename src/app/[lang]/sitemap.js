import fetchData from "@/data/fetchData"
import { i18n } from "../../../i18n-config"
import { PROMOTION_TOUR_SLUGS } from "@/graphql/tourDetail/queries"
import { BLOGS_SLUG_QUERY } from "@/graphql/home/queries"
import { TRAVEL_STYLE_SLUG_QUERY } from "@/graphql/travelStyle/queries"
import { DATA_MENU_COUNTRY } from "@/graphql/country/queries"
import { SERVICES_SLUG_QUERY } from "@/data/getDataRcmServices"

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
      }
    }
  }
}
`

export default async function sitemap() {
  const { locales } = i18n
  const posts = await fetchData(GET_POSTS)

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
  ])
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

  let mergeArrRecommendService = recommendServiceEn?.data?.categories?.nodes.concat(
    recommendServiceFr?.data?.categories?.nodes,
    recommendServiceIt?.data?.categories?.nodes);

  let initArrCommon = [];

  let initArrCountry = [];
  let initArrStyle = [];
  let initArrCategory = [];
  let initArrHotDeal = [];
  let initAllTour = [];
  let initArrRecommendService = [];

  locales.map((lang) => {
    mergeArrCountry?.map((e) => {
      if (e) {
        initArrCountry.push({
          url: `${process.env.DOMAIN}/destinations${lang === "en" ? '' : `/${lang}`}/${e?.slug}`,
          lastModified: new Date(),
          priority: 0.8
        })
      }
    })

    mergeArrStyle?.map((e) => {
      if (e?.translation) {
        initArrStyle.push({
          url: `${process.env.DOMAIN}/types-of-trips${lang === "en" ? '' : `/${lang}`}/${e?.translation?.slug}`,
          lastModified: new Date(),
          priority: 0.8
        })
      }
    })

    mergeArrHotDeal?.map((e) => {
      if (e?.translation) {
        initArrHotDeal.push({
          url: `${process.env.DOMAIN}/hot-deals${lang === "en" ? '' : `/${lang}`}/${e?.translation?.slug}`,
          lastModified: e?.translation?.date,
          priority: 0.8
        })
      }
    })

    mergeArrCategory?.map((e) => {
      if (e?.translation) {
        initArrCategory.push({
          url: `${process.env.DOMAIN}/blog${lang === "en" ? '' : `/${lang}`}/${e?.translation?.slug}`,
          lastModified: e?.translation?.date,
          priority: 0.8
        })
      }
    })

    mergeArrAllTour?.map((e) => {
      if (e?.translation) {
        initAllTour.push({
          url: `${process.env.DOMAIN}${lang === "en" ? '' : `/${lang}`}/${e?.translation?.slug}`,
          lastModified: e?.translation?.date,
          priority: 0.8
        })
      }
    })

    mergeArrRecommendService?.map((e) => {
      if (e) {
        initArrRecommendService.push({
          url: `${process.env.DOMAIN}/recommended-services${lang === "en" ? '' : `/${lang}`}/${e?.slug}`,
          lastModified: new Date(),
          priority: 0.8
        })
      }
    })
  })

  const DEFAULT_VALUE_DOMAIN = ['hot-deals', 'check-visa', 'blog', 'about-us/who-we-are', 'about-us/responsible-travel', 'about-us/reviews']
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
    ...initArrRecommendService
  ]
}
