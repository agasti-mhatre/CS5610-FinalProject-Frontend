import { FaPlus } from "react-icons/fa";
import QuizEditor from "./QuizEditor";
export default function QuizzesControls(
    { quizName, setQuizName, addQuiz }:
    { quizName: string; setQuizName: (title: string) => void; addQuiz: () => void; }) {
      return (
        <div id="wd-modules-controls" className="text-nowrap">
          <button className="btn btn-lg btn-danger me-1 float-end" id="wd-add-module-btn"
            data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog" >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Quiz
          </button>
          
          <QuizEditor dialogTitle="Add Quiz" quizName={quizName}
                        setQuizName={setQuizName} addQuiz={addQuiz} />
        </div>
    );}
    