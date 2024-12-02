import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        addQuiz: (state, { payload: quiz }) => {
            const newQuiz: any = {
                _id: quiz._id || new Date().getTime().toString(), // Use provided ID or generate one
                title: quiz.title || "Untitled Quiz",
                course: quiz.course,
                quizType: quiz.quizType || "Graded Quiz",
                points: quiz.points || 0,
                assignmentGroup: quiz.assignmentGroup || "QUIZZES",
                shuffleAnswers: quiz.shuffleAnswers || false,
                timeLimit: quiz.timeLimit || "No Limit",
                multipleAttempts: quiz.multipleAttempts || false,
                viewResponses: quiz.viewResponses || "Always",
                showCorrectAnswers: quiz.showCorrectAnswers || "Immediately",
                oneQuestionAtATime: quiz.oneQuestionAtATime || false,
                requireRespondusLockDown: quiz.requireRespondusLockDown || false,
                requiredToViewQuizResults: quiz.requiredToViewQuizResults || false,
                webcamRequired: quiz.webcamRequired || false,
                lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering || false,
                accessCode: quiz.accessCode || "",
                due: quiz.due || null,
                available: quiz.available || null,
                until: quiz.until || null,
                numberOfQuestions: quiz.numberOfQuestions || 0,
                lessons: quiz.lessons || [],
                editing: false,
            };
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
