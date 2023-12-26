export const PROMOTION_TOUR_SLUG_QUERY = `
query ($language: LanguageCodeEnum!) {
  page(id: "cG9zdDoxMTAy", idType: ID) {
    translation(language: $language) {
      hotDeals {
        promotionList {
          ... on Tours {
            translation(language: $language) {
              id
              slug
            }
          }
        }
      }
    }
  }
}`

export const VOUCHER_SLUG_QUERY = `
query ($language: LanguageCodeEnum!) {
  page(id: "cG9zdDoxMTAy", idType: ID) {
    translation(language: $language) {
      hotDeals {
        voucherHeader {
          listVoucher {
            ... on Vouchers {
              translation(language: $language) {
                slug
              }
            }
          }
        }
      }
    }
  }
}`

export const GET_HOT_DEAL_DATA = `query ($language: LanguageCodeEnum!) {
  page(id: "cG9zdDoxMTAy", idType: ID) {
    translation(language: $language) {
      hotDeals {
        voucherHeader {
          detailHeader {
            conditionsHeader
            expiryDateHeader
            header
            timeRemaining
            timeUnit {
              hours
              minutes
              seconds
            }
            voucherButton
            form {
              email {
                header
                placeholder
              }
              heading
              name {
                header
                placeholder
              }
              phone {
                header
                placeholder
              }
              participantsnumber {
                header
                placeholder
              }
              date {
                header
                placeholder
              }
              button
            }
          }
          listHeader
          listVoucher {
            ... on Vouchers {
              translation(language: $language) {
                slug
                voucher {
                  content {
                    expireDate
                    extraDiscount
                    max
                    title
                    value
                    description
                  }
                  detailImage {
                    altText
                    sourceUrl(size: MEDIUM_LARGE)
                  }
                  rules {
                    conditions {
                      condition
                    }
                  }
                }
              }
            }
          }
        }
        promotionHeader
        promotionList {
          ... on Tours {
            translation(language: $language) {
              id
              slug
              tourDetail {
                priceTour
                banner {
                  title
                  rate
                  location
                  gallery {
                    title
                    altText
                    sourceUrl(size: MEDIUM_LARGE)
                  }
                  icons
                }
              }
            }
          }
        }
      }
    }
  }
}`

export const GET_ALL_VOUCHER = `query ($language: LanguageCodeFilterEnum!) {
  allVouchers(where: {language: $language}) {
    nodes {
      slug
      voucher {
        content {
          description
          expireDate
          extraDiscount
          fieldGroupName
          title
          max
        }
        detailImage {
          altText
          sourceUrl(size: MEDIUM_LARGE)
        }
        rules {
          conditions {
            condition
          }
        }
      }
    }
  }
}`

export const GET_LIST_PROMOTION_TOUR = `query ($language: LanguageCodeEnum!) {
    page(id: "cG9zdDoxMTAy", idType: ID) {     
        hotDeals {
          promotionList {
            ... on Tours {
              translation(language: $language) {
                id
                slug
                tourDetail {
                  priceTour
                  banner {
                    title
                    rate
                    location
                    gallery {
                      altText
                      title
                      sourceUrl(size: MEDIUM_LARGE)
                    }
                    icons
                  }
                }
              }
            }
          }
        }
    }
  }`

export const GET_META_DATA = `query ($language: LanguageCodeEnum!) {
    page(id: "cG9zdDoxMTAy") {
      translation(language: $language) {
        hotDeals {
          meta {
            title
            description
          }
        }
        featuredImage {
          node {
            altText
            sourceUrl(size: MEDIUM_LARGE)
          }
        }
      }
    }
  }`

export const DATA_POPUP_VOUCHER = `query($language: LanguageCodeEnum!){
    page(id: "cG9zdDo0NzU5") {
      translation(language: $language) {
        slug
        title
        popupPromotion {
          thumbPopup {
            sourceUrl(size: MEDIUM_LARGE)
          }
          voucher {
            ... on Vouchers {
              title
              slug
            }
          }
        }
      }
    }
  }`

export const DATA_VOUCHER_DETAIL = `query getVoucherDetail($slug: ID!, $language: LanguageCodeEnum!){
    vouchers(id:$slug,idType: URI) {
      translation(language:$language) {
        slug
        title
      voucher {
        content {
          expireDate
          extraDiscount
          max
          title
          value
          description
        }
        detailImage {
          altText
          sourceUrl(size: MEDIUM_LARGE)
        }
        rules {
          conditions {
            condition
          }
        }
      }
    }
  }
  }`