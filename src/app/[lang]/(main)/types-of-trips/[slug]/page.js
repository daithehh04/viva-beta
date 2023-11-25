import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { GET_META_DATA, TRAVEL_STYLE_SLUG_QUERY } from '@/graphql/travelStyle/queries'
import Travel from '@/pageComponent/TravelStyle'

export async function generateMetadata({ params: { lang, slug } }) {
  const res = await fetchData(GET_META_DATA, {
    language: lang?.toUpperCase(),
    slug
  })
  if (!res) return {}
  const { banner } = res?.data?.tourStyle?.translation || ''
  const title = banner?.meta?.title
  const excerpt = banner?.meta?.description
  return getMeta(title, excerpt)
}

// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams({ params }) {
//   const { data } = await fetchData(TRAVEL_STYLE_SLUG_QUERY, { language: params.lang?.toUpperCase() })

//   const tours = data?.allTourStyle?.nodes || []

//   return tours.map((tour) => ({
//     slug: tour?.translation?.slug || undefined
//   }))
// }

function page({ params: { lang, slug } }) {
  return (
    <div>
      <Travel
        lang={lang}
        slug={slug}
      />
    </div>
  )
}

export default page
