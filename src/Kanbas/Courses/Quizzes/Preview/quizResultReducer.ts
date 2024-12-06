
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // Define the types for QuizResult and QuizResultState
// export type QuizResult = {
//     quizId: string;
//     userId: string;
//     answers: {
//         questionId: string;
//         answer: string | string[];
//     }[];
//     score: number;
//     timestamp: string;
// };

// export type QuizResultState = {
//     quizResults: QuizResult[];
//     selectedResult: QuizResult | null;
//     isLoading: boolean;
//     error: string | null;
// };

// // Initial state of the QuizResult
// const initialState: QuizResultState = {
//     quizResults: [],
//     selectedResult: null,
//     isLoading: false,
//     error: null,
// };

// // Create Slice
// const quizResultSlice = createSlice({
//     name: "quizResult",
//     initialState,
//     reducers: {
//         // Action to save quiz result
//         saveQuizResult: (state, action: PayloadAction<QuizResult>) => {
//             const index = state.quizResults.findIndex(
//                 (result) => result.quizId === action.payload.quizId && result.userId === action.payload.userId
//             );

//             if (index !== -1) {
//                 // Update existing quiz result
//                 state.quizResults[index] = action.payload;
//             } else {
//                 // Add new quiz result
//                 state.quizResults.push(action.payload);
//             }

//             // Update selectedResult in case we want to display it after saving
//             state.selectedResult = action.payload;
//         },

//         // Action to fetch quiz result by quizId and userId
//         fetchQuizResult: (state, action: PayloadAction<{ quizId: string; userId: string }>) => {
//             const { quizId, userId } = action.payload;
//             const existingResult = state.quizResults.find(
//                 (result) => result.quizId === quizId && result.userId === userId
//             );

//             if (existingResult) {
//                 state.selectedResult = existingResult;
//             } else {
//                 state.selectedResult = null; // No existing result found
//             }
//         },

//         // Action to set loading state when fetching quiz result from the API
//         setQuizResultLoading: (state, action: PayloadAction<boolean>) => {
//             state.isLoading = action.payload;
//         },

//         // Action to set an error in case of failure
//         setQuizResultError: (state, action: PayloadAction<string | null>) => {
//             state.error = action.payload;
//         },
//     },
// });

// export const { saveQuizResult, fetchQuizResult, setQuizResultLoading, setQuizResultError } = quizResultSlice.actions;

// export default quizResultSlice.reducer;
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import * as client from "../client"; // Assuming client file handles API requests

// Define the Quiz Result type
export type QuizResult = {
    quizId: string;
    userId: string;
    answers: {
        questionId: string;
        answer: string;
    }[];
    score: number;
    timestamp: string;
};

// Define the state for the Quiz Result
type QuizResultState = {
    quizResults: QuizResult[]; // Store all quiz results
    selectedResult: QuizResult | null; // Store the fetched result for a particular quiz
    loading: boolean; // Loading state for async operations
    error: string | null; // Error state
};

// Define the initial state
const initialState: QuizResultState = {
    quizResults: [],
    selectedResult: null,
    loading: false,
    error: null,
};

// Define async thunks for fetch/save operations
export const fetchQuizResult = createAsyncThunk(
    "quizResults/fetchQuizResult",
    async ({ quizId, userId }: { quizId: string; userId: string }, thunkAPI) => {
        try {
            const response = await client.getQuizResult(quizId, userId);
            return response.result; // Return the fetched result
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch quiz result");
        }
    }
);

export const saveQuizResult = createAsyncThunk(
    "quizResults/saveQuizResult",
    async (quizResultData: QuizResult, thunkAPI) => {
        try {
            const response = await client.addQuizResult(quizResultData);
            return response.savedResult; // Return the saved result
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to save quiz result");
        }
    }
);

// Create the slice
const quizResultSlice = createSlice({
    name: "quizResults",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle fetchQuizResult actions
        builder.addCase(fetchQuizResult.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchQuizResult.fulfilled, (state, action: PayloadAction<QuizResult>) => {
            state.loading = false;
            state.selectedResult = action.payload;
        });
        builder.addCase(fetchQuizResult.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Handle saveQuizResult actions
        builder.addCase(saveQuizResult.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(saveQuizResult.fulfilled, (state, action: PayloadAction<QuizResult>) => {
            state.loading = false;
            state.quizResults.push(action.payload);
        });
        builder.addCase(saveQuizResult.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default quizResultSlice.reducer;