import { BsGripVertical } from "react-icons/bs";
import QuizzesControls from "./QuizzesControls"; // Replace with your actual quizzes control component
import { PiNotebookDuotone } from "react-icons/pi";
import { useParams, Link } from "react-router-dom";
import Protected from "../../Dashboard/Protected";
import { useDispatch, useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { deleteQuiz } from "./quizReducer"; // Action to delete a quiz

export default function Quizzes() {
    const { cid } = useParams(); // Get course ID from URL parameters
    const { quizzes } = useSelector((state: any) => state.quizzes); // Get quizzes from Redux state
    const dispatch = useDispatch();

    return (
        <div id="wd-quizzes">
            <QuizzesControls /><br /><br /><br /><br />
            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        Quizzes
                        <IoEllipsisVertical className="fs-4 float-end" />
                    </div>

                    <ul className="wd-lessons list-group rounded-0">
                        {
                            quizzes
                                .filter((quiz: any) => quiz.course === cid)
                                .map((quiz: any) => (
                                    <li key={quiz._id} className="wd-lesson list-group-item p-3 ps-1">
                                        <div className="d-flex align-items-center">
                                            <BsGripVertical className="me-2 fs-3" />
                                            <PiNotebookDuotone className="text-success me-3 fs-3" />
                                            <div className="d-flex flex-column">
                                                <p className="fs-4">
                                                    <Link
                                                        className="wd-quiz-link text-dark text-decoration-none"
                                                        to={`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}`}
                                                    >
                                                        {quiz.title}
                                                    </Link>
                                                </p>
                                                <p className="fs-6">
                                                    <span className="text-danger">Multiple Modules</span>&nbsp;
                                                    | <span className="fw-bold">Available from</span> {quiz.available} at 12:00am
                                                    | <span className="fw-bold">Due</span> {quiz.due} at 11:59pm | {quiz.points} pts
                                                </p>
                                            </div>
                                            <div className="ms-auto">
                                                <div className="float-end">
                                                    <Protected>
                                                        <Link to={`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz._id}/Edit`}>
                                                            <FaPencil className="text-primary me-3" />
                                                        </Link>
                                                        <FaTrash
                                                            className="text-danger me-2 mb-1"
                                                            onClick={() => dispatch(deleteQuiz(quiz._id))}
                                                        />
                                                    </Protected>
                                                    <GreenCheckmark />
                                                    <IoEllipsisVertical className="fs-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                        }
                    </ul>
                </li>
            </ul>
        </div>
    );
}
