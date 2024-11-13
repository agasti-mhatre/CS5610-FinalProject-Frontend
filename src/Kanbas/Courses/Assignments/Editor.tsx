import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { addAssignment, updateAssignment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as assignmentClient from "./client"

export default function AssignmentEditor() {

    const { cid, aid } = useParams();
    const assignment = useSelector((state: any) =>
        state.assignmentsReducer.assignments.find((x: any) => x._id === aid)
    );

    const dispatch = useDispatch();

    const seg = useLocation().pathname.split('/');
    const loc = seg[seg.length - 1];

    const [assignmentName, setName] = useState(assignment ? assignment.title : "")
    const [assignmentPoints, setPoints] = useState(100)
    const [dueDate, setDueDate] = useState(assignment? assignment.due : "yyyy-mm-dd")
    const [availability, setAvailability] = useState(assignment? assignment.available : "yyyy-mm-dd")

    const addOrEdit = async () => {

        if (loc === "Editor") {
            
            const new_assignment = {
                "_id": new Date().getTime().toString(), 
                "title": assignmentName, 
                "course": cid, 
                "points": assignmentPoints,
                "due": dueDate,
                "available": availability
            }

            await assignmentClient.addAssignment(new_assignment);
            dispatch(addAssignment(new_assignment));
        }
        else {

            const new_assignment = {
                "_id": aid, 
                "title": assignmentName, 
                "course": cid, 
                "points": assignmentPoints,
                "due": dueDate,
                "available": availability
            }

            await assignmentClient.updateAssignment(new_assignment);
            dispatch(updateAssignment(new_assignment));
        }
    }

    const nameChange = (e: any) => {
        setName(e.target.value)
    }

    const pointsChange = (e: any) => {
        setPoints(e.target.value)
    }

    const dueDateChange = (e: any) => {
        setDueDate(e.target.value)
    }

    const availabilityDateChange = (e: any) => {
        setAvailability(e.target.value)
    }

    return (
      <div id="wd-assignments-editor">

        <div className="d-flex flex-column mb-3">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value={assignmentName} className="form-control" onChange={(e) => nameChange(e)}/>
        </div>

        <textarea id="wd-description" className="form-control mb-3">
          The assignment is available online. Submit a link to the landing page of your Web application running on Netflify.
          The landing page should includ the following:
          
            - You full name and section.
            - Links to each of the lab assignments.
        </textarea>
 
        <div className="d-flex flex-column">

            <div className="d-flex ms-auto mb-3 w-50">
                <label htmlFor="wd-points" className="me-2">Points</label>
                <input id="wd-points" className="form-control" value={assignmentPoints} onChange={(e) => pointsChange(e)} />
            </div>

            <div className="d-flex ms-auto mb-3 w-50">
                <label htmlFor="wd-group" className="me-2">Assignment Group</label>
                <select id="wd-group" className="form-select">
                    <option>ASSIGNMENTS</option>
                    <option>QUIZZES</option>
                    <option>EXAMS</option>
                </select>
            </div>

            <div className="d-flex ms-auto mb-3 w-50">
                <label htmlFor="wd-display-grade-as" className="me-2">Display Grade as</label>
                <select id="wd-display-grade-as" className="form-select">
                    <option>Percentage</option>
                    <option>Whole Number</option>
                    <option>Fractional Number</option>
                </select>
            </div>

            <div className="d-flex">

                <label htmlFor="wd-submission-type" className="ms-auto me-3">Submission Type</label>
                <div id="wd-submission-type" className="d-flex flex-column border border-2 p-3 w-75 mb-3">
                    
                    <div className="d-flex mb-3">
                        <select className="form-select">
                            <option>Online</option>
                            <option>Paper</option>
                            <option>Mail</option>
                        </select>
                    </div>

                    <label className="mb-3 fw-bold">Online Entry Options</label>
                    <div className="d-flex mb-3">
                        <input type="checkbox" name="check-genre" id="wd-text-entry" className="me-2"/>
                        <label htmlFor="wd-text-entry">Text Entry</label>
                    </div>

                    <div className="d-flex mb-3">
                        <input type="checkbox" name="check-genre" id="wd-website-url" className="me-2"/>
                        <label htmlFor="wd-website-url">Website URL</label>
                    </div>

                    <div className="d-flex mb-3">
                        <input type="checkbox" name="check-genre" id="wd-media-recordings" className="me-2"/>
                        <label htmlFor="wd-media-recordings">Media Recordings</label>
                    </div>


                    <div className="d-flex mb-3">
                        <input type="checkbox" name="check-genre" id="wd-student-annotation" className="me-2"/>
                        <label htmlFor="wd-student-annotation">Student Annotation</label>
                    </div>

                    <div className="d-flex mb-3">
                        <input type="checkbox" name="check-genre" id="wd-file-upload" className="me-2"/>
                        <label htmlFor="wd-file-upload">File Uploads</label>
                    </div>

                </div>
            </div>

            <div className="d-flex">

                <label className="ms-auto me-3">Assign</label>
                <div className="d-flex flex-column border border-2 p-3 w-75">

                    <label htmlFor="wd-assign-to" className="fw-bold">Assign to</label>
                    <input id="wd-assign-to" className="form-control mb-3" value="Everyone" />                

                    <label htmlFor="wd-due-date">Due </label>
                    <input id="wd-due-date" type="date" className="form-control mb-3" value={dueDate} onChange={(e) => dueDateChange(e)}/>

                    <div className="d-flex">
                    
                        <div className="d-flex flex-column me-3">
                            <label htmlFor="wd-available-form" className="mb-2">Available from </label>        
                            <input id="wd-available-from" type="date" className="form-control me-3" value={availability} onChange={(e) => availabilityDateChange(e)}/>
                        </div>

                        <div className="d-flex flex-column me-3">
                            <label htmlFor="wd-file-upload" className="mb-2">Until </label>
                            <input id="wd-file-upload" type="date" className="form-control"/>
                        </div>

                    </div>
                </div>
            </div>

            <div className="ms-auto mt-3">
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
                <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
                    <button className="btn btn-danger me-2"
                            onClick={addOrEdit}>Save</button>
                </Link>
            </div>
        
        </div>
        
    </div>
);}