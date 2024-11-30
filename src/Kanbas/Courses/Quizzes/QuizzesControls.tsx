import { FaPlus } from "react-icons/fa";
import {Link, useLocation, useNavigate } from "react-router-dom";

export default function QuizzesControls({
                                            quizName,
                                            setQuizName,
                                            addQuiz,
                                        }: {
    quizName: string;
    setQuizName: (title: string) => void;
    addQuiz: () => void;
}) {
    const navigate = useNavigate(); // Hook for navigation

    const handleAddQuizClick = () => {
        navigate("/Kanbas/QuizEditor"); // Navigate to QuizEditor
    };

    const location = useLocation();


    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <Link to={`${location.pathname}/Editor`}>
                <button className="btn btn-lg btn-danger me-2">
                    <FaPlus className="fs-5 me-2 mb-1"/>
                    Quiz
                </button>
            </Link>
        </div>
    );
}
