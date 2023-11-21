import { revalidatePath } from 'next/cache'

export async function GET(request) {

  const secret = request.nextUrl.searchParams.get('secret')

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.NEXT_PUBLIC_SECRET_TOKEN) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: 'Invalid token',
    })
  }

  const path = request.nextUrl.searchParams.get('path')

  if (path) {
    revalidatePath(path)
    return Response.json({ revalidated: true, now: Date.now() })
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  })
}