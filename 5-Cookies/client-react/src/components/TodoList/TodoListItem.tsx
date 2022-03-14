import React, { useState, FC } from "react";
import { ITodoItem, TodoListItem } from "../../interfaces/interfaces";
import { classes } from "../../js-styles/style";
import IconButton from "../general/IconButton";
import Switch from "../general/Switch";
import "../../../style.css";
import EditTodoItem from "./EditTodoItem";
import { Item } from "../../interfaces/interfaces";


const TodoListItem: FC<ITodoItem> = ({ item, removeTodo }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [todoItem, setTodoItem] = useState<Item>(item);

  const toggleTodo = () => {
    setTodoItem({ ...todoItem, isFinished: !todoItem.isFinished });
    //send TodoAPI.editTodo also
  };

  const editTodo = () => {
    setIsEditMode((prevState) => !prevState);
  };

  const editText = (newText: string) => {
    setTodoItem((prevState) => ({ ...prevState, text: newText }));
    setIsEditMode(false);
    //TodoAPI.editTodo(item,item.id,todoItem)
  };

  return (
    <li id={item.id}>
      <Switch cb={toggleTodo} checked={todoItem.isFinished} />
      {isEditMode ? (
        <EditTodoItem item={todoItem} editText={editText} />
      ) : (
        <span
          className={`${classes.todoText} ${
            todoItem.isFinished ? classes.finishedTodo : classes.unfinishedTodo
          }`}
        >
          {todoItem.text}
        </span>
      )}

      <span className={classes.listItemActions}>
        <IconButton
          cb={() => removeTodo(item.id)}
          icon="fa fa-trash"
          className={classes.button}
        />
        <IconButton
          cb={editTodo}
          icon="fa fa-pencil"
          className={classes.edit}
        />
      </span>
    </li>
  );
};

export default TodoListItem;
