import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {

    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <li className="list-group-item d-flex">
            <input value={todo.title}
                onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
                className="form-control w-25 mw-1 me-2"
            />
            <button onClick={() => dispatch(updateTodo(todo))}
                  id="wd-update-todo-click"
                  className="btn btn-warning mw-1 me-1">Update </button>
            
            <button onClick={() => dispatch(addTodo(todo))}
                  id="wd-add-todo-click"
                  className="btn btn-success mw-1 me-1">Add</button>
        </li>
    );
}  