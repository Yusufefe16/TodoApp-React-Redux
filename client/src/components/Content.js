import React from "react";
import TodoList from "./TodoList";
import ContentFooter from "./ContentFooter";

function Content() {
  return (
    <div>
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList />
      </section>
      <ContentFooter />
    </div>
  );
}

export default Content;
