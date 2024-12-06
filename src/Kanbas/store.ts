import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentReducer from "./Enrollment/reducer";
import quizzesReducer from "./Courses/Quizzes/quizReducer";
import questionReducer  from "./Courses/Quizzes/Preview/questionsReducer";
import quizResultReducer from "./Courses/Quizzes/Preview/quizResultReducer";

const store = configureStore({
  reducer: {
    quizzesReducer,
    quizzes: quizzesReducer, // Ensure "quizzes" key matches the state structure
    questionReducer, 
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentReducer,
    quizResult: quizResultReducer,
  },
});
export type AppDispatch = typeof store.dispatch; // This will be used for the typed dispatch
export type RootState = ReturnType<typeof store.getState>; // Type of the state for useSelector hooks

export default store;