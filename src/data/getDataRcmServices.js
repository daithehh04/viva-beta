const GET_SERVICE_BY_CATEGORY = `
    query ($language: LanguageCodeFilterEnum) {
    categories(where: {language: $language}) {
    nodes {
      name
      slug
      description
     	recommendservice{
        recommendservice{
          related
          image{
            sourceUrl(size: MEDIUM_LARGE)
          }
        }
      }
      posts {
        pageInfo {
          offsetPagination {
            total
          }
        }
      }
    }
  }
}
  `


export const SERVICES_SLUG_QUERY = `
  query ($language: LanguageCodeFilterEnum) {
    categories(where: {language: $language}) {
      nodes {
        slug
        language {
          id
          name
        }
      }
    }
  }
`

export default GET_SERVICE_BY_CATEGORY
