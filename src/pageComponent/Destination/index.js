import NotFound from '@/components/Common/NotFound'
import fetchData from '@/data/fetchData'
import {
  DATA_COUNTRY
} from '@/graphql/country/queries'
import Banner from './Banner'
import CustomerReview from './CustomerReview'
import FilterPopup from './FilterPopup'
import OurBlog from './OurBlog'
import SectionActions from './SectionActions'
import SlideDestination from './SlideDestination'
async function index({ lang, slug }) {
  const [
    dataCountry,
  ] = await Promise.all([
    fetchData(DATA_COUNTRY, {
      language: lang?.toUpperCase(),
      taxonomyValue: slug
    }),
  ])

  const data = dataCountry?.data?.countries?.translation

  if (!data) {
    return <NotFound lang={lang} />
  }
  return (
    <div>
      <Banner
        slug={slug}
        lang={lang}
      />
      <FilterPopup />
      <SectionActions lang={lang} infoCountry={data?.country?.info} />
      <SlideDestination
        dataTitle={data}
        lang={lang}
        slug={slug}
      />
      <CustomerReview
        dataInfo={data?.ourTour}
        lang={lang}
        slug={slug}
      />
      <OurBlog
        data={data}
        lang={lang}
      />
    </div>
  )
}

export default index