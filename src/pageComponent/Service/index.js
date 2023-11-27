'use client'
import background from '@/assets/images/ourBlog_background.png'
import BlogItem from '@/components/Common/BlogItem'
import Button from '@/components/Common/Button'
import Loading from '@/components/Common/Loading'
import SlideTour from '@/components/Common/SlideTour'
import { FILTER_RECOMMENDED_SERVICE_QUERY, GET_BEST_TOUR_BLOG_BY_COUNTRY } from '@/graphql/post/queries'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import FilterService from './FilterService'

function Index({ data1, lang, initCategories, allCountries, slug }) {
    const metaDestination = allCountries?.nodes
    const metaCategories = initCategories?.nodes

    const arrayDesInit = []
    const arrayCateInit = []

    metaDestination?.map((des, index) => {
        arrayDesInit.push(des?.slug)
    })

    metaCategories.map((cate, index) => {
        arrayCateInit.push(cate?.slug)
    })

    const namePage = metaCategories?.find((item,index) => item.slug === slug)

    const [activePage, setActivePage] = useState(0)
    const [destination, setDestination] = useState(arrayDesInit || '')
    const language = lang?.toUpperCase() || 'EN'

    const { data, refetch, loading } = useQuery(FILTER_RECOMMENDED_SERVICE_QUERY, {
        variables: {
            language,
            offset: 0,
            size: 12,
            categorySlug: slug,
            destinationSlug: destination === '' ? arrayDesInit : destination
        }
    })

    const dataBestTour = useQuery(GET_BEST_TOUR_BLOG_BY_COUNTRY,
        {
            variables: {
                language: language,
                countrySlug: destination === '' ? arrayDesInit : destination
            }
        })

    const eleRef = useRef()

    useEffect(() => {
        eleRef?.current?.scrollIntoView({
            behavior: 'smooth'
        })
    }, [activePage])
    const handleChangePage = (index) => {
        setActivePage(index)
        refetch({
            offset: index * 2,
            size: 12
        })
    }
    const allBlogData = data?.posts?.nodes
    const pageInfo = data?.posts?.pageInfo?.offsetPagination?.total
    const totalPage = Math.ceil(pageInfo / 12)

    return (
        <div>
            <div className='content'>
                <h2 className='heading-1 mdpt-[14.755vw] lg:pt-[9.755vw] pt-[23.53vw] md:mb-0 mb-[4.27vw]'>
                    {namePage?.name}
                </h2>
                <FilterService
                    handleDes={(data) => setDestination(data)}
                    metaDestination={metaDestination}
                    metaCategories={metaCategories}
                />
            </div>

            <div className='relative md:pb-[2vw]'>
                <Image alt='banner' src={background} fill quality={100} className='z-[-1] object-cover' />
                {!loading ? (
                    <div>
                        {pageInfo !== 0 ? <div className='grid md:grid-cols-4 md:px-[8.06vw] px-[4.27vw] grid-cols-2 md:gap-x-[2.5vw] md:gap-y-[3vw] gap-x-[4.27vw] gap-y-[6.4vw] md:mt-[4vw] mt-[7.73vw]'>
                            { allBlogData?.map((item, index) => (
                                <BlogItem
                                    lang={lang}
                                    key={index}
                                    data={item?.translation}
                                    className={'max-md:w-[43.73333vw] max-md:h-[43.73333vw] !ml-0'}
                                />
                            ))}
                        </div> : <div className='md:px-[8.06vw] px-[4.27vw] md:mt-[4vw] mt-[7.73vw] text-center text-[3.5vw] pt-[4vw] w-full font-optima max-md:text-[5.67vw]'>
                            No data found!
                          </div>}

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
                ) : (
                    <div className='flex items-center justify-center flex-1 w-full text-center h-[60vh]'>
                        <Loading />
                    </div>
                )}

                {/* besst seller tour */}
                {data1?.data?.page?.translation?.ourblog ? (
                    <div>
                        <h2 className='heading-1 md:mt-[5.25vw] mt-[12.8vw] md:pl-[8.06vw] pl-[4.27vw] mb-[3.5vw]'>
                            {data1?.data?.page?.translation?.ourblog?.heading2}
                        </h2>
                        <div className='md:px-[8.06vw]'>
                            <SlideTour data={dataBestTour?.data?.allTours?.nodes} lang={lang} />
                        </div>
                        <Link href={`/${lang}/search`}>
                            <Button content={data1?.data?.page?.translation?.ourblog?.button} className='btn-secondary m-auto md:mb-[6.25vw] mb-[6.25vw] md:mt-[3.5vw] relative mt-[10.01vw] '>
                                <span>{data1?.data?.page?.translation?.ourblog?.button}</span>
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className='flex items-center justify-center flex-1 w-full text-center h-[60vh]'>
                        <Loading />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Index
