import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const QUIZ_RESULTS_API = `${REMOTE_SERVER}/api/quizResults`;

export const fetchQuizzes = async (cid: any) => {

    const response = await axios.get(`${QUIZZES_API}/${cid}`);
    return response.data;
};
export const findQuizById = async (quizId: any) => {
    const response = await axios.get(`${QUIZZES_API}/Quiz/${quizId}`);
    return response.data;
};

export const addQuiz = async (quiz: any) => {

    const response = await axios.post(`${QUIZZES_API}`, quiz);
    return response.data;
}

export const updateQuiz = async (quiz: any) => {

    const response = await axios.put(`${QUIZZES_API}`, quiz);
    return response.data;
}

export const deleteQuiz = async (quizId: string) => {

    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
}

export const fetchQuestionsByQuizId = async (quizId: string) => {
    try {
        const response = await axios.get(`${QUESTIONS_API}/${quizId}`);
        return response.data.questions;
    } catch (error: any) {
        console.error(`Error fetching questions for quiz ID ${quizId}:`, error);
        throw error;
    }
};
export const createQuestionForQuiz = async (quizId: string, questionData: any) => {
    try {
        const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, questionData);
        return response.data;
    } catch (error: any) {
        console.error(`Error creating question for quiz ID ${quizId}:`, error);
        throw error;
    }
};
export const updateQuestion = async (questionId: string, updatedData: any) => {
    try {
        const response = await axios.put(`${QUESTIONS_API}/${questionId}`, updatedData);
        return response.data;
    } catch (error: any) {
        console.error(`Error updating question with ID ${questionId}:`, error);
        throw error;
    }
};
export const deleteQuestion = async (questionId: string) => {
    try {
        const response = await axios.delete(`${QUESTIONS_API}/${questionId}`);
        return response.data;
    } catch (error: any) {
        console.error(`Error deleting question with ID ${questionId}:`, error);
        throw error;
    }
};


export const addQuizResult = async (quizResultData: any) => {
    const response = await axios.post(`${QUIZ_RESULTS_API}`, quizResultData);
    return response.data;
};


export const getQuizResult = async (quizId: string, userId: string) => {
    const response = await axios.get(`${QUIZ_RESULTS_API}/${quizId}/${userId}`);
    return response.data;
};