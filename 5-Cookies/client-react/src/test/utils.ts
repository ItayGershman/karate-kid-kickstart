import { v4 as uuidv4 } from "uuid";
import { DataHook, Item } from "../interfaces/interfaces";
import { Chance } from "chance";
import { fireEvent, RenderResult } from "@testing-library/react";

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

export const isElementExist = (wrapper: RenderResult, id: string) =>
  !!wrapper.queryByTestId(id);

export const getElementByHookName = (
  container: RenderResult | undefined,
  hook: DataHook
) => {
  if (!container) throw errorOnMissingWrapper();
  return container.getByTestId(hook);
};

export const getAllByHookName = (wrapper: RenderResult, hook: DataHook) => {
  return wrapper.getAllByTestId(hook);
};

export const handleKeyPress = (elem: HTMLElement | HTMLInputElement) => {
  fireEvent.keyPress(elem, {
    key: "Enter",
    code: "Enter",
    charCode: 13,
  });
};
