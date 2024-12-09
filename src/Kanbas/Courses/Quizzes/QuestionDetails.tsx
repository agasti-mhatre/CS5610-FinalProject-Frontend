

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const QuestionDetails = () => {
    const questions = useSelector((state: RootState) => state.questions); // Get questions from Redux

    return (
        <div className="question-details">
            <h3>Questions</h3>
            <ul>
                {questions.map((question) => (
                    <li key={question.questionId}>
                        <strong>{question.text}</strong>: {question.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionDetails;