import fetchPonyfill from 'fetch-ponyfill'

export default async function fetchData(
  query, variables = {},
  usePonyfill = true
) {
  try {
    const res = await (usePonyfill ? fetchPonyfill() : { fetch }).fetch(process.env.NEXT_PUBLIC_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 },
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
  } catch (error) {
    throw new Error('Failed to fetch data', error)
  }
}