import NotFound from '@/components/Common/NotFound'
import fetchData from '@/data/fetchData'
import { DATA_BLOG_DETAIL, GET_ARTICLE_NEWS, GET_RECOMMEND_SERVICE_ID } from '@/graphql/detail/queries'
import HeaderBlog from './HeaderBlog'
import OtherArticle from './OtherArticle'
import TextBlogDetail from './TextBlogDetail'
import { GET_ALL_BLOG_FILTER } from '@/graphql/post/queries'

async function index({ lang, slug, isRecommendOfBlog, category }) {
  const { data } = await fetchData(DATA_BLOG_DETAIL, { language: lang.toUpperCase(), slug })
  const dataBlog = data?.blog?.translation
  const paramTopic = dataBlog?.topic?.edges.map((value) => value?.node?.slug);
  const paramCountries = dataBlog?.countries?.edges.map((value) => value?.node?.slug);

  const [dataNews, dataRecommendSlug, dataBlogArticle] = await Promise.all([
    fetchData(GET_ARTICLE_NEWS, { language: lang?.toUpperCase(), slug: category }),
    fetchData(GET_RECOMMEND_SERVICE_ID, { slug }),
    fetchData(GET_ALL_BLOG_FILTER, { language: lang?.toUpperCase(), topicSlug: paramTopic, destinationSlug: paramCountries })
  ])

  const dataRecommendBlog = dataRecommendSlug?.data?.post

  if (!data || !dataNews) {
    return <NotFound lang={lang} />
  }
  return (
    <div>
      <HeaderBlog data={isRecommendOfBlog ? dataRecommendBlog : dataBlog} />
      <TextBlogDetail data={isRecommendOfBlog ? dataRecommendBlog : dataBlog} />
      <OtherArticle
        data={isRecommendOfBlog ? dataRecommendBlog : dataBlog}
        category={category}
        dataRecommendArticle={dataNews?.data?.posts?.nodes}
        dataBlogArticle={dataBlogArticle?.data?.blogs?.nodes}
        lang={lang}
        dataTitle={isRecommendOfBlog ? dataRecommendBlog : dataBlog}
      />
    </div>
  )
}

export default index
