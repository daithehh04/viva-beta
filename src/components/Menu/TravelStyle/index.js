'use client'
import StyleItem from './StyleItem'

export default function TravelStyle({ travelStylesList, lang,onCloseMenu }) {
  let travelStyleList = null
  if (travelStylesList?.allTourStyle?.nodes) {
    travelStyleList = travelStylesList?.allTourStyle?.nodes
  }
  const handleSort = (fn) => {
    fn?.sort(function(a, b) {
      var numA = parseInt(a?.banner?.travelStyleInfo?.priority);
      var numB = parseInt(b?.banner?.travelStyleInfo?.priority);
      return numA - numB;
    });
  }
  handleSort(travelStyleList)
  return (
    <div>
      <div className='grid grid-cols-3 gap-x-[7.91vw] gap-y-[2.88vw] content ml-auto mr-auto py-[2.49vw] '>
        {travelStyleList?.map((item, index) => (
          <StyleItem
            key={item?.id}
            image={item?.banner?.travelStyleInfo?.travelStyleImage}
            lang={lang}
            id={item?.slug}
            title={item?.banner?.travelStyleInfo?.travelStyleName}
            onCloseMenu={onCloseMenu}
          />
        ))}
      </div>
    </div>
  )
}
