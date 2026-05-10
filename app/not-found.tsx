// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{textAlign:"center",margin:"5em 0"}}>
      <h2>Page Not Found</h2>
      <p>Sorry, that page doesn’t exist.</p>
      <Link href="/">
        <button className="search-button" style={{marginTop:16}}>Return to Search</button>
      </Link>
    </div>
  );
}