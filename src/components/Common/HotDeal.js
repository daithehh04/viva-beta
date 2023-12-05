'use client'
import ListVoucher from '../../pageComponent/HotDeal/ListVoucher'
import ListPromotionTour from '../../pageComponent/HotDeal/ListPromotionTour'
import Image from 'next/image'
import imageSrc from '@/assets/images/bg-hotdeals.png'
import { DATA_BEST_TOUR_HOME_PAGE, DATA_PROMOTION_TOUR, DATA_TAXONOMIES_BUDGET_GQL, DATA_TAXONOMIES_COUNTRY_GQL, DATA_TAXONOMIES_DURATION_GQL, DATA_TAXONOMIES_TOUR_STYLE_GQL } from '@/graphql/filter/queries'
import { useQuery } from '@apollo/client'

export default function HotDeal({ hotDeals, menu, lang, onCloseMenu }) {
  const listVoucher = hotDeals?.voucherHeader?.listVoucher
  const { data: budgetData } = useQuery(DATA_TAXONOMIES_BUDGET_GQL, {
    variables: {
      language: lang?.toUpperCase(),
    }
  })
  const { data: dataDurations } = useQuery(DATA_TAXONOMIES_DURATION_GQL, {
    variables: {
      language: lang?.toUpperCase(),
    }
  })
  const { data: dataCountries } = useQuery(DATA_TAXONOMIES_COUNTRY_GQL, {
    variables: {
      language: lang?.toUpperCase(),
    }
  })
  const { data: dataStyle } = useQuery(DATA_TAXONOMIES_TOUR_STYLE_GQL, {
    variables: {
      language: lang?.toUpperCase(),
    }
  })
  
  function handleTaxonomiesSlug(data) {
    const newArrDataTaxonomies = []
    data?.map((item) => {
      newArrDataTaxonomies.push(item?.slug)
    })
    return newArrDataTaxonomies
  }

  function handleTaxonomiesName(data) {
    const newArrDataTaxonomies = []
    data?.map((item) => {
      newArrDataTaxonomies.push(item?.name)
    })
    return newArrDataTaxonomies
  }
  const newArrDataTaxonomiesCountry = handleTaxonomiesName(dataCountries?.allCountries?.nodes)
  const newArrDataTaxonomiesStyleTravel = handleTaxonomiesSlug(dataStyle?.allTourStyle?.nodes)
  const newArrDataTaxonomiesBudget = handleTaxonomiesName(budgetData?.allBudget?.nodes)
  const newArrDataTaxonomiesDuration = handleTaxonomiesName(dataDurations?.allDuration?.nodes)

  const { data: dataPromotionTour, refetch, loading } = useQuery(DATA_PROMOTION_TOUR, {
    variables: {
      language: lang?.toUpperCase(),
      countrySlug: newArrDataTaxonomiesCountry,
      styleTourSlug: newArrDataTaxonomiesStyleTravel,
      bestseller: ['best-seller-tours'],
      budget: newArrDataTaxonomiesBudget,
      duration: newArrDataTaxonomiesDuration,
      offset: 0,
      size: 8,
    }
  })

  const promotionTours = dataPromotionTour?.promotionTours?.nodes

  const pageInfo = dataPromotionTour?.promotionTours?.pageInfo?.offsetPagination?.total
  const totalPage = Math.ceil(pageInfo / 8)

  return (
    <div className={`${menu ? 'pt-[2vw]' : 'md:pt-[9.75vw] pt-[23.46vw]'} mb-[9.19vw] max-md:bg-[#f3f6fb]`}>
      <div className='content'>
        <h2
          className={`heading-1 ${menu ? 'md:mb-[1.5vw]' : 'md:mb-[2.5vw]'}  mb-[4.267vw] text-textColor`}
          style={menu && { fontSize: '2.5vw' }}
        >
          {hotDeals?.voucherHeader?.listHeader}
        </h2>
        <ListVoucher
          isSubNav={true}
          headerData={hotDeals?.voucherHeader?.detailHeader}
          listVoucher={listVoucher}
          lang={lang}
        />
      </div>
      <div className={menu ? 'mt-[2.12vw]' : 'mt-[7.06vw]'}>
        <h2
          className={`${menu ? 'mb-[1.5vw]' : 'mb-[3.12vw]'} heading-1 content text-textColor`}
          style={menu && { fontSize: '2.5vw' }}
        >
          {hotDeals?.promotionHeader || ''}
        </h2> 
        <ListPromotionTour quantity={3}
          promotionList={promotionTours}
          menu={menu}
          lang={lang}
          onCloseMenu={onCloseMenu}
          totalPage={totalPage}
          refetch={refetch}
        />
      </div>
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
