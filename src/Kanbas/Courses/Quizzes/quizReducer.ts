import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../../Database";

const initialState = {
    quizzes: quizzes
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {

        addQuiz: (state, { payload: quiz }) => {
            const newQuiz: any = {
                _id: quiz._id,
                title: quiz.title,
                course: quiz.course,
                quizType: quiz.quizType,
                points: quiz.points,
                assignmentGroup: quiz.assignmentGroup,
                shuffleAnswers: quiz.shuffleAnswers,
                timeLimit: quiz.timeLimit,
                multipleAttempts: quiz.multipleAttempts,
                viewResponses: quiz.viewResponses,
                showCorrectAnswers: quiz.showCorrectAnswers,
                oneQuestionAtATime: quiz.oneQuestionAtATime,
                requireRespondusLockDown: quiz.requireRespondusLockDown,
                requiredToViewQuizResults: quiz.requiredToViewQuizResults,
                webcamRequired: quiz.webcamRequired,
                lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
                accessCode: quiz.accessCode,
                due: quiz.due,
                for: quiz.for,
                available: quiz.available,
                until: quiz.until
            };
            state.quizzes = [...state.quizzes, newQuiz];
        },

        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter(
                (q: any) => q._id !== quizId
            );
        },

        updateQuiz: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quiz._id ? quiz : q
            ) as any;
        }
    }
});

export const { addQuiz, deleteQuiz, updateQuiz } = quizzesSlice.actions;

export default quizzesSlice.reducer;
