import React, { useState, FC, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { classes } from "../../js-styles/style";
import { editTodoSuffix } from "../../constants";
import { Item } from "../../interfaces/interfaces";

const EditTodoItem = ({ item, editText }: { item: Item; editText: any }) => {
  const [todoValue, setTodoValue] = useState<string>(item.text);
  useEffect(()=>{
    console.log({todoValue});
  },[])
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
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            editText(todoValue);
          }
        }}
      />
    </>
  );
};

export default EditTodoItem;
