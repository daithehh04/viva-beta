import { gql } from '@apollo/client'

export const GET_BANNER_TRAVEL_STYLE = `query getInfoPageTravelStyle($taxonomyValue: ID!, $language: LanguageCodeEnum!) {
  tourStyle(id: $taxonomyValue, idType: SLUG) {
    translation(language: $language) {
      slug
      banner {
        tourstylename
        banner {
          desc
          heading
          subdesc
          title
          banner {
            altText
            sourceUrl
          }
        }
        groupbutton {
          buttonseemore
        }
      }
    }
  }
}`

export const GET_HOT_TOUR_TRAVEL_STYLE = gql`
query getInfoPageTravelStyle($taxonomyValue: [String!], $language: LanguageCodeEnum!, $destinationSlug: [String!]) 
{
  allTours(
    where: {
      taxQuery: {
        taxArray:[
          {taxonomy: TOURSTYLE,terms: $taxonomyValue,field:SLUG},
          {taxonomy: COUNTRIES,terms:$destinationSlug,field:NAME},
          {taxonomy: BESTSELLER, terms: "best-seller-tours", field: SLUG}
        ]
      }
          orderby: {field: DATE, order: DESC}
    }
  ){
    nodes {
      translation(language: $language) {
        id
        title
        slug
        bestSeller {
          nodes {
            name
          }
        }
        tourStyle {
          nodes {
            slug
          }
        }
        tourDetail {
          priceTour
          numberDay
          banner {
            title
            gallery {
              sourceUrl(size: MEDIUM_LARGE)
              altText
              title
            }
            location
            rate
            icons
          }
        }
      }
    }
  }
}
`
const GET_INFO_PAGE_TRAVEL_STYLE = `query getInfoPageTravelStyle($taxonomyValue: ID!, $language: LanguageCodeEnum!) {
  tourStyle(id: $taxonomyValue, idType: SLUG) {
    translation(language: $language) {
      slug
      banner {
        tourstylename
      }
    }
  }
}`

export const TRAVEL_STYLE_SLUG_QUERY = `
query ($language: LanguageCodeEnum!) {
  allTourStyle {
    nodes {
      translation(language: $language) {
        slug
        language {
          id
        }
      }
    }
  }
}
`

const GET_LIST_TRAVEL_STYLE_NAME = `query getTourStyleName($language: LanguageCodeFilterEnum) {
  allTourStyle(first: 50,where: {language: $language}) {
    nodes {
      id
      name
      banner {
        travelStyleInfo {
          priority
          travelStyleImage {
          altText
          sourceUrl(size: MEDIUM_LARGE)
        }
        travelStyleName
        }
      }
      slug
    }
  }
}`

const GET_LIST_TOUR_TRAVEL_STYLE_CLIENT = gql`
  query getTourStyle(
    $language: LanguageCodeEnum!
    $taxonomyValue: String
    $taxonomyName: TaxonomyEnum
    $offset: Int!
    $size: Int!
  ) {
    allTours(
      where: {
        taxQuery: {
          taxArray: { terms: [$taxonomyValue], taxonomy: $taxonomyName, field: SLUG, operator: IN }
          relation: AND
        }
        offsetPagination: { offset: $offset, size: $size }
      }
    ) {
      edges {
        node {
          translation(language: $language) {
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
            id
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

const GET_META_DATA = `query ($slug: ID!, $language: LanguageCodeEnum!) {
  tourStyle(id: $slug, idType: SLUG) {
    translation(language: $language) {
      banner {
        meta {
          title
          description
        }
      }
    }
  }
}`

const DATA_WHY_TRAVEL = gql`query getWhyTravel(
  $language: LanguageCodeEnum!
){
page(id: "cG9zdDozMDYw") {
  translation(language: $language) {
    title
    tourStyle {
      whytravel {
        text
        reason {
          image {
            sourceUrl
          }
          title
          content
        }
      }
    }
  }
}
}`

export { GET_INFO_PAGE_TRAVEL_STYLE, GET_LIST_TRAVEL_STYLE_NAME, GET_LIST_TOUR_TRAVEL_STYLE_CLIENT, GET_META_DATA, DATA_WHY_TRAVEL }
