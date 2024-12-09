import React, { useState } from "react";

// Define the Question type
type Question = {
  id: number;
  type: string;
  points: number;
  text: string;
  title: string;
  editMode: boolean;
  blankAnswers?: string[];
};

// Available question types
const QUESTION_TYPES = ["Multiple Choice", "True/False", "Fill in the Blank"];

const FillInTheBlankQuestionEditor: React.FC<{
  question: Question;
  updateQuestion: Function;
  handleCancel: Function;
  handleSave: Function;
}> = ({ question, updateQuestion, handleCancel, handleSave }) => {
  const addBlankAnswer = () => {
    updateQuestion(question.id, {
      blankAnswers: [...(question.blankAnswers || []), ""],
    });
  };

  const removeBlankAnswer = (index: number) => {
    const updatedAnswers = question.blankAnswers?.filter((_, i) => i !== index);
    updateQuestion(question.id, { blankAnswers: updatedAnswers });
  };

  return (
    <div className="p-3 border rounded">
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Question Title"
          value={question.text}
          onChange={(e) =>
            updateQuestion(question.id, { title: e.target.value })
          }
        />
        <select
          className="form-select"
          value={question.type}
          onChange={(e) =>
            updateQuestion(question.id, { type: e.target.value })
          }
        >
          {QUESTION_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="form-control ms-2"
          placeholder="Points"
          value={question.points}
          onChange={(e) =>
            updateQuestion(question.id, { points: Number(e.target.value) })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Question:</label>
        {/* WYSIWYG Placeholder */}
        <textarea
          className="form-control"
          placeholder="Enter your question text, e.g., How much is 2 + 2 = _______?"
          value={question.text}
          onChange={(e) =>
            updateQuestion(question.id, { text: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Answers:</label>
        {question.blankAnswers?.map((answer, index) => (
          <div key={index} className="d-flex mb-2 align-items-center">
            <input
              type="text"
              className="form-control"
              value={answer}
              onChange={(e) =>
                updateQuestion(question.id, {
                  blankAnswers: question.blankAnswers?.map((a, i) =>
                    i === index ? e.target.value : a
                  ),
                })
              }
            />
            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => removeBlankAnswer(index)}
            >
              <i className="bi bi-trash"></i> {/* Bootstrap Icon for Delete */}
            </button>
          </div>
        ))}
        <button className="btn btn-link text-danger" onClick={addBlankAnswer}>
          + Add Another Answer
        </button>
      </div>

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-secondary me-2"
          onClick={() => handleCancel(question.id)}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleSave(question.id)}
        >
          Update Question
        </button>
      </div>
    </div>
  );
};

export default FillInTheBlankQuestionEditor;
