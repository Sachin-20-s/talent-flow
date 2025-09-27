import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("theme") || "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state) => {
      const newTheme = state.value === "light" ? "dark" : "light";
      state.value = newTheme;
      localStorage.setItem("theme", newTheme);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
