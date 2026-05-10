import React from "react";

export default async function CreditCard({ credit }: { credit: any }) {
  const imageURLS = await fetch(`https://api.themoviedb.org/3/configuration`,{ cache: "no-store",
    headers: {
            Authorization: `Bearer ${process.env.READ_ACCESS_TOKEN}`,
            Accept: "application/json",
          },
   })
  const imgData = await imageURLS.json()

  return (
    <div className="card" style={{display:"flex",flexDirection:"row",gap:10,alignItems:"center"}}>
      {credit.profile_path ? (
        <img
          src={`${imgData.images.secure_base_url}/${imgData.images.profile_sizes[2]}${credit.profile_path}`}
          alt={credit.name}
          style={{width:48,height:48,borderRadius:"50%",objectFit:"cover"}}
        />
      ) : (
        <div style={{
          width:48,
          height:48,
          borderRadius:"50%",
          background:"#222944"
        }}/>
      )}
      <div>
        <div style={{fontWeight:600}}>{credit.name}</div>
        <div className="small">{credit.character || "Cast"}</div>
      </div>
    </div>
  );
}