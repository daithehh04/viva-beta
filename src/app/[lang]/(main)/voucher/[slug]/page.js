import fetchData from "@/data/fetchData"
import { getMeta } from "@/data/metaData/getMeta"
import { DATA_VOUCHER_DETAIL, GET_HOT_DEAL_DATA, VOUCHER_SLUG_QUERY } from "@/graphql/hotDeal/queries"
import DetailVocher from "@/pageComponent/HotDeal/DetailVoucher"


export async function generateMetadata({ params: { slug, lang } }) {
  const data = await fetchData(DATA_VOUCHER_DETAIL, { slug, language: lang?.toUpperCase() })
  const title = data?.data?.vouchers?.translation?.title + " | Asia Viva Travel"
  return getMeta(title, null, null)
}

// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams({ params }) {
//   const { data } = await fetchData(VOUCHER_SLUG_QUERY, { language: params.lang?.toUpperCase() })

//   const vouchers = data?.page?.translation?.hotDeals?.voucherHeader?.listVoucher || []

//   return vouchers.map((voucher) => ({
//     slug: voucher?.translation?.slug
//   }))
// }

async function page({ params: { lang, slug } }) {
  const [result, data] = await Promise.all([
    fetchData(GET_HOT_DEAL_DATA, { language: lang?.toUpperCase() }),
    fetchData(DATA_VOUCHER_DETAIL, { slug: slug, language: lang?.toUpperCase() })
  ])
  const hotDeals = result?.data?.page?.translation?.hotDeals
  const dataVoucher = data?.data?.vouchers?.translation?.voucher
  return (
    <div className='w-full h-full bg-white overflow-y-auto md:rounded-[16px] overflow-x-hidden'>
      <DetailVocher
        headerData={hotDeals?.voucherHeader?.detailHeader}
        data={dataVoucher}
        lang={lang}
      />
    </div>
  )
}

export default page