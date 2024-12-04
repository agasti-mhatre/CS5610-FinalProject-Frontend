
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Question[] = JSON.parse(localStorage.getItem("questions") || "[]");

export type Question = {
  id: number;
  title: string;
  points: number;
  text: string;
  choices?: string[];
  correctChoice?: number;
  isTrue?: boolean;
  blankAnswers?: string[];
  type: "Multiple Choice" | "True/False" | "Fill in the Blank";
  editMode: boolean;
};

const quizDetailEditorSlice = createSlice({
  name: "questions",
  initialState: initialState || [], 
  reducers: {
    addQuestion: (state) => {
      const newQuestion: Question = {
        id: Date.now(),
        type: "Multiple Choice",
        title: "",
        points: 1,
        text: "",
        choices: [""],
        correctChoice: 0,
        editMode: true,
      };
      state.push(newQuestion);
      localStorage.setItem("questions", JSON.stringify(state));
    },

    updateQuestion: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<Question> }>
    ) => {
      const { id, updates } = action.payload;
      const questionIndex = state.findIndex((q) => q.id === id);
      if (questionIndex !== -1) {
        state[questionIndex] = { ...state[questionIndex], ...updates };
      }
      localStorage.setItem("questions", JSON.stringify(state));
    },

    deleteQuestion: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const updatedState = state.filter((q) => q.id !== id);
      localStorage.setItem("questions", JSON.stringify(updatedState));
      return updatedState;
    },

    setQuestions: (state, action: PayloadAction<Question[]>) => {
      return action.payload;
    },

    toggleEditMode: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const question = state.find((q) => q.id === id);
      if (question) {
        question.editMode = !question.editMode;
      }
    },
  },
});


export const { addQuestion, updateQuestion, deleteQuestion, setQuestions, toggleEditMode } = quizDetailEditorSlice.actions;

export default quizDetailEditorSlice.reducer;
