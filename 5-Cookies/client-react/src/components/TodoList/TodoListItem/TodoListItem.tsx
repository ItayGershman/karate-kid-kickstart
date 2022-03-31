import React, { useState, FC } from "react";
import classNames from "classnames";
import { ITodoItem, TodoListItem } from "../../../interfaces/interfaces";
import IconButton from "../../general/IconButton/IconButton";
import Switch from "../../general/Switch/Switch";
import EditTodoItem from "../EditTodoItem/EditTodoItem";
import dataHooks from "../../../dataHooks/dataHooks";
import { Item } from "../../../interfaces/interfaces";
import { errorToaster } from "../../Toaster/toasterHandler";
import "../../../../style.css";
import { classes } from "../../../js-styles/style";

const TodoListItem: FC<ITodoItem> = ({
  item,
  removeTodo,
  dispatchEditTodo,
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [todoItem, setTodoItem] = useState<Item>(item);

  const toggleTodo = async (): Promise<void> => {
    try {
      await dispatchEditTodo(
        { ...item, isFinished: !todoItem.isFinished },
        item.id
      );
      setTodoItem({ ...todoItem, isFinished: !todoItem.isFinished });
    } catch (error) {
      errorToaster("Something went wrong");
    }
  };

  const editTodo = (): void => {
    setIsEditMode((prevState) => !prevState);
  };

  const editText = async (newText: string): Promise<void> => {
    try {
      await dispatchEditTodo({ ...todoItem, text: newText }, item.id, true);
      setTodoItem((prevState) => ({ ...prevState, text: newText }));
      setIsEditMode(false);
    } catch (error) {
      errorToaster("Something went wrong");
    }
  };

  return (
    <li id={item.id} data-hook={item.id}>
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
          data-hook={dataHooks.todoText}
          className={classNames(
            classes.todoText,
            todoItem.isFinished ? classes.finishedTodo : classes.unfinishedTodo
          )}
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
