import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Error from "./Error";

import {


  selectFilteredTodos,
  getTodosAsync,
  toggleTodoAsync,
  removeTodoAsync
} from "../redux/todos/todosSlice";

function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector(state => state.todos.error)

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleToggle = async (id,completed) =>{
    await dispatch(toggleTodoAsync({id, data:{completed}}))
  }

  if (isLoading) return <Loading />;

  const handleDestroy = async (id) => {
    if (window.confirm("Are you sure?")) {
      await dispatch(removeTodoAsync(id));
    }
  };

  if (error) {
    return <Error message={error} />
  }

  return (
    <div>
      <ul className="todo-list">
        {filteredTodos.map((item) => (
          <li key={item.id} className={item.completed ? "completed" : ""}>
            <div className="view">
              <input
                className="toggle"
                checked={item.completed}
                type="checkbox"
                onChange={() => handleToggle(item.id,!item.completed)}
              />
              <label>{item.title}</label>
              <button
                className="destroy"
                onClick={() => handleDestroy(item.id)}
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
