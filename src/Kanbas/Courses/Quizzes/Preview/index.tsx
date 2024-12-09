

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../client";
import { Question } from "./questionsReducer";
import { MdErrorOutline, MdArrowRight } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { saveQuizResult, fetchQuizResult } from "./quizResultReducer";
import users from "../../../Database/users.json";
import "./index.css";
import { AppDispatch, RootState } from "../../../store"; 

function QuizPreview() {
    const { qid } = useParams<{ qid?: string }>();
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>(); // Correctly typed dispatch
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    // Local state to store quiz and questions
    const [quiz, setQuizDetails] = useState<any>(null);
    const [questionsList, setQuestionsList] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
    const [score, setScore] = useState<number>(0);

    const userId = users[0]._id; // Assuming we have a fixed user ID for faculty user

    // Fetch existing quiz result from Redux
    const selectedResult = useSelector((state: RootState) => state.quizResult.selectedResult);

    // Function to get questions by quiz ID
    const getQuestions = async (quizId: string) => {
        try {
            const response = await client.fetchQuestionsByQuizId(quizId);
            setQuestionsList(response || []); // Set empty array if response is undefined or null
        } catch (error) {
            console.error("Failed to fetch questions:", error);
        }
    };

    useEffect(() => {
        const fetchQuizDetails = async () => {
            if (!qid) {
                console.error("Quiz ID is missing");
                return;
            }

            try {
                setIsLoading(true);
                console.log("Fetching quiz details with Quiz ID:", qid);

                const quizData = await client.findQuizById(qid);

                if (quizData && quizData.length > 0) {
                    console.log("Fetched quiz details:", quizData);
                    setQuizDetails({ ...quizData[0] });
                    await getQuestions(qid);

                    // Dispatch action to fetch existing quiz result
                    dispatch(fetchQuizResult({ quizId: qid, userId }));
                } else {
                    console.warn("Quiz details not found for Quiz ID:", qid);
                    setQuizDetails(null);
                }
            } catch (error) {
                console.error("Failed to fetch quiz details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuizDetails();
    }, [qid, dispatch]);

    useEffect(() => {
        // If a previous result is found, set answers and score
        if (selectedResult) {
            setAnswers(
                selectedResult.answers.reduce((acc: any, answer: any) => {
                    acc[answer.questionId] = answer.answer;
                    return acc;
                }, {})
            );
            setScore(selectedResult.score);
        }
    }, [selectedResult]);

    const handleAnswerChange = (questionId: string, answer: string | string[], index?: number) => {
        setAnswers((prevAnswers) => {
            if (Array.isArray(answer) && typeof index !== 'undefined') {
                const updatedAnswers = [...(prevAnswers[questionId] as string[] || [])];
                updatedAnswers[index] = answer[index];
                return {
                    ...prevAnswers,
                    [questionId]: updatedAnswers,
                };
            } else {
                return {
                    ...prevAnswers,
                    [questionId]: answer,
                };
            }
        });
    };

    const calculateScore = () => {
        let newScore = 0;
        questionsList.forEach((question) => {
            const userAnswer = answers[question.questionId];
            if (Array.isArray(userAnswer) && Array.isArray(question.correctAnswer)) {
                if (JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer)) {
                    newScore += question.points;
                }
            } else if (userAnswer === question.correctAnswer[0]) {
                newScore += question.points;
            }
        });
        setScore(newScore);
    };

    const handleSubmitQuiz = async () => {
        if (!qid) {
            alert("Quiz ID is missing. Cannot submit the quiz.");
            return;
        }

        calculateScore();

        // Prepare the quiz result data
        const quizResultData = {
            quizId: qid,
            userId,
            answers: Object.entries(answers).map(([questionId, answer]) => ({
                questionId,
                answer: Array.isArray(answer) ? answer.join(', ') : answer, // Convert array to string
            })),
            score,
            timestamp: new Date().toISOString(),
        };

        try {
            // Dispatch to save quiz result
            dispatch(saveQuizResult(quizResultData));
            alert(`Quiz submitted successfully. Your score is: ${score}`);
        } catch (error) {
            console.error("Failed to submit quiz result:", error);
            alert("Failed to submit quiz. Please try again later.");
        }
    };

    const handleQuestionCancel = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${qid}`);
    };

    return (
        <div className="wd-quiz-preview">
            {isLoading ? (
                <p>Loading quiz details...</p>
            ) : quiz ? (
                <>
                    <h2>{quiz?.title || "Untitled Quiz"}</h2>

                
                    {currentUser?.role === "FACULTY" && (
                        <div className="wd-preview-warning">
                            <MdErrorOutline className="wd-warning-icon" />
                            <span>This is a preview of the published version of the quiz</span>
                        </div>
                    )}

                    <p className="wd-started">Started: {new Date().toLocaleString()}</p>

                    <div className="wd-quiz-instructions">
                        <h3>Quiz Instructions</h3>
                    </div>

                    {questionsList.length > 0 && currentQuestionIndex < questionsList.length && (
                        <div className="wd-question-container">
                            <div className="wd-question-header">
                                <span>Question {currentQuestionIndex + 1}</span>
                                <span>{questionsList[currentQuestionIndex].points} pts</span>
                            </div>

                            <div className="wd-question-content">
                                <p>{questionsList[currentQuestionIndex].text}</p>

                                {questionsList[currentQuestionIndex].type === "True or False" && (
                                    <div className="wd-options">
                                        <div className="wd-radio-option">
                                            <input
                                                type="radio"
                                                id="true"
                                                name={`question${currentQuestionIndex}`}
                                                value="True"
                                                checked={answers[questionsList[currentQuestionIndex].questionId] === "True"}
                                                onChange={() => handleAnswerChange(questionsList[currentQuestionIndex].questionId, "True")}
                                            />
                                            <label htmlFor="true">True</label>
                                        </div>
                                        <div className="wd-radio-option">
                                            <input
                                                type="radio"
                                                id="false"
                                                name={`question${currentQuestionIndex}`}
                                                value="False"
                                                checked={answers[questionsList[currentQuestionIndex].questionId] === "False"}
                                                onChange={() => handleAnswerChange(questionsList[currentQuestionIndex].questionId, "False")}
                                            />
                                            <label htmlFor="false">False</label>
                                        </div>
                                    </div>
                                )}

                                {questionsList[currentQuestionIndex].type === "Multiple Choice" && (
                                    <div className="wd-options">
                                        {questionsList[currentQuestionIndex].options.map((option: string, index: number) => (
                                            <div className="wd-radio-option" key={index}>
                                                <input
                                                    type="radio"
                                                    id={`option_${index}`}
                                                    name={`question${currentQuestionIndex}`}
                                                    value={option}
                                                    checked={answers[questionsList[currentQuestionIndex].questionId] === option}
                                                    onChange={() => handleAnswerChange(questionsList[currentQuestionIndex].questionId, option)}
                                                />
                                                <label htmlFor={`option_${index}`}>{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {questionsList[currentQuestionIndex].type === "Fill in the blanks" && (
                                    <div className="wd-options">
                                        {questionsList[currentQuestionIndex].blanks.map((blank: any, index: number) => (
                                            <div key={index}>
                                                <input
                                                    type="text"
                                                    className="form-control mb-2"
                                                    value={(answers[questionsList[currentQuestionIndex].questionId] as string[] || [])[index] || ''}
                                                    onChange={(e) => {
                                                        const updatedAnswers = [...(answers[questionsList[currentQuestionIndex].questionId] as string[] || [])];
                                                        updatedAnswers[index] = e.target.value;
                                                        handleAnswerChange(questionsList[currentQuestionIndex].questionId, updatedAnswers);
                                                    }}
                                                    placeholder={blank.placeholder}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="wd-question-footer">
                                <button
                                    className="wd-btn wd-btn-previous"
                                    disabled={currentQuestionIndex === 0}
                                    onClick={() => setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
                                >
                                    Previous
                                </button>
                                <button
                                    className="wd-btn wd-btn-next"
                                    disabled={currentQuestionIndex >= questionsList.length - 1}
                                    onClick={() => setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questionsList.length - 1))}
                                >
                                    Next <MdArrowRight style={{ marginLeft: '5px' }} />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="wd-quiz-footer-container">
                        <div className="wd-quiz-footer-text">
                            Quiz saved at {new Date().toLocaleString()}
                        </div>
                        <button className="wd-btn wd-btn-submit" onClick={handleSubmitQuiz}>Submit Quiz</button>
                    </div>

                    <div className="wd-keep-editing">
                        <button className="wd-btn wd-btn-edit" onClick={handleQuestionCancel}>
                            <FaEdit />
                            Keep Editing This Quiz
                        </button>
                    </div>

                    <div className="wd-questions-list">
                        <h3>Questions</h3>
                        <ul>
                            {questionsList.map((_, index) => (
                                <li key={index} className="wd-question-link">
                                    <AiOutlineQuestionCircle className="wd-question-icon" />
                                    <span
                                        className="wd-question-number"
                                        style={{ fontWeight: currentQuestionIndex === index ? 'bold' : 'normal' }}
                                        onClick={() => setCurrentQuestionIndex(index)}
                                    >
                                        Question {index + 1}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <p>Quiz not found.</p>
            )}
        </div>
    );
}

export default QuizPreview;