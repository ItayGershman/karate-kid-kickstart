(function () {
  const list = [
    {
      text: "Doing the Dishes",
      status: "unfinished",
      id: 1,
    },
    {
      text: "Fold Laundry",
      status: "unfinished",
      id: 2,
    },
    {
      text: "Build Todo App",
      status: "finished",
      id: 3,
    },
    {
      text: "Get a haircut",
      status: "unfinished",
      id: 4,
    },
    {
      text: "Call to mom and dad",
      status: "unfinished",
      id: 5,
    },
    {
      text: "Game day against Elitzur Tel-Aviv",
      status: "unfinished",
      id: 6,
    },
    {
      text: "Make dinner",
      status: "unfinished",
      id: 7,
    },
    {
      text: "Eat lunch",
      status: "finished",
      id: 8,
    },
    {
      text: "Go to Wix offices",
      status: "unfinished",
      id: 9,
    },
    {
      text: "Watch Deni Avdjia game",
      status: "unfinished",
      id: 10,
    },
    {
      text: "Go to step 2",
      status: "unfinished",
      id: 11,
    },
    {
      text: "Infra webinar at 3",
      status: "unfinished",
      id: 12,
    },
    {
      text: "Pay the bills",
      status: "unfinished",
      id: 13,
    },
    {
      text: "Contribute code to open source",
      status: "unfinished",
      id: 14,
    },
    {
      text: "Finish Velo site",
      status: "unfinished",
      id: 15,
    },
  ];

  const editModeItems = [];

  const ul = document.getElementById("todoList");

  const loadToDoList = (list) => {
    ul.innerHTML = "";
    list.forEach((item) => {
      ul.appendChild(createItem(list, item));
    });
  };

  const addTodo = () => {
    const inputText = document.getElementById("addTodo");
    const newTodo = {
      text: inputText.value,
      status: "unfinished",
      id: list.length + 1,
    };
    list.push(newTodo);
    ul.insertBefore(createItem(list, newTodo), ul.firstChild);
    inputText.value = ""; //clear input text
  };

  // Remove the todo item from the list and from the DOM
  const removeTodo = (list, item) => {
    list = list.filter(function (ele) {
      return ele.id != item.id;
    });
    const li = document.getElementById(item.id);
    li.remove();
  };

  function removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  const renderComponent = (elem, curr, modifiedElem) => {
    elem.firstChild.replaceChild(curr, modifiedElem);
  };

  const editTodo = (item) => {
    const li = document.getElementById(item.id);
    const isFound = editModeItems.some((element) => {
      if (element.id === item.id) {
        return true;
      }
    });

    const elemToChange = li.firstChild.children[1];
    if (isFound) {
      removeElement(editModeItems, item);
      const todo = document.createElement("span");
      const editedText = document.getElementById(`${item.id}-editTodo`);
      todo.innerText = editedText.value;
      todo.classList.add("todo-text");
      if (item.status === "finished") {
        todo.classList.add("finished-todo");
        li.firstChild.checked = true;
      }
      renderComponent(li, todo, elemToChange);
    } else {
      editModeItems.push(item);
      const inputText = document.createElement("input");
      inputText.type = "text";
      inputText.value = item.text;
      inputText.classList.add("todo-text");
      inputText.classList.add("edit-todo");
      inputText.id = `${item.id}-editTodo`;
      renderComponent(li, inputText, elemToChange);
    }
  };

  const toggleTodo = (item) => {
    const li = document.getElementById(item.id);
    const text = li.firstChild.children[1];
    if (item.status === "finished") {
      text.classList.remove("finished-todo")
      text.classList.add("unfinished-todo");
      item.status = "unfinished";
    } else {
      text.classList.remove("unfinished-todo")
      text.classList.add("finished-todo");
      item.status = "finished";
    }
  };

  const createButton = (cb, icon, className) => {
    const button = document.createElement("button");
    const iTag = document.createElement("i");
    iTag.className = icon;
    button.append(iTag);
    button.classList.add(className);
    button.onclick = cb;
    button.style.cursor = "pointer";
    return button;
  };

  const createItem = (list, item) => {
    const li = document.createElement("li");
    li.id = item.id;


    const switchElem = document.createElement("label");
    switchElem.classList.add("switch");
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = () => toggleTodo(item);

    const slider = document.createElement("span")
    slider.classList.add("slider");
    slider.classList.add("round");

    switchElem.appendChild(checkbox);
    switchElem.appendChild(slider);

    const listItemText = document.createElement("div");
    listItemText.classList.add("list-item-text");
    listItemText.appendChild(switchElem);

    const text = document.createElement("span");
    text.innerText = item.text;
    text.classList.add("todo-text");
    if (item.status === "finished") {
      text.classList.add("finished-todo");
      checkbox.checked = true;
    }
    listItemText.appendChild(text);

    const spanButton = document.createElement("span");
    spanButton.classList.add("list-item-actions");

    const removeButton = createButton(
      () => removeTodo(list, item),
      "fa fa-trash",
      "button"
    );
    const editButton = createButton(
      () => editTodo(item),
      "fa fa-pencil",
      "edit"
    );
    spanButton.appendChild(removeButton);
    spanButton.appendChild(editButton);

    li.appendChild(listItemText);
    li.appendChild(spanButton);
    return li;
  };

  const editListenerHandler = (e) => {
    const text = e.target;
    const id = Number(text.id.split("-")[0]);
    let updatedItem = list.find((ele) => {
      if (ele.id === id) {
        ele.text = text.value;
        return true;
      }
    });
    editTodo(updatedItem);
  };

  document.querySelector("#addTodo").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });

  document.querySelector("#todoList").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      editListenerHandler(e);
    }
  });
  loadToDoList(list);
})();
