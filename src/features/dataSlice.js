import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = process.env.REACT_APP_CLOSET_URL;

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchData.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload; })
      .addCase(fetchData.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message; });
  }
});

export default dataSlice.reducer;