'use client'
import TourItem from '@/components/Common/TourItem'
import TourItemMobile from '@/components/Common/TourItemMobile'
import { useState } from 'react'

const ListPromotionTour = ({ promotionList, menu, lang, refetch,onCloseMenu, totalPage }) => {
  
  const [activePage, setActivePage] = useState(0)
  const handleChangePage = (index) => {
    setActivePage(index)
    refetch({
      offset: index * 8,
      size: 8
    })
  }

  return (
    <div className='relative best-tours md:overflow-hidden'>
      <div
        className={`md:w-[83.5%] md:m-auto lg:grid flex flex-col ${
          menu ? 'grid-cols-4' : 'grid-cols-4'
        } md:gap-[2.5vw] gap-[3.2vw]`}
      >
        {promotionList?.map((item, index) => (
          <div key={index}>
            <div className='hidden lg:flex'>
              <TourItem
                onCloseMenu={onCloseMenu}
                data={item}
                menu={menu}
                lang={lang}
                className={'md:!text-[0.96481vw]'}
              />
            </div>

            <div className='flex lg:hidden'>
              <TourItemMobile
                data={item}
                lang={lang}
              />
            </div>
          </div>
        ))}
      </div>
      <div className='flex md:gap-[0.75vw] gap-[3.2vw] justify-center items-center relative md:mt-[4.5vw] mt-[8.53vw]'>
        {Array.from({ length: totalPage }, (_, index) => (
          <div
            key={index}
            onClick={() => handleChangePage(index)}
            className={`${totalPage > 1
              ? 'cursor-pointer md:w-[2.125vw] md:h-[2.125vw] w-[9.07vw] h-[9.07vw] rounded-[50%] flex justify-center items-center bg-primaryColor'
              : 'hidden'
              }  ${activePage === index ? 'bg-textColor  opacity-[1]' : ' opacity-[0.1]'}`}
          >
            <span className={`${activePage === index ? 'text-white' : 'text-textColor'}`}>{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListPromotionTour
