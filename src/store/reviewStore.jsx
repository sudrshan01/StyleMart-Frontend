// src/store/reviewStore.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllReviews, addReview } from "../services/reviewService";

// Async Thunks
export const fetchReviews = createAsyncThunk("reviews/fetchReviews", async () => {
  const data = await getAllReviews();
  return data;
});

export const createReview = createAsyncThunk("reviews/createReview", async (review) => {
  const data = await addReview(review);
  return data;
});

// Slice
const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create Review
      .addCase(createReview.fulfilled, (state, action) => {
        state.items.push(action.payload); // Add new review to list
      });
  },
});

export default reviewSlice.reducer;
