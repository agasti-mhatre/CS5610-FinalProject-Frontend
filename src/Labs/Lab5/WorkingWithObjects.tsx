import React, { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {

    const [assignment, setAssignment] = useState({
        
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });

    const [module, setModule] = useState({

        id: 2,
        name: "React Basics",
        description: "Basics of frontend programming",
        course: "Full stack development"
    });
    
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`

    return (
        <div id="wd-working-with-objects">

            <h3>Working With Objects</h3>
            
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a>
            <hr/>
            
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Title
            </a>
            <hr/>
            
            <h4>Modifying Properties</h4>
            <a id="wd-update-assignment-title"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input className="form-control w-75" id="wd-assignment-title"
                defaultValue={assignment.title} onChange={(e) =>
                setAssignment({ ...assignment, title: e.target.value })}/>
            <hr />

            <h4>Retrieve Module</h4>
            <a id="wd-update-assignment-title"
                className="btn btn-primary"
                href={`${MODULE_API_URL}`}>
                Get Module
            </a>
            <hr />

            <h4>Retrieve Module Name</h4>
            <a id="wd-update-assignment-title"
                className="btn btn-primary"
                href={`${MODULE_API_URL}/name`}>
                Get Module Name
            </a>
            <hr />

            <h4>Modifying Module Name</h4>
            <a id="wd-update-module-name"
                className="btn btn-primary float-end"
                href={`${MODULE_API_URL}/${module.name}`}>
                Update Name
            </a>
            <input className="form-control w-75" id="wd-module-name"
                defaultValue={module.name} onChange={(e) =>
                setModule({ ...module, name: e.target.value })}/>
            <hr />

            <h4>Modifying Assignment Score</h4>
            <a id="wd-update-assignment-score"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <input className="form-control w-75" id="wd-assignment-score" type="number"
                defaultValue={assignment.score} onChange={(e) =>
                setAssignment({ ...assignment, score: Number(e.target.value) })}/>
            <hr />

            <h4>Modifying Assignment Status</h4>
            <a id="wd-update-assignment-status"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/status/${assignment.completed}`}>
                Update Status
            </a>
            <input id="wd-assignment-status" type="checkbox"
                checked={assignment.completed} onChange={(e) =>
                setAssignment({ ...assignment, completed: e.target.checked })}/>
            <hr />

        </div>
    );
}