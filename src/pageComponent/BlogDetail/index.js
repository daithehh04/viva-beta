import NotFound from '@/components/Common/NotFound'
import fetchData from '@/data/fetchData'
import { DATA_BLOG_DETAIL, GET_ARTICLE_NEWS } from '@/graphql/detail/queries'
import HeaderBlog from './HeaderBlog'
import OtherArticle from './OtherArticle'
import TextBlogDetail from './TextBlogDetail'

async function index({ lang, slug }) {
  const [data, dataNews] = await Promise.all([
    fetchData(DATA_BLOG_DETAIL, { language: lang.toUpperCase(), slug }),
    fetchData(GET_ARTICLE_NEWS, { language: params.lang?.toUpperCase() }),
  ])

  const dataBlog = data?.data?.postBy

  if (!dataBlog || !data || !dataNews) {
    return <NotFound lang={lang} />
  }

  return (
    <div>
      <HeaderBlog data={data} />
      <TextBlogDetail data={data} />
      <OtherArticle
        data={dataBlog}
        dataNews={dataNews}
        lang={lang}
        dataTitle={data}
      />
    </div>
  )
}

export default index
