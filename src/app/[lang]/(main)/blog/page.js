import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { getDictionary } from '@/get-dictionary'
import { GET_META_DATA_BLOG } from '@/graphql/metaData/queries'
import { GET_ALL_TOURS_BESTSELLER } from '@/graphql/post/queries'
import Blog from '@/pageComponent/Blog'
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


export async function generateMetadata({ params: { lang } }) {
  const res = await fetchData(GET_META_DATA_BLOG, {
    language: lang?.toUpperCase()
  })
  if (!res) return
  const { ourblog } = res?.data?.page?.translation
  const featuredImage = res?.data?.page?.translation?.featuredImage
  const title = ourblog?.meta?.title
  const excerpt = ourblog?.meta?.description
  return getMeta(title, excerpt, featuredImage)
}
async function Page({ params: { lang } }) {
  const [data, dataInit] = await Promise.all([
    fetchData(GET_ALL_TOURS_BESTSELLER, { language: lang?.toUpperCase() }),
    fetchData(GET_INITIAL_FILTER, { language: lang?.toUpperCase() })
  ])
  const dictionary = await getDictionary(lang)

  return (
    <div>
      <Blog
        lang={lang}
        data1={data}
        initTopic={dataInit?.data?.allTopic}
        initCategories={dataInit?.data?.categories}
        allCountries={dataInit?.data?.allCountries}
        dictionary={dictionary}
      />
    </div>
  )
}

export default Page
