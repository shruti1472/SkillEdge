import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: true, // important
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false; // stop loading after data arrives
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
