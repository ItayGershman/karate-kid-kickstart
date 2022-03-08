import React, { useState, useEffect } from "react";
import { TodosAPI } from "../../API/TodosAPI";
import { Item } from "../../interfaces/interfaces";
import "../../../style.css";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const [todos, setTodos] = useState<Item[]>([]);
  

  useEffect(() => {
    // const url = "http://localhost:5001";
    // const api = new TodosAPI(url);
    const testTodos = [
      { text: "test1", isFinished: false, id: "1" },
      { text: "test2", isFinished: true, id: "2" },
    ];
    setTodos(testTodos);
  }, []);

  return (
    <main>
      <div className="container">
        <div className="list">
          <h2>What would you like to do?</h2>
          <input type="text" className="add-todo" id="addTodo" />
          <ul id="todoList" className="list-container">
            {todos.map((item) => (
              <TodoListItem
                item={item}
              />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default TodoList;
