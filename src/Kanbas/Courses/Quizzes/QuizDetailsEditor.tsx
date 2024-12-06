import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";
import { addQuestion, updateQuestion, deleteQuestion, Question } from "./quizDetailEditorReducer";

const QuizDetailsEditor: React.FC = () => {
  const dispatch = useDispatch();
  
const questions = useSelector((state: { questions: Question[] }) => state.questions || []);

  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const total = questions.reduce((sum, q) => sum + (q.points || 0), 0);
    setTotalPoints(total);
  }, [questions]);

  const addNewQuestion = () => {
    dispatch(addQuestion());
  };

  const updateQuestionHandler = (id: number, updates: Partial<Question>) => {
    dispatch(updateQuestion({ id, updates }));
  };

  const deleteQuestionHandler = (id: number) => {
    dispatch(deleteQuestion({ id }));
  };

  const renderQuestionEditor = (question: Question) => {
    switch (question.type) {
      case "Multiple Choice":
        return <MultipleChoiceEditor question={question} updateQuestion={updateQuestionHandler} />;
      case "True/False":
        return <TrueFalseEditor question={question} updateQuestion={updateQuestionHandler} />;
      case "Fill in the Blank":
        return <FillInTheBlankEditor question={question} updateQuestion={updateQuestionHandler} />;
      default:
        return null;
    }
  };

  return (
    <div className="quiz-editor p-3">
      <h2 className="text-danger">Quiz Questions Editor</h2>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={addNewQuestion}>
          + New Question
        </button>
      </div>
      <div className="mb-3">
        <strong>Total Points: {totalPoints}</strong>
      </div>
      <div>
        {questions?.map((question) => (
          <div key={question.id} className="mb-4 p-3 border rounded">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                {question.title || "Untitled Question"} <span className="text-muted">({question.type})</span>
              </h5>
              <select
                className="form-select w-auto"
                value={question.type}
                onChange={(e) =>
                  updateQuestionHandler(question.id, { type: e.target.value as "Multiple Choice" | "True/False" | "Fill in the Blank" })
                }
              >
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True/False">True/False</option>
                <option value="Fill in the Blank">Fill in the Blank</option>
              </select>
            </div>
            {question.editMode ? (
              renderQuestionEditor(question)
            ) : (
              <div>
                <p>{question.text}</p>
                <p><strong>Points:</strong> {question.points}</p>
                {question.type === "Multiple Choice" && (
                  <div>
                    <strong>Options:</strong>
                    <ul>
                      {question.choices?.map((choice : any, index : any) => (
                        <li
                          key={index}
                          style={{
                            fontWeight: question.correctChoice === index ? "bold" : "normal",
                          }}
                        >
                          {choice}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  className="btn btn-link text-primary"
                  onClick={() => updateQuestionHandler(question.id, { editMode: true })}
                >
                  Edit
                </button>
                <button
                  className="btn btn-link text-danger"
                  onClick={() => deleteQuestionHandler(question.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDetailsEditor;
