import React from "react";

export default function VideoCard({ video }: { video: any }) {
  // Only show YouTube videos for now:
  if (video.site !== "YouTube") return null;
  return (
    <div className="card" style={{padding: "0 0 10px 0"}}>
      <iframe
        width="100%"
        height="180"
        src={`https://www.youtube.com/embed/${video.key}`}
        title={video.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{border: 0, borderRadius: 8, marginBottom: 8}}
      />
      <div style={{padding:"0 8px"}}>
        <div className="small">{video.type}</div>
        <div style={{fontWeight: 600}}>{video.name}</div>
      </div>
    </div>
  );
}