/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
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

  const todoList = document.getElementById("todoList");
  const inputText = document.getElementById("addTodo");

  const loadToDoList = (list) => {
    todoList.innerHTML = "";
    list.forEach((item) => {
      todoList.appendChild(createItem(list, item));
    });
  };

  const addTodo = () => {
    const newTodo = {
      text: inputText.value,
      status: "unfinished",
      id: list.length + 1,
    };
    list.push(newTodo);
    todoList.insertBefore(createItem(list, newTodo), todoList.firstChild);
    inputText.value = ""; //clear input text
  };

  // Remove the todo item from the list and from the DOM
  const removeTodo = (list, item) => {
    list = list.filter(function (ele) {
      return ele.id != item.id;
    });
    const todoListItem = document.getElementById(item.id);
    todoListItem.remove();
  };

  function removeElement(array, elem) {
    const index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  const renderComponent = (elem, curr, modifiedElem) => {
    elem.firstChild.replaceChild(curr, modifiedElem);
  };

  const editTodo = (item) => {
    const todoListItem = document.getElementById(item.id);
    const isFound = editModeItems.some((element) => {
      if (element.id === item.id) {
        return true;
      }
    });

    const elemToChange = todoListItem.firstChild.children[1];
    if (isFound) {
      removeElement(editModeItems, item);
      const todoItem = document.createElement("span");
      const editedText = document.getElementById(`${item.id}-editTodo`);
      todoItem.innerText = editedText.value;
      todoItem.classList.add("todo-text");
      if (item.status === "finished") {
        todoItem.classList.add("finished-todo");
        todoListItem.firstChild.checked = true;
      }
      renderComponent(todoListItem, todoItem, elemToChange);
    } else {
      editModeItems.push(item);
      const inputText = document.createElement("input");
      inputText.type = "text";
      inputText.value = item.text;
      inputText.classList.add("todo-text", "edit-todo");
      inputText.id = `${item.id}-editTodo`;
      renderComponent(todoListItem, inputText, elemToChange);
    }
  };

  const toggleTodo = (item) => {
    const todoListItem = document.getElementById(item.id);
    const todoDescription = todoListItem.firstChild.children[1];
    if (item.status === "finished") {
      todoDescription.classList.remove("finished-todo");
      todoDescription.classList.add("unfinished-todo");
      item.status = "unfinished";
    } else {
      todoDescription.classList.remove("unfinished-todo");
      todoDescription.classList.add("finished-todo");
      item.status = "finished";
    }
  };

  const createButton = (cb, icon, className) => {
    const button = document.createElement("button");
    const iTag = document.createElement("i");
    iTag.className = icon;
    button.append(iTag);
    button.classList.add(className);
    button.addEventListener("click", cb);
    button.style.cursor = "pointer";
    return button;
  };

  const createSwitchElem = (cb) => {
    const switchElem = document.createElement("label");
    switchElem.classList.add("switch");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = cb;

    const slider = document.createElement("span");
    slider.classList.add("slider");
    slider.classList.add("round");

    switchElem.appendChild(checkbox);
    switchElem.appendChild(slider);
    return switchElem;
  };

  const createTextItem = (item, switchElem) => {
    const todoDescription = document.createElement("span");
    todoDescription.innerText = item.text;
    todoDescription.classList.add("todo-text");
    if (item.status === "finished") {
      todoDescription.classList.add("finished-todo");
      switchElem.firstChild.checked = true;
    }
    return todoDescription;
  };

  const createItem = (list, item) => {
    const todoListItem = document.createElement("li");
    todoListItem.id = item.id;

    const listItemContainer = document.createElement("div");
    listItemContainer.classList.add("list-item-text");
    const switchElem = createSwitchElem(() => toggleTodo(item));
    listItemContainer.appendChild(switchElem);
    listItemContainer.appendChild(createTextItem(item, switchElem));

    const itemActions = document.createElement("span");
    itemActions.classList.add("list-item-actions");

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
    itemActions.appendChild(removeButton);
    itemActions.appendChild(editButton);

    todoListItem.appendChild(listItemContainer);
    todoListItem.appendChild(itemActions);
    return todoListItem;
  };

  const editListenerHandler = (e) => {
    const editInputElem = e.target;
    const id = Number(editInputElem.id.split("-")[0]);
    let updatedItem = list.find((ele) => {
      if (ele.id === id) {
        ele.text = editInputElem.value;
        return true;
      }
    });
    editTodo(updatedItem);
  };

  document.querySelector("#addTodo").addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });

  document.querySelector("#todoList").addEventListener("keypress", (e) => {
    if (e.key === "Enter") editListenerHandler(e);
  });
  loadToDoList(list);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5lMzY3NTFmNzk1MjZmMDBiYmJiNC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxRQUFRO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8yLXdlYnBhY2svLi9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGxpc3QgPSBbXG4gICAge1xuICAgICAgdGV4dDogXCJEb2luZyB0aGUgRGlzaGVzXCIsXG4gICAgICBzdGF0dXM6IFwidW5maW5pc2hlZFwiLFxuICAgICAgaWQ6IDEsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIkZvbGQgTGF1bmRyeVwiLFxuICAgICAgc3RhdHVzOiBcInVuZmluaXNoZWRcIixcbiAgICAgIGlkOiAyLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJCdWlsZCBUb2RvIEFwcFwiLFxuICAgICAgc3RhdHVzOiBcImZpbmlzaGVkXCIsXG4gICAgICBpZDogMyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6IFwiR2V0IGEgaGFpcmN1dFwiLFxuICAgICAgc3RhdHVzOiBcInVuZmluaXNoZWRcIixcbiAgICAgIGlkOiA0LFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJDYWxsIHRvIG1vbSBhbmQgZGFkXCIsXG4gICAgICBzdGF0dXM6IFwidW5maW5pc2hlZFwiLFxuICAgICAgaWQ6IDUsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIkdhbWUgZGF5IGFnYWluc3QgRWxpdHp1ciBUZWwtQXZpdlwiLFxuICAgICAgc3RhdHVzOiBcInVuZmluaXNoZWRcIixcbiAgICAgIGlkOiA2LFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJNYWtlIGRpbm5lclwiLFxuICAgICAgc3RhdHVzOiBcInVuZmluaXNoZWRcIixcbiAgICAgIGlkOiA3LFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJFYXQgbHVuY2hcIixcbiAgICAgIHN0YXR1czogXCJmaW5pc2hlZFwiLFxuICAgICAgaWQ6IDgsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIkdvIHRvIFdpeCBvZmZpY2VzXCIsXG4gICAgICBzdGF0dXM6IFwidW5maW5pc2hlZFwiLFxuICAgICAgaWQ6IDksXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIldhdGNoIERlbmkgQXZkamlhIGdhbWVcIixcbiAgICAgIHN0YXR1czogXCJ1bmZpbmlzaGVkXCIsXG4gICAgICBpZDogMTAsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIkdvIHRvIHN0ZXAgMlwiLFxuICAgICAgc3RhdHVzOiBcInVuZmluaXNoZWRcIixcbiAgICAgIGlkOiAxMSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6IFwiSW5mcmEgd2ViaW5hciBhdCAzXCIsXG4gICAgICBzdGF0dXM6IFwidW5maW5pc2hlZFwiLFxuICAgICAgaWQ6IDEyLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJQYXkgdGhlIGJpbGxzXCIsXG4gICAgICBzdGF0dXM6IFwidW5maW5pc2hlZFwiLFxuICAgICAgaWQ6IDEzLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogXCJDb250cmlidXRlIGNvZGUgdG8gb3BlbiBzb3VyY2VcIixcbiAgICAgIHN0YXR1czogXCJ1bmZpbmlzaGVkXCIsXG4gICAgICBpZDogMTQsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiBcIkZpbmlzaCBWZWxvIHNpdGVcIixcbiAgICAgIHN0YXR1czogXCJ1bmZpbmlzaGVkXCIsXG4gICAgICBpZDogMTUsXG4gICAgfSxcbiAgXTtcblxuICBjb25zdCBlZGl0TW9kZUl0ZW1zID0gW107XG5cbiAgY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG9MaXN0XCIpO1xuICBjb25zdCBpbnB1dFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZFRvZG9cIik7XG5cbiAgY29uc3QgbG9hZFRvRG9MaXN0ID0gKGxpc3QpID0+IHtcbiAgICB0b2RvTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoY3JlYXRlSXRlbShsaXN0LCBpdGVtKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgYWRkVG9kbyA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdUb2RvID0ge1xuICAgICAgdGV4dDogaW5wdXRUZXh0LnZhbHVlLFxuICAgICAgc3RhdHVzOiBcInVuZmluaXNoZWRcIixcbiAgICAgIGlkOiBsaXN0Lmxlbmd0aCArIDEsXG4gICAgfTtcbiAgICBsaXN0LnB1c2gobmV3VG9kbyk7XG4gICAgdG9kb0xpc3QuaW5zZXJ0QmVmb3JlKGNyZWF0ZUl0ZW0obGlzdCwgbmV3VG9kbyksIHRvZG9MaXN0LmZpcnN0Q2hpbGQpO1xuICAgIGlucHV0VGV4dC52YWx1ZSA9IFwiXCI7IC8vY2xlYXIgaW5wdXQgdGV4dFxuICB9O1xuXG4gIC8vIFJlbW92ZSB0aGUgdG9kbyBpdGVtIGZyb20gdGhlIGxpc3QgYW5kIGZyb20gdGhlIERPTVxuICBjb25zdCByZW1vdmVUb2RvID0gKGxpc3QsIGl0ZW0pID0+IHtcbiAgICBsaXN0ID0gbGlzdC5maWx0ZXIoZnVuY3Rpb24gKGVsZSkge1xuICAgICAgcmV0dXJuIGVsZS5pZCAhPSBpdGVtLmlkO1xuICAgIH0pO1xuICAgIGNvbnN0IHRvZG9MaXN0SXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGl0ZW0uaWQpO1xuICAgIHRvZG9MaXN0SXRlbS5yZW1vdmUoKTtcbiAgfTtcblxuICBmdW5jdGlvbiByZW1vdmVFbGVtZW50KGFycmF5LCBlbGVtKSB7XG4gICAgY29uc3QgaW5kZXggPSBhcnJheS5pbmRleE9mKGVsZW0pO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlbmRlckNvbXBvbmVudCA9IChlbGVtLCBjdXJyLCBtb2RpZmllZEVsZW0pID0+IHtcbiAgICBlbGVtLmZpcnN0Q2hpbGQucmVwbGFjZUNoaWxkKGN1cnIsIG1vZGlmaWVkRWxlbSk7XG4gIH07XG5cbiAgY29uc3QgZWRpdFRvZG8gPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IHRvZG9MaXN0SXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGl0ZW0uaWQpO1xuICAgIGNvbnN0IGlzRm91bmQgPSBlZGl0TW9kZUl0ZW1zLnNvbWUoKGVsZW1lbnQpID0+IHtcbiAgICAgIGlmIChlbGVtZW50LmlkID09PSBpdGVtLmlkKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZWxlbVRvQ2hhbmdlID0gdG9kb0xpc3RJdGVtLmZpcnN0Q2hpbGQuY2hpbGRyZW5bMV07XG4gICAgaWYgKGlzRm91bmQpIHtcbiAgICAgIHJlbW92ZUVsZW1lbnQoZWRpdE1vZGVJdGVtcywgaXRlbSk7XG4gICAgICBjb25zdCB0b2RvSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgY29uc3QgZWRpdGVkVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2l0ZW0uaWR9LWVkaXRUb2RvYCk7XG4gICAgICB0b2RvSXRlbS5pbm5lclRleHQgPSBlZGl0ZWRUZXh0LnZhbHVlO1xuICAgICAgdG9kb0l0ZW0uY2xhc3NMaXN0LmFkZChcInRvZG8tdGV4dFwiKTtcbiAgICAgIGlmIChpdGVtLnN0YXR1cyA9PT0gXCJmaW5pc2hlZFwiKSB7XG4gICAgICAgIHRvZG9JdGVtLmNsYXNzTGlzdC5hZGQoXCJmaW5pc2hlZC10b2RvXCIpO1xuICAgICAgICB0b2RvTGlzdEl0ZW0uZmlyc3RDaGlsZC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJlbmRlckNvbXBvbmVudCh0b2RvTGlzdEl0ZW0sIHRvZG9JdGVtLCBlbGVtVG9DaGFuZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlZGl0TW9kZUl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICBjb25zdCBpbnB1dFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICBpbnB1dFRleHQudHlwZSA9IFwidGV4dFwiO1xuICAgICAgaW5wdXRUZXh0LnZhbHVlID0gaXRlbS50ZXh0O1xuICAgICAgaW5wdXRUZXh0LmNsYXNzTGlzdC5hZGQoXCJ0b2RvLXRleHRcIiwgXCJlZGl0LXRvZG9cIik7XG4gICAgICBpbnB1dFRleHQuaWQgPSBgJHtpdGVtLmlkfS1lZGl0VG9kb2A7XG4gICAgICByZW5kZXJDb21wb25lbnQodG9kb0xpc3RJdGVtLCBpbnB1dFRleHQsIGVsZW1Ub0NoYW5nZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZVRvZG8gPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IHRvZG9MaXN0SXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGl0ZW0uaWQpO1xuICAgIGNvbnN0IHRvZG9EZXNjcmlwdGlvbiA9IHRvZG9MaXN0SXRlbS5maXJzdENoaWxkLmNoaWxkcmVuWzFdO1xuICAgIGlmIChpdGVtLnN0YXR1cyA9PT0gXCJmaW5pc2hlZFwiKSB7XG4gICAgICB0b2RvRGVzY3JpcHRpb24uY2xhc3NMaXN0LnJlbW92ZShcImZpbmlzaGVkLXRvZG9cIik7XG4gICAgICB0b2RvRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcInVuZmluaXNoZWQtdG9kb1wiKTtcbiAgICAgIGl0ZW0uc3RhdHVzID0gXCJ1bmZpbmlzaGVkXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvZG9EZXNjcmlwdGlvbi5jbGFzc0xpc3QucmVtb3ZlKFwidW5maW5pc2hlZC10b2RvXCIpO1xuICAgICAgdG9kb0Rlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJmaW5pc2hlZC10b2RvXCIpO1xuICAgICAgaXRlbS5zdGF0dXMgPSBcImZpbmlzaGVkXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZUJ1dHRvbiA9IChjYiwgaWNvbiwgY2xhc3NOYW1lKSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25zdCBpVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgaVRhZy5jbGFzc05hbWUgPSBpY29uO1xuICAgIGJ1dHRvbi5hcHBlbmQoaVRhZyk7XG4gICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNiKTtcbiAgICBidXR0b24uc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVTd2l0Y2hFbGVtID0gKGNiKSA9PiB7XG4gICAgY29uc3Qgc3dpdGNoRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBzd2l0Y2hFbGVtLmNsYXNzTGlzdC5hZGQoXCJzd2l0Y2hcIik7XG5cbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgIGNoZWNrYm94Lm9uY2xpY2sgPSBjYjtcblxuICAgIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHNsaWRlci5jbGFzc0xpc3QuYWRkKFwic2xpZGVyXCIpO1xuICAgIHNsaWRlci5jbGFzc0xpc3QuYWRkKFwicm91bmRcIik7XG5cbiAgICBzd2l0Y2hFbGVtLmFwcGVuZENoaWxkKGNoZWNrYm94KTtcbiAgICBzd2l0Y2hFbGVtLmFwcGVuZENoaWxkKHNsaWRlcik7XG4gICAgcmV0dXJuIHN3aXRjaEVsZW07XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlVGV4dEl0ZW0gPSAoaXRlbSwgc3dpdGNoRWxlbSkgPT4ge1xuICAgIGNvbnN0IHRvZG9EZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHRvZG9EZXNjcmlwdGlvbi5pbm5lclRleHQgPSBpdGVtLnRleHQ7XG4gICAgdG9kb0Rlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLXRleHRcIik7XG4gICAgaWYgKGl0ZW0uc3RhdHVzID09PSBcImZpbmlzaGVkXCIpIHtcbiAgICAgIHRvZG9EZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKFwiZmluaXNoZWQtdG9kb1wiKTtcbiAgICAgIHN3aXRjaEVsZW0uZmlyc3RDaGlsZC5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRvZG9EZXNjcmlwdGlvbjtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVJdGVtID0gKGxpc3QsIGl0ZW0pID0+IHtcbiAgICBjb25zdCB0b2RvTGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgdG9kb0xpc3RJdGVtLmlkID0gaXRlbS5pZDtcblxuICAgIGNvbnN0IGxpc3RJdGVtQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsaXN0SXRlbUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibGlzdC1pdGVtLXRleHRcIik7XG4gICAgY29uc3Qgc3dpdGNoRWxlbSA9IGNyZWF0ZVN3aXRjaEVsZW0oKCkgPT4gdG9nZ2xlVG9kbyhpdGVtKSk7XG4gICAgbGlzdEl0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoc3dpdGNoRWxlbSk7XG4gICAgbGlzdEl0ZW1Db250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlVGV4dEl0ZW0oaXRlbSwgc3dpdGNoRWxlbSkpO1xuXG4gICAgY29uc3QgaXRlbUFjdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBpdGVtQWN0aW9ucy5jbGFzc0xpc3QuYWRkKFwibGlzdC1pdGVtLWFjdGlvbnNcIik7XG5cbiAgICBjb25zdCByZW1vdmVCdXR0b24gPSBjcmVhdGVCdXR0b24oXG4gICAgICAoKSA9PiByZW1vdmVUb2RvKGxpc3QsIGl0ZW0pLFxuICAgICAgXCJmYSBmYS10cmFzaFwiLFxuICAgICAgXCJidXR0b25cIlxuICAgICk7XG4gICAgY29uc3QgZWRpdEJ1dHRvbiA9IGNyZWF0ZUJ1dHRvbihcbiAgICAgICgpID0+IGVkaXRUb2RvKGl0ZW0pLFxuICAgICAgXCJmYSBmYS1wZW5jaWxcIixcbiAgICAgIFwiZWRpdFwiXG4gICAgKTtcbiAgICBpdGVtQWN0aW9ucy5hcHBlbmRDaGlsZChyZW1vdmVCdXR0b24pO1xuICAgIGl0ZW1BY3Rpb25zLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuXG4gICAgdG9kb0xpc3RJdGVtLmFwcGVuZENoaWxkKGxpc3RJdGVtQ29udGFpbmVyKTtcbiAgICB0b2RvTGlzdEl0ZW0uYXBwZW5kQ2hpbGQoaXRlbUFjdGlvbnMpO1xuICAgIHJldHVybiB0b2RvTGlzdEl0ZW07XG4gIH07XG5cbiAgY29uc3QgZWRpdExpc3RlbmVySGFuZGxlciA9IChlKSA9PiB7XG4gICAgY29uc3QgZWRpdElucHV0RWxlbSA9IGUudGFyZ2V0O1xuICAgIGNvbnN0IGlkID0gTnVtYmVyKGVkaXRJbnB1dEVsZW0uaWQuc3BsaXQoXCItXCIpWzBdKTtcbiAgICBsZXQgdXBkYXRlZEl0ZW0gPSBsaXN0LmZpbmQoKGVsZSkgPT4ge1xuICAgICAgaWYgKGVsZS5pZCA9PT0gaWQpIHtcbiAgICAgICAgZWxlLnRleHQgPSBlZGl0SW5wdXRFbGVtLnZhbHVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBlZGl0VG9kbyh1cGRhdGVkSXRlbSk7XG4gIH07XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGRUb2RvXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSBhZGRUb2RvKCk7XG4gIH0pO1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9kb0xpc3RcIikuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIGVkaXRMaXN0ZW5lckhhbmRsZXIoZSk7XG4gIH0pO1xuICBsb2FkVG9Eb0xpc3QobGlzdCk7XG59KSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9