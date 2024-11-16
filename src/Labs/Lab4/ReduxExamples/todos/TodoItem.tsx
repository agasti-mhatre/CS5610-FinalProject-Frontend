import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: {
    todo: { id: string; title: string };
  }) {

    const dispatch = useDispatch();
    return (
        <li key={todo.id} className="list-group-item d-flex">
            
        <div className="me-3">
            {todo.title}
        </div>

        <button onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click"
                className="btn btn-primary mw-1 me-1">
          Edit </button>

        <button onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click"
                className="btn btn-danger mw-1 me-1">
          Delete </button>
      </li>
    );
  }  