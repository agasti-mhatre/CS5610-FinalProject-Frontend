import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const quiz = useSelector((state: any) =>
        state.quizzes.quizzes.find((q: any) => q._id === qid)
    );

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <div className="quiz-details-container">
            {/* Header with title and buttons */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">
                    {quiz.title}
                </h2>
                <div>
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`} className="btn btn-primary">Edit</Link>
                </div>
            </div>

            {/* Quiz Details */}
            <div className="quiz-details mb-4">
                <p><strong>Quiz Type:</strong> {quiz.quizType}</p>
                <p><strong>Points:</strong> {quiz.points}</p>
                <p><strong>Assignment Group:</strong> {quiz.assignmentGroup}</p>
                <p><strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? "Yes" : "No"}</p>
                <p><strong>Time Limit:</strong> {quiz.timeLimit || "No limit"}</p>
                <p><strong>Multiple Attempts:</strong> {quiz.multipleAttempts ? "Yes" : "No"}</p>
                {quiz.multipleAttempts && (
                    <p><strong>How Many Attempts:</strong> {quiz.attempts || 1}</p>
                )}
                <p><strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers || "None"}</p>
                <p><strong>Access Code:</strong> {quiz.accessCode || "None"}</p>
                <p><strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? "Yes" : "No"}</p>
                <p><strong>Webcam Required:</strong> {quiz.webcamRequired ? "Yes" : "No"}</p>
                <p><strong>Lock Questions After Answering:</strong> {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</p>
            </div>

            {/* Due Dates Table */}
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Due</th>
                    <th>For</th>
                    <th>Available from</th>
                    <th>Until</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{quiz.due || "Not set"}</td>
                    <td>{quiz.for || "Everyone"}</td>
                    <td>{quiz.available || "Not set"}</td>
                    <td>{quiz.until || "Not set"}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
