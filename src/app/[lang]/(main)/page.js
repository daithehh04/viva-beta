import { LANGUAGE_BOOK_IDS, LANGUAGE_IDS } from '@/configs/global-config'
import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import {
  DATA_TAXONOMIES_BUDGET,
  DATA_TAXONOMIES_COUNTRY,
  DATA_TAXONOMIES_DURATION,
  DATA_TAXONOMIES_TOUR_STYLE
} from '@/graphql/filter/queries'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'
import { GET_HOME_PAGE, GET_INITIAL_FILTER, GET_META_DATA, GET_NEXT_STEP } from '@/graphql/home/queries'
import Home from '@/pageComponent/Home'

export async function generateMetadata({ params: { lang } }) {
  const res = await fetchData(GET_META_DATA, {
    language: lang?.toUpperCase()
  })

  const home = res?.data?.page?.translation?.home
  const featuredImage = res?.data?.page?.translation?.featuredImage
  const title = home?.meta?.title
  const excerpt = home?.meta?.description
  return getMeta(title, excerpt, featuredImage)
}

 
export default async function page({ params: { lang } }) {
  const data = await fetchData(GET_HOME_PAGE, { id: LANGUAGE_IDS[lang] })
  const dataBookTour = await fetchData(GET_DATA_FORM_BOOKTOUR, { id: LANGUAGE_BOOK_IDS[lang], language: lang?.toUpperCase() })

  const dataInit = await fetchData(GET_INITIAL_FILTER, { language: lang?.toUpperCase() })

  const metaDestination = dataInit?.data?.allCountries?.nodes
  const metaCategories = dataInit?.data?.categories?.nodes

  const arrayDesInit = []
  const arrayCateInit = []

  metaDestination?.map((des, index) => {
    arrayDesInit.push(des?.slug)
  })
  metaCategories?.map((cate, index) => {
    arrayCateInit.push(cate?.slug)
  })

  const [nextStep,
    dataTaxonomiesCountry,
    dataTaxonomiesStyleTour,
    dataTaxonomiesBudget,
    dataTaxonomiesDuration
  ] = await Promise.all([
    fetchData(GET_NEXT_STEP, { language: lang?.toUpperCase() }),
    fetchData(DATA_TAXONOMIES_COUNTRY, { language: lang?.toUpperCase() }),
    fetchData(DATA_TAXONOMIES_TOUR_STYLE, { language: lang?.toUpperCase() }),
    fetchData(DATA_TAXONOMIES_BUDGET, { language: lang?.toUpperCase() }),
    fetchData(DATA_TAXONOMIES_DURATION, { language: lang?.toUpperCase() }),
  ])
  return (
    <main>
      <Home
        nextStep={nextStep}
        lang={lang}
        data={data}
        dataTaxonomiesCountry={dataTaxonomiesCountry}
        dataTaxonomiesStyleTour={dataTaxonomiesStyleTour}
        dataTaxonomiesBudget={dataTaxonomiesBudget}
        dataTaxonomiesDuration={dataTaxonomiesDuration}
        dataBookTour={dataBookTour}
        arrayDesInit={arrayDesInit}
        arrayCateInit={arrayCateInit}
      />
    </main>
  )
}