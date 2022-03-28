import React, { useState, FC, ChangeEvent, KeyboardEvent } from "react";
import { classes } from "../../../js-styles/style";
import { editTodoSuffix } from "../../../constants";
import { DataHook, Item } from "../../../interfaces/interfaces";

const EditTodoItem: FC<{
  item: Item;
  editText: (newText: string) => void;
  dataHook: DataHook;
}> = ({ item, editText, dataHook }) => {
  const [todoValue, setTodoValue] = useState<string>(item.text);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") editText(todoValue);
  };

  const handleOnTextChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setTodoValue(e.target.value)
  }

  return (
    <>
      <input
        data-hook={dataHook}
        type="text"
        id={`${item.id}${editTodoSuffix}`}
        className={`${classes.todoText} ${classes.editTodo}`}
        onChange={handleOnTextChange}
        defaultValue={todoValue}
        onKeyPress={handleKeyPress}
      />
    </>
  );
};

export default EditTodoItem;
