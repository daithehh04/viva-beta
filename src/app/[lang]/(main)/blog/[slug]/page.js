import fetchData from '@/data/fetchData'
import { getMeta } from '@/data/metaData/getMeta'
import { ALL_POST_QUERY, BLOGS_SLUG_QUERY } from '@/graphql/home/queries'
import BlogDetail from '@/pageComponent/BlogDetail'

const GET_META_DATA_BLOG_DETAIL = `
query ($language: LanguageCodeEnum!, $slug: String!) {
  postBy(slug: $slug) {
    translation(language: $language) {
      blogdetail {
        meta{
          title
        }
      }
      excerpt
    	featuredImage{
        node{
          sourceUrl
          altText
          title
        }
      }
    }
  }
}`

export async function generateMetadata({ params: { lang, slug } }) {
  const res = await fetchData(GET_META_DATA_BLOG_DETAIL, {
    language: lang?.toUpperCase(),
    slug
  })
  if (!res) return
  const { excerpt, blogdetail } = res?.data?.postBy?.translation || ''
  const featuredImage = res?.data?.postBy?.translation?.featuredImage
  const title = blogdetail?.meta?.title
  return getMeta(title, excerpt, featuredImage)
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams({ params }) {
  const { data } = await fetchData(BLOGS_SLUG_QUERY, { language: params.lang?.toUpperCase() })

  const blogs = data?.blogs?.nodes || []

  return blogs.map((blog) => {
    return ({
      slug: blog?.translation?.slug || undefined
    })
  })
}

function page({ params: { lang, slug } }) {
  return (
    <BlogDetail
      lang={lang}
      slug={slug}
      isRecommendOfBlog={false}
    />
  )
}

export default page
