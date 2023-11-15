export const getMeta = (title, excerpt, featuredImage) => {
  return {
    metadataBase: new URL('http://localhost:3000'),
    title: title,
    description: excerpt,
    applicationName: process.env.SITE_NAME,
    openGraph: {
      title: title,
      description: excerpt,
      url: process.env.DOMAIN || '',
      siteName: process.env.SITE_NAME,
      images: [
        {
          url: featuredImage?.node?.sourceUrl || 'https://res.cloudinary.com/asiavivatravel/images/v1699352552/Viet-Nam-1/Viet-Nam-1.png',
          alt: featuredImage?.node?.altText || featuredImage?.node?.title || 'openGraph'
        }
      ],
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: excerpt,
      creator: process.env.SITE_NAME,
      images: [
        {
          url: featuredImage?.node?.sourceUrl || 'https://res.cloudinary.com/asiavivatravel/images/v1699352552/Viet-Nam-1/Viet-Nam-1.png',
          alt: featuredImage?.node?.altText || featuredImage?.node?.title || 'twitter'
        }
      ]
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  }
}
