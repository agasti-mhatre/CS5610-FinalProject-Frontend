import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../../Database";
const initialState = {
    quizzes: quizzes,
};
const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        addQuiz: (state, { payload: quiz }) => {
            const newQuiz: any = {
                _id: new Date().getTime().toString(),
                lessons: [],
                name: quiz.name,
                course: quiz.course,
            };
            state.quizzes = [...state.quizzes, newQuiz] as any;
        },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter(
                (q: any) => q._id !== quizId);
        },
        updateQuiz: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quiz._id ? quiz : q
            ) as any;
        },
        editQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quizId ? { ...q, editing: true } : q
            ) as any;
        },
    },
});
export const { addQuiz, deleteQuiz, updateQuiz, editQuiz } =
    quizzesSlice.actions;
export default quizzesSlice.reducer;
