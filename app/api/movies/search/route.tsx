import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('query')?.trim() || ''
  const page = parseInt(searchParams.get('page') || '1', 10)

  if (!q || q.length < 2) {
    return NextResponse.json(
      { error: 'Query must be at least 2 characters' },
      { status: 400 }
    )
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${q}&page=${page}&include_adult=false`,
      {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${process.env.READ_ACCESS_TOKEN}`,
          Accept: 'application/json',
        },
      }
    )

    if (res.status === 429) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: `TMDB API error: ${res.status} ${res.statusText}` },
        { status: res.status }
      )
    }

    const data = await res.json()
    

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}