import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userslice",
  initialState: {
    state: {
      user: JSON.parse(localStorage.getItem("user")) || null,
      isAuthenticated: !!localStorage.getItem("user"),
    },
  },
  reducers: {
    setUser(state, action) {
      state.state.user = action.payload;
      state.state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser(state, action) {
      state.state.user = null;
      state.state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});


export const {setUser,logoutUser} = userSlice.actions;
export default userSlice.reducer;