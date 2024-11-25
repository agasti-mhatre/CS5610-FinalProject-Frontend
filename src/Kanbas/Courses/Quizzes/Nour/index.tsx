import React, { useState, useEffect } from "react";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";

type QuestionType = "Multiple Choice" | "True/False" | "Fill in the Blank";

type Question = {
  id: number;
  type: QuestionType;
  title: string;
  points: number;
  text: string;
  choices?: string[]; 
  correctChoice?: number;
  isTrue?: boolean; 
  blankAnswers?: string[]; 
  editMode: boolean;
};

const QuizQuestionsEditor: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const total = questions.reduce((sum, q) => sum + (q.points || 0), 0);
    setTotalPoints(total);
  }, [questions]);

  const addNewQuestion = () => {
    const newQuestion: Question = {
      id: Date.now(),
      type: "Multiple Choice",
      title: "",
      points: 1,
      text: "",
      choices: [""],
      correctChoice: 0,
      editMode: true,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: number, updates: Partial<Question>) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const deleteQuestion = (id: number) => {
    setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
  };

  const renderQuestionEditor = (question: Question) => {
    switch (question.type) {
      case "Multiple Choice":
        return (
          <MultipleChoiceEditor
            question={question}
            updateQuestion={updateQuestion}
          />
        );
      case "True/False":
        return (
          <TrueFalseEditor
            question={question}
            updateQuestion={updateQuestion}
          />
        );
      case "Fill in the Blank":
        return (
          <FillInTheBlankEditor
            question={question}
            updateQuestion={updateQuestion}
          />
        );
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
        {questions.map((question) => (
          <div key={question.id} className="mb-4 p-3 border rounded">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                {question.title || "Untitled Question"}{" "}
                <span className="text-muted">({question.type})</span>
              </h5>
              <select
                className="form-select w-auto"
                value={question.type}
                onChange={(e) =>
                  updateQuestion(question.id, { type: e.target.value as QuestionType })
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
                      {question.choices?.map((choice, index) => (
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
                  onClick={() =>
                    updateQuestion(question.id, { editMode: true })
                  }
                >
                  Edit
                </button>
                <button
                  className="btn btn-link text-danger"
                  onClick={() => deleteQuestion(question.id)}
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

export default QuizQuestionsEditor;
