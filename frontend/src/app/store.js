import { configureStore } from '@reduxjs/toolkit';

import  questionSlice  from "../features/questions/questionSlice";
import authReducer from "../features/auth/authSlice";
import universitySlice from "../features/universities/universitySlice";
import majorSlice from "../features/majors/majorSlice";
import answerSlice from "../features/answers/answerSlice";
import profileSlice from "../features/profiles/profileSlice";

 

export const store = configureStore({
  reducer: {
    profiles: profileSlice.reducer,
    questions: questionSlice.reducer,
    answers: answerSlice.reducer,
    universities: universitySlice.reducer,
    majors: majorSlice.reducer,
    auth: authReducer,
  },
});
