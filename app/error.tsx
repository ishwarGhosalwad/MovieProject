// app/not-found.tsx
"use client"
import Link from "next/link";

export default function error({error, reset}: {error: Error, reset: () => void}) {
  return (
    <div style={{textAlign:"center",margin:"5em 0"}}>
      <h2>Something went wrong</h2>
      <p>Sorry, an error occurred.</p>
      <Link href="/">
        <button className="search-button" style={{marginTop:16}} onClick={reset}>Return to Search</button>
      </Link>
    </div>
  );
}