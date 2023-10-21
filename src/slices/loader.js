import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reload : 0,
};


const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers : {
    increment: (state) => {
        state.reload += 1
    }
  }
});

export  const { increment } = loaderSlice.actions;
export default loaderSlice.reducer;