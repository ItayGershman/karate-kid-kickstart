import React from "react";
import { Item } from "../../interfaces/interfaces";
import { classes } from "../../js-styles/style";

const TextItem = ({ item, switchElem }:{item:Item, switchElem:HTMLElement}) => {
  const { todoText, finishedTodo, unfinishedTodo } = classes;
  return (
    <span
      className={`${todoText} ${
        item.isFinished ? finishedTodo : unfinishedTodo
      }`}
    >
      {item.text}
    </span>
  );
};

export default TextItem;
