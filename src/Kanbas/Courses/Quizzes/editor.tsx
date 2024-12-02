import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { addQuiz, updateQuiz } from "./quizReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as quizClient from "./client";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const quiz = useSelector((state: any) =>
        state.quizzes.quizzes.find((x: any) => x._id === qid)
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State for active tab
    const [activeTab, setActiveTab] = useState("Details");

    // State variables for quiz details
    const [quizTitle, setQuizTitle] = useState("Unnamed Quiz");
    const [quizInstructions, setQuizInstructions] = useState("");
    const [quizType, setQuizType] = useState("Graded Quiz");
    const [assignmentGroup, setAssignmentGroup] = useState("ASSIGNMENTS");
    const [shuffleAnswers, setShuffleAnswers] = useState(false);
    const [timeLimit, setTimeLimit] = useState("");
    const [multipleAttempts, setMultipleAttempts] = useState(false);
    const [dueDate, setDueDate] = useState("");
    const [availableFrom, setAvailableFrom] = useState("");
    const [until, setUntil] = useState("");
    const [points, setPoints] = useState(0);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState("Immediately");
    const [accessCode, setAccessCode] = useState("");
    const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
    const [webcamRequired, setWebcamRequired] = useState(false);
    const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(false);


    // Populate fields when quiz data is available
    useEffect(() => {
        if (quiz) {
            setQuizTitle(quiz.title || "Unnamed Quiz");
            setQuizInstructions(quiz.instructions || "");
            setQuizType(quiz.quizType || "Graded Quiz");
            setAssignmentGroup(quiz.assignmentGroup || "ASSIGNMENTS");
            setShuffleAnswers(quiz.shuffleAnswers || false);
            setTimeLimit(quiz.timeLimit || "");
            setMultipleAttempts(quiz.multipleAttempts || false);
            setDueDate(quiz.due || "");
            setAvailableFrom(quiz.available || "");
            setUntil(quiz.until || "");
            setPoints(quiz.points || 0);
            setShowCorrectAnswers(quiz.showCorrectAnswers || "Immediately");
            setAccessCode(quiz.accessCode || "");
            setOneQuestionAtATime(quiz.oneQuestionAtATime || true);
            setWebcamRequired(quiz.webcamRequired || false);
            setLockQuestionsAfterAnswering(quiz.lockQuestionsAfterAnswering || false);
        }
    }, [quiz]);

    const addOrEdit = async () => {

        const newQuiz = {
            _id: qid || new Date().getTime().toString(),
            title: quizTitle || "Untitled Quiz",
            course: cid,
            instructions: quizInstructions,
            quizType: quiz?.quizType || "Graded Quiz",
            assignmentGroup: quiz?.assignmentGroup || "QUIZZES" ,
            shuffleAnswers: quiz?.shuffleAnswers || false,
            timeLimit: quiz?.timeLimit || "No Limit",
            multipleAttempts: quiz?.multipleAttempts || false,
            due: dueDate || null,
            available: availableFrom || null,
            until: quiz?.until || null,
            points: quiz?.points || 0,
            showCorrectAnswers: quiz?.showCorrectAnswers || "Immediately",
            accessCode: quiz?.accessCode || "",
            oneQuestionAtATime: quiz?.oneQuestionAtATime || false,
            webcamRequired: quiz?.webcamRequired || false,
            lockQuestionsAfterAnswering: quiz?.lockQuestionsAfterAnswering || false,
            viewResponses: quiz?.viewResponses || "Always",
            requireRespondusLockDown: quiz?.requireRespondusLockDown || false,
            requiredToViewQuizResults: quiz?.requiredToViewQuizResults || false,
            numberOfQuestions: quiz?.numberOfQuestions || 0,
            lessons: quiz?.lessons || [],
            editing: false,
        };

        if (qid !== "Editor") {
            
            newQuiz._id = new Date().getTime().toString();
            dispatch(updateQuiz(newQuiz));
        } else {

            await quizClient.addQuiz(newQuiz);
            dispatch(addQuiz(newQuiz));
        }

        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };
    
    const handleQuestionsTabClick = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionDetails`);
};

    return (
        <div id="wd-quiz-editor">
            {/* Tabs */}
            <div className="d-flex border-bottom mb-4">
                <button
                    className={`btn ${activeTab === "Details" ? "btn-primary" : "btn-light"} me-2`}
                    onClick={() => setActiveTab("Details")}
                >
                    Details
                </button>
<button
                    className={`btn ${activeTab === "Questions" ? "btn-primary" : "btn-light"}`}
                    onClick={handleQuestionsTabClick}
                >
                    Questions
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === "Details" && (
                <div>
                    {/* Details Tab Content */}
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
                        <div className="mb-3">
                            <label htmlFor="wd-points">Points</label>
                            <input
                                id="wd-points"
                                type="number"
                                className="form-control"
                                value={points}
                                onChange={(e) => setPoints(Number(e.target.value))}
                            />
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

                            <div className="mb-3">
                                <label htmlFor="wd-show-correct-answers">Show Correct Answers</label>
                                <select
                                    id="wd-show-correct-answers"
                                    className="form-select"
                                    value={showCorrectAnswers}
                                    onChange={(e) => setShowCorrectAnswers(e.target.value)}
                                >
                                    <option>Immediately</option>
                                    <option>After Due Date</option>
                                    <option>Never</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="wd-access-code">Access Code</label>
                                <input
                                    id="wd-access-code"
                                    type="text"
                                    className="form-control"
                                    value={accessCode}
                                    onChange={(e) => setAccessCode(e.target.value)}
                                />
                            </div>

                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    id="one-question-at-a-time"
                                    className="form-check-input"
                                    checked={oneQuestionAtATime}
                                    onChange={() => setOneQuestionAtATime(!oneQuestionAtATime)}
                                />
                                <label htmlFor="one-question-at-a-time" className="form-check-label">
                                    One Question at a Time
                                </label>
                            </div>

                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    id="webcam-required"
                                    className="form-check-input"
                                    checked={webcamRequired}
                                    onChange={() => setWebcamRequired(!webcamRequired)}
                                />
                                <label htmlFor="webcam-required" className="form-check-label">Webcam Required</label>
                            </div>

                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    id="lock-questions-after-answering"
                                    className="form-check-input"
                                    checked={lockQuestionsAfterAnswering}
                                    onChange={() => setLockQuestionsAfterAnswering(!lockQuestionsAfterAnswering)}
                                />
                                <label htmlFor="lock-questions-after-answering" className="form-check-label">
                                    Lock Questions After Answering
                                </label>
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
                                onClick={async () => {
                                    await addOrEdit();
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "Questions" && (
                <div>
                    <h3>Questions Editor</h3>
                    <p>Manage the questions for this quiz here.</p>
                </div>
            )}
        </div>
    );
}
