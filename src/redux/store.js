import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../theme/themeSlice'
import jobReducer from "../jbSlice/jobSlice"
export const store = configureStore({
  reducer: {
    theme:themeReducer,
    jobs:jobReducer,
  },
})