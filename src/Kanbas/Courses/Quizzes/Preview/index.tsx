// function Preview() {

//     const fakeData = {
//         _id: 1,
//         title: "Q1 - HTML",
//         started: "Nov 29 at 8:19 am",
//         quiz_type: "Graded Quiz",
//         points: 30,
//         questions: [
//             {
//                 id: 1,
//                 text: "An HTML label element can be associated with an HTML input element by setting their id attributes to the same value. The resulting effect is that when you click on the label text, the input element receives focus as if you had clicked on the input element itself.",
//                 options: ["True", "False"],
//                 correctAnswer: "True",
//                 points: 1
//               },
//               {
//                 id: 2,
//                 text: "What is the purpose of the 'alt' attribute in an image tag?",
//                 type: "Multiple Choice",
//                 options: [
//                   "To specify the image source",
//                   "To specify alternate text for an image",
//                   "To specify the width of an image"
//                 ],
//                 correctAnswer: "To specify alternate text for an image",
//                 points: 2
//               },
//               {
//                 id: 3,
//                 text: "Fill in the blank: HTML is used to create _______.",
//                 type: "Fill in the Blank",
//                 correctAnswer: "web pages",
//                 points: 2
//               }
//         ]
//     }
//   return (
//     <div>
//       <h2>Question Title</h2>
//       <p>This is preview of the published version of the quiz</p>
//       <p>started time: Nov 29 at 9:19am</p>
//       <p>Quiz Instructions</p>
//       <div>
//         Question Content
//       </div>
//       <div>
//         Quiz Control / Submit Quiz
//       </div>
//       <div>
//         Edit and other questions
//       </div>
//     </div>
//   );
// }

// export default Preview;

import React, { useState } from 'react';
import { FaEdit, FaInfoCircle } from 'react-icons/fa';
import "./index.css";

function Preview() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    
    const fakeData = {
        _id: 1,
        title: "Q1 - HTML",
        started: "Nov 29 at 8:19am",
        quiz_type: "Graded Quiz",
        points: 30,
        questions: [
            {
                id: 1,
                text: "An HTML label element can be associated with an HTML input element by setting their id attributes to the same value. The resulting effect is that when you click on the label text, the input element receives focus as if you had clicked on the input element itself.",
                options: ["True", "False"],
                correctAnswer: "True",
                points: 1
            },
            {
                id: 2,
                text: "What is the purpose of the 'alt' attribute in an image tag?",
                type: "Multiple Choice",
                options: [
                    "To specify the image source",
                    "To specify alternate text for an image",
                    "To specify the width of an image"
                ],
                correctAnswer: "To specify alternate text for an image",
                points: 2
            },
            {
                id: 3,
                text: "Fill in the blank: HTML is used to create _______.",
                type: "Fill in the Blank",
                correctAnswer: "web pages",
                points: 2
            }
        ]
    };

    const handleAnswerChange = (questionId: number, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
        // setState(0)
    };

    const currentQuestion = fakeData.questions[currentQuestionIndex];

    return (
        <div className="wd-quiz-preview">
            <h2>{fakeData.title}</h2>
            
            <div className="wd-preview-warning">
                <FaInfoCircle className="wd-info-icon" />
                <span>This is a preview of the published version of the quiz</span>
            </div>

            <p className="wd-started">Started: {fakeData.started}</p>

            <div className="wd-quiz-instructions">
                <h3>Quiz Instructions</h3>
            </div>

            <div className="wd-question-container">
                <div className="wd-question-header">
                    <span>Question 1</span>
                    <span>{currentQuestion.points} pts</span>
                </div>

                <div className="wd-question-content">
                    <p>
                        An HTML <span className="wd-keyword">label</span> element can be associated with an HTML <span className="wd-keyword">input</span> element by setting their <span className="wd-keyword">id</span> attributes to the same value.
                    </p>
                    <p>
                        The resulting effect is that when you click on the <span className="wd-keyword">label</span> text, the <span className="wd-keyword">input</span> element receives focus as if you had click on the <span className="wd-keyword">input</span> element itself
                    </p>
                    
                    <div className="wd-options">
                        <div className="wd-radio-option">
                            <input
                                type="radio"
                                id="true"
                                name="question1"
                                value="True"
                                checked={answers[currentQuestion.id] === "True"}
                                onChange={() => handleAnswerChange(currentQuestion.id, "True")}
                            />
                            <label htmlFor="true">True</label>
                        </div>
                        <div className="wd-radio-option">
                            <input
                                type="radio"
                                id="false"
                                name="question1"
                                value="False"
                                checked={answers[currentQuestion.id] === "False"}
                                onChange={() => handleAnswerChange(currentQuestion.id, "False")}
                            />
                            <label htmlFor="false">False</label>
                        </div>
                    </div>
                </div>

                <div className="wd-question-footer">
                    <button className="wd-btn wd-btn-previous" disabled>Previous</button>
                    <button className="wd-btn wd-btn-next">Next</button>
                </div>
            </div>

            <div className="wd-quiz-footer">
                <span>Quiz saved at {fakeData.started}</span>
                <button className="wd-btn wd-btn-submit">Submit Quiz</button>
            </div>

            <div className="wd-keep-editing">
                <button className="wd-btn wd-btn-edit">
                    <FaEdit />
                    Keep Editing This Quiz
                </button>
            </div>

            <div className="wd-questions-list">
                <h3>Questions</h3>
                <ul>
                    {fakeData.questions.map((_, index) => (
                        <li key={index} className="wd-question-link">
                            <span className="wd-question-number">Question {index + 1}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Preview;