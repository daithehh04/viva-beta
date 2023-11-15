import AboutVideo from '@/components/Common/Video'
import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { GET_META_DATA, GET_WHO_WE_ARE_DATA } from '@/graphql/aboutUs/who-we-are/queries'
import Banner from '@/pageComponent/AboutUs/Banner/Banner'
import Statistics from '@/pageComponent/AboutUs/who-we-are/Statistics'
import Staffs from '@/pageComponent/AboutUs/who-we-are/staffs/Staffs'

export async function generateMetadata({ params: { lang } }) {
  const res = await fetchData(GET_META_DATA, {
    language: lang?.toUpperCase()
  })

  const { who_we_are } = res?.data?.page?.translation
  const featuredImage = res?.data?.page?.translation?.featuredImage
  const title = who_we_are?.meta?.title
  const excerpt = who_we_are?.meta?.description
  return getMeta(title, excerpt, featuredImage)
}

async function page({ params: { lang } }) {
  const res = await fetchData(GET_WHO_WE_ARE_DATA, {language: lang?.toUpperCase()})
  const bannerData = res?.data?.page?.translation?.who_we_are?.banner
  const contentData = res?.data?.page?.translation?.who_we_are?.content

  return (
    <div className='w-full'>
      <Banner data={bannerData} />
      <Statistics data={contentData} />
      <AboutVideo data={contentData?.descriptionVideo} />
      <Staffs data={contentData?.staffs} />
    </div>
  )
}

export default page
