import React, { useState, FC } from "react";
import { ITodoItem, TodoListItem } from "../../../interfaces/interfaces";
import { classes } from "../../../js-styles/style";
import IconButton from "../../general/IconButton";
import Switch from "../../general/Switch";
import EditTodoItem from "../EditTodoItem";
import { todosApi } from "../../../../App";
import dataHooks from "../../../dataHooks/dataHooks";
import "../../../../style.css";
import { Item } from "../../../interfaces/interfaces";
import { Guid } from "../../../../../common/interfaces/Todo";

const TodoListItem: FC<ITodoItem> = ({ item, removeTodo }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [todoItem, setTodoItem] = useState<Item>(item);

  const dispatchEditTodo = async (newTodo: Item, id: Guid): Promise<void> => {
    try {
      await todosApi.editTodo(newTodo, id);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTodo = async (): Promise<void> => {
    setTodoItem({ ...todoItem, isFinished: !todoItem.isFinished });
    dispatchEditTodo({ ...item, isFinished: !todoItem.isFinished }, item.id);
  };

  const editTodo = (): void => {
    setIsEditMode((prevState) => !prevState);
  };

  const editText = async (newText: string): Promise<void> => {
    setTodoItem((prevState) => ({ ...prevState, text: newText }));
    setIsEditMode(false);
    dispatchEditTodo({ ...todoItem, text: newText }, item.id);
  };

  return (
    <li id={item.id}>
      <Switch
        cb={toggleTodo}
        checked={todoItem.isFinished}
        dataHook={dataHooks.todoToggleSwitch}
      />
      {isEditMode ? (
        <EditTodoItem
          item={todoItem}
          editText={editText}
          dataHook={dataHooks.editTodoItem}
        />
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
          dataHook={dataHooks.removeIconButton}
          cb={() => {
            removeTodo(item.id);
          }}
          icon="fa fa-trash"
          className={classes.button}
        />
        <IconButton
          dataHook={dataHooks.editIconButton}
          cb={editTodo}
          icon="fa fa-pencil"
          className={classes.edit}
        />
      </span>
    </li>
  );
};

export default TodoListItem;
