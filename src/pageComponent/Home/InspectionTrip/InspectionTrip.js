import TripSlider from "./Slider"

function InspectionTrip({ data, lang, dataSlide }) {
  return (
    <div className='inspection-trip mt-[8.38vw] max-md:mt-[11.68vw]'>
      <h2
        className='text-center heading-1 max-md:text-start max-md:pl-[4.27vw]'
        data-aos-once='true'
        data-aos='fade-up'
        data-aos-duration='1000'
        data-aos-disabled='true'
      >
        {data?.title}
      </h2>
      <div
        data-aos-once='true'
        data-aos='fade-up'
        data-aos-duration='1000'
        data-aos-disabled='true'
        className='relative mt-[3.5vw]'
      >
        <TripSlider dataSlide={dataSlide} lang={lang} />
        <div className='flex absolute top-[50%] -translate-y-2/4 z-10 w-full justify-between max-md:hidden'>
          <button
            className='image-swiper-button-prev w-[3.625vw] h-[3.625vw] rounded-full flex justify-center items-center bg-primaryColor button-slide__tour absolute left-[5.6vw] top-[50%] -translate-y-2/4'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='w-[1.5vw] h-[1.5vw]'
            >
              <path
                d='M3.15303 12.0969L19.457 0.960938L12.873 12.0969L19.457 23.2409L3.15303 12.0969Z'
                fill='#001258'
              />
            </svg>
          </button>
          <button
            className='image-swiper-button-next w-[3.625vw] h-[3.625vw] rounded-full flex justify-center items-center bg-primaryColor button-slide__tour absolute right-[5.6vw] top-[50%] -translate-y-2/4'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='w-[1.5vw] h-[1.5vw]'
            >
              <path
                d='M20.847 12.0969L4.54297 0.960938L11.127 12.0969L4.54297 23.2409L20.847 12.0969Z'
                fill='#001258'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default InspectionTrip
