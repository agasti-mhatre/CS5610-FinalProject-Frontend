import React, { useState } from "react";

type Question = {
  id: number;
  title: string;
  points: number;
  text: string;
  blankAnswers?: string[];
  editMode: boolean;
};

const FillInTheBlankEditor: React.FC<{
  question: Question;
  updateQuestion: (id: number, updates: Partial<Question>) => void;
}> = ({ question, updateQuestion }) => {
  const [localQuestion, setLocalQuestion] = useState<Question>(question);

  const addAnswer = () => {
    setLocalQuestion((prev) => ({
      ...prev,
      blankAnswers: [...(prev.blankAnswers || []), ""],
    }));
  };

  const updateAnswer = (index: number, value: string) => {
    const updatedAnswers = localQuestion.blankAnswers?.map((a, i) =>
      i === index ? value : a
    );
    setLocalQuestion({ ...localQuestion, blankAnswers: updatedAnswers });
  };

  const removeAnswer = (index: number) => {
    const updatedAnswers = localQuestion.blankAnswers?.filter(
      (_, i) => i !== index
    );
    setLocalQuestion({ ...localQuestion, blankAnswers: updatedAnswers });
  };

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
      <div>
        {localQuestion.blankAnswers?.map((answer, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control"
              value={answer}
              onChange={(e) => updateAnswer(index, e.target.value)}
            />
            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => removeAnswer(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button className="btn btn-link" onClick={addAnswer}>
          + Add Answer
        </button>
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

export default FillInTheBlankEditor;
