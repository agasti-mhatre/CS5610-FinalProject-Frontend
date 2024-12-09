import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { BsGripVertical, BsPencilSquare, BsTrash } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaRocket } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import QuizzesControls from "./QuizzesControls";
import { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } from "./quizReducer";
import { fetchQuizzes } from "./client";
import * as quizClient from "./client";

export default function Quizzes() {
    const { cid } = useParams(); // Course ID from URL
    const [quizName, setQuizName] = useState("");
    const [contextMenuQuizId, setContextMenuQuizId] = useState<string | null>(null); // Track which quiz context menu is open
    const { quizzes } = useSelector((state: any) => state.quizzesReducer); // Get quizzes from Redux state
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook for navigation
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const toggleContextMenu = (quizId: string) => {
        setContextMenuQuizId((prev) => (prev === quizId ? null : quizId));
    };

    const togglePublish = (quiz: any) => {
        const updatedQuiz = { ...quiz, published: !quiz.published };

        quizClient.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));
    };

    const handleEditQuiz = (quizId: string) => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/Edit`); // Navigate to QuizEditor with quiz ID
    };

    const fetchQuizzesForCourse = async () => {

        const temp = await fetchQuizzes(cid);
        const quizzes = currentUser?.role === "FACULTY" ? temp : temp.filter((quiz: any) => {
            return quiz.published;
        }); 

        dispatch(setQuizzes(quizzes));
    }

    const deleteCurrQuiz = async (quizId: string) => {

        await quizClient.deleteQuiz(quizId);
        dispatch(deleteQuiz(quizId));
    }

    useEffect(() => {
        fetchQuizzesForCourse();
      }, []);

    return (
        <div>

            <QuizzesControls
                setQuizName={setQuizName}
                quizName={quizName}
                addQuiz={() => {
                    dispatch(addQuiz({ name: quizName, course: cid, published: false })); // Default to unpublished
                    setQuizName("");
                }}
            />

            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        Assignments Quizzes

                        <IoEllipsisVertical className="fs-4 float-end" />
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        {quizzes
                            .map((quiz: any) => (
                                <li key={quiz._id} className="wd-lesson list-group-item p-3 ps-1">
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex flex-column w-100">
                                            <div className="d-flex align-items-center">
                                                <FaRocket className="text-success me-3 fs-3" />
                                                <Link
                                                    className="wd-assignment-link text-dark text-decoration-none flex-grow-1"
                                                    to={`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/details`}
                                                >
                                                    {quiz.title}
                                                </Link>

                                                {currentUser?.role === "FACULTY" && (
                                                    <span
                                                        className="fs-4 ms-auto"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => togglePublish(quiz)}
                                                    >
                                                        {quiz.published ? "✅" : "🚫"}
                                                    </span>
                                                )}

                                                <IoEllipsisVertical
                                                    className="fs-4 ms-3"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => toggleContextMenu(quiz._id)}
                                                />
                                            </div>

                                            <p className="fs-6 mt-2">
                                                | <span className="fw-bold">Not available until</span> {quiz.available} at
                                                12:00am | <span className="fw-bold">Due</span> {quiz.due} at 11:59pm |{" "}
                                                {quiz.points} pts
                                            </p>

                                            {/* Context Menu */}
                                            {contextMenuQuizId === quiz._id && (
                                                <div className="quiz-context-menu bg-light p-2 rounded border mt-2 d-flex">
                                                    <button
                                                        className="btn btn-link text-primary d-flex align-items-center me-3"
                                                        onClick={() => handleEditQuiz(quiz._id)}
                                                    >
                                                        <BsPencilSquare className="me-1" /> Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-link text-danger d-flex align-items-center me-3"
                                                        onClick={() => deleteCurrQuiz(quiz._id)}
                                                    >
                                                        <BsTrash className="me-1" /> Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}