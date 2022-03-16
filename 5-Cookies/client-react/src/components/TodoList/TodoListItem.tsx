import React, { useState, FC } from "react";
import { ITodoItem, TodoListItem } from "../../interfaces/interfaces";
import { classes } from "../../js-styles/style";
import IconButton from "../general/IconButton";
import Switch from "../general/Switch";
import "../../../style.css";
import EditTodoItem from "./EditTodoItem";
import { Item } from "../../interfaces/interfaces";
import { todosApi } from "../../../App";

const TodoListItem: FC<ITodoItem> = ({ item, removeTodo }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [todoItem, setTodoItem] = useState<Item>(item);

  const toggleTodo = async () => {
    setTodoItem({ ...todoItem, isFinished: !todoItem.isFinished });
    try {
      await todosApi.editTodo(
        { ...item, isFinished: !todoItem.isFinished },
        item.id
      );
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = () => {
    setIsEditMode((prevState) => !prevState);
  };

  const editText = async (newText: string) => {
    setTodoItem((prevState) => ({ ...prevState, text: newText }));
    setIsEditMode(false);
    try {
      await todosApi.editTodo({ ...todoItem, text: newText }, item.id);
    } catch (error) {
      console.log(error)
    }
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
