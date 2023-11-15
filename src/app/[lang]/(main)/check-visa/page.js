import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import CheckVisa from '@/pageComponent/CheckVisa'

const GET_META_DATA_CHECK_VISA = `
  query ($language: LanguageCodeEnum!) {
  page(id: "cG9zdDoxMTIx") {
    translation(language: $language){
      checkvisa{
        meta{
          title
          description
        }
      }
      featuredImage{
        node{
          sourceUrl
          altText
				  title
        }
      }
    }
  }
}
`

export async function generateMetadata({ params: { lang } }) {
  const res = await fetchData(GET_META_DATA_CHECK_VISA, {
    language: lang?.toUpperCase()
  })
  const { checkvisa } = res?.data?.page?.translation
  const featuredImage = res?.data?.page?.translation?.featuredImage
  const title = checkvisa?.meta?.title
  const excerpt = checkvisa?.meta?.description
  return getMeta(title, excerpt, featuredImage)
}

function page({ params: { lang } }) {
  return <CheckVisa lang={lang} />
}

export default page
