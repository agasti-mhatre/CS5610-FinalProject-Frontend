import React, { useState } from "react";
import { Question } from "./quizDetailEditorReducer";


const MultipleChoiceEditor: React.FC<{
  question: Question;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  createQuestion: (quizId: string, newQuestion: Partial<Question>) => void;
  toggleEditing: () => void;
}> = ({ question, updateQuestion, toggleEditing, createQuestion }) => {
  const [localQuestion, setLocalQuestion] = useState<Question>(question);
  const [newCorrectOption, setNewCorrectOption] = useState(localQuestion.correctAnswer);

  console.log(localQuestion);
  

  const addChoice = () => {
    setLocalQuestion((prev) => ({
      ...prev,
      options: [...(prev.options || []), ''],
    }));
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = localQuestion.options?.map((option, i) =>
      i === index ? value : option
    );
    setLocalQuestion((prev) => ({ ...prev, options: updatedOptions }));
  };

  const removeChoice = (index: number) => {
    const updatedOptions = localQuestion.options?.filter((_, i) => i !== index);
    setLocalQuestion((prev) => ({ ...prev, options: updatedOptions }));
  };

  const saveQuestion = () => {
    const updates = { ...localQuestion, type: 'Multiple Choice' as any };
    console.log('new updates: ', updates);
    if (question._id) {
      updateQuestion(localQuestion.questionId, { ...localQuestion, type: 'Multiple Choice' });
    } else {
      createQuestion(localQuestion.quizId, updates)
    }
    toggleEditing();
  };

  return (
    <div>
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
        {localQuestion.options?.map((option, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="radio"
              name={`correct-option-${localQuestion.questionId}`}
              // checked={localQuestion.correctAnswer.includes(option)}
              onChange={() =>
                setLocalQuestion({
                  ...localQuestion,
                  correctAnswer: [localQuestion.options[index]],
                })
              }
            />
            <textarea
              className="form-control ms-2"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
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

      <button className="btn btn-secondary me-2" onClick={toggleEditing}>
        Cancel
      </button>
      <button className="btn btn-danger" onClick={saveQuestion}>
        Save/Update Question
      </button>
    </div>
  );
};

export default MultipleChoiceEditor;
