import { BsGripVertical } from "react-icons/bs";
import AssignmentsControls from "./AssignmentsControls";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { PiNotebookDuotone } from "react-icons/pi";
import { assignments } from "../../Database";
import { useParams } from "react-router";

export default function Assignments() {

    const { cid } = useParams();

    return (
      <div id="wd-assignments">

        <AssignmentsControls/><br/><br/><br/><br/>
        <ul id="wd-modules" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
                Assignments
            </div>

            <ul className="wd-lessons list-group rounded-0">
            
              {
                assignments
                .filter((assignment) => assignment.course === cid)
                .map(

                  (assignment) => (
                    <li className="wd-lesson list-group-item p-3 ps-1">
                      <div className="d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" />
                        <PiNotebookDuotone className="text-success me-3 fs-3"/>
                        <div className = "d-flex flex-column">
                          <p className="fs-4">
                            <a className="wd-assignment-link text-dark text-decoration-none"
                            href={`#/Kanbas/Courses/${assignment.course}/Assignments/${assignment._id}`}>
                              {assignment.title}
                            </a>
                          </p>
                          <p className="fs-6"> 
                            <span className="text-danger">Multiple Modules</span>&nbsp;
                            | <span className="fw-bold">Not available until</span> May 6 at 12:00am 
                            | <span className="fw-bold">Due</span> May 13 at 11:59pm | 100 pts</p>
                        </div>
                        <div className="ms-auto">
                          <LessonControlButtons />
                        </div>
                      </div>
                    </li>
                  )
                )
              }

            </ul>
          </li>
        </ul>

      </div>
  );}  