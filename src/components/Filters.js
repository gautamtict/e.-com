import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPricing, resetFilters } from "../features/contentSlice";
import PriceSlider from "./PriceSlider";

function updateUrl(filters) {
  const q = new URLSearchParams();
  if (filters.keyword) q.set("q", filters.keyword);
  const { paid, free, viewOnly } = filters.pricing;
  if (paid) q.set("paid", "1");
  if (free) q.set("free", "1");
  if (viewOnly) q.set("viewOnly", "1");
  const newUrl = window.location.pathname + "?" + q.toString();
  window.history.replaceState(null, "", newUrl);
}

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.content.filters);

  const toggle = (key) => {
    const newState = {};
    if (key === "paid") newState.paid = !filters.pricing.paid;
    if (key === "free") newState.free = !filters.pricing.free;
    if (key === "viewOnly") newState.viewOnly = !filters.pricing.viewOnly;
    dispatch(setPricing(newState));
    const updated = {
      ...filters,
      pricing: { ...filters.pricing, ...newState },
    };
    updateUrl(updated);
  };

  const onReset = () => {
    dispatch(resetFilters());
    // clear query
    window.history.replaceState(null, "", window.location.pathname);
  };

  return (
    <div className="filters-row">
      <div className="filter-pill" onClick={() => toggle("paid")}>
        <input type="checkbox" readOnly checked={filters.pricing.paid} />
        <span>Paid</span>
      </div>

      <div className="filter-pill" onClick={() => toggle("free")}>
        <input type="checkbox" readOnly checked={filters.pricing.free} />
        <span>Free</span>
      </div>

      <div className="filter-pill" onClick={() => toggle("viewOnly")}>
        <input type="checkbox" readOnly checked={filters.pricing.viewOnly} />
        <span>View Only</span>
      </div>

      <button className="reset-btn" onClick={onReset}>Reset</button>
      <PriceSlider style={{padding:"30px"}}/>


    </div>
  );
}
