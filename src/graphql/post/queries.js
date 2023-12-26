import { gql } from '@apollo/client'

const GET_POST = `
    query posts($language: LanguageCodeFilterEnum){
    posts(where: {language: $language}) {
      edges {
        node {
          id
          excerpt
          title
          slug
          featuredImage {
            node {
              sourceUrl(size: MEDIUM_LARGE)
            }
          }
          language {
              code
              locale
          }
        }
      }
    }
  }
 `

const GET_ALL_POST = `
  query ($language: LanguageCodeFilterEnum!) {
    posts(where: { language: $language }) {
      nodes {
        id
        excerpt
        title
        slug
        categories {
          edges {
            node {
              id
              slug
            }
          }
        }
        blogdetail {
          heading
          time
          subtitle1
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
    page(id: "cG9zdDo1NjY=") {
      ourblog {
        heading1
        heading2
      }
    }
  }
`

export const FILTER_RECOMMENDED_SERVICE_QUERY = gql`
  query GetAllPost(
    $language: LanguageCodeEnum!
    $offset: Int!
    $size: Int!
    $categorySlug: [String!]
    $destinationSlug: [String!]
  ) {
    posts(
      first: 100,
      where: {
        offsetPagination: { offset: $offset, size: $size }
        orderby: { field: DATE, order: DESC }
        taxQuery: {
          taxArray: [
             { taxonomy: CATEGORY, operator: IN, terms: $categorySlug, field: SLUG }
            { taxonomy: COUNTRIES, operator: IN, terms: $destinationSlug, field: SLUG }
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
            subtitle1
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

export const RECOMMENDED_SERVICES_POST_SLUGS = `
  query GetAllPost(
    $language: LanguageCodeEnum!
    $categorySlug: [String!]
  ) {
    posts(
      where: {
        taxQuery: {
          taxArray: [
             { taxonomy: CATEGORY, operator: IN, terms: $categorySlug, field: SLUG }
          ]
        }
      }
    ) {
      nodes {
        translation(language: $language) {
          slug
        }
      }
    }
  }
`

const GET_ALL_POST_FILTER = gql`
  query GetAllPost(
    $language: LanguageCodeEnum!
    $offset: Int!
    $size: Int!
    $topicSlug: [String!]
    $destinationSlug: [String!]
  ) {
    blogs(
      first: 8,
      where: {
        offsetPagination: { offset: $offset, size: $size }
        orderby: { field: DATE, order: DESC }
        taxQuery: {
          taxArray: [
            { taxonomy: TOPIC, operator: IN, terms: $topicSlug, field: SLUG }
            { taxonomy: COUNTRIES, operator: IN, terms: $destinationSlug, field: SLUG }
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
            subtitle1
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
const GET_ALL_POST_FILTER_BY_COUNTRY = gql`
  query GetAllPost(
    $language: LanguageCodeEnum!
    $destinationName: [String!]
  ) {
    blogs(
      first: 8,
      where: {
        orderby: { field: DATE, order: DESC }
        taxQuery: {
          taxArray: [
            { taxonomy: COUNTRIES, operator: IN, terms: $destinationName, field: NAME }
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

const GET_ALL_BLOG_FILTER = `
query GetAllBlog(
  $language: LanguageCodeEnum!
  $topicSlug: [String!]
  $destinationSlug: [String!]
) {
  blogs(
    first: 8,
    where: {
      orderby: { field: DATE, order: DESC }
      taxQuery: {
        taxArray: [
          { taxonomy: TOPIC, operator: IN, terms: $topicSlug, field: SLUG }
          { taxonomy: COUNTRIES, operator: IN, terms: $destinationSlug, field: SLUG }
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
          subtitle1
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

const GET_ALL_TOURS_BESTSELLER = `
query ($language: LanguageCodeEnum!) {
  page(id: "cG9zdDo1NjY") {
    translation(language: $language) {
      ourblog {
        heading1
        heading2
        button
      }
    }
  }
  bestSeller(id:"dGVybToyODU="){
    tours{
      nodes{
        translation(language:$language){
          slug
          bestSeller {
            nodes {
              name
            }
          }
          tourDetail {
            priceTour
              banner {
                gallery {
                  sourceUrl(size: MEDIUM_LARGE)
                  altText
                  title
                }
                icons
                location
                rate
                title
              }
            }
        }
      }
    }
  }
}
`

const GET_SERVICE_BY_CATEGORY = `
query ($language: LanguageCodeEnum!, $lang: LanguageCodeFilterEnum!) {
  categories(where: {language: $lang}) {
    nodes {
      posts {
        pageInfo {
          offsetPagination {
            total
          }
        }
      }
      translation(language: $language) {
        recommendservice{
          recommendservice{
            image{
              sourceUrl(size: MEDIUM_LARGE)
            }
            related
          }
        }
        slug
        name
      }
    }
  }
}
  `

const GET_BEST_TOUR_BLOG_BY_COUNTRY = gql`
query GetFilterTour(
  $countrySlug: [String!]
$language: LanguageCodeFilterEnum!
){
allTours(
  first: 100
  where: {
    taxQuery: {
      taxArray: [
        {taxonomy: COUNTRIES, terms: $countrySlug, operator: NOT_IN, field: SLUG}, 
        {taxonomy: BESTSELLER, terms: "best-seller-tours", field: SLUG}]}, 
    orderby: {field: DATE, order: DESC}, language: $language}
) {
  nodes {
    id
    title
    slug
    bestSeller {
      nodes {
        name
      }
    }
    countries {
      nodes {
        id
        name
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
}`

export default GET_SERVICE_BY_CATEGORY
export {
  GET_POST,
  GET_ALL_POST,
  GET_ALL_POST_FILTER,
  GET_ALL_TOURS_BESTSELLER,
  GET_SERVICE_BY_CATEGORY,
  GET_ALL_POST_FILTER_BY_COUNTRY,
  GET_BEST_TOUR_BLOG_BY_COUNTRY,
  GET_ALL_BLOG_FILTER
}
