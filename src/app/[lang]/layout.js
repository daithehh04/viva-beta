import React from 'react'
import './globals.css'
import { i18n } from '../../../i18n-config'
import Script from 'next/script'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export function generateViewport() {
  return {
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
  }
}

export const metadata = {
  other: {
    'google-site-verification': '3Aim5tZRr39Pzh_cf54NCK_Rgx80kLtJp_ggnUkeL3Q'
  }
}

const RootLayout = async ({ children, params }) => {
  return (
    <html lang={params.lang}>
      {/* <head>
        <meta
          name='google-site-verification'
          content='3Aim5tZRr39Pzh_cf54NCK_Rgx80kLtJp_ggnUkeL3Q'
        />
      </head> */}
      <body suppressHydrationWarning={true}>{children}</body>
      <Script
        id='google-script'
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=G-F9VNYCVPJ9`}
      ></Script>
      <Script id='ga-script' strategy='lazyOnload'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-F9VNYCVPJ9');
          `}
      </Script>
    </html>
  )
}

export default RootLayout
