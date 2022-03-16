import React, { FC } from "react";
import { TodosAPI } from "./src/API/TodosAPI";
import Header from "./src/components/Header";
import TodoList from "./src/components/TodoList/TodoList";

export const todosApi = new TodosAPI();

const App: FC = () => {
  return (
    <>
      <Header />
      <TodoList />
    </>
  );
};

export default App;
