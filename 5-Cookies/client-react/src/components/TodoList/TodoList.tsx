import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { TodosAPI } from "../../API/TodosAPI";
import { Item } from "../../interfaces/interfaces";
import "../../../style.css";
import TodoListItem from "./TodoListItem/TodoListItem";
import { initTodo } from "../../utils/utils";
import AddItem from "./AddItem";
import { todosApi } from "../../../App";

const TodoList = () => {
  const [todos, setTodos] = useState<Item[]>([]);
  const [newTodo, setNewTodo] = useState<Item>(initTodo());

  const addTodo = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTodos((prevState) => [...prevState, newTodo]);
      setNewTodo(initTodo);
      try {
        await todosApi.addTodo(newTodo);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeTodo = async (itemID: string) => {
    console.log(itemID)
    setTodos((prevState) => prevState.filter((todo) => todo.id !== itemID));
    await todosApi.removeTodo(itemID);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await todosApi.getTodos();
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
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
