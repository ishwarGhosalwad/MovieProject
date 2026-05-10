import React from 'react'

export default function Pagination({ page, total_pages, q }: { page: number; total_pages: number; q: string }) {
  const prev = page > 1 ? `/?q=${encodeURIComponent(q)}&page=${page-1}` : null
  const next = page < total_pages ? `/?q=${encodeURIComponent(q)}&page=${page+1}` : null
  return (
    <nav className="pagination">
      {prev ? <a href={prev} className="search-button">Previous</a> : <span style={{opacity:0.4}}>Previous</span>}
      <div className="small">Page {page} of {total_pages}</div>
      {next ? <a href={next} className="search-button">Next</a> : <span style={{opacity:0.4}}>Next</span>}
    </nav>
  )
}