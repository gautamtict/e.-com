import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pricing: { paid: false, free: false, viewOnly: false },
  keyword: '',
  sort: 'name',
  priceRange: [0, 999],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPricing(state, action) {
      state.pricing = { ...state.pricing, ...action.payload };
    },
    resetFilters(state) {
      state.pricing = initialState.pricing;
      state.keyword = initialState.keyword;
      state.sort = initialState.sort;
      state.priceRange = initialState.priceRange;
    },
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
    setAll(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

export const { setPricing, resetFilters, setKeyword, setSort, setPriceRange, setAll } = filtersSlice.actions;
export default filtersSlice.reducer;