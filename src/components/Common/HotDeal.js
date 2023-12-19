'use client'
import imageSrc from '@/assets/images/bg-hotdeals.png'
import { DATA_PROMOTION_TOUR } from '@/graphql/filter/queries'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import ListPromotionTour from '../../pageComponent/HotDeal/ListPromotionTour'
import ListVoucher from '../../pageComponent/HotDeal/ListVoucher'

export default function HotDeal({ listVoucher, menu, lang, onCloseMenu, dictionary }) {

  const { data: dataPromotionTour, refetch, loading } = useQuery(DATA_PROMOTION_TOUR, {
    variables: {
      language: lang?.toUpperCase(),
      offset: 0,
      size: 8,
    }
  })

  const promotionTours = dataPromotionTour?.promotionTours?.nodes

  const pageInfo = dataPromotionTour?.promotionTours?.pageInfo?.offsetPagination?.total
  const totalPage = Math.ceil(pageInfo / 8)

  const checkListVoucher = listVoucher?.filter((value) => value && value)

  return (
    <div className={`${menu ? 'pt-[2vw]' : 'md:pt-[9.75vw] pt-[23.46vw]'} mb-[9.19vw] max-md:bg-[#f3f6fb]`}>
      {(listVoucher && checkListVoucher?.length !== 0) && <div className='content'>
        <h2
          className={`heading-1 ${menu ? 'md:mb-[1.5vw]' : 'md:mb-[2.5vw]'}  mb-[4.267vw] text-textColor`}
          style={menu && { fontSize: '2.5vw' }}
        >
          {dictionary?.promotion?.txt_title_voucher}
        </h2>
        <ListVoucher
          isSubNav={true}
          headerData={dictionary?.promotion?.txt_title_voucher}
          listVoucher={listVoucher}
          lang={lang}
          dictionary={dictionary}
        />
      </div>}
      {(promotionTours && promotionTours?.length !== 0) && <div className={menu || !listVoucher ? 'mt-[2.12vw]' : 'mt-[7.06vw]'}>
        <h2
          className={`${menu ? 'mb-[1.5vw]' : 'mb-[3.12vw]'} heading-1 content text-textColor`}
          style={menu && { fontSize: '2.5vw' }}
        >
          {dictionary?.promotion?.txt_title_promotion || ''}
        </h2>
        <ListPromotionTour quantity={3}
          promotionList={promotionTours}
          menu={menu}
          lang={lang}
          onCloseMenu={onCloseMenu}
          totalPage={totalPage}
          refetch={refetch}
        />
      </div>}
      {!menu && (
        <Image
          alt='image'
          src={imageSrc}
          quality={100}
          className='w-full h-[70vw] absolute top-0 left-0 object-cover z-[-1] max-md:hidden'
        />
      )}
    </div>
  )
}
