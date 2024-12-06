// questionsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as client from '../client'; // Import the client functions

// Define the Question interface within the reducer file
interface Question {
    _id: string;           // Mongoose-generated ObjectId
    questionId: string;    // Custom identifier (e.g., 'QS123')
    quizId: string;        // Reference to the associated quiz
    text: string;          // Question text
    type: 'Multiple Choice' | 'True or False' | 'Fill in the blanks';
    options?: string[];    // For 'Multiple Choice' questions
    correctAnswer?: string; // Correct answer
    points: number;        // Points assigned to the question
    createdAt: string;     // Timestamp
    updatedAt: string;     // Timestamp
}

// Define the initial state for the questions slice
interface QuestionsState {
    questions: Question[];
    loading: boolean;
    error: string | null;
}

const initialState: QuestionsState = {
    questions: [],
    loading: false,
    error: null,
};

/**
 * Async thunk to fetch questions by quiz ID.
 */
export const fetchQuestions = createAsyncThunk<Question[], string>(
    'questions/fetchQuestions',
    async (quizId, thunkAPI) => {
        try {
            const questions = await client.fetchQuestionsByQuizId(quizId);
            return questions;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch questions.');
        }
    }
);

/**
 * Async thunk to create a new question.
 */
export const createQuestion = createAsyncThunk<Question, { quizId: string; questionData: Omit<Question, '_id' | 'questionId' | 'createdAt' | 'updatedAt'> }>(
    'questions/createQuestion',
    async ({ quizId, questionData }, thunkAPI) => {
        try {
            const newQuestion = await client.createQuestionForQuiz(quizId, questionData);
            return newQuestion;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create question.');
        }
    }
);

/**
 * Async thunk to update an existing question.
 */
export const updateExistingQuestion = createAsyncThunk<Question, { questionId: string; updatedData: Partial<Omit<Question, '_id' | 'quizId' | 'questionId' | 'createdAt' | 'updatedAt'>> }>(
    'questions/updateQuestion',
    async ({ questionId, updatedData }, thunkAPI) => {
        try {
            const updatedQuestion = await client.updateQuestion(questionId, updatedData);
            return updatedQuestion;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update question.');
        }
    }
);

/**
 * Async thunk to delete a question.
 */
export const deleteExistingQuestion = createAsyncThunk<string, string>(
    'questions/deleteQuestion',
    async (questionId, thunkAPI) => {
        try {
            await client.deleteQuestion(questionId);
            return questionId;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete question.');
        }
    }
);

/**
 * The questions slice
 */
const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        // You can add synchronous actions here if needed
    },
    extraReducers: (builder) => {
        // Handle fetchQuestions
        builder.addCase(fetchQuestions.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<Question[]>) => {
            state.loading = false;
            state.questions = action.payload;
        });
        builder.addCase(fetchQuestions.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Handle createQuestion
        builder.addCase(createQuestion.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createQuestion.fulfilled, (state, action: PayloadAction<Question>) => {
            state.loading = false;
            state.questions.push(action.payload);
        });
        builder.addCase(createQuestion.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Handle updateExistingQuestion
        builder.addCase(updateExistingQuestion.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateExistingQuestion.fulfilled, (state, action: PayloadAction<Question>) => {
            state.loading = false;
            const index = state.questions.findIndex(q => q._id === action.payload._id);
            if (index !== -1) {
                state.questions[index] = action.payload;
            }
        });
        builder.addCase(updateExistingQuestion.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Handle deleteExistingQuestion
        builder.addCase(deleteExistingQuestion.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteExistingQuestion.fulfilled, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.questions = state.questions.filter(q => q._id !== action.payload);
        });
        builder.addCase(deleteExistingQuestion.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default questionsSlice.reducer;
