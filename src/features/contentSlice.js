import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.REACT_APP_CLOSET_URL;

export const fetchContents = createAsyncThunk("content/fetchContents", async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return data;
});

const contentSlice = createSlice({
  name: "content",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    filters: {
      pricing: { paid: false, free: false, viewOnly: false, range: [0, 999] }, 
      keyword: "",
      category: "All",
      sort: "name",
    },
  },
  reducers: {
    setPricing(state, action) {
      state.filters.pricing = { ...state.filters.pricing, ...action.payload };
    },
    setKeyword(state, action) {
      state.filters.keyword = action.payload;
    },
    setCategory(state, action) {
      state.filters.category = action.payload;
    },
    resetFilters(state) {
      state.filters = {
        pricing: { paid: false, free: false, viewOnly: false, range: [0, 999] }, 
        keyword: "",
        category: "All",
        sort: "name",
      };
    },
    setFiltersFromUrl(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setPricing, setKeyword, resetFilters, setFiltersFromUrl, setCategory } =
  contentSlice.actions;

export default contentSlice.reducer;
