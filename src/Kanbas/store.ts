import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentReducer from "./Enrollment/reducer";
import quizzesReducer from "./Courses/Quizzes/quizReducer";

const store = configureStore({
  reducer: {
    quizzesReducer,
    quizzes: quizzesReducer, // Ensure "quizzes" key matches the state structure

    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentReducer
  },
});
export default store;