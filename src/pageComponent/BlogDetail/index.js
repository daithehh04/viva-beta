import NotFound from '@/components/Common/NotFound'
import fetchData from '@/data/fetchData'
import { DATA_BLOG_DETAIL, GET_ARTICLE_NEWS, GET_RECOMMEND_SERVICE_ID } from '@/graphql/detail/queries'
import HeaderBlog from './HeaderBlog'
import OtherArticle from './OtherArticle'
import TextBlogDetail from './TextBlogDetail'

async function index({ lang, slug, isRecommendOfBlog, category}) {
  const [data, dataNews, dataRecommendSlug] = await Promise.all([
    fetchData(DATA_BLOG_DETAIL, { language: lang.toUpperCase(), slug }),
    fetchData(GET_ARTICLE_NEWS, { language: lang?.toUpperCase(), slug: category }),
    fetchData(GET_RECOMMEND_SERVICE_ID, { slug }),
  ])

  const dataBlog = data?.data?.blog
  const dataRecommendBlog = dataRecommendSlug?.data?.post

  if ( !data || !dataNews) {
    return <NotFound lang={lang} />
  }
  return (
    <div>
      <HeaderBlog data={isRecommendOfBlog ? dataRecommendBlog : dataBlog?.translation} />
      <TextBlogDetail data={isRecommendOfBlog ? dataRecommendBlog : dataBlog?.translation} />
      <OtherArticle
        data={isRecommendOfBlog ? dataBlog?.translation : dataRecommendBlog}
        dataNews={dataNews}
        lang={lang}
        dataTitle={isRecommendOfBlog ? dataRecommendBlog : dataBlog?.translation}
      />
    </div>
  )
}

export default index
