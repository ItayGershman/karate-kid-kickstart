import React, { useState, FC, ChangeEvent, KeyboardEvent } from "react";
import { classes } from "../../js-styles/style";
import { editTodoSuffix } from "../../constants";
import { Item } from "../../interfaces/interfaces";

const EditTodoItem: FC<{
  item: Item;
  editText: (newText: string) => void;
  dataHook: string;
}> = ({ item, editText, dataHook }) => {
  const [todoValue, setTodoValue] = useState<string>(item.text);

  return (
    <>
      <input
        data-hook={dataHook}
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
