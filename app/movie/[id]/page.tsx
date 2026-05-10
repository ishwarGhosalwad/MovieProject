import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import VideoCard from '../../../components/VideoCard'
import CreditCard from '../../../components/CreditCard'

type Props = { params: { id: string } }

export default async function MoviePage({ params }: Props) {
  const {id} = await params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  console.log(`${baseUrl}/api/movies/${id}`);
  const res = await fetch(`https://${baseUrl}/api/movies/${id}`, {
    cache: 'no-store',
    headers: {
      'Authorization': `Bearer ${process.env.READ_ACCESS_TOKEN}`,
    },
  })
  const imageURLS = await fetch(`https://${baseUrl}/api/config`, {
    cache: 'no-store',
    headers: {
      'Authorization': `Bearer ${process.env.READ_ACCESS_TOKEN}`,
    },
  })
  const imgData = await imageURLS.json()
  if (res.status === 404) return notFound()
    if (res.status === 429) {
  throw new Error("Too many requests")
}
  if (!res.ok) {
    return <p>Failed to load movie: {res.status}</p>
  }
  const movie = await res.json()

  return (
    <article>
      <h2>{movie.title}</h2>
      <p className="small">{movie.release_date} • {movie.runtime} min</p>
      {movie.genres?.length && (
        <p className="small">
          Genres: {movie.genres.map((g: any) => g.name).join(', ')}
        </p>
      )}
      <p>Rating {movie.vote_average} ⭐</p>
      <div style={{display:'flex',gap:16,marginTop:12}}>
        {movie.poster_path && <img src={`${imgData.images.secure_base_url}/${imgData.images.poster_sizes[4]}${movie.poster_path}`} alt="poster" style={{width:240,borderRadius:8}} />}
        <div>
          <p>{movie.overview}</p>

        </div>
        
        
      </div>
      <div>
        <h4>Top Cast</h4>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {movie.credits?.cast.slice(0,5).map((c:any)=> (
              <CreditCard key={c.id} credit={c}/>
            ))}
          </div>
        </div>
        <div>{movie?.videos?.results && movie.videos.results.length > 0 && (
        <>
          <h3 style={{margin:"36px 0 8px"}}>Trailers</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px,1fr))",gap:16}}>
            {movie.videos.results.slice(0,6).map((v:any)=>(
              <VideoCard key={v.key} video={v}/>
            ))}
          </div>
        </>
      )}</div>
    </article>
  )
}