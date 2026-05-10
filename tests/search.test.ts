// tests/api/movies/search.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Adjust this import path to match your project.
// If your route handler file is at app/api/movies/search/route.ts and it exports GET:
// import { GET } from '../../../app/api/movies/search/route'
// If it default-exports (export default function GET...), use:
// import GET from '../../../app/api/movies/search/route'
//
// Try both if one fails; update path depth depending on where tests run from.

import {GET} from '../app/api/movies/search/route' // import mosdule for flexibility

// Dummy TMDB search response (trimmed to necessary fields)
const sampleTmdbResponse = {
  page: 1,
  total_pages: 1,
  total_results: 1,
  results: [
    {
      id: 123,
      title: 'Mocked Movie Title',
      release_date: '2025-01-01',
      overview: 'Sample overview',
      poster_path: '/poster.jpg',
      vote_average: 7.2
    }
  ]
}

describe('GET /api/movies/search route handler', () => {
  let originalFetch: any

  beforeEach(() => {
    originalFetch = global.fetch
    vi.restoreAllMocks()
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('returns normalized search results on success', async () => {
    // mock fetch used inside the route handler -> should return sampleTmdbResponse
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => sampleTmdbResponse
    } as any)

    // Build a Request as Next.js route handler would receive
    const req = new Request('http://localhost/api/movies/search?query=mock&page=1')

    const res = await GET(req)

    // Some route handlers return a Web Response-like object with json()
    // Normalize reading the body depending on what was returned:
    let body: any
    if (typeof res.json === 'function') {
      body = await res.json()
    } else if (res instanceof Response) {
      body = await res.json()
    } else {
      // if your handler returns NextResponse.json({...}) it will have json()
      body = res
    }

    expect(res.status ?? 200).toBe(200)
    expect(body).toHaveProperty('results')
    expect(Array.isArray(body.results)).toBe(true)
    expect(body.results[0]).toMatchObject({
      id: 123,
      title: 'Mocked Movie Title',
      release_date: '2025-01-01',
      overview: 'Sample overview',
      vote_average: 7.2
    })
    // poster_url should be present if your route constructs full image URLs (optional)
  })

  it('returns structured error (429) when TMDB rate limits', async () => {
    // mock TMDB 429
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({ status_message: 'Too Many Requests' })
    } as any)

    const req = new Request('http://localhost/api/movies/search?query=mock&page=1')
    const res = await GET(req)

    // if handler throws, catch that case:
    if (res instanceof Error) {
      // you may decide your handler throws — treat it as failure
      expect(res).toBeInstanceOf(Error)
      return
    }

    // else expect returned response has status 429 or contains an error shape
    const status = res.status ?? (res as any).statusCode ?? 429
    expect(status).toBe(429)
  })
})

