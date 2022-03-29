import { render } from "@testing-library/react";
import React, { FC, createContext } from "react";
import { ITodoApi, TodosAPI } from "./src/API/TodosAPI";
import Header from "./src/components/Header/Header";
import Toaster from "./src/components/Toaster/Toaster";
import TodoList from "./src/components/TodoList/TodoList";

const todosApi: ITodoApi = new TodosAPI();
export const TodosApiContext = createContext<ITodoApi>(todosApi);

const App: FC = () => {
  return (
    <TodosApiContext.Provider value={todosApi}>
      <Header />
      <TodoList />
      <Toaster />
    </TodosApiContext.Provider>
  );
};

export default App;
