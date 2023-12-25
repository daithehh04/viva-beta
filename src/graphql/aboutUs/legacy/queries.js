export const LEGACY_DATA_QUERY = `query ($language: LanguageCodeEnum!) {
    page(id: "cG9zdDo5OTQ3") {
      translation(language: $language) {
        content
      }
    }
  }`

export const LEGACY_SLUG = `query($language: LanguageCodeEnum!) {
  page(id: "cG9zdDo5OTQ3") {
    translation(language: $language) {
      language {
        id
      }
      slug
    }
  }
}`