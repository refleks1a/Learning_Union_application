import { configureStore } from '@reduxjs/toolkit';
import  questionSlice  from "../features/questions/questionSlice";

export const store = configureStore({
  reducer: {
    questions: questionSlice.reducer
  },
});
