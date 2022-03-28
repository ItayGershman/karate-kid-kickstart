import React, { ChangeEvent, FC } from "react";
import { IAddItem } from "../../../interfaces/interfaces";

const AddItem: FC<IAddItem> = ({ addTodo, setNewTodo }) => {
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTodo((prevState) => ({
      ...prevState,
      text: e.target.value,
    }));

  return (
    <>
      <h2>What would you like to do?</h2>
      <input
        type="text"
        className="add-todo"
        id="addTodo"
        onChange={handleTextChange}
        onKeyPress={addTodo}
      />
    </>
  );
};

export default AddItem;
