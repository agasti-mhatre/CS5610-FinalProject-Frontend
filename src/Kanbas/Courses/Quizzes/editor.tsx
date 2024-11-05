import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { addQuiz, updateQuiz } from "./quizReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const quiz = useSelector((state: any) =>
        state.quizzes.quizzes.find((x: any) => x._id === qid)
    );

    const dispatch = useDispatch();
    const seg = useLocation().pathname.split('/');
    const loc = seg[seg.length - 1];

    const [quizTitle, setQuizTitle] = useState(quiz ? quiz.title : "Unnamed Quiz");
    const [quizInstructions, setQuizInstructions] = useState(quiz ? quiz.instructions : "");
    const [quizType, setQuizType] = useState(quiz ? quiz.quizType : "Graded Quiz");
    const [assignmentGroup, setAssignmentGroup] = useState(quiz ? quiz.assignmentGroup : "ASSIGNMENTS");
    const [shuffleAnswers, setShuffleAnswers] = useState(quiz ? quiz.shuffleAnswers : false);
    const [timeLimit, setTimeLimit] = useState(quiz ? quiz.timeLimit : "");
    const [multipleAttempts, setMultipleAttempts] = useState(quiz ? quiz.multipleAttempts : false);
    const [dueDate, setDueDate] = useState(quiz ? quiz.due : "yyyy-mm-dd");
    const [availableFrom, setAvailableFrom] = useState(quiz ? quiz.available : "yyyy-mm-dd");
    const [until, setUntil] = useState(quiz ? quiz.until : "yyyy-mm-dd");

    const addOrEdit = () => {
        const newQuiz = {
            _id: loc === "Editor" ? new Date().getTime().toString() : qid,
            title: quizTitle,
            course: cid,
            instructions: quizInstructions,
            quizType,
            assignmentGroup,
            shuffleAnswers,
            timeLimit,
            multipleAttempts,
            due: dueDate,
            available: availableFrom,
            until
        };

        if (loc === "Editor") {
            dispatch(addQuiz(newQuiz));
        } else {
            dispatch(updateQuiz(newQuiz));
        }
    };

    return (
        <div id="wd-quiz-editor">
            <div className="d-flex flex-column mb-3">
                <label htmlFor="wd-quiz-title">Quiz Title</label>
                <input
                    id="wd-quiz-title"
                    value={quizTitle}
                    className="form-control"
                    onChange={(e) => setQuizTitle(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label>Quiz Instructions:</label>
                <textarea
                    id="wd-quiz-instructions"
                    value={quizInstructions}
                    className="form-control"
                    onChange={(e) => setQuizInstructions(e.target.value)}
                />
            </div>

            <div className="d-flex flex-column">
                <div className="d-flex mb-3 w-50">
                    <label htmlFor="wd-quiz-type" className="me-2">Quiz Type</label>
                    <select
                        id="wd-quiz-type"
                        className="form-select"
                        value={quizType}
                        onChange={(e) => setQuizType(e.target.value)}
                    >
                        <option>Graded Quiz</option>
                        <option>Practice Quiz</option>
                        <option>Survey</option>
                    </select>
                </div>

                <div className="d-flex mb-3 w-50">
                    <label htmlFor="wd-assignment-group" className="me-2">Assignment Group</label>
                    <select
                        id="wd-assignment-group"
                        className="form-select"
                        value={assignmentGroup}
                        onChange={(e) => setAssignmentGroup(e.target.value)}
                    >
                        <option>ASSIGNMENTS</option>
                        <option>QUIZZES</option>
                        <option>EXAMS</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Options:</label>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="shuffle-answers"
                            className="form-check-input"
                            checked={shuffleAnswers}
                            onChange={() => setShuffleAnswers(!shuffleAnswers)}
                        />
                        <label htmlFor="shuffle-answers" className="form-check-label">Shuffle Answers</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="time-limit"
                            className="form-check-input"
                            checked={timeLimit !== ""}
                            onChange={(e) => setTimeLimit(e.target.checked ? "10" : "")}
                        />
                        <label htmlFor="time-limit" className="form-check-label">
                            Time Limit (Minutes)
                        </label>
                        {timeLimit && (
                            <input
                                type="number"
                                className="form-control mt-2"
                                value={timeLimit}
                                onChange={(e) => setTimeLimit(e.target.value)}
                                min="1"
                                max="300"
                                style={{ width: "100px" }}
                            />
                        )}
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="multiple-attempts"
                            className="form-check-input"
                            checked={multipleAttempts}
                            onChange={() => setMultipleAttempts(!multipleAttempts)}
                        />
                        <label htmlFor="multiple-attempts" className="form-check-label">Allow Multiple Attempts</label>
                    </div>
                </div>

                <div className="d-flex flex-column mt-3">
                    <label>Assign:</label>
                    <div className="border border-2 p-3">
                        <label htmlFor="assign-to" className="fw-bold">Assign to</label>
                        <input id="assign-to" className="form-control mb-3" value="Everyone" readOnly />

                        <label htmlFor="due-date">Due Date</label>
                        <input
                            id="due-date"
                            type="date"
                            className="form-control mb-3"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />

                        <label>Availability:</label>
                        <div className="d-flex">
                            <div className="me-3">
                                <label htmlFor="available-from">Available from</label>
                                <input
                                    id="available-from"
                                    type="date"
                                    className="form-control"
                                    value={availableFrom}
                                    onChange={(e) => setAvailableFrom(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="until">Until</label>
                                <input
                                    id="until"
                                    type="date"
                                    className="form-control"
                                    value={until}
                                    onChange={(e) => setUntil(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes`} className="btn btn-secondary me-2">Cancel</Link>
                    <button
                        className="btn btn-danger"
                        onClick={addOrEdit}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
