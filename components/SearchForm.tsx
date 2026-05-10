'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchForm({ initialQuery = '' }: { initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery)
  const router = useRouter()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = q.trim()
    if (trimmed.length < 2) return
    router.push(`/?q=${encodeURIComponent(trimmed)}&page=1`)
  }

  return (
    <form onSubmit={onSubmit} className="search-form">
      <input className="search-input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search movies..." />
      <button type="submit" className="search-button">Search</button>
    </form>
  )
}