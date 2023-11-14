import HeaderBlog from './HeaderBlog'
import OtherArticle from './OtherArticle'
import TextBlogDetail from './TextBlogDetail'
import { DATA_BLOG_DETAIL, GET_ARTICLE_NEWS } from '@/graphql/detail/queries'
import getDataDetail from '@/data/getDataDetail'
import getDataPost from '@/data/getDataPost'
import NotFound from '@/components/Common/NotFound'

async function index({ lang, slug }) {
  const [data,dataNews] = await Promise.all([
    getDataDetail(lang.toUpperCase(), slug, DATA_BLOG_DETAIL),
    getDataPost(lang.toUpperCase(), GET_ARTICLE_NEWS)
  ])

  const dataBlog = data?.data?.postBy

  if (!dataBlog || !data || !dataNews) {
    return <NotFound lang={lang}/>
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
