import React from "react";

export default function ContentCard({ item }) {
  console.log(item,'itemitemitem')
  const thumbnail =
    item.imagePath  
  const userName = item.userName || item.username || item.user || item.creator || item.owner || "Unknown";
  const title = item.title || item.name || "Untitled";
  const pricing = (item.pricing || "").toLowerCase();
  const price = item.price ?? item.amount ?? null;

  let pricingLabel = "Free";
  if (pricing.includes("paid") || item.isPaid || price) {
    pricingLabel = "Paid";
  } else if (pricing.includes("view") || item.viewOnly) {
    pricingLabel = "View Only";
  }

  return (
    <div className="card">
      <div className="card-media">
        {thumbnail ? (
          <img src={thumbnail} alt={title} />
        ) : (
          <div className="placeholder">No Image</div>
        )}
      </div>
      <div className="card-body">
        <div className="card-user">{userName}</div>
        <div className="card-title">{title}</div>
        <div className="card-footer">
          <span className="price-label">{pricingLabel}</span>
          {pricingLabel === "Paid" && price != null && (
            <span className="price-amount">₹{price}</span>
          )}
        </div>
      </div>
    </div>
  );
}
