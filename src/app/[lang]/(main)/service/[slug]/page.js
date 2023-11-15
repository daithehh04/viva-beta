import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { GET_ALL_TOURS_BESTSELLER } from '@/graphql/post/queries'
import Service from '@/pageComponent/Service'
const GET_INITIAL_FILTER = `
query($language : LanguageCodeFilterEnum!){
  allTopic(where:{language: $language}){
    nodes{
      slug
      taxonomyName
      name
    }
  }
  categories (where:{language: $language}){
    nodes{
      taxonomyName
      slug
      name
    }
  }
  allCountries(where: {language: $language}) {
     nodes{
      taxonomyName
      slug
      name
    }
  }
}
`
const GET_SLUG_RCM = `
  query($language: LanguageCodeEnum!,$taxonomyValue: ID!) {
  category(idType: SLUG, id: $taxonomyValue) {
    translation(language: $language) {
      slug
    }
  }
}`

const GET_META_DATA_RCM_SERVICE = `
  query ($language: LanguageCodeEnum!) {
  page(id: "cG9zdDoxOTEy") {
    translation(language: $language){
      featuredImage{
        node{
          sourceUrl
          title
          altText
        }
      }
      recommendService{
        meta{
          description
          title
        }
      }
    }
  }
}
  `

export async function generateMetadata({ params: { lang } }) {
  const res = await fetchData(GET_META_DATA_RCM_SERVICE, {
    language: lang?.toUpperCase()
  })
  if (!res) return
  const dataMeta = res?.data?.page?.translation
  const recommendService = dataMeta?.recommendService

  const featuredImage = res?.data?.page?.translation?.featuredImage
  const title = recommendService?.meta?.title
  const excerpt = recommendService?.meta?.description
  return getMeta(title, excerpt, featuredImage)
}

async function Page({ params: { lang, slug } }) {
  const [data, dataInit, slugRcm] = await Promise.all([
    fetchData(GET_ALL_TOURS_BESTSELLER, { id: LANGUAGE_BOOK_IDS[lang], language: lang?.toUpperCase() }),
    fetchData(GET_INITIAL_FILTER, { id: LANGUAGE_BOOK_IDS[lang], language: lang?.toUpperCase() }),
    fetchData(GET_SLUG_RCM, {
      language: lang?.toUpperCase() || 'EN',
      taxonomyValue: slug
    }),
  ])

  return (
    <Service lang={lang}
      slug={slugRcm?.data?.category?.translation?.slug}
      data1={data}
      initTopic={dataInit?.data?.allTopic}
      initDestination={dataInit?.data?.allCountries}
      initCategories={dataInit?.data?.categories}
      allCountries={dataInit?.data?.allCountries}
    />
  )
}

export default Page