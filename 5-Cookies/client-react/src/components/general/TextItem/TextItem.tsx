import React, { FC } from "react";
import { Item } from "../../../interfaces/interfaces";
import { classes } from "../../../js-styles/style";

const TextItem: FC<{ item: Item }> = ({ item }) => {
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
