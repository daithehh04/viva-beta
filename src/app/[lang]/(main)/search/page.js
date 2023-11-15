import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { DATA_MENU_COUNTRY } from '@/graphql/country/queries'
import { DATA_TAXONOMIES_BUDGET } from '@/graphql/filter/queries'
import { GET_ALL_POST } from '@/graphql/post/queries'
import { GET_META_DATA, GET_SEARCH_INFO } from '@/graphql/search/queries'
import { GET_LIST_TRAVEL_STYLE_NAME } from '@/graphql/travelStyle/queries'
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
  const [travelStylesList,
    dataTaxonomiesBudget,
    dataMenuCountry,
    resListBlog,
    searchInfoData] = await Promise.all([
      fetchData(GET_LIST_TRAVEL_STYLE_NAME, {
        language: lang?.toUpperCase() || 'EN'
      }),
      fetchData(DATA_TAXONOMIES_BUDGET, { id: LANGUAGE_BOOK_IDS[lang], language: lang?.toUpperCase() }),
      fetchData(DATA_MENU_COUNTRY, { id: LANGUAGE_BOOK_IDS[lang], language: lang?.toUpperCase() }),
      fetchData(GET_ALL_POST, { id: LANGUAGE_BOOK_IDS[lang], language: lang?.toUpperCase() }),
      fetchData(GET_SEARCH_INFO, { id: LANGUAGE_BOOK_IDS[lang], language: lang?.toUpperCase() })
    ])
  const listBlog = resListBlog?.data?.posts?.nodes
  const searchInfo = searchInfoData?.data?.page?.translation?.search
  return (
    <div>
      <Search
        searchInfo={searchInfo}
        lang={lang}
        travelStylesList={travelStylesList}
        dataTaxonomiesBudget={dataTaxonomiesBudget}
        dataMenuCountry={dataMenuCountry}
        listBlog={listBlog}
      />
    </div>
  )
}

export default page
