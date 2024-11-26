import { Link } from "react-router-dom";
import { useParams } from "react-router";
import * as db from "../../Database";
import { BsGripVertical } from "react-icons/bs";
import QuizControlButtons from "./QuizControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { PiNotebookDuotone } from "react-icons/pi";
import { FaRocket } from "react-icons/fa";
import React, { useState } from "react";
import QuizzesControls from "./QuizzesControls";


export default function Quizzes() {
  const { cid } = useParams();
  // const quizzes = db.quizzes;
  const [quizzes, setQuizzes] = useState<any[]>(db.quizzes);
  const quiz: any = {
    _id: "0", title: "Quiz", course: "RS101", points: 100,
    available: "2023-09-10", due: "2023-12-15",published: false
    // image: "/images/reactjs.jpg", description: "New Description"
  };
  const addNewQuiz = () => {
    const newQuizzes = {
      ...quiz,
      _id: new Date().getTime().toString(),

    };
    setQuizzes([...quizzes, newQuizzes]);
  };
  const [quizName, setQuizName] = useState("");
  const addQuiz = () => {
    setQuizzes([...quizzes, {
      _id: new Date().getTime().toString(),
      name: quizName, course: cid, lessons: []
    }]);
    setQuizName("");
  };

  const deleteQuiz = (quizId: string) => {
    setQuizzes(quizzes.filter((q) => q._id !== quizId));
  };
  const editQuiz = (quizId: string) => {
    setQuizzes(quizzes.map((q) => (q._id === quizId ? { ...q, editing: true } : q)));
  };
  const updateQuiz = (quiz: any) => {
    setQuizzes(quizzes.map((q) => (q._id === quiz._id ? quiz : q)));
  };

  const togglePublish = (quizId: string) => {
    setQuizzes(
      quizzes.map((quiz) =>
        quiz._id === quizId
          ? { ...quiz, published: !quiz.published }
          : quiz
      )
    );
  };

  return (
    <div>
      <Link to={"Michael"}>Michael</Link>
      <hr />
      <h5 >New Quiz
        <button className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={addNewQuiz} > Add </button>
      </h5><hr />
      <QuizzesControls setQuizName={setQuizName} quizName={quizName} addQuiz={addQuiz} />

      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Assignments Quizzes

            <IoEllipsisVertical className="fs-4 float-end" />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {quizzes
              .map((quizzes) => (<li className="wd-lesson list-group-item p-3 ps-1">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column">
                    <p className="fs-4">
                      <FaRocket className="text-success me-3 fs-3" />

                      <a className="wd-assignment-link text-dark text-decoration-none"
                        href={`#/Kanbas/Courses/${quizzes.course}/Assignments/${quizzes._id}`}>
                        {quizzes.title}
                      </a>
                      {!quiz.editing && quiz.name}
                      {quiz.editing && (
                        <input className="form-control w-50 d-inline-block"
                          onChange={(e) => updateQuiz({ ...quiz, name: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              updateQuiz({ ...quiz, editing: false });
                            }
                          }}
                          defaultValue={quiz.name} />
                      )}
                      <span
                        onClick={() => togglePublish(quiz._id)}
                        style={{ cursor: "pointer" }}
                      >
                        {quiz.published ? "✅" : "🚫"}
                      </span>
                      <QuizControlButtons quizId={quiz._id}
                        deleteQuiz={deleteQuiz} editQuiz={editQuiz} />
                    </p>
                    <p className="fs-6">
                      | <span className="fw-bold">Not available until</span> {quizzes.available} at 12:00am
                      | <span className="fw-bold">Due</span> {quizzes.due} at 11:59pm | {quizzes.points} pts</p>
                  </div>
                </div>


              </li>))}


          </ul>
        </li>
      </ul>

    </div>


  );
}