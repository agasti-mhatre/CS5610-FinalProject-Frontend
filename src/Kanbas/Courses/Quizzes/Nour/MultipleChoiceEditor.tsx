import React, { useState } from "react";

type Question = {
  id: number;
  title: string;
  points: number;
  text: string;
  choices?: string[];
  correctChoice?: number;
  editMode: boolean;
};

const MultipleChoiceEditor: React.FC<{
  question: Question;
  updateQuestion: (id: number, updates: Partial<Question>) => void;
}> = ({ question, updateQuestion }) => {
  const [localQuestion, setLocalQuestion] = useState<Question>(question);

  const addChoice = () => {
    setLocalQuestion((prev) => ({
      ...prev,
      choices: [...(prev.choices || []), ""],
    }));
  };

  const updateChoice = (index: number, value: string) => {
    const updatedChoices = localQuestion.choices?.map((c, i) =>
      i === index ? value : c
    );
    setLocalQuestion((prev) => ({ ...prev, choices: updatedChoices }));
  };

  const removeChoice = (index: number) => {
    const updatedChoices = localQuestion.choices?.filter((_, i) => i !== index);
    setLocalQuestion((prev) => ({ ...prev, choices: updatedChoices }));
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
        {localQuestion.choices?.map((choice, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="radio"
              name={`correct-choice-${localQuestion.id}`}
              checked={localQuestion.correctChoice === index}
              onChange={() =>
                setLocalQuestion({ ...localQuestion, correctChoice: index })
              }
            />
            <textarea
              className="form-control ms-2"
              value={choice}
              onChange={(e) => updateChoice(index, e.target.value)}
            />
            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => removeChoice(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button className="btn btn-link" onClick={addChoice}>
          + Add Choice
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

export default MultipleChoiceEditor;
