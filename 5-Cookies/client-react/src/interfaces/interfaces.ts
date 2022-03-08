export type Item = {
  text: string;
  isFinished: boolean;
  id: string;
};

export interface TodoListItem {
  item: Item;
}
