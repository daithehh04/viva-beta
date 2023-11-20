import React from 'react'
import './globals.css'
import { i18n } from '../../../i18n-config'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
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