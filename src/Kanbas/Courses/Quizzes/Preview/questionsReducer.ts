
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Updated schema for Question
export type Question = {
    questionId: string;
    quizId: string;
    title: string; 
    text: string;
    type: string; // Multiple Choice, True/False, Fill in the Blank
    options: string[];
    correctAnswer: string[];
    blanks: any[];
    points: number;
};

const initialState: Question[] = JSON.parse(localStorage.getItem("questions") || "[]");

const quizDetailEditorSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        addQuestion: (state) => {
            const newQuestion: Question = {
                questionId: 'QS' + Math.floor(Math.random() * 1000),
                quizId: "", // quizId to be set dynamically
                title: "",
                text: "",
                type: "Multiple Choice", // Default type
                options: [],
                correctAnswer: [],
                blanks: [], // Initially empty, to be populated for fill in the blank questions
                points: 1,
            };
            state.push(newQuestion);
            localStorage.setItem("questions", JSON.stringify(state));
        },

        updateQuestion: (state, action: PayloadAction<{ questionId: string; updates: Partial<Question> }>) => {
            const { questionId, updates } = action.payload;
            const questionIndex = state.findIndex((q) => q.questionId === questionId);
            if (questionIndex !== -1) {
                state[questionIndex] = { ...state[questionIndex], ...updates };
                localStorage.setItem("questions", JSON.stringify(state));
            }
        },

        deleteQuestion: (state, action: PayloadAction<{ questionId: string }>) => {
            const { questionId } = action.payload;
            const updatedState = state.filter((q) => q.questionId !== questionId);
            localStorage.setItem("questions", JSON.stringify(updatedState));
            return updatedState;
        },

        setQuestions: (state, action: PayloadAction<Question[]>) => {
            localStorage.setItem("questions", JSON.stringify(action.payload));
            return action.payload;
        },
    },
});

export const { addQuestion, updateQuestion, deleteQuestion, setQuestions } = quizDetailEditorSlice.actions;

export default quizDetailEditorSlice.reducer;