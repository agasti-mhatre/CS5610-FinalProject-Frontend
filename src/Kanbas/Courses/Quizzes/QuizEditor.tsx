export default function QuizEditor({ dialogTitle, quizName, setQuizName, addQuiz }:
    { dialogTitle: string; quizName: string; setQuizName: (name: string) => void; addQuiz: () => void; }) {
      return (
        <div id="wd-add-module-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {dialogTitle} </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <input className="form-control" defaultValue={quizName} placeholder="Quiz Name"
                       onChange={(e) => setQuizName(e.target.value)}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel </button>
                <button onClick={addQuiz} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                  Add Quiz </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    