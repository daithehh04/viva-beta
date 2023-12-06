import fetchData from '@/data/fetchData'
import { SERVICES_SLUG_QUERY } from '@/data/getDataRcmServices'
import React from 'react'

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams({ params }) {
  const { data } = await fetchData(SERVICES_SLUG_QUERY, { language: params.lang?.toUpperCase() })

  const services = data?.categories?.nodes || []

  return services.map((service) => ({
    slug: service?.slug
  }))
}


const RecommendedServiceLayout = ({
  children
}) => {
  return (
    <>{children}</>
  )
}

export default RecommendedServiceLayout