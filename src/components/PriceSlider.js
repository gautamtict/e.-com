import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from "react-redux";
import { setPricing } from "../features/contentSlice";

export default function PriceSlider() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.content.filters);

  // Safe range from filters
  const [range, setRange] = useState(filters.pricing.range || [0, 999]);
  const [paidSelected, setPaidSelected] = useState(filters.pricing.paid || false);

  useEffect(() => {
    setRange(filters.pricing.range || [0, 999]);
    setPaidSelected(filters.pricing.paid || false);
  }, [filters.pricing]);

  const handleChange = (e, newValue) => setRange(newValue);

  const handleChangeCommitted = (e, newValue) => {
    dispatch(setPricing({ range: newValue, paid: paidSelected }));
    updateUrl(newValue, paidSelected);
  };

  const handleCheckbox = (e) => {
    const checked = e.target.checked;
    setPaidSelected(checked);
    if (!checked) {
      setRange([0, 999]);
      dispatch(setPricing({ range: [0, 999], paid: false }));
      updateUrl([0, 999], false);
    } else {
      dispatch(setPricing({ paid: true }));
      updateUrl(range, true);
    }
  };

  const updateUrl = (newRange, paid) => {
    const params = new URLSearchParams(window.location.search);
    if (paid) {
      params.set("minPrice", newRange[0]);
      params.set("maxPrice", newRange[1]);
    } else {
      params.delete("minPrice");
      params.delete("maxPrice");
    }
    window.history.replaceState(null, "", window.location.pathname + "?" + params.toString());
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px",width:"10%" ,paddingLeft:"30px"}}>
      {/* <label>
        <input type="checkbox" checked={paidSelected} onChange={handleCheckbox} /> Paid Items
      </label> */}
      {/* <span>{range[0]}</span> */}
      <Slider
        value={range}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        min={0}
        max={999}
        disableSwap
        // disabled={!paidSelected}
        style={{ flex: 1, touchAction: "pan-y" }}
      />
      {/* <span>{range[1]}</span> */}
    </div>
  );
}
