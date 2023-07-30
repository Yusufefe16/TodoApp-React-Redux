import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodosAsync } from "../redux/todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";

function Form() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.addNewTodoIsLoading);
  const error = useSelector(state=>state.todos.addNewTodoError);

  const handleSubmit = async (e) => {
    if (!title) return;
    e.preventDefault();

    await dispatch(addTodosAsync({ title }));
    setTitle("");
    console.log(e);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
          disabled={isLoading}
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />

        {isLoading && <Loading/>}
        {error && <Error message={error}/>}
      </form>
    </div>
  );
}

export default Form;
