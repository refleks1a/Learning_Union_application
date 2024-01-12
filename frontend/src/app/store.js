import { configureStore } from '@reduxjs/toolkit';
import  questionSlice  from "../features/questions/questionSlice";
import authReducer from "../features/auth/authSlice";
 
export const store = configureStore({
  reducer: {
    questions: questionSlice.reducer,
    auth: authReducer,
  },
});
