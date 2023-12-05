import BestSeller from '@/components/Common/BestSeller'
import Button from '@/components/Common/Button'
import React from 'react'
import Link from 'next/link'

const NewRelease = ({ data, lang, title, button, dictionary }) => {
  return (
    <div>
      <div className='mt-[6.69vw]'>
        <h2 className='mb-[3vw] font-optima font-semibold leading-[4.4vw] capitalize text-[4vw] max-md:px-[4.27vw]'>{title || 'Related News'}</h2>
        <div className='related-news__search'>
          <BestSeller
            isBlogItem={true}
            listBlog={data}
            lang={lang}
          />
        </div>
      </div>
      <div className='flex md:mt-[4vw] mt-[9.87vw] md:mb-[5.75vw] mb-[14.93vw] justify-center'>
        <Link href={`/${lang}/blog`}>
          {/* <Button className='btn-secondary' content={button}><span>{button === '' ? dictionary.home.see_more : button}</span></Button> */}
          <Button className='btn-secondary' content={dictionary.home.see_more}><span>{dictionary.home.see_more}</span></Button>
        </Link>
      </div>
    </div>
  )
}

export default NewRelease
