import React, { useState } from "react";
export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node"  }]);
  const [todo, setTodo] = useState({ id: "-1", title: "Learn Mongo" });
  const addTodo = (todo: any) => {
    const newTodos = [ ...todos, { ...todo,
      id: new Date().getTime().toString() }];
    setTodos(newTodos);
    setTodo({id: "-1", title: ""});
  };
  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const updateTodo = (todo: any) => {
    const newTodos = todos.map((item) =>
      (item.id === todo.id ? todo : item));
    setTodos(newTodos);
    setTodo({id: "-1", title: ""});
  };
  return (
    <div>
      <h2>Todo List</h2>
      <ul className="list-group">
        <li className="list-group-item d-flex">
            <input value={todo.title}
                onChange={(e) =>
                setTodo({ ...todo,
                    title: e.target.value })
                }
                className="form-control w-25 mw-1 me-2"
            />
            <button onClick={() => updateTodo(todo)}
                  id="wd-update-todo-click"
                  className="btn btn-warning mw-1 me-1">Update </button>
            
            <button onClick={() => addTodo(todo)}
                  id="wd-add-todo-click"
                  className="btn btn-success mw-1 me-1">Add</button>
        </li>
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex">
            
            <div className="me-3">
                {todo.title}
            </div>

            <button onClick={() => setTodo(todo)}
                    id="wd-set-todo-click"
                    className="btn btn-primary mw-1 me-1">
              Edit </button>

            <button onClick={() => deleteTodo(todo.id)}
                    id="wd-delete-todo-click"
                    className="btn btn-danger mw-1 me-1">
              Delete </button>
          </li>
        ))}
      </ul>
      <hr/>
    </div>
  );
}