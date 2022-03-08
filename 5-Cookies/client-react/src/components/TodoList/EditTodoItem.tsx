import React, { useState, FC, ChangeEvent, KeyboardEvent } from "react";
import { classes } from "../../js-styles/style";
import { editTodoSuffix } from "../../constants";
import { Item } from "../../interfaces/interfaces";

const EditTodoItem = ({
  item,
  setIsEditMode,
}: {
  item: Item;
  setIsEditMode: any;
}) => {
  const [todoValue, setTodoValue] = useState<string>(item.text);
  return (
    <>
      <input
        type="text"
        id={`${item.id}${editTodoSuffix}`}
        className={`${classes.todoText} ${classes.editTodo}`}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTodoValue(e.target.value);
        }}
        defaultValue={todoValue}
        onKeyPress={(e: KeyboardEvent) => {
          if (e.key === "Enter") {
            setIsEditMode(false);
          }
        }}
      />
    </>
  );
};

export default EditTodoItem;
