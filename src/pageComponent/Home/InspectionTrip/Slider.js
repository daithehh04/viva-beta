'use client'

import React from 'react'

import calendarIcon from '@/assets/images/calendarY.svg'
import restaurantIcon from '@/assets/images/restauY.svg'
import locationIcon from '@/assets/images/route-square.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const TripSlider = ({ dataSlide, lang }) => {
  let dataTrip = dataSlide?.concat(dataSlide)

  return (
    <Swiper
      breakpoints={{
        768: {
          observer: true,
          observeParents: true,
          spaceBetween: 20,
          freeMode: false,
          slidesPerView: 2,
          loop: true
        }
      }}
      initialSlide={Math.floor(dataSlide?.length / 2)}
      slidesPerView={1.2}
      observer={true}
      observeParents={true}
      spaceBetween={0}
      loop={true}
      speed={800}
      freeMode={false}
      modules={[Pagination, Navigation]}
      navigation={{
        nextEl: '.image-swiper-button-next',
        prevEl: '.image-swiper-button-prev',
      }}
      className='relative flex flex-col'
    >
      {dataTrip?.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <Link href={`/${lang}/blogs/${item?.translation?.slug}`}>
                <div className='h-[28.75vw] rounded-[1vw] itemSlideTrip tour-item max-md:rounded-[2.13vw] relative max-md:h-[53.33vw] max-md:ml-[3.2vw]'>
                  <div className='w-full h-full'>
                    <Image
                      src={
                        item?.translation?.featuredImage?.node?.sourceUrl || 'https://viva-cms.okhub.tech/wp-content/uploads/2023/09/blogDetail_Banner.png'
                      }
                      width={1000}
                      height={500}
                      alt={item?.translation?.featuredImage?.node?.altText || 'img-tour'}
                      className='rounded-[1vw] max-md:rounded-[2.13vw] h-full w-full object-cover'
                    />
                  </div>
                  <div className='info absolute bottom-0 px-[2vw] pb-[2vw] max-md:pb-[4.13vw] max-md:px-[4vw] z-10'>
                    <a className='text-[1.5vw] title-tour text-[#fff] line-clamp-2 font-bold leading-[1.3] tracking-[-0.03rem] w-[20.3125vw] max-md:text-[2.93vw] max-md:w-[61.33vw] max-lg:text-[1.6vw]'>
                      {item?.translation?.title}
                    </a>
                    <div className='flex items-center gap-x-[1.19vw] mt-[1.03vw] max-md:gap-x-[4.27vw] max-md:mt-[1.6vw]'>
                      {/* Icon 1 */}
                      <div className='flex items-center gap-x-[0.37vw] max-md:gap-x-[0.53vw]'>
                        <Image
                          src={locationIcon}
                          width={50}
                          height={50}
                          alt='location'
                          className='w-[1.5vw] h-[1.5vw] max-md:w-[3.2vw] max-md:h-[3.2vw] object-cover'
                        />
                        <span className='text-white text-[1.125vw] max-md:text-[2.267vw] leading-[1.3] max-lg:text-[1.4vw]'>
                          {item?.translation?.countries && item?.translation?.countries?.nodes[0]?.name}
                        </span>
                      </div>
                      {/* Icon 2 */}
                      <div className='flex items-center gap-x-[0.37vw]'>
                        <Image
                          src={calendarIcon}
                          width={50}
                          height={50}
                          alt='location'
                          className='w-[1.5vw] h-[1.5vw] max-md:w-[3.2vw] max-md:h-[3.2vw] object-cover'
                        />
                        <span className='text-white text-[1.125vw] max-md:text-[2.267vw] leading-[1.3] max-lg:text-[1.4vw]'>
                          {item?.translation?.blogdetail?.time}
                        </span>
                      </div>
                      {/* Icon 3 */}
                      <div className='flex items-center gap-x-[0.37vw]'>
                        <Image
                          src={restaurantIcon}
                          width={50}
                          height={50}
                          alt='location'
                          className='w-[1.5vw] h-[1.5vw] max-md:w-[3.2vw] max-md:h-[3.2vw] object-cover'
                        />
                        <span className='text-white text-[1.125vw] max-md:text-[2.267vw] leading-[1.3] max-lg:text-[1.4vw]'>
                          {item?.translation?.categories && item?.translation?.categories?.nodes[0]?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='overlay absolute inset-0 bg-overlayTrip rounded-[1vw] max-md:rounded-[2.13vw]'></div>
                </div>
              </Link>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default TripSlider