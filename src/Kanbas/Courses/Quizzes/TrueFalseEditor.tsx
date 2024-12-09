import React, { useState } from "react";
import { Question } from "./quizDetailEditorReducer";

const TrueFalseEditor: React.FC<{
  question: Question;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  toggleEditing: () => void;
}> = ({ question, updateQuestion, toggleEditing }) => {
  const [localQuestion, setLocalQuestion] = useState<Question>(question);

  const saveQuestion = () => {
    updateQuestion(localQuestion.questionId, { ...localQuestion, type: 'True or False' });
    toggleEditing();
  };

  return (
    <div>
      <textarea
        className="form-control mb-2"
        placeholder="Question"
        value={localQuestion.text}
        onChange={(e) =>
          setLocalQuestion({ ...localQuestion, text: e.target.value })
        }
      />
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Points"
        value={localQuestion.points}
        onChange={(e) =>
          setLocalQuestion({ ...localQuestion, points: Number(e.target.value) })
        }
      />
      <div className="mb-2">
        <label>
          <input
            type="radio"
            name={`true-false-${localQuestion.questionId}`}
            checked={localQuestion.correctAnswer[0] === "True"}
            onChange={() =>
              setLocalQuestion({ ...localQuestion, correctAnswer: ["True"] })
            }
          />
          True
        </label>
        <label className="ms-3">
          <input
            type="radio"
            name={`true-false-${localQuestion.questionId}`}
            checked={localQuestion.correctAnswer[0] === "False"}
            onChange={() =>
              setLocalQuestion({ ...localQuestion, correctAnswer: ["False"] })
            }
          />
          False
        </label>
      </div>
      <button className="btn btn-secondary me-2" onClick={toggleEditing}>
        Cancel
      </button>
      <button className="btn btn-danger" onClick={saveQuestion}>
        Save/Update Question
      </button>
    </div>
  );
};

export default TrueFalseEditor;
