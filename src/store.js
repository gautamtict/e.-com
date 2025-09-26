import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./features/contentSlice";

const store = configureStore({
  reducer: {
    content: contentReducer,
  },
});

export default store;
