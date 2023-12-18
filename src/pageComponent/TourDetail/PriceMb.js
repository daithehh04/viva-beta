'use client'

import React, { useState } from 'react'
import priceIcon from '@/assets/images/tourDetail/price.svg'
import mapIcon from '@/assets/images/tourDetail/mapIcon.png'

import Image from 'next/image'
import Button from '@/components/Common/Button'
import ModalCustom from '@/components/Common/ModalCustom'
import imageTest from '@/assets/images/banner-about.jpg'

export default function PriceMb({ data, onClick }) {
  const [openModal, setOpenModal] = useState(false)
  const lang = data?.lang

  return (
    <div className='fixed bottom-0 left-0 z-[100000]'>
      <div className='w-[16vw] h-[16vw] mb-[4.27vw] ml-[4.27vw] flex items-center justify-center bg-primaryColor rounded-full flex-shrink-0'>
        <Image
          src={mapIcon}
          alt='icon'
          className='w-[8.33vw] h-[8.33vw]'
          onClick={() => setOpenModal(true)}
        />
      </div>

      {openModal && (
        <ModalCustom
          openModal={openModal}
          setOpenModal={setOpenModal}
          className='w-[90vw]'
        >
          <Image
            src={data?.map?.sourceUrl || imageTest}
            alt={data?.map?.altText}
            width={1000}
            height={1000}
            className='object-contain w-full h-full rounded-lg'
          />
        </ModalCustom>
      )}

      
    </div>
  )
}
