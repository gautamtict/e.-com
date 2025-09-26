import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setKeyword } from "../features/contentSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.content.filters);
  const [value, setValue] = useState(filters.keyword || "");

  useEffect(() => {
    setValue(filters.keyword || "");
  }, [filters.keyword]);

  const updateUrl = (newKeyword) => {
    const params = new URLSearchParams();

    if (newKeyword) params.set("q", newKeyword);
    if (filters.pricing.paid) params.set("paid", "1");
    if (filters.pricing.free) params.set("free", "1");
    if (filters.pricing.viewOnly) params.set("viewOnly", "1");
    if (filters.category && filters.category !== "All")
      params.set("category", filters.category);

    const newUrl = window.location.pathname + "?" + params.toString();
    window.history.replaceState(null, "", newUrl);
  };

  const onChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    dispatch(setKeyword(newValue.trim()));
    updateUrl(newValue.trim());
  };

  return (
    <div className="search-row">
      
      <input
        className="search-input"
        placeholder="Search for Avatars"
        value={value}
        onChange={onChange}
      />
      
    </div>
  );
}
