import React, { useState } from "react";
import { TodoListItem } from "../../interfaces/interfaces";
import { classes } from "../../js-styles/style";
import IconButton from "../general/IconButton";
import Switch from "../general/Switch";
import "../../../style.css";
import EditTodoItem from "./EditTodoItem";
import { Item } from "../../interfaces/interfaces";

const TodoListItem = ({ item }: TodoListItem) => {
  const [isEditMode, setIsEditMode] = useState<Boolean>(false);
  const [todoItem, setTodoItem] = useState<Item>(item);
  const toggleTodo = () => {
    setTodoItem({ ...todoItem, isFinished: !todoItem.isFinished });
    //send TodoAPI.editTodo also
  };
  const removeTodo = () => {
    //send TodoAPI.removeTodo
  };
  const editTodo = () => {
    setIsEditMode((prevState) => !prevState);
    if(isEditMode) {
      //TodoAPI.editTodo(item,item.id)
    }
  };
  console.log(todoItem);
  return (
    <li id={item.id}>
      <Switch cb={toggleTodo} checked={todoItem.isFinished}/>
      {isEditMode ? (
        <EditTodoItem item={todoItem} setIsEditMode={isEditMode} />
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
          cb={removeTodo}
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
