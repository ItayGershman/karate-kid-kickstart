import { v4 as uuidv4 } from "uuid";
import { Item } from "../interfaces/interfaces";
import { Chance } from "chance";
import { RenderResult } from "@testing-library/react";

const chance = new Chance();

export const buildTodoItem = (overrides: Partial<Item> = {}): Item => ({
  id: chance.guid(),
  text: chance.sentence(),
  isFinished: false,
  ...overrides,
});

export const errorOnMissingWrapper = () => {
  return new Error("Component must be rendered before accessed!");
};

export const isElementExist = (wrapper: RenderResult, id: string) => {
  return !!wrapper.queryByTestId(id);
};