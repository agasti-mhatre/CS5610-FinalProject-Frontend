
import React, { useState } from "react";

type Question = {
  id: number;
  title: string;
  points: number;
  text: string;
  isTrue?: boolean;
  editMode: boolean;
};

const TrueFalseEditor: React.FC<{
  question: Question;
  updateQuestion: (id: number, updates: Partial<Question>) => void;
}> = ({ question, updateQuestion }) => {
  const [localQuestion, setLocalQuestion] = useState<Question>(question);

  const saveQuestion = () => {
    updateQuestion(localQuestion.id, { ...localQuestion, editMode: false });
  };

  const cancelEdit = () => {
    updateQuestion(question.id, { editMode: false });
  };

  return (
    <div>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Title"
        value={localQuestion.title}
        onChange={(e) =>
          setLocalQuestion({ ...localQuestion, title: e.target.value })
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
      <textarea
        className="form-control mb-2"
        placeholder="Question"
        value={localQuestion.text}
        onChange={(e) =>
          setLocalQuestion({ ...localQuestion, text: e.target.value })
        }
      />
      <div className="mb-2">
        <label>
          <input
            type="radio"
            name={`true-false-${localQuestion.id}`}
            checked={localQuestion.isTrue === true}
            onChange={() =>
              setLocalQuestion({ ...localQuestion, isTrue: true })
            }
          />
          True
        </label>
        <label className="ms-3">
          <input
            type="radio"
            name={`true-false-${localQuestion.id}`}
            checked={localQuestion.isTrue === false}
            onChange={() =>
              setLocalQuestion({ ...localQuestion, isTrue: false })
            }
          />
          False
        </label>
      </div>
      <button className="btn btn-secondary me-2" onClick={cancelEdit}>
        Cancel
      </button>
      <button className="btn btn-danger" onClick={saveQuestion}>
        Save/Update Question
      </button>
    </div>
  );
};

export default TrueFalseEditor;