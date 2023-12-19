import HotDeal from '@/components/Common/HotDeal'
import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { getDictionary } from '@/get-dictionary'
import { GET_ALL_VOUCHER, GET_META_DATA } from '@/graphql/hotDeal/queries'

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
  
  const dataVoucher = await fetchData(GET_ALL_VOUCHER, { language: lang?.toUpperCase() })

  const listVoucher = dataVoucher?.data?.allVouchers?.nodes
  const dictionary = await getDictionary(lang)
  return (
    <HotDeal
      listVoucher={listVoucher}
      lang={lang}
      dictionary={dictionary}
    />
  )
}

export default page
