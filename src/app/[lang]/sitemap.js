import fetchData from "@/data/fetchData"

const GET_POSTS = `{
  posts(first: 100){
    nodes{
      slug
      date
    }
  }
}`

const GET_TOURS = `
{
  allTours(first: 100){
    nodes{
      slug
      date
    }
  }
}
`

export const TOURS_SLUG_QUERY = `
query ($language: LanguageCodeEnum!) {
  allTours(first: 1000){
    nodes{
      translation(language: $language) {
        slug
      }
    }
  }
}
`
const GET_COUNTRIES = `
{
  allCountries(first:100,where:{language:EN}){
    nodes{
      slug
    }
  }
}`

const GET_TOUR_STYLE = `
{
  allTourStyle(first:100,where:{language:EN}){
    nodes{
      slug
    }
  }
}
`
const GET_CATEGORIES = `
{
  categories(where:{language:EN}){
    nodes{
      slug
    }
  }
}
`
const GET_HOT_DEAL = `
{
  page(id: "cG9zdDoxMTAy", idType: ID) {
    translation(language: EN) {
      hotDeals {
        promotionList {
          ... on Tours {
            slug
            date
          }
        }
      }
    }
  }
}
`

export default async function sitemap() {
  const posts = await fetchData(GET_POSTS)
  const tours = await fetchData(GET_TOURS)
  const countries = await fetchData(GET_COUNTRIES)
  const tourStyles = await fetchData(GET_TOUR_STYLE)
  const categories = await fetchData(GET_CATEGORIES)
  const hotDeals = await fetchData(GET_HOT_DEAL)

  const arrPosts = posts?.data?.posts?.nodes?.map((e) => {
    return {
      url: `${process.env.DOMAIN}/${e?.slug}`,
      lastModified: e?.date,
      priority: 0.8
    }
  })
  const arrTours = tours?.data?.allTours?.nodes?.map((e) => {
    return {
      url: `${process.env.DOMAIN}/${e?.slug}`,
      lastModified: e?.date,
      priority: 0.8
    }
  })
  const arrCountries = countries?.data?.allCountries?.nodes?.map((e) => {
    return {
      url: `${process.env.DOMAIN}/destinations/${e?.slug}`,
      lastModified: new Date(),
      priority: 0.8
    }
  })
  const arrTourStyles = tourStyles?.data?.allTourStyle?.nodes?.map((e) => {
    return {
      url: `${process.env.DOMAIN}/types-of-trips/${e?.slug}`,
      lastModified: new Date(),
      priority: 0.8
    }
  })
  const arrCategories = categories?.data?.categories?.nodes?.map((e) => {
    return {
      url: `${process.env.DOMAIN}/blog/${e?.slug}`,
      lastModified: new Date(),
      priority: 0.8
    }
  })
  const arrHotDeals = hotDeals?.data?.page?.translation?.hotDeals?.promotionList?.map((e) => {
    return {
      url: `${process.env.DOMAIN}/hot-deals/${e?.slug}`,
      lastModified: e?.date,
      priority: 0.8
    }
  })
  return [
    {
      url: process.env.DOMAIN,
      lastModified: new Date(),
      priority: 1
    },
    {
      url: `${process.env.DOMAIN}/hot-deals`,
      lastModified: new Date(),
      priority: 0.9
    },
    {
      url: `${process.env.DOMAIN}/check-visa`,
      lastModified: new Date(),
      priority: 0.9
    },
    {
      url: `${process.env.DOMAIN}/blog`,
      changeFrequency: 'weekly',
      lastModified: new Date(),
      priority: 0.9
    },
    {
      url: `${process.env.DOMAIN}/about-us/who-we-are`,
      lastModified: new Date(),
      priority: 0.9
    },
    {
      url: `${process.env.DOMAIN}/about-us/responsible-travel`,
      lastModified: new Date(),
      priority: 0.9
    },
    {
      url: `${process.env.DOMAIN}/about-us/reviews`,
      lastModified: new Date(),
      priority: 0.9
    },
    ...arrPosts,
    ...arrTours,
    ...arrCountries,
    ...arrTourStyles,
    ...arrCategories,
    ...arrHotDeals
  ]
}
