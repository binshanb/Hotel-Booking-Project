import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile:{} , // Initial user profile data
  loading: "idle", // Loading state
  error: null, // Error state
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserProfile, setLoading, setError } = userProfileSlice.actions;

export default userProfileSlice.reducer;