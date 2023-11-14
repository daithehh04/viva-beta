import { GET_DATA_CHECKVISA2 } from '@/graphql/page/queries'

import Banner from './Banner'
import BestSellerTour from './BestSellerTour'
import Information from './Information'
import getDataPost from '@/data/getDataPost'
import { COUNTRY_FROM, COUNTRY_TO } from '@/graphql/checkVisa/queries'
import { DataProvider } from './DataContext'
import getDataFormBookTour from '@/data/formBookTour/getDataFormBookTour'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'

const id = 'cG9zdDoxNDIy'
async function index({ lang }) {
  const [dataBookTour,data,dataCountryFrom,dataCountryTo] = await Promise.all([
    getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, id, lang),
    getDataPost(lang, GET_DATA_CHECKVISA2),
    getDataPost(lang, COUNTRY_FROM),
    getDataPost(lang, COUNTRY_TO)
  ])
  const dataCheckVisa = data?.data?.page?.translation
  function handleTaxonomies(data) {
    const newArrDataTaxonomies = []
    data?.map((item) => {
      newArrDataTaxonomies.push(item)
    })
    return newArrDataTaxonomies
  }
  const arrCountryFrom = handleTaxonomies(dataCountryFrom?.data?.allFromCountry?.nodes)
  const listArrCountryFrom = arrCountryFrom.filter((item,index) => item !== null)
  const arrCountryTo = handleTaxonomies(dataCountryTo?.data?.allToCountry?.nodes)
  const listArrCountryTo = arrCountryTo.filter((item,index) => item !== null)
  const handleFilter = (fn) => {
    fn?.sort(function(a, b) {
      var numA = parseInt(a?.description) || 100;
      var numB = parseInt(b?.description) || 100;
      return numA - numB;
    });
  }
  handleFilter(listArrCountryFrom)
  handleFilter(listArrCountryTo)
  const dataFilter = {
    countryFrom: listArrCountryFrom,
    countryTo: listArrCountryTo
  }
  return (
    <DataProvider>
      <Banner data={dataCheckVisa} dataFilter={dataFilter} lang={lang} />
      <Information data={dataCheckVisa} lang={lang} dataBookTour={dataBookTour} />
      <BestSellerTour dataCheckVisa={dataCheckVisa} data={data} lang={lang} />
    </DataProvider>
  )
}

export default index
