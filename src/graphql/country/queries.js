const DATA_MENU_COUNTRY = `
query country($language: LanguageCodeFilterEnum){
  allCountries(first: 50, where: {
    language: $language
  }) {
    nodes {
      slug
      name
      description
      language {
        id
      }
      country {
        priority
        flag {
          sourceUrl
        }
        thumb {
          sourceUrl
        }
      }
    }
  }
}
`

const DATA_COUNTRY = `
query getInfoCountry($taxonomyValue: ID!,$language: LanguageCodeEnum!) {
  countries(id: $taxonomyValue, idType: SLUG) {
    translation(language: $language) {
      name
      slug
      country {
        info {
          population
          area
          language
          currency
          wheather
          timze
        }
      }
    }
  }
}
`
export const DATA_COUNTRY_BLOG_TITLE = `
query getInfoCountry($taxonomyValue: ID!,$language: LanguageCodeEnum!) {
  countries(id: $taxonomyValue, idType: SLUG) {
    translation(language: $language) {
      ourTour{
        titleBlogs
      }
    }
  }
}
`
export const DATA_COUNTRY_BLOG = `
query GetAllPostByCountry(
  $language: LanguageCodeEnum!
  $destinationName: [String!]
) {
  blogs(
    first: 8,
    where: {
      orderby: { field: DATE, order: DESC }
      taxQuery: {
        taxArray: [
          { taxonomy: COUNTRIES, operator: IN, terms: $destinationName, field: SLUG }
        ]
      }
    }
  ) {
    nodes {
      translation(language: $language) {
        id
        excerpt
        title
        slug
        blogdetail {
          heading
          time
        }
        language {
          code
          locale
        }
        featuredImage {
          node {
            altText
            sourceUrl(size: MEDIUM_LARGE)
          }
        }
      }
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}
`

export const DATA_COUNTRY_BANNER = `query getInfoCountry($taxonomyValue: ID!,$language: LanguageCodeEnum!) {
  countries(id: $taxonomyValue, idType: SLUG) {
    name
    slug
    translation(language: $language) {
      country {
        flag {
          sourceUrl
        }
        banner {
          img {
            sourceUrl(size: MEDIUM_LARGE)
          }
          explore
          nameCountry
          text
        }
      }
    }
  }
}
`

export const DATA_COUNTRY_TITLE = `query getInfoCountry($taxonomyValue: ID!,$language: LanguageCodeEnum!) {
  countries(id: $taxonomyValue, idType: SLUG) {
    translation(language: $language) {
      name
      ourTour{
        subtitle
        btn
        titleBlogs
        titleReviews
        titleTours
        titleTrips
      }
    }
  }
}`

const DATA_ICONS_COUNTRY = `query($language: LanguageCodeEnum!){
  page(id:"cG9zdDozMDQ1" idType:ID){
    translation(language:$language){
      travelStyle{
        icons{
          image{
            sourceUrl
          }
          name
        }
      }
    }
  }
}`

const DATA_SLIDE_TOUR = `
query getTourStyle($language: LanguageCodeEnum!, $taxonomyValue: String, $taxonomyName: TaxonomyEnum) {
  allTours(
    first: 50,
    where: {
      taxQuery: {
        taxArray: { terms: [$taxonomyValue], taxonomy: $taxonomyName, field: SLUG, operator: IN }
        relation: AND
      }
    }
  ) {
    nodes {
      translation(language: $language) {
          slug
          countries {
            nodes {
              name
            }
          }
          tourDetail {
            priceTour
            banner {
              location
              rate
              title
              gallery {
                sourceUrl(size: MEDIUM_LARGE)
                altText
                title
              }
              icons
            }
          }
        }
    }
  }
}
`
const DATA_SLIDE_OTHER_TOUR = `
query getTourStyle($language: LanguageCodeFilterEnum!, $taxonomyValue: [String!], $taxonomyName: TaxonomyEnum) {
  allTours(
    first: 8
    where: {
      taxQuery: {
        taxArray: {terms: $taxonomyValue, taxonomy: $taxonomyName, operator: NOT_IN, field: SLUG
        }, 
        relation: AND
      }, 
      language: $language, 
      orderby: {field: MODIFIED, order: DESC}
    }
  ) {
    nodes {
        slug
        bestSeller {
          nodes {
            name
          }
        }
        countries {
          nodes {
            name
          }
        }
        tourDetail {
          priceTour
          banner {
            location
            rate
            title
            gallery {
              sourceUrl(size: MEDIUM_LARGE)
              altText
              title
            }
          }
        }
    }
  }
}
`

const GET_DATA_BEST_SELLER_OURTOUR = `
query getTourStyle($language: LanguageCodeFilterEnum!, $taxonomyValue: [String!], $taxonomyName: TaxonomyEnum) {
  allTours(
    first: 7
    where: {taxQuery: 
      {taxArray: [
        {terms: $taxonomyValue, taxonomy: $taxonomyName, field: SLUG, operator: NOT_IN}, 
        {taxonomy: BESTSELLER, operator: IN, terms: "best-seller-tours", field: SLUG}], relation: AND}, 
      language: $language, orderby: {field: MODIFIED, order: DESC}}
  ) {
    pageInfo {
      offsetPagination {
        total
      }
    }
    nodes {
        slug
        bestSeller {
          nodes {
            name
          }
        }
        countries {
          nodes {
            name
          }
        }
        tourDetail {
          priceTour
          banner {
            location
            rate
            title
            gallery {
              sourceUrl(size: MEDIUM_LARGE)
              altText
              title
            }
          }
        }
    }
  }
}
`

const GET_META_DATA = `query ($slug: ID!, $language: LanguageCodeEnum!) {
  countries(id: $slug, idType: SLUG) {
    translation(language: $language) {
      country{
        meta{
          title
          description
        }
      }
    }
  }
}`

export {
  DATA_MENU_COUNTRY,
  DATA_COUNTRY,
  DATA_SLIDE_TOUR,
  DATA_SLIDE_OTHER_TOUR,
  GET_META_DATA,
  GET_DATA_BEST_SELLER_OURTOUR,
  DATA_ICONS_COUNTRY
}
