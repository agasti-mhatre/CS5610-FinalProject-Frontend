import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        addQuiz: (state, { payload: newQuiz }) => {
            
            state.quizzes = [...state.quizzes, newQuiz] as any;
        },
        deleteQuiz: (state, { payload: quizId }) => {
            
            state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
        },
        updateQuiz: (state, { payload: quiz }) => {
            
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quiz._id ? { ...q, ...quiz } : q
            ) as any;
        },
        editQuiz: (state, { payload: quizId }) => {
            
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quizId ? { ...q, editing: true } : { ...q, editing: false }
            ) as any;
        },
        setQuizzes: (state, action) => {

            state.quizzes = action.payload;
        },
    },
});

export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;
