import axios from 'axios';

// Function to save quiz answers
export const saveQuizAnswers = async (quizId: string, facultyId: string, answers: any) => {
  try {
    const response = await axios.post('/api/quiz-answers/save', {
      quizId,
      facultyId,
      answers,
    });
    return response.data;
  } catch (error) {
    console.error('Error saving quiz answers:', error);
    throw new Error('Error saving quiz answers.');
  }
};

// Function to get quiz answers
export const getQuizAnswers = async (quizId: string, facultyId: string) => {
  try {
    const response = await axios.get(`/api/quiz-answers/${quizId}/${facultyId}`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving quiz answers:', error);
    throw new Error('Error retrieving quiz answers.');
  }
};
