import React, {
  useState,
  KeyboardEvent,
  useContext,
  FC,
  useEffect,
} from "react";
import { Item } from "../../interfaces/interfaces";
import TodoListItem from "./TodoListItem/TodoListItem";
import { initTodo } from "../../utils/utils";
import AddItem from "./AddItem/AddItem";
import { TodosApiContext } from "../../../App";
import "../../../style.css";
import { errorToaster, successToaster } from "../Toaster/toasterHandler";
import { Guid } from "../../../../common/interfaces/Todo";
import dataHooks from "../../dataHooks/dataHooks";

const TodoList: FC = () => {
  const [todos, setTodos] = useState<Item[]>([]);
  const [newTodo, setNewTodo] = useState<Item>(initTodo());
  const todosApi = useContext(TodosApiContext);

  const addTodo = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        await todosApi.addTodo(newTodo);
        setTodos((prevState) => [...prevState, newTodo]);
        successToaster("New Todo added to your list 🥳");
      } catch (error) {
        errorToaster("Something went wrong");
      }
      setNewTodo(initTodo);
    }
  };

  const removeTodo = async (itemID: string) => {
    setTodos((prevState) => prevState.filter((todo) => todo.id !== itemID));
    try {
      await todosApi.removeTodo(itemID);
      successToaster("Item removed successfuly");
    } catch (error) {
      errorToaster("Item couldn'e be removed");
    }
  };

  const dispatchEditTodo = async (
    newTodo: Item,
    id: Guid,
    displayToaster: boolean = false
  ): Promise<void> => {
    try {
      await todosApi.editTodo(newTodo, id);
      if (displayToaster) successToaster("Item updated");
    } catch (error) {
      errorToaster("Something went wrong");
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await todosApi.getTodos();
        setTodos(data);
      } catch (error) {
        errorToaster("Something went wrong");
      }
    };
    fetchTodos();
  }, []);

  return (
    <main>
      <div className="container">
        <div className="list">
          <AddItem
            addTodo={addTodo}
            setNewTodo={setNewTodo}
            dataHook={dataHooks.addItem}
          />
          <ul id="todoList" className="list-container">
            {todos.map((item) => (
              <div key={item.id}>
                <TodoListItem
                  item={item}
                  removeTodo={removeTodo}
                  dispatchEditTodo={dispatchEditTodo}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default TodoList;
