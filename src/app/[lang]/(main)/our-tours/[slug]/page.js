import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { GET_META_DATA } from '@/graphql/country/queries'
import Destination from '@/pageComponent/Destination'

export async function generateMetadata({ params: { lang, slug } }) {
  const res = await fetchData(GET_META_DATA, {
    language: lang?.toUpperCase(),
    slug
  })
  const meta = res?.data?.countries?.translation?.country?.meta
  const title = meta?.title
  const excerpt = meta?.description
  return getMeta(title, excerpt)
}
function page({ params: { lang, slug } }) {
  return (
    <div>
      <Destination
        lang={lang}
        slug={slug}
      />
    </div>
  )
}

export default page
