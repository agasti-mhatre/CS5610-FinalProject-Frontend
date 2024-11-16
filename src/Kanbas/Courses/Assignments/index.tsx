import { BsGripVertical } from "react-icons/bs";
import AssignmentsControls from "./AssignmentsControls";
import { PiNotebookDuotone } from "react-icons/pi";
import { useParams } from "react-router";
import Protected from "../../Dashboard/Protected";
import { useDispatch, useSelector } from "react-redux";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { deleteAssignment } from "./reducer";
import { Link } from "react-router-dom";

export default function Assignments() {

    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const dispatch = useDispatch();

    return (
      <div id="wd-assignments">

        <AssignmentsControls/><br/><br/><br/><br/>
        <ul id="wd-modules" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
                Assignments
              
              <IoEllipsisVertical className="fs-4 float-end" />
            </div>

            <ul className="wd-lessons list-group rounded-0">
            
              {
                assignments
                .filter((assignment : any) => assignment.course === cid)
                .map(

                  (assignment: any) => (
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
                            | <span className="fw-bold">Not available until</span> {assignment.available} at 12:00am 
                            | <span className="fw-bold">Due</span> {assignment.due} at 11:59pm | {assignment.points} pts</p>
                        </div>
                        <div className="ms-auto">
                        <div className="float-end">
                          
                          <Protected>
                            <Link to={`/Kanbas/Courses/${assignment.course}/Assignments/${assignment._id}`}>
                              <FaPencil className="text-primary me-3" />
                            </Link>

                            <FaTrash className="text-danger me-2 mb-1" onClick={() => dispatch(deleteAssignment(assignment._id))}/>
                          </Protected>

                          <GreenCheckmark />
                          <IoEllipsisVertical className="fs-4" />
                        </div>
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