import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";
import QuestionEditor from "./Quizzes/Nour";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/editor";
import QuizDetailsEditor from "./Quizzes/QuizDetailsEditor";
import QuizPreview from "./Quizzes/Preview/index"; 


export default function Courses({ courses }: { courses: any[]; }) {

    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();

    return (
      <div id="wd-courses">
        <h2 className="text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1" />
          {course && course.name} &gt; {pathname.split("/")[4]}
        </h2>
        <hr />

        <div className="d-flex">
          <div className="d-none d-md-block">
            <CoursesNavigation />
          </div>

          <div className="flex-fill">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:aid" element={<AssignmentEditor />} />
              <Route path="People" element={<PeopleTable />} />
              <Route path="Quizzes" element={<Quizzes />} />
              {/*<Route path="Quizzes/Michael" element={<Michael />} />*/}
                <Route path="Quizzes/:qid/details" element={<QuizDetails />} /> {/* New route for Quiz Details */}
                <Route path="Quizzes/:qid" element={<QuizEditor />} />
                <Route path="Quizzes/:qid/Edit" element={<QuizEditor />} /> {/* Route for QuizEditor */}
                <Route path="Quizzes/:qid/Edit" element={<QuizEditor />} />
                <Route path="Quizzes/:qid/Edit" element={<QuizEditor />} />
                <Route path="Quizzes/:qid/QuestionDetails" element={<QuizDetailsEditor />} />
                {/* <Route path="Quizzes/Nour" element={<QuestionEditor />} /> */}
                <Route path="Quizzes/:qid/Preview" element={<QuizPreview />} />
            </Routes>
          </div>
        </div>
      </div>
    );}