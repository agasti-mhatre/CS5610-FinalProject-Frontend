import { useParams } from "react-router";
import { useSelector } from "react-redux";

export default function QuizDetails() {
    const { quizId } = useParams(); // Get quiz ID from URL
    const quiz = useSelector((state: any) =>
        state.quizzes.quizzes.find((q: any) => q._id === quizId)
    );

    if (!quiz) {
        return <p>Quiz not found</p>;
    }

    return (
        <div>
            <h2>{quiz.title}</h2>
            <p><strong>Quiz Type:</strong> {quiz.quizType}</p>
            <p><strong>Points:</strong> {quiz.points}</p>
            <p><strong>Assignment Group:</strong> {quiz.assignmentGroup}</p>
            <p><strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? 'Yes' : 'No'}</p>
            <p><strong>Time Limit:</strong> {quiz.timeLimit}</p>
            <p><strong>Multiple Attempts:</strong> {quiz.multipleAttempts ? 'Yes' : 'No'}</p>
            <p><strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers}</p>
            <p><strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? 'Yes' : 'No'}</p>
            <p><strong>Webcam Required:</strong> {quiz.webcamRequired ? 'Yes' : 'No'}</p>
            <p><strong>Lock Questions After Answering:</strong> {quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</p>
            <p><strong>Access Code:</strong> {quiz.accessCode}</p>
            <p><strong>Available From:</strong> {quiz.available}</p>
            <p><strong>Due:</strong> {quiz.due}</p>
            <p><strong>Until:</strong> {quiz.until}</p>
        </div>
    );
}
