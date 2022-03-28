import React, {
  useState,
  useEffect,
  KeyboardEvent,
  useContext,
  FC,
} from "react";
import { Item } from "../../interfaces/interfaces";
import TodoListItem from "./TodoListItem/TodoListItem";
import { initTodo } from "../../utils/utils";
import AddItem from "./AddItem/AddItem";
import { TodosApiContext } from "../../../App";
import "../../../style.css";
import { errorToaster, successToaster } from "../Toaster/toasterHandler";
import { Guid } from "../../../../common/interfaces/Todo";

const TodoList: FC = () => {
  const [todos, setTodos] = useState<Item[]>([]);
  const [newTodo, setNewTodo] = useState<Item>(initTodo());
  const todosApi = useContext(TodosApiContext);

  const addTodo = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTodos((prevState) => [...prevState, newTodo]);
      console.log(newTodo)
      try {
        await todosApi.addTodo(newTodo);
        successToaster("New Todo added to your list 🥳");
      } catch (error) {
        errorToaster("Something went wrong");
      }
      setNewTodo(initTodo);
    }
  };

  const removeTodo = async (itemID: string) => {
    console.log("Remove todo")
    setTodos((prevState) => prevState.filter((todo) => todo.id !== itemID));
    try {
      console.log("Remove todo 2")
      await todosApi.removeTodo(itemID);
      console.log("Remove todo 3")
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
    await todosApi.editTodo(newTodo, id);
    if (displayToaster) successToaster("Item updated");
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await todosApi.getTodos();
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <main>
      <div className="container">
        <div className="list">
          <AddItem addTodo={addTodo} setNewTodo={setNewTodo} />
          <ul id="todoList" className="list-container">
            {todos.map((item) => (
              <div key={item.id}>
                <TodoListItem item={item} removeTodo={removeTodo} dispatchEditTodo={dispatchEditTodo}/>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default TodoList;
