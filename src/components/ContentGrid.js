import React, { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContentCard from "./ContentCard";
import { fetchContents } from "../features/contentSlice";

export default function ContentGrid() {
  const dispatch = useDispatch();
  const { items, status, error, filters } = useSelector((s) => s.content);

  useEffect(() => {
    if (status === "idle") dispatch(fetchContents());
  }, [status, dispatch]);
  const filtered = useMemo(() => {
    if (!items || items.length === 0) return [];
  
    const { paid, free, viewOnly, range } = filters.pricing;
    const [minPrice, maxPrice] = range || [0, 999];
    const pricingActive = paid || free || viewOnly;
  
    const lowKeyword = (filters.keyword || "").toLowerCase();
  
    return items.filter((it) => {
      const price = it.price ?? it.amount ?? 0;
  
      // Pricing filters (paid/free/viewOnly)
      let isPaid = price > 0;
      let isFree = price === 0;
      let isViewOnly = it.viewOnly || String(it.pricing || "").toLowerCase().includes("view");
  
      if (pricingActive) {
        let passed = false;
        if (paid && isPaid) passed = true;
        if (free && isFree) passed = true;
        if (viewOnly && isViewOnly) passed = true;
        if (!passed) return false;
      }
  
      if (price < minPrice || price > maxPrice) return false;
  
      // Keyword filter
      if (lowKeyword) {
        const name = (it.userName || it.username || it.user || it.creator || "").toLowerCase();
        const title = (it.title || it.name || "").toLowerCase();
        if (!name.includes(lowKeyword) && !title.includes(lowKeyword)) return false;
      }
  
      return true;
    });
  }, [items, filters]);
  
  
  // Infinite scroll
  const PAGE_SIZE = 12;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => setVisibleCount(PAGE_SIZE), [filters]);

  const loaderRef = useRef(null);
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filtered.length));
    },
    [filtered.length]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { root: null, rootMargin: "0px", threshold: 0.1 });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (status === "loading") return <div className="center">Loading...</div>;
  if (status === "failed") return <div className="center">Error: {error}</div>;

  const toRender = filtered.slice(0, visibleCount);

  return (
    <div className="content-wrapper">
      <div className="grid">
        {toRender.map((it) => (
          <ContentCard key={it.id || it._id || Math.random()} item={it} />
        ))}
      </div>
      {toRender.length === 0 && <div className="center">No items found.</div>}
      <div ref={loaderRef} className="loader">
        {visibleCount < filtered.length ? "Loading more..." : "No more items"}
      </div>
      <div className="count">Showing {toRender.length} of {filtered.length} items</div>
    </div>
  );
}
