import React, { ChangeEvent, FC } from "react";
import { IAddItem } from "../../interfaces/interfaces";

const AddItem: FC<IAddItem> = ({ addTodo, setNewTodo }) => {
  return (
    <>
      <h2>What would you like to do?</h2>
      <input
        type="text"
        className="add-todo"
        id="addTodo"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewTodo((prevState) => ({
            ...prevState,
            text: e.target.value,
          }))
        }
        onKeyPress={addTodo}
      />
    </>
  );
};

export default AddItem;
