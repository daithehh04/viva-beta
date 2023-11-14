import BookTour from '@/components/Common/BookTour'
import getDataFormBookTour from '@/data/formBookTour/getDataFormBookTour'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'
async function page({ params: { lang } }) {
  const IDs = {
    it: 'cG9zdDoxODQz',
    fr: 'cG9zdDoxODQ1',
    en: 'cG9zdDoxNDIy'
  }
  const data = await getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, IDs[lang], lang)
 
  return <BookTour data={data} lang={lang}/>
}

export default page
