
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as client from "./client";



export type Question = {
  questionId: string;
  quizId: string;
  text: string;
  type: "Multiple Choice" | "True or False" | "Fill in the blank";
  options: string[];
  correctAnswer: string[];
  blankAnswers?: string[];
  points: number;
  _id?: string;
};

const initialState: Question[] = [];

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (quizId: string, thunkAPI) => {
    try {
      const response = await client.fetchQuestionsByQuizId(quizId);
      return response;
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      return thunkAPI.rejectWithValue("Failed to fetch questions");
    }
  }
);

export const createQuestionAsync = createAsyncThunk(
  "questions/createQuestion",
  async (
    { quizId, newQuestion }: { quizId: string; newQuestion: Partial<Question> }, thunkAPI) => {
    try {
      const response = await client.createQuestionForQuiz(quizId, newQuestion);
      return response;
    } catch (error) {
      console.error("Failed to create question:", error);
      return thunkAPI.rejectWithValue("Failed to delete question");
    }
  }
);


// Async Thunk for updating a question
export const updateQuestionAsync = createAsyncThunk(
  "questions/updateQuestion",
  async (
    { questionId, updates }: { questionId: string; updates: Partial<Question> },
    thunkAPI
  ) => {
    try {
      const response = await client.updateQuestion(questionId, updates);
      return { questionId, updates: response }; // Return updated data from the server
    } catch (error) {
      console.error("Failed to update question:", error);
      return thunkAPI.rejectWithValue("Failed to update question");
    }
  }
);

// Async Thunk for deleting a question
export const deleteQuestionAsync = createAsyncThunk(
  "questions/deleteQuestion",
  async (questionId: string, thunkAPI) => {
    try {
      await client.deleteQuestion(questionId);
      return questionId; // Return deleted questionId
    } catch (error) {
      console.error("Failed to delete question:", error);
      return thunkAPI.rejectWithValue("Failed to delete question");
    }
  }
);


const quizDetailEditorSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<{ quizId: string }>) => {
      const { quizId } = action.payload;
      const newQuestion: Question = {
        questionId: `QS${Math.floor(Math.random() * 1000)}`,
        quizId,
        text: "",
        type: "Multiple Choice",
        options: [""],
        correctAnswer: [""],
        points: 1,
        blankAnswers: [""],
      };

      state.push(newQuestion);
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      localStorage.setItem("questions", JSON.stringify(action.payload));
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createQuestionAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    builder.addCase(updateQuestionAsync.fulfilled, (state, action) => {
      const { questionId, updates } = action.payload;
      const questionIndex = state.findIndex((q) => q.questionId === questionId);
      if (questionIndex !== -1) {
        state[questionIndex] = { ...state[questionIndex], ...updates }; // Update the question in local state
      }
    })

    builder.addCase(deleteQuestionAsync.fulfilled, (state, action) => {
      const questionId = action.payload;
      return state.filter(question => question.questionId !== questionId);
    })
  },
});

export const { addQuestion, setQuestions } = quizDetailEditorSlice.actions;

export default quizDetailEditorSlice.reducer;