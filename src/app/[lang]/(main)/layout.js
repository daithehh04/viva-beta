import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'

// Swiper
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/thumbs'
// Aos
import 'aos/dist/aos.css'
// style css
import '@/assets/fonts/stylesheet.css'
import ChatTawkto from '@/components/Common/ChatTawkto'
import Footer from '@/components/Common/Footer'
import Navbar from '@/components/Common/Navbar'
import PopupPromotion from '@/components/Common/PopupPromotion'
import AosInit from '@/components/aos-init'
import ApolloClientProvider from '@/components/apolloProvider'
import { LANGUAGE_BOOK_IDS, LANGUAGE_IDS } from '@/configs/global-config'
import fetchData from '@/data/fetchData'
import GET_SERVICE_BY_CATEGORY from '@/data/getDataRcmServices'
import { GET_DATA_MENU_RT } from '@/graphql/aboutUs/responsible-travel/queries'
import { GET_DATA_MENU_RV } from '@/graphql/aboutUs/reviews/queries'
import { DATA_MENU_LEGACY_QUERY, GET_DATA_MENU_WWR } from '@/graphql/aboutUs/who-we-are/queries'
import { DATA_MENU_COUNTRY } from '@/graphql/country/queries'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'
import { DATA_HEADER, GET_INFO_CONTACT, GET_SOCIAL_MOBILE } from '@/graphql/home/queries'
import { DATA_POPUP_VOUCHER, GET_HOT_DEAL_DATA } from '@/graphql/hotDeal/queries'
import { GET_LIST_TRAVEL_STYLE_NAME } from '@/graphql/travelStyle/queries'
import SearchButton from '@/pageComponent/Home/SearchButton'
import '@/scss/main.scss'
import { getDictionary } from '@/get-dictionary'

// const IDS = {
//   en: '65717866bfb79148e59af6da',
//   fr: '6551cf91958be55aeaaefe7b',
//   if: '6551cfd4958be55aeaaefe8f'
// }

// const WIDGET_ID = {
//   en: '1hh1jskkj',
//   fr: '1hf3p5kpr',
//   if: '1hf3p7lvq'
// }
const linkChatEn = 'https://embed.tawk.to/65717866bfb79148e59af6da/1hh1jskkj'
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
    dictionary,
    lgRes
  ] = await Promise.all([
    fetchData(DATA_HEADER, { id: LANGUAGE_IDS[params?.lang] }),
    fetchData(GET_DATA_FORM_BOOKTOUR, { id: LANGUAGE_BOOK_IDS?.[params?.lang], language: params?.lang?.toUpperCase() }),
    fetchData(DATA_MENU_COUNTRY, { language: params.lang?.toUpperCase() }),
    fetchData(GET_SERVICE_BY_CATEGORY, { language: params.lang?.toUpperCase() }),
    fetchData(GET_SOCIAL_MOBILE, { language: params.lang?.toUpperCase() }),
    fetchData(GET_LIST_TRAVEL_STYLE_NAME, {
      language: params?.lang?.toUpperCase() || 'EN'
    }),
    fetchData(GET_HOT_DEAL_DATA, { language: params?.lang?.toUpperCase() }),
    fetchData(GET_DATA_MENU_WWR, { language: params?.lang?.toUpperCase() }),
    fetchData(GET_DATA_MENU_RT, { language: params?.lang?.toUpperCase() }),
    fetchData(GET_DATA_MENU_RV, { language: params?.lang?.toUpperCase() }),
    getDictionary(params?.lang),
    fetchData(DATA_MENU_LEGACY_QUERY,{language:params?.lang?.toUpperCase() })
  ])
  
  const dataHome = data?.data?.page?.home
  //get header of hotDeal
  const hotDeals = result?.data?.page?.translation?.hotDeals
  // get data of menu - about-us
  //
  let contactInfo = await fetchData(GET_INFO_CONTACT, { language: params.lang?.toUpperCase() })
  contactInfo = contactInfo?.data?.page?.translation?.home?.footer?.column1?.contact

  const dataPopupVoucher = await fetchData(DATA_POPUP_VOUCHER, { language: params.lang?.toUpperCase() })
  const isPopup = dataPopupVoucher?.data?.page?.translation?.popupPromotion?.thumbPopup === null
  return (
    <ThemeRegistry>
        <ApolloClientProvider>
        <Navbar
          dictionary={dictionary}
          socialMobile={socialMobile}
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
            rvRes: rvRes?.data?.page?.translation,
            lgRes: lgRes?.data?.page?.translation
          }}
        />
        <SearchButton lang={params.lang} />
        {!isPopup && <PopupPromotion lang={params.lang} data={dataPopupVoucher?.data?.page?.translation} />}
        {params.lang === 'en' && <ChatTawkto url={linkChatEn} />}
        {params.lang === 'fr' && <ChatTawkto url={linkChatFr} />}
        {params.lang === 'it' && <ChatTawkto url={linkChatIt} />}
        <AosInit />
        {children}
        <Footer lang={params.lang} />
      </ApolloClientProvider>
    </ThemeRegistry>

  )
}