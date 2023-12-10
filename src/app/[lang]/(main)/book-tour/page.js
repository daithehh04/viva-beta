import BookTour from '@/components/Common/BookTour'
import { LANGUAGE_BOOK_IDS } from '@/configs/global-config'
import fetchData from '@/data/fetchData'
import { getDictionary } from '@/get-dictionary'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'
async function page({ params: { lang } }) {
  const dictionary = await getDictionary(lang)

  const data = await fetchData(GET_DATA_FORM_BOOKTOUR, { id: LANGUAGE_BOOK_IDS[lang], language: lang?.toUpperCase() })
 
  return <BookTour data={data} lang={lang} dictionary={dictionary} />
}

export default page
