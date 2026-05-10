import { NextResponse } from 'next/server'

export async function GET(
) {

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/configuration`,
      {
        cache: 'no-store',
        headers: {
          Authorization: `Bearer ${process.env.READ_ACCESS_TOKEN}`,
          Accept: 'application/json',
        },
      }
    )

    if (res.status === 404) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      )
    }

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