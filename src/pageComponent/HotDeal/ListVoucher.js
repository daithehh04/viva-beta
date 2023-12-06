// 'use client'

import SlideVoucher from '@/components/Common/SlideVoucher'
import VoucherItem from '@/components/Common/VoucherItem'

export default function ListVoucher({ headerData, listVoucher, lang, dictionary }) {
  return (
    <div className=''>
      <div className='w-full'>
        <SlideVoucher data={listVoucher} lang={lang} dictionary={dictionary}/>
      </div>
      {/* {listVoucher?.map((voucher, index) => {
        return (
          <div
            key={index}
            className={`${index === 0 && 'max-md:ml-[4.27vw]'} ${index === listVoucher?.length - 1 && 'max-md:mr-[4.27vw]'
              }`}
          >
            <VoucherItem
              className='promo-voucher-item'
              headerData={headerData}
              data={voucher}
              lang={lang}
            />
          </div>
        )
      })} */}
    </div>
  )
}
