import getDataPost from '@/data/getDataPost'
import getDataWithTaxonomy from '@/data/getDataWithTaxonomy'
import { getMeta } from '@/data/metaData/getMeta'
import getMetaDataPages from '@/data/metaData/getMetaDataPages'
import { DATA_MENU_COUNTRY } from '@/graphql/country/queries'
import { DATA_TAXONOMIES_BUDGET } from '@/graphql/filter/queries'
import { GET_ALL_POST } from '@/graphql/post/queries'
import { GET_META_DATA, GET_SEARCH_INFO } from '@/graphql/search/queries'
import { GET_LIST_TRAVEL_STYLE_NAME } from '@/graphql/travelStyle/queries'
import Search from '@/pageComponent/Search/Search'

export async function generateMetadata({ params: { lang } }) {
  const res = await getMetaDataPages(GET_META_DATA, lang)

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
    getDataWithTaxonomy({ lang: lang || 'EN' }, GET_LIST_TRAVEL_STYLE_NAME),
    getDataPost(lang, DATA_TAXONOMIES_BUDGET),
    getDataPost(lang, DATA_MENU_COUNTRY),
    getDataPost(lang, GET_ALL_POST),
    getDataPost(lang, GET_SEARCH_INFO)
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
