import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";
import {
  Question,
  deleteQuestionAsync,
  updateQuestionAsync,
  createQuestionAsync,
} from "./quizDetailEditorReducer";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store";

const QuizDetailsEditor: React.FC = () => {
  const { qid: quizId } = useParams<{ qid: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const questions = useSelector(
    (state: { questions: Question[] }) => state.questions || []
  );
  const [localQuestions, setLocalQuestions] = useState(questions);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isEditing, setIsEditing] = useState(
    new Array(localQuestions.length).fill(false)
  );

  const toggleEditing = (questionIdx: number) => {
    const newEditing = isEditing.map((_isEditing, idx) =>
      questionIdx === idx ? !_isEditing : _isEditing
    );
    setIsEditing(newEditing);
  };

  useEffect(() => {
    const total = localQuestions.reduce((sum, q) => sum + (q.points || 0), 0);
    setTotalPoints(total);
  }, [localQuestions, dispatch]);

  useEffect(() => {
    setLocalQuestions(questions);
  }, [questions]);

  const handleCreateQuestion = async (
    quizId: string,
    newQuestion: Partial<Question>
  ) => {
    try {
      const createdId = await dispatch(
        createQuestionAsync({ quizId, newQuestion })
      ).unwrap();
      alert(`Question ${createdId} created successfully!`);
    } catch (error) {
      console.error("Failed to update question:", error);
      alert("Failed to update question. Please try again.");
    }
  };

  const handleUpdateQuestion = async (
    questionId: string,
    updates: Partial<Question>
  ) => {
    try {
      const updatedId = await dispatch(
        updateQuestionAsync({ questionId, updates })
      ).unwrap();
      alert(`Question ${updatedId.questionId} updated successfully!`);
    } catch (error) {
      console.error("Failed to update question:", error);
      alert("Failed to update question. Please try again.");
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      const deletedId = await dispatch(
        deleteQuestionAsync(questionId)
      ).unwrap();
      alert(`Question ${deletedId} deleted successfully!`);
    } catch (error) {
      console.error("Failed to delete question:", error);
      alert("Failed to delete question. Please try again.");
    }
  };

  const handleAddQuestion = () => {
    if (!quizId) {
      console.error("Quiz ID is missing.");
      return;
    }
    // dispatch(addQuestion({ quizId }));
    const newQuestion: Question = {
      questionId: `QS${Math.floor(Math.random() * 1000)}`,
      quizId,
      text: "",
      type: "Multiple Choice",
      options: [""],
      correctAnswer: [""],
      points: 1,
      blankAnswers: [""],
    };

    setLocalQuestions((prev) => [...prev, newQuestion]);
    setIsEditing((prev) => [...prev, true]);
  };

  const handleTypeChange = (
    localQuestion: Question,
    newType: any,
    idx: number
  ) => {
    if (localQuestion._id) {
      handleUpdateQuestion(localQuestion.questionId, { type: newType });
    } else {
      const newQuestions = [...localQuestions];
      newQuestions[idx].type = newType;
      setLocalQuestions(newQuestions);
    }
  };

  console.log("localquestions: ", localQuestions);

  const renderQuestion = (localQuestion: Question, idx: number) => {
    return (
      <div key={localQuestion.questionId} className="mb-4 p-3 border rounded">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">
            {localQuestion.text || "Untitled Question"}{" "}
            <span className="text-muted">({localQuestion.type})</span>
          </h5>
          <select
            className="form-select w-auto"
            value={localQuestion.type}
            disabled={!isEditing[idx]}
            onChange={(e) =>
              handleTypeChange(localQuestion, e.target.value, idx)
            }
          >
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="True or False">True or False</option>
            <option value="Fill in the blank">Fill in the Blank</option>
          </select>
        </div>
        {isEditing[idx] ? (
          // Edit Mode: Use specific editor components for each question type
          (() => {
            switch (localQuestion.type) {
              case "Multiple Choice":
                return (
                  <MultipleChoiceEditor
                    question={localQuestion}
                    updateQuestion={handleUpdateQuestion}
                    createQuestion={handleCreateQuestion}
                    toggleEditing={() => toggleEditing(idx)}
                  />
                );
              case "True or False":
                return (
                  <TrueFalseEditor
                    question={localQuestion}
                    updateQuestion={handleUpdateQuestion}
                    toggleEditing={() => toggleEditing(idx)}
                  />
                );
              case "Fill in the blank":
                return (
                  <FillInTheBlankEditor
                    question={localQuestion}
                    updateQuestion={handleUpdateQuestion}
                    toggleEditing={() => toggleEditing(idx)}
                  />
                );
              default:
                return null;
            }
          })()
        ) : (
          // View Mode
          <div>
            <p>{localQuestion.text}</p>
            <p>
              <strong>Points:</strong> {localQuestion.points}
            </p>
            {localQuestion.type === "Multiple Choice" && (
              <div>
                <strong>Options:</strong>
                <ul>
                  {localQuestion.options?.map(
                    (choice: string, index: number) => (
                      <li
                        key={index}
                        style={{
                          fontWeight: localQuestion.correctAnswer.includes(
                            choice
                          )
                            ? "bold"
                            : "normal",
                        }}
                      >
                        {choice}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
            <button
              className="btn btn-link text-primary"
              onClick={() => toggleEditing(idx)}
            >
              Edit
            </button>
            <button
              className="btn btn-link text-danger"
              onClick={() => handleDeleteQuestion(localQuestion.questionId)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="quiz-editor p-3">
      <h2 className="text-danger">Quiz Questions Editor</h2>
      <div className="mb-3">
        <button onClick={handleAddQuestion} className="btn btn-primary mb-3">
          + New Question
        </button>
      </div>
      <div className="mb-3">
        <strong>Total Points: {totalPoints}</strong>
      </div>
      <div>
        {localQuestions && localQuestions.map((_localQuestion, idx) => renderQuestion(_localQuestion, idx))}
      </div>
    </div>
  );
};

export default QuizDetailsEditor;
