import SearchResult from './SearchResult'

function ListTour({lang,loading,dataFilter,allTours, results,refetch,totalPage }) {
  return (
    <div>
      <SearchResult 
        totalPage={totalPage}
        refetch={refetch}
        allTours={allTours}
        results={results}
        dataFilter={dataFilter}
        lang={lang}
        loading={loading}
        quantity={9}
        text={'You may also like:'}
      />
    </div>
  )
}

export default ListTour
