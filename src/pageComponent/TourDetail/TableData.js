'use client'

import { Button } from "@mui/material"
import Link from "next/link"

export default function TableData({ data, header = [], type, isShowMobile, onClick, dataPrice, dictionary }) {
  const headerData = Object.values(header)
  return (
    <div>
      <div className='overflow-auto w-full hidden-scroll max-lg:px-[4.27vw]'>
        <table className='tour-detail-table table-auto md:w-full w-[150vw] border-separate border border-[#EBEBEB] rounded-2xl border-solid bg-white'>
          <thead className='lg:h-[3vw] md:h-[4vw] h-[12.8vw] bg-[#FFECA2] text-center '>
            <tr>
              {headerData?.map((item, index) => {
                return (
                  <th
                    key={index}
                    className={`${index === 0 ? 'rounded-tl-2xl' : index === headerData?.length - 1 ? 'rounded-tr-2xl' : ''
                      } lg:text-[1vw] md:text-[1.3vw] text-[3.73vw] font-bold leading-normal border border-[#EBEBEB] border-solid align-middle`}
                    dangerouslySetInnerHTML={{ __html: `${item}` }}
                  ></th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              const values = Object.values(item)
              return (
                <tr
                  key={index}
                  className='md:h-[3vw] h-[8vw]'
                >
                  {values?.map((rowItem, rowIndex) => {
                    return (<td
                      className={`${rowIndex === 0 ? 'whitespace-nowrap' : ''} min-w-[5vw] px-[1vw] lg:text-[1vw] md:text-[12px]  text-[2.93vw] leading-normal opacity-80 text-textColor border border-[#EBEBEB] border-solid text-center align-middle ${(index === data?.length - 1 && rowIndex === 0 && 'rounded-bl-2xl') || ''
                        } ${(index === data?.length - 1 && rowIndex === values?.length - 1 && 'rounded-br-2xl') || ''}`}
                      key={rowIndex}
                    >
                      {typeof rowItem === 'object' ? (<Link href={`${rowItem?.link}`} target="_blank">Link</Link>) : (<p dangerouslySetInnerHTML={{ __html: `${rowItem}` }}></p>)}
                    </td>)
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
      {isShowMobile && <div className='block md:hidden'>
        <div className='px-[4.27vw] pt-[4.2vw] pb-[3.2vw] w-[100vw] bg-[#fff]'>
          <div className='flex justify-between items-center mb-[2.27vw] text-[#171717]'>
            <div className='text-[3.73vw] font-medium'>{dataPrice?.price?.header}:</div>
            <div className='text-[4.26vw] capitalize leading-[1.5] font-bold'>{dataPrice?.price?.value} {dictionary?.home?.txt_price}/ {'Pax'}</div>
          </div>
          <Button
            className='flex justify-center w-full btn-primary !text-black'
            onClick={() => onClick()}
          >
            {dataPrice?.button}
          </Button>
        </div>
      </div>}
    </div>
  )
}
