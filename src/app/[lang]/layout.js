import React from 'react'
import './globals.css'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'it' }, { lang: 'fr' }]
}

export function generateViewport() {
  return {
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
  }
}

const RootLayout = async ({ children, params }) => {
  return (
    <html lang={params.lang}>
      <body suppressHydrationWarning={true}>
        {children}</body></html>

  )
}

export default RootLayout