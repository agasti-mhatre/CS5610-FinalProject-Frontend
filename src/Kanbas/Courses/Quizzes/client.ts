import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const fetchQuizzes = async (cid: any) => {

    const response = await axios.get(`${QUIZZES_API}/${cid}`);
    return response.data;
};

export const addQuiz = async (quiz: any) => {

    const response = await axios.post(`${QUIZZES_API}`, quiz);
    return response.data;
}