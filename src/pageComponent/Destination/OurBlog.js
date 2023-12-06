import BlogItem2 from '@/components/Common/BlogItem2'
import Button from '@/components/Common/Button'
import fetchData from '@/data/fetchData'
import { getDictionary } from '@/get-dictionary'
import { DATA_COUNTRY_BLOG } from '@/graphql/country/queries'
import Link from 'next/link'
async function OurBlog({ lang,slug }) {
  const dictionary = await getDictionary(lang)

  const dataCountry = await fetchData(DATA_COUNTRY_BLOG, {
    language: lang?.toUpperCase(),
    taxonomyValue: slug
  })
  const data = dataCountry?.data?.countries?.translation
  const dataInfo = data?.country?.blogs
  if(!dataInfo?.length) {
    return null
  }
  return (
    <div className={`flex flex-col mt-[14.93vw] md:mt-[8.28vw] content`}>
      <span className='heading-1 md:mb-[3vw] mb-[6.4vw] md:pl-0 pl-[4.27vw]'>{data?.ourTour?.titleBlogs}</span>
      <div className='md:grid md:grid-cols-4 md:grid-rows-2 md:gap-[2.5vw] flex md:overflow-x-visible overflow-x-auto gap-0 listBlog'>
        <div className='flex flex-shrink-0 md:col-span-2 md:row-span-2 h-full md:pl-0 pl-[4.27vw]'>
          {dataInfo?.slice(0, 1).map((item, index) => (
            <div key={index} className='h-full'>
              <div className='hidden max-md:block'>
              <BlogItem2 data={item} lang={lang}/>
              </div>
              <div className='block max-md:hidden h-full'>
              <BlogItem2 data={item} lang={lang} className='bigger' />
              </div>
            </div>
          ))}
        </div>
        {dataInfo?.slice(1, 5)?.map((blog, index) => (
          <BlogItem2 data={blog} lang={lang} key={index} className='md:pl-0 pl-[4.27vw] flex flex-shrink-0 blogItem ' />
        ))}
      </div>
      <div className='flex justify-center md:mb-[7.37vw] md:mt-[3.5vw] mt-[7.47vw]'>
        <Link href={`/${lang}/blog`}>
            <Button className='btn-secondary' content={dictionary.home.see_more}><span>{dictionary.home.see_more}</span></Button>
        </Link>
      </div>
    </div>
  )
}

export default OurBlog
