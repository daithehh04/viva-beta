const DATA_DETAIL = `
query PostBySlug($slug: String!, $language: LanguageCodeEnum!) {
  generalSettings {
      title
  }
  postBy(slug: $slug) {
    id
    databaseId
    content
    title
    slug
    translation(language: $language) {
      id
      slug
      content
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      language {
          locale
          slug
      }
    }
  }
}
`

const DATA_BLOG_DETAIL = `query ($slug: ID!, $language: LanguageCodeEnum!) {
  blog(id: $slug, idType: SLUG) {
    translation(language: $language) {
      id
      slug
      content
      link
      title
      excerpt
      featuredImage {
        node {
          sourceUrl
        }
      }
      language {
        locale
        slug
      }
      blogdetail {
      subtitle1
      subtitle2
      time
      transtitle{
        button
        heading
        share
      }
      username
      heading
      otherarticle {
        ... on Post {
          id
          blogdetail {
            heading
            subtitle1
            subtitle2
            time
            username
          }
          translation(language: $language) {
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
    }
  }
}`

const GET_ARTICLE_NEWS = `
  query ($language: LanguageCodeFilterEnum!, $slug: ID!) {
    posts(
      first: 4
      where: {
        taxQuery: {
          taxArray: {field: SLUG, operator: IN, taxonomy: CATEGORY, terms: $slug}
        }
        orderby: {field: DATE, order: DESC}, language: $language}
    ) {
      nodes {
        blogdetail {
          heading
          subtitle1
          subtitle2
          time
          username
        }
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
        title
        excerpt
      }
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`

const GET_RECOMMEND_SERVICE_ID = `
  query ($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
    slug
    content
    title
    blogdetail{
      time
      username
      heading
      transtitle{
        heading
        button
        share
      }
    }
    }
  }
`
export { DATA_DETAIL, DATA_BLOG_DETAIL, GET_ARTICLE_NEWS, GET_RECOMMEND_SERVICE_ID }
