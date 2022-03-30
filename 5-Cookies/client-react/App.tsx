import React, { FC } from "react";
import { todosApi, TodosApiContext } from "./src/Contexts/TodoContext";
import Header from "./src/components/Header/Header";
import Toaster from "./src/components/Toaster/Toaster";
import TodoList from "./src/components/TodoList/TodoList";

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
