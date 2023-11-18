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
import ChatTawkto from '@/components/Common/ChatTawkto'
import Footer from '@/components/Common/Footer'
import Navbar from '@/components/Common/Navbar'
import PopupPromotion from '@/components/Common/PopupPromotion'
import { LANGUAGE_BOOK_IDS } from '@/configs/global-config'
import fetchData from '@/data/fetchData'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'
import { GET_INFO_CONTACT, GET_SOCIAL_MOBILE } from '@/graphql/home/queries'
import { DATA_POPUP_VOUCHER, GET_HOT_DEAL_DATA } from '@/graphql/hotDeal/queries'
import { GET_LIST_TRAVEL_STYLE_NAME } from '@/graphql/travelStyle/queries'
import SearchButton from '@/pageComponent/Home/SearchButton'
import '@/assets/fonts/stylesheet.css'
import '@/scss/main.scss'
import ApolloClientProvider from '@/components/apolloProvider'

const linkChatFr = 'https://embed.tawk.to/6551cf91958be55aeaaefe7b/1hf3p5kpr'
const linkChatIt = 'https://embed.tawk.to/6551cfd4958be55aeaaefe8f/1hf3p7lvq'


export default async function MainLayout({ children, params }) {
  const [
    dataBookTour,
    socialMobile,
    result,
  ] = await Promise.all([
    fetchData(GET_DATA_FORM_BOOKTOUR, { id: LANGUAGE_BOOK_IDS?.[params?.lang], language: params?.lang?.toUpperCase() }),
    fetchData(GET_SOCIAL_MOBILE, { language: params.lang?.toUpperCase() }),
    fetchData(GET_HOT_DEAL_DATA, { language: params?.lang?.toUpperCase() }),
  ])
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
          socialMobile={socialMobile}
          lang={params.lang}
          hotDeals={hotDeals}
          dataBookTour={dataBookTour}
          contactInfo={contactInfo}
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