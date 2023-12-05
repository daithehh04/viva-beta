import { LANGUAGE_BOOK_IDS } from '@/configs/global-config'
import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { getDictionary } from '@/get-dictionary'
import { GET_INITIAL_FILTER } from '@/graphql/home/queries'
import { GET_ALL_POST, GET_ALL_POST_FILTER_BY_COUNTRY } from '@/graphql/post/queries'
import { GET_META_DATA, GET_SEARCH_INFO } from '@/graphql/search/queries'
import Search from '@/pageComponent/Search/Search'

export async function generateMetadata({ params: { lang } }) {
  const res = await fetchData(GET_META_DATA, {
    language: lang?.toUpperCase()
  })

  const title = res?.data?.page?.translation?.search?.meta?.title
  const excerpt = res?.data?.page?.translation?.search?.meta?.description
  return getMeta(title, excerpt, res?.data?.page?.translation?.featuredImage)
}
async function page({ params: { lang } }) {
  const dataInit  = await fetchData(GET_INITIAL_FILTER, { language: lang?.toUpperCase() });
  const metaDestination = dataInit?.data?.allCountries?.nodes || []
  const arrayDesInit = metaDestination?.map((des) => des?.slug)

  const [
    resListBlog,
    searchInfoData] = await Promise.all([
      fetchData(GET_ALL_POST_FILTER_BY_COUNTRY, {language: lang?.toUpperCase(), destinationSlug: arrayDesInit}),
      fetchData(GET_SEARCH_INFO, { id: LANGUAGE_BOOK_IDS[lang], language: lang?.toUpperCase() })
    ])
  const listBlog = resListBlog?.data?.blogs?.nodes
  const searchInfo = searchInfoData?.data?.page?.translation?.search
  const dictionary = await getDictionary(lang)

  return (
    <div>
      <Search
        searchInfo={searchInfo}
        lang={lang}
        listBlog={listBlog}
        dictionary={dictionary}
      />
    </div>
  )
}

export default page
