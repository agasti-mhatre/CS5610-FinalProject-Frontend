import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
export default function QuizControlButtons(
  { quizId, deleteQuiz ,editQuiz }: { quizId: string; deleteQuiz: (quizeId: string) => void;
    editQuiz: (quizId: string) => void  }
) {
  return (
    <div className="float-end">
      <FaPencil onClick={() => editQuiz(quizId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteQuiz(quizId)}/>
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
