import { Link } from "react-router-dom";
import { useParams } from "react-router";
import * as db from "../../Database";
import { BsGripVertical } from "react-icons/bs";
import QuizControlButtons from "./QuizControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { PiNotebookDuotone } from "react-icons/pi";
import { FaRocket } from "react-icons/fa";


export default function Quizzes() {
    const { cid } = useParams();
    const quizzes = db.quizzes;
    return (
        <div>
            <Link to={"Michael"}>Michael</Link>
            <ul id="wd-modules" className="list-group rounded-0">
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
                Assignments Quizzes
              
              <IoEllipsisVertical className="fs-4 float-end" />
            </div>
            <ul className="wd-lessons list-group rounded-0">
                {quizzes.filter((quizzes:any)=>quizzes.course ===cid)
                        .map((quizzes) =>(<li className="wd-lesson list-group-item p-3 ps-1">
                            <div className="d-flex align-items-center">
                            <div className = "d-flex flex-column">
                          <p className="fs-4">
                          <FaRocket className="text-success me-3 fs-3"/>
                            <a className="wd-assignment-link text-dark text-decoration-none"
                            href={`#/Kanbas/Courses/${quizzes.course}/Assignments/${quizzes._id}`}>
                              {quizzes.title}
                            </a>
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