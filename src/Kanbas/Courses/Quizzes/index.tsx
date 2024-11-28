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
import { addQuiz,deleteQuiz,updateQuiz,editQuiz } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Quizzes() {
  const { cid } = useParams();
  const [quizName, setQuizName] = useState("");
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  
 

  return (
    <div>
      <Link to={"Michael"}>Michael</Link>
      <hr />
      
      <QuizzesControls setQuizName={setQuizName} quizName={quizName} addQuiz={()=>{
        dispatch(addQuiz({name:quizName,course:cid}));
        setQuizName("");
      }} />

      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Assignments Quizzes

            <IoEllipsisVertical className="fs-4 float-end" />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {quizzes
              .map((quiz:any) => (<li className="wd-lesson list-group-item p-3 ps-1">
                <div className="d-flex align-items-center">
                 
                  <div className="d-flex flex-column">
                  
                    <p className="fs-4">
                      <FaRocket className="text-success me-3 fs-3" />

                      <a className="wd-assignment-link text-dark text-decoration-none"
                        href={`#/Kanbas/Courses/${quiz.course}/Assignments/${quiz._id}`}>
                        {quiz.title}
                      </a>
                      {!quiz.editing && quiz.name}
                      {quiz.editing && (
                        <input className="form-control w-50 d-inline-block"
                          onChange={(e) => dispatch(updateQuiz({ ...quiz, name: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              dispatch(updateQuiz({ ...quiz, editing: false }));
                            }
                          }}
                          defaultValue={quiz.name} />
                      )}
                      {/* <span
                        onClick={() => togglePublish(quiz._id)}
                        style={{ cursor: "pointer" }}
                      >
                        {quiz.published ? "✅" : "🚫"}
                      </span> */}
                      <span className="flex-grow-1"/>
                      <QuizControlButtons quizId={quiz._id}
                        deleteQuiz={(quizId)=>{
                          dispatch(deleteQuiz(quizId));
                        }} 
                        editQuiz={(quizId)=>dispatch(editQuiz(quizId))} />
                    </p>
                    
                    <p className="fs-6">
                      | <span className="fw-bold">Not available until</span> {quiz.available} at 12:00am
                      | <span className="fw-bold">Due</span> {quiz.due} at 11:59pm | {quiz.points} pts</p>
                  </div>
                </div>


              </li>))}


          </ul>
        </li>
      </ul>

    </div>


  );
}