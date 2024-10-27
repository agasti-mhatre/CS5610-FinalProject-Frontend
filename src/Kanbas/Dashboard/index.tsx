import React, { useState } from "react";
import { Link } from "react-router-dom";
import { courses } from "../Database";
export default function Dashboard() {

  const [coursesCurr, setCourses] = useState(courses);
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    photo: "/images/reactjs.png", description: "New Description"
  });

  const addNewCourse = () => {
    const newCourse = { ...course,
                        _id: new Date().getTime().toString() };
    setCourses([...courses, { ...course, ...newCourse }]);
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      
      <h5>New Course
            <button className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={addNewCourse} > Add </button>
      </h5><hr /><br />
      
      <input value={course.name} className="form-control mb-2" 
            onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      
      <textarea value={course.description} className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
        
        <hr />

      <h2 id="wd-dashboard-published">Published Courses ({coursesCurr.length})</h2> <hr />
      
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {coursesCurr.map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <img src={course.photo} width="100%" height={160} />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name} </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description} </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}