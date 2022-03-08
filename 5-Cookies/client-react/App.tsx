import React, { FC } from "react";
import Header from "./src/components/Header";
import TodoList from "./src/components/TodoList/TodoList";

const App: FC = () => {
  return (
    <>
      <Header />
      <TodoList />
    </>
  );
};

export default App;
