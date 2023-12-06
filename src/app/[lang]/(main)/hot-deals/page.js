import HotDeal from '@/components/Common/HotDeal'
import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { getDictionary } from '@/get-dictionary'
import { GET_HOT_DEAL_DATA, GET_META_DATA } from '@/graphql/hotDeal/queries'

export async function generateMetadata({ params: { lang } }) {
  const res = await fetchData(GET_META_DATA, {
    language: lang?.toUpperCase()
  })
  const { hotDeals } = res?.data?.page?.translation
  const featuredImage = res?.data?.page?.translation?.featuredImage

  const title = hotDeals?.meta?.title
  const excerpt = hotDeals?.meta?.description
  return getMeta(title, excerpt, featuredImage)
}

async function page({ params: { lang } }) {
  
  const dataHotDeal = await fetchData(GET_HOT_DEAL_DATA, { language: lang?.toUpperCase() })

  const hotDeals = dataHotDeal?.data?.page?.translation?.hotDeals
  const dictionary = await getDictionary(lang)
  
  return (
    <HotDeal
      hotDeals={hotDeals}
      lang={lang}
      dictionary={dictionary}
    />
  )
}

export default page
