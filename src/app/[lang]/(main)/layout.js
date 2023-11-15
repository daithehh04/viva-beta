import { idEn, idFr, idIt } from '@/data/getDataPage'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'

// Swiper
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'
// Aos
import 'aos/dist/aos.css'
// style css
import '../../../scss/main.scss'
import '../../../assets/fonts/stylesheet.css'
import getDataPage from '@/data/getDataPage'
import getDataPost from '@/data/getDataPost'
import { DATA_MENU_COUNTRY } from '@/graphql/country/queries'
import { GET_LIST_TRAVEL_STYLE_NAME } from '@/graphql/travelStyle/queries'
import getDataWithTaxonomy from '@/data/getDataWithTaxonomy'
import ApolloClientProvider from '../../apolloProvider'
import getHotDealHeader from '@/data/hotDeal'
import { DATA_HEADER, GET_SOCIAL_MOBILE, GET_INFO_CONTACT } from '@/graphql/home/queries'
import GET_SERVICE_BY_CATEGORY from '@/data/getDataRcmServices'
import getDataFormBookTour from '@/data/formBookTour/getDataFormBookTour'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'
import { GET_DATA_MENU_WWR } from '@/graphql/aboutUs/who-we-are/queries'
import getAboutUsData from '@/data/aboutUs/getAboutUsData'
import { GET_DATA_MENU_RT } from '@/graphql/aboutUs/responsible-travel/queries'
import { GET_DATA_MENU_RV } from '@/graphql/aboutUs/reviews/queries'
import Navbar from '@/components/Common/Navbar'
import {
  DATA_TAXONOMIES_BUDGET,
  DATA_TAXONOMIES_COUNTRY,
  DATA_TAXONOMIES_DURATION,
  DATA_TAXONOMIES_TOUR_STYLE
} from '@/graphql/filter/queries'
import SearchButton from '@/pageComponent/Home/SearchButton'
import PopupPromotion from '@/components/Common/PopupPromotion'
import { DATA_POPUP_VOUCHER } from '@/graphql/hotDeal/queries'
import ChatTawkto from '@/components/Common/ChatTawkto'
import Footer from '@/components/Common/Footer'

const IDS = {
  en: 'cG9zdDoxNDIy',
  fr: 'cG9zdDoxODQ1',
  it: 'cG9zdDoxODQz',
}

const linkChatFr = 'https://embed.tawk.to/6551cf91958be55aeaaefe7b/1hf3p5kpr'
const linkChatIt = 'https://embed.tawk.to/6551cfd4958be55aeaaefe8f/1hf3p7lvq'


export default async function MainLayout({ children, params }) {
  const [
    data, 
    dataBookTour, 
    dataMenuCountry, 
    recommendserviceList, 
    socialMobile,
    travelStylesList,
    result,
    wwrRes,
    rtRes,
    rvRes,
    dataTaxonomiesCountry,
    dataTaxonomiesStyleTour,
    dataTaxonomiesBudget,
    dataTaxonomiesDuration
  ] = await Promise.all([
    getDataPage(idEn, DATA_HEADER),
    getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, IDS[params.lang], params.lang),
    getDataPost(params.lang?.toUpperCase(), DATA_MENU_COUNTRY),
    getDataPost(params.lang?.toUpperCase(), GET_SERVICE_BY_CATEGORY),
    getDataPost(params.lang?.toUpperCase(), GET_SOCIAL_MOBILE),
    getDataWithTaxonomy({ lang: params.lang || 'EN' }, GET_LIST_TRAVEL_STYLE_NAME),
    getHotDealHeader(params.lang),
    getAboutUsData(GET_DATA_MENU_WWR, params.lang),
    getAboutUsData(GET_DATA_MENU_RT, params.lang),
    getAboutUsData(GET_DATA_MENU_RV, params.lang),
    getDataPost(params.lang, DATA_TAXONOMIES_COUNTRY),
    getDataPost(params.lang, DATA_TAXONOMIES_TOUR_STYLE),
    getDataPost(params.lang, DATA_TAXONOMIES_BUDGET),
    getDataPost(params.lang, DATA_TAXONOMIES_DURATION)
  ])

  const dataHome = data?.data?.page?.home
  //get header of hotDeal
  const hotDeals = result?.data?.page?.translation?.hotDeals
  // get data of menu - about-us
  //
  let contactInfo = await getDataPost(params.lang, GET_INFO_CONTACT)
  contactInfo = contactInfo?.data?.page?.translation?.home?.footer?.column1?.contact

  const dataPopupVoucher = await getDataPost(params.lang, DATA_POPUP_VOUCHER)
  const isPopup = dataPopupVoucher?.data?.page?.translation?.popupPromotion?.thumbPopup === null
  return (
    <ThemeRegistry>
        <ApolloClientProvider>
        <Navbar
          socialMobile={socialMobile}
          dataTaxonomiesCountry={dataTaxonomiesCountry}
          dataTaxonomiesStyleTour={dataTaxonomiesStyleTour}
          dataTaxonomiesBudget={dataTaxonomiesBudget}
          dataTaxonomiesDuration={dataTaxonomiesDuration}
          travelStylesList={travelStylesList}
          lang={params.lang}
          dataHome={dataHome?.header}
          dataMenuCountry={dataMenuCountry?.data?.allCountries?.nodes}
          hotDeals={hotDeals}
          rcmServicesList={recommendserviceList}
          dataBookTour={dataBookTour}
          contactInfo={contactInfo}
          dataAboutUs={{
            wwrRes: wwrRes?.data?.page?.translation,
            rtRes: rtRes?.data?.page?.translation,
            rvRes: rvRes?.data?.page?.translation
          }}
        />
        <SearchButton lang={params.lang} />
        {!isPopup && <PopupPromotion lang={params.lang} data={dataPopupVoucher?.data?.page?.translation} />}
        {params.lang === 'fr' && <ChatTawkto url={linkChatFr} />}
        {params.lang === 'it' && <ChatTawkto url={linkChatIt} />}
        {children}
        <Footer lang={params.lang} />
      </ApolloClientProvider>
    </ThemeRegistry>

  )
}