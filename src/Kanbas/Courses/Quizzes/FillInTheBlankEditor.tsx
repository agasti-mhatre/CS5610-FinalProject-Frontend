import React, { useState } from "react";
import { Question } from "./quizDetailEditorReducer";

const FillInTheBlankEditor: React.FC<{
  question: Question;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  toggleEditing: () => void;
}> = ({ question, updateQuestion, toggleEditing }) => {
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
    updateQuestion(localQuestion.questionId, { ...localQuestion, type: "Fill in the blank" });
    toggleEditing();
  };

  return (
    <div>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Question Text"
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
      <div>
        <p>
          <strong>Correct Answers:</strong>{" "}
          {localQuestion.correctAnswer.join(", ")}
        </p>
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

export default FillInTheBlankEditor;
