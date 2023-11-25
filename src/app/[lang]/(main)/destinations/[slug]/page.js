import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { DATA_MENU_COUNTRY, GET_META_DATA } from '@/graphql/country/queries'
import Banner from '@/pageComponent/Destination/Banner'
import CustomerReview from '@/pageComponent/Destination/CustomerReview'
import FilterPopup from '@/pageComponent/Destination/FilterPopup'
import OurBlog from '@/pageComponent/Destination/OurBlog'
import SectionActions from '@/pageComponent/Destination/SectionActions'
import SlideDestination from '@/pageComponent/Destination/SlideDestination'
import { Suspense } from 'react'

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

// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams({ params }) {
//   const { data } = await fetchData(DATA_MENU_COUNTRY, { language: params.lang?.toUpperCase() })

//   const countries = data?.allCountries?.nodes

//   return countries.map((country) => ({
//     slug: country.slug,
//   }))
// }

function page({ params: { lang, slug } }) {
  return (
    <div>
      <Suspense fallback={<Banner.Skeleton />}>
        <Banner
          slug={slug}
          lang={lang}
        />
      </Suspense>
      <FilterPopup />
      <Suspense fallback={<SectionActions.Skeleton />}>
        <SectionActions lang={lang} slug={slug} />
      </Suspense>
      <Suspense fallback={<SlideDestination.Skeleton />} >
        <SlideDestination
          lang={lang}
          slug={slug}
        />
      </Suspense>
      <Suspense fallback={<SectionActions.Skeleton />}>
        <CustomerReview
          lang={lang}
          slug={slug}
        />
      </Suspense>
      <Suspense fallback={<SectionActions.Skeleton />}>
        <OurBlog
          slug={slug}
          lang={lang}
        />
      </Suspense>

    </div>
  )
}

export default page
