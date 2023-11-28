import bannerReview from '@/assets/images/ourtour_CustomerReview_Banner.png'
import Button from '@/components/Common/Button'
import ReviewItem from '@/components/Common/ReviewItem'
import fetchData from '@/data/fetchData'
import { getDictionary } from '@/get-dictionary'
import { DATA_COUNTRY_TITLE } from '@/graphql/country/queries'
import { GET_ALL_REVIEWS } from '@/graphql/customersReview/queries'
import Image from 'next/image'
import Link from 'next/link'

async function CustomerReview({lang, slug }) {
  const dictionary = await getDictionary(lang)

  const res = await fetchData(GET_ALL_REVIEWS, { language: lang?.toUpperCase() })
  const dataCountry = await fetchData(DATA_COUNTRY_TITLE, {
    language: lang?.toUpperCase(),
    taxonomyValue: slug
  })
  const dataInfo = dataCountry?.data?.countries?.translation?.ourTour
  const reviewsList = res?.data?.allCustomerReview?.nodes

  const dataReviews = reviewsList?.filter((item) =>
    item?.translation?.customerReview?.tours?.countries?.nodes?.some((subItem) => subItem?.slug === slug)
  )

  const data = dataReviews?.slice(0, 4)

  if (data.length === 0) return null
  return (
    <div className='relative'>
      <Image
        alt='bannerReview'
        src={bannerReview}
        className='z-[-1] object-cover top-[-40%] absolute hidden md:block w-full'
      />
      <div className="flex flex-col md:!mt-[7.06vw] !mt-[14.93vw] content">
        <span className='heading-1 md:mb-[3vw] mb-[5.33vw] md:pl-0 pl-[4.27vw]'>{dataInfo?.titleReviews}</span>
        <div className='md:grid grid-cols-2 md:gap-x-[2.5vw] md:gap-y-[2.5vw] hidden-scroll max-md:overflow-x-auto flex gap-0'>
          {data?.map((item, index) => (
            <div
              key={index}
              className="ml-[4.27vw] sm:ml-auto"
            >
              <ReviewItem
                className='hidden md:flex'
                data={item}
                lang={lang}
                dictionary={dictionary}
              />
              <ReviewItem
                className={`md:hidden block destinations-item-mobile w-[74.66vw] ${index === data.length - 1 ? 'mr-[4.27vw]' : ''
                  }`}
                data={item}
                lang={lang}
                dictionary={dictionary}
              />
            </div>
          ))}
        </div>
        <div className='flex justify-center md:mt-[4vw] mt-[7.61vw]'>
          <Link
            href={`/${lang}/about-us/reviews`}>
            <Button className='btn-secondary' content={dataInfo?.btn}><span>{dataInfo?.btn}</span></Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CustomerReview
