import React, { FC,createContext } from "react";
import { TodosAPI } from "./src/API/TodosAPI";
import Header from "./src/components/Header/Header";
import Toaster from "./src/components/Toaster/Toaster";
import TodoList from "./src/components/TodoList/TodoList";

const todosApi = new TodosAPI();
export const TodosApiContext = React.createContext(todosApi);

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
