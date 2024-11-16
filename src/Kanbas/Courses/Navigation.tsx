import { Link, useLocation } from "react-router-dom";
export default function CoursesNavigation() {

  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  const location = useLocation();
  const courseID = location.pathname.split("/")[3]

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
    
      {links.map((link) =>
        {

          const linkPath = `/Kanbas/Courses/${courseID}/${link}`
          const isActive = location.pathname === linkPath;

          if (isActive) {
            return (

              <Link to={`/Kanbas/Courses/${courseID}/${link}`} id="wd-course-home-link" 
              className="list-group-item active border border-0"> {link} </Link>
            )
          }

          return (
            <Link to={`/Kanbas/Courses/${courseID}/${link}`} id="wd-course-home-link" 
            className="list-group-item text-danger border border-0"> {link} </Link>
          )
        }  
      )}
      
    </div>
);}