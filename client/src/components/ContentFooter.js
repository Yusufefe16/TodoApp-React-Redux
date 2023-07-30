import {useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { chanceActiveFilter,clearCompleted,selectTodos,clearCompletedTodoAsync  } from "../redux/todos/todosSlice";

function ContentFooter() {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);
  const activeFilter = useSelector((state) => state.todos.activeFilter);


  const itemsLeft = items.filter((item) => !item.completed).length;

  

  console.log(itemsLeft);

  useEffect(()=>{
    localStorage.setItem('activeFilter', activeFilter);
  },[activeFilter])

  return (
    <div>
      <footer className="footer">
        <span className="todo-count">{itemsLeft} item{itemsLeft > 1 ? 's':null} left</span>

        <ul className="filters">
          <li>
            <a href="#/" onClick={()=> dispatch(chanceActiveFilter('all'))} className={activeFilter === 'all'? 'selected': ''}>
              All
            </a>
          </li>
          <li>
            <a href="#/" onClick={()=> dispatch(chanceActiveFilter('active'))} className={activeFilter === 'active'? 'selected': ''}>Active</a>
          </li>
          <li>
            <a href="#/" onClick={()=> dispatch(chanceActiveFilter('completed'))} className={activeFilter === 'completed'? 'selected': ''}>Completed</a>
          </li>
        </ul>

        <button onClick={() => dispatch(clearCompleted())} className="clear-completed">Clear completed</button>
      </footer>
    </div>
  );
}

export default ContentFooter;
