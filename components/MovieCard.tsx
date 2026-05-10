import React from 'react'
import Image from 'next/image'

export default async function MovieCard({ movie }: { movie: any }) {
  const imageURLS = await fetch(`https://api.themoviedb.org/3/configuration`,{ cache: "no-store",
    headers: {
            Authorization: `Bearer ${process.env.READ_ACCESS_TOKEN}`,
            Accept: "application/json",
          },
   })
  const imgData = await imageURLS.json()
  return (
    <a className="card" href={`/movie/${movie.id}`}>
      {movie.poster_path ? <img src={`${imgData.images.secure_base_url}/${imgData.images.poster_sizes[4]}${movie.poster_path}`} alt={movie.title} /> : <div style={{height:270,background:'#041022',borderRadius:6}} />}
      <h3>{movie.title}</h3>
      <div className="small">{movie.release_date} • ⭐ {movie.vote_average ?? '—'}</div>
    </a>
  )
}