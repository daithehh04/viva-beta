// import fetchPonyfill from 'fetch-ponyfill'

export default async function fetchData(
  query, variables = {},
  // usePonyfill = true
) {
  // const res = await (usePonyfill ? fetchPonyfill() : { fetch }).fetch(process.env.NEXT_PUBLIC_API, {
  const res = await fetch(process.env.NEXT_PUBLIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    // cache: 'no-store',
    next: { revalidate: 3600 }
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
    // return null
  }

  return res.json()
}