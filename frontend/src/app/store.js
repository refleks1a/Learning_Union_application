import { configureStore } from '@reduxjs/toolkit';
import  questionSlice  from "../features/questions/questionSlice";
import authReducer from "../features/auth/authSlice";
import universitySlice from "../features/universities/universitySlice";
import majorSlice from "../features/majors/majorSlice";
 

export const store = configureStore({
  reducer: {
    questions: questionSlice.reducer,
    universities: universitySlice.reducer,
    majors: majorSlice.reducer,
    auth: authReducer,
  },
});
