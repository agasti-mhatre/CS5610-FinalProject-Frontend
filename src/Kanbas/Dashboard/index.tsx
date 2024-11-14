import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Protected from "./Protected";
import { addEnrollment, deleteEnrollment, setEnrollments } from "../Enrollment/reducer";
import * as enrollmentClient from "./client";

export default function Dashboard(

  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; }) {

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
    const dispatch = useDispatch();

    const [showEnrollment, setEnrollment] = useState(true);
    const shownCourses = showEnrollment ? courses.filter((course: any) =>
      
      enrollments.some(
        (enrollment: any) =>
          enrollment.user === currentUser._id &&
          enrollment.course === course._id
      )
    ) : courses;

    const toggleEnrollment = () => {
      setEnrollment(!showEnrollment);
    }

    const isEnrolled = (courseID: any) => {

      const userID = currentUser._id;

      if (enrollments) {
        return enrollments.some((enrollment: any) => 
          enrollment.user === userID && enrollment.course === courseID
        );
      }
      return [];
    }

    const addCurrEnrollment = async (course: any) => {

      const newEnrollment = {
        "_id": new Date().getTime().toString(),
        "user": currentUser._id,
        "course": course._id,
      }

      await enrollmentClient.addEnrollment(newEnrollment);
      dispatch(addEnrollment(newEnrollment));
    }

    const removeCurrEnrollment = async (courseID: any) => {

      const removeEnrollment = {

        "_id": new Date().getTime().toString(),
        "user": currentUser._id,
        "course": courseID
    }

      await enrollmentClient.deleteEnrollment(removeEnrollment);
      dispatch(deleteEnrollment(removeEnrollment));
    }

    const fetchEnrollments = async () => {

      const enrollments = await enrollmentClient.fetchEnrollments(currentUser._id);
      dispatch(setEnrollments(enrollments));
    };

    useEffect(() => {
      
      fetchEnrollments();

    }, [currentUser._id]);

  return (
    <div id="wd-dashboard">
      
      <div className="d-flex">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        {
        (currentUser.role === "STUDENT") && <button className="btn btn-primary ms-auto" onClick={toggleEnrollment}>Enrollments</button>
        }
      </div>

      <Protected>
      <h5>New Course
            <button className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={addNewCourse} > Add </button>
            <button className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click">
                Update
            </button>
      </h5><hr /><br />
      
      <input value={course.name} className="form-control mb-2" 
            onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      
      <textarea value={course.description} className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
        
        <hr />
      </Protected>

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {shownCourses
          .map((course: any) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                { showEnrollment && <Link to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <img src={course.photo} width="100%" height={160} />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name} </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description} </p>

                    <button className="btn btn-primary"> Go </button>

                    <Protected>
                      <button onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                        }} className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                        Delete
                      </button>
                      <button id="wd-edit-course-click"
                          onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end">
                        Edit
                      </button>
                    </Protected>
                  </div>
                </Link>
                }
                {
                  !showEnrollment && 
                  <div>
                    <img src={course.photo} width="100%" height={160} />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name} </h5>
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {course.description} </p>

                      { !isEnrolled(course._id) && <button className="btn btn-success" onClick={() => addCurrEnrollment(course)}> Enroll </button> }
                      { isEnrolled(course._id) && <button className="btn btn-danger" onClick={() => removeCurrEnrollment(course._id)}> Unenroll </button> }

                      <Protected>
                        <button onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                          }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </button>
                        <button id="wd-edit-course-click"
                            onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end">
                          Edit
                        </button>
                      </Protected>
                    </div>
                  </div>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}