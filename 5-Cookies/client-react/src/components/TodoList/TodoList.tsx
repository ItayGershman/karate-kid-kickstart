import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { TodosAPI } from "../../API/TodosAPI";
import { Item } from "../../interfaces/interfaces";
import "../../../style.css";
import TodoListItem from "./TodoListItem";
import { initTodo } from "../../utils/utils";
import AddItem from "./AddItem";

const TodoList = () => {
  const [todos, setTodos] = useState<Item[]>([]);
  const [newTodo, setNewTodo] = useState<Item>(initTodo());

  const addTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTodos((prevState) => [...prevState, newTodo]);
      setNewTodo(initTodo);
    }
  };

  const removeTodo = (itemID: string) => {
    setTodos((prevState) => prevState.filter((todo) => todo.id !== itemID));
    //send TodoAPI.removeTodo
  };

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
          <AddItem addTodo={addTodo} setNewTodo={setNewTodo} />
          <ul id="todoList" className="list-container">
            {todos.map((item) => (
              <div key={item.id}>
                <TodoListItem item={item} removeTodo={removeTodo} />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default TodoList;
