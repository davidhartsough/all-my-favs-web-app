import { authCallback } from "./auth";
import {
  createNewList,
  deleteList,
  editName,
  getUsersLists,
  reorderLists,
  updateList,
} from "./db";
import {
  getEl,
  getTemplate,
  isValidName,
  loaderHTML,
  mainAppEl,
} from "./utils";
import Sortable from "sortablejs";
import type { List } from "./types";

const scrollOptions: ScrollIntoViewOptions = {
  block: "center",
  behavior: "smooth",
};

let totalCount = 0;

let timer: string | number | NodeJS.Timeout | undefined;
let needToSave = false;

let safety = false;
function beforeUnloadHandler(event: Event) {
  event.preventDefault();
}
function turnOnSafety() {
  if (!safety) {
    window.addEventListener("beforeunload", beforeUnloadHandler);
    safety = true;
  }
}
function turnOffSafety() {
  window.removeEventListener("beforeunload", beforeUnloadHandler);
  safety = false;
}

function reorderSort() {
  const ids = Array.from(mainAppEl.children).map(({ id }) => id);
  turnOnSafety();
  reorderLists(ids).then(turnOffSafety);
  needToSave = false;
}

function pauseSort() {
  clearTimeout(timer);
}

function setTimer() {
  clearTimeout(timer);
  timer = setTimeout(reorderSort, 999);
}

function handleDragEnd() {
  if (needToSave) {
    setTimer();
  }
}

function saveNewSort() {
  needToSave = true;
  setTimer();
}

function addList({ id, title, items, numbered }: List) {
  const temp = getTemplate("list-template");
  const containerDiv = temp.querySelector(".list") as HTMLDivElement;
  containerDiv.id = id;
  const section = temp.querySelector("section") as HTMLDivElement;
  const listTitleH3 = temp.querySelector("h3.list-title") as HTMLHeadingElement;
  listTitleH3.innerText = title;
  const listDiv = temp.querySelector(".list-items") as HTMLDivElement;
  const o_u = numbered ? "o" : "u";
  listDiv.innerHTML = `<${o_u}l><li>${items.join("</li><li>")}</li></${o_u}l>`;
  (temp.querySelector("input.hidden-id-input") as HTMLInputElement).value = id;
  const listTitleInput = temp.querySelector(
    "input#list-title"
  ) as HTMLInputElement;
  listTitleInput.value = title;
  const listTitleInputId = `list-title-${id}`;
  listTitleInput.id = listTitleInputId;
  (temp.querySelector("label.list-title-label") as HTMLLabelElement).htmlFor =
    listTitleInputId;
  const numberedCheckbox = temp.querySelector(
    "input#numbered"
  ) as HTMLInputElement;
  if (numbered) {
    numberedCheckbox.checked = true;
  }
  const numberedCheckboxId = `numbered-${id}`;
  numberedCheckbox.id = numberedCheckboxId;
  (temp.querySelector("label.checkbox-label") as HTMLLabelElement).htmlFor =
    numberedCheckboxId;
  const liInputs = temp.querySelector(".list-item-inputs") as HTMLDivElement;
  items.forEach((item) => {
    const nextItem = getTemplate("list-item-template");
    const newInput = nextItem.querySelector("input") as HTMLInputElement;
    newInput.value = item;
    const removeBtn = nextItem.querySelector(".remove") as HTMLButtonElement;
    removeBtn.addEventListener("click", () => {
      if (liInputs.childElementCount > 2 && newInput.value !== "") {
        newInput.parentElement?.remove();
      } else {
        newInput.value = "";
      }
    });
    liInputs.appendChild(nextItem);
  });
  function watchInput(ev: Event) {
    addNewItem();
    ev.target?.removeEventListener("input", watchInput);
  }
  function addNewItem() {
    const newItem = getTemplate("list-item-template");
    const newInput = newItem.querySelector("input") as HTMLInputElement;
    newInput.addEventListener("input", watchInput);
    const removeBtn = newItem.querySelector(".remove") as HTMLButtonElement;
    removeBtn.addEventListener("click", () => {
      if (liInputs.childElementCount > 2 && newInput.value !== "") {
        newInput.parentElement?.remove();
      } else {
        newInput.value = "";
      }
    });
    liInputs.appendChild(newItem);
  }
  addNewItem();
  Sortable.create(liInputs, {
    animation: 150,
    draggable: ".list-item",
    handle: ".move",
    direction: "vertical",
  });
  const editForm = temp.querySelector("form") as HTMLFormElement;
  (temp.querySelector(".action-btn.edit") as HTMLDivElement).addEventListener(
    "click",
    () => {
      section.classList.remove("show");
      section.classList.add("hide");
      editForm.classList.remove("hide");
      editForm.classList.add("show");
      containerDiv.scrollIntoView(scrollOptions);
    }
  );
  (temp.querySelector(".close-btn") as HTMLDivElement).addEventListener(
    "click",
    () => {
      editForm.classList.remove("show");
      editForm.classList.add("hide");
      section.classList.remove("hide");
      section.classList.add("show");
      containerDiv.scrollIntoView(scrollOptions);
    }
  );
  const deleteModal = temp.querySelector(".delete-modal") as HTMLDivElement;
  const confirmBox = deleteModal.querySelector(".confirm") as HTMLDivElement;
  (
    temp.querySelector("button.open-delete-modal") as HTMLButtonElement
  ).addEventListener("click", () => {
    deleteModal.classList.remove("hide");
    deleteModal.classList.add("show");
    confirmBox.scrollIntoView(scrollOptions);
  });
  (
    deleteModal.querySelector("button.cancel") as HTMLButtonElement
  ).addEventListener("click", () => {
    deleteModal.classList.remove("show");
    deleteModal.classList.add("hide");
  });
  const formOverlay = temp.querySelector(".form-overlay") as HTMLDivElement;
  (
    deleteModal.querySelector("button.confirm-delete") as HTMLButtonElement
  ).addEventListener("click", () => {
    deleteModal.classList.remove("show");
    deleteModal.classList.add("hide");
    formOverlay.classList.remove("hide");
    formOverlay.classList.add("show");
    formOverlay.innerHTML = loaderHTML;
    turnOnSafety();
    deleteList(id).then(() => {
      turnOffSafety();
      const thisList = document.getElementById(id)!;
      mainAppEl.removeChild(thisList);
      totalCount -= 1;
      saveNewSort();
    });
  });
  editForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.target as HTMLFormElement);
    const title = data.get("title")!.toString().trim();
    const numbered = data.get("numbered") === "on";
    const items = data
      .getAll("item")
      .map((i) => i.toString().trim())
      .filter((i) => i.length > 0);
    if (title.length < 1 || items.length < 1) {
      deleteModal.classList.remove("hide");
      deleteModal.classList.add("show");
      confirmBox.scrollIntoView(scrollOptions);
      return false;
    }
    formOverlay.classList.remove("hide");
    formOverlay.classList.add("show");
    formOverlay.innerHTML = loaderHTML;
    turnOnSafety();
    updateList(id, title, items, numbered).then(() => {
      turnOffSafety();
      listTitleH3.innerText = title;
      const o_u = numbered ? "o" : "u";
      listDiv.innerHTML = `<${o_u}l><li>${items.join("</li><li>")}</li></${o_u}l>`;
      editForm.classList.remove("show");
      editForm.classList.add("hide");
      section.classList.remove("hide");
      section.classList.add("show");
      formOverlay.classList.remove("show");
      formOverlay.classList.add("hide");
      formOverlay.innerHTML = "";
      containerDiv.scrollIntoView();
    });
    return false;
  });
  mainAppEl.appendChild(temp);
}
function renderLists(lists: List[]) {
  lists
    .slice()
    .sort((a, b) => a.order - b.order)
    .forEach(addList);
  Sortable.create(mainAppEl, {
    animation: 150,
    draggable: ".list",
    handle: ".list-move",
    direction: "vertical",
    onUpdate: saveNewSort,
    onStart: pauseSort,
    onEnd: handleDragEnd,
  });
}

const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function watchInput(ev: Event) {
  addNewItem();
  ev.target?.removeEventListener("input", watchInput);
}

const liInputsDiv = getEl("list-item-inputs") as HTMLDivElement;
function addNewItem() {
  const newItem = getTemplate("list-item-template");
  const newInput = newItem.querySelector("input") as HTMLInputElement;
  newInput.addEventListener("input", watchInput);
  const removeBtn = newItem.querySelector(".remove") as HTMLButtonElement;
  removeBtn.addEventListener("click", () => {
    if (liInputsDiv.childElementCount > 2 && newInput.value !== "") {
      newInput.parentElement?.remove();
    } else {
      newInput.value = "";
    }
  });
  liInputsDiv.appendChild(newItem);
}

async function renderEditor(uid: string, username: string, name: string) {
  const nameFormLoader = getEl("loading") as HTMLDivElement;
  const nameFormConfirmMsg = getEl("saved") as HTMLDivElement;
  const nameInput = getEl("name") as HTMLInputElement;
  const saveNameBtn = getEl("save-name-btn") as HTMLButtonElement;
  nameInput.value = name;
  const checkName = () => {
    saveNameBtn.disabled =
      nameInput.value === name || !isValidName(nameInput.value);
  };
  nameInput.addEventListener("change", checkName);
  nameInput.addEventListener("input", checkName);
  (getEl("name-form") as HTMLFormElement).addEventListener("submit", (ev) => {
    ev.preventDefault();
    const newName = nameInput.value.trim();
    if (newName !== name && isValidName(nameInput.value)) {
      nameFormLoader.className = "show";
      nameInput.readOnly = true;
      saveNameBtn.classList.add("hide");
      turnOnSafety();
      editName(uid, username, newName).then(() => {
        turnOffSafety();
        nameFormLoader.className = "hide";
        nameFormConfirmMsg.className = "show";
      });
    }
    return false;
  });
  const lists = await getUsersLists(username);
  const hasLists = lists.length > 0;
  mainAppEl.innerHTML = "";
  if (hasLists) {
    totalCount = lists.length;
    renderLists(lists);
  }
  const examples = [
    "musicians",
    "bands",
    "songs, albums",
    "TED Talks, speakers",
    "YouTube channels, YouTube videos",
    "roller coaster rides",
    "teams",
    "cars",
    "board games",
    "card games",
    "video games",
    "hobbies",
    "cities",
    "conversation topics",
    "values",
    "basketball players",
    "guitarists",
    "comedians",
    "outdoor rock climbing spots",
    "karaoke go-to's",
    "parks",
    "TV shows",
    "disc golf courses",
    "apps",
    "shoes",
    "drinks",
    "meals",
    "cafes",
    "animals",
    "places to camp",
    "hot springs",
  ];
  getEl("extra-examples")!.innerText = shuffle(examples).join(", ");
  getEl("footer")!.className = "";
  const newListForm = getEl("new-list-form") as HTMLFormElement;
  const newBtnContainer = getEl("new-btn-container") as HTMLDivElement;
  const newBtn = getEl("new-btn") as HTMLButtonElement;
  newBtn.addEventListener("click", () => {
    newListForm.className = "show";
    newBtnContainer.className = "hide";
    newListForm.scrollIntoView(scrollOptions);
  });
  const formHeading = getEl("form-title")!;
  if (!hasLists) {
    newListForm.className = "show";
    newBtnContainer.className = "hide";
    (getEl("examples") as HTMLDetailsElement).open = true;
    formHeading.innerText = "Make your first list!";
  }
  const firstInputItem = getEl("first-item") as HTMLInputElement;
  firstInputItem.addEventListener("input", watchInput);
  Sortable.create(liInputsDiv, {
    animation: 150,
    draggable: ".list-item",
    handle: ".move",
    direction: "vertical",
  });
  const formOverlay = getEl("form-overlay") as HTMLDivElement;
  newListForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.target as HTMLFormElement);
    const title = data.get("title")!.toString();
    const numbered = data.get("numbered") === "on";
    const items = data
      .getAll("item")
      .map((i) => i.toString().trim())
      .filter((i) => i.length > 0);
    const order = totalCount + 1;
    formOverlay.className = "show";
    formOverlay.innerHTML = loaderHTML;
    turnOnSafety();
    createNewList(uid, username, title, items, numbered, order).then(
      (newList) => {
        turnOffSafety();
        addList(newList);
        totalCount += 1;
        newListForm.className = "hide";
        newBtnContainer.className = "show";
        formHeading.innerText = "Create a new list";
        (getEl("new-list-title") as HTMLInputElement).value = "";
        liInputsDiv.innerHTML = `<input type="text" name="item" id="first-item" maxlength="80" placeholder="Your first item on the list" autocomplete="off" required />`;
        const firstInputItem = getEl("first-item") as HTMLInputElement;
        firstInputItem.addEventListener("input", watchInput);
        formOverlay.className = "hide";
        formOverlay.innerHTML = "";
      }
    );
    return false;
  });
}

authCallback((user) => {
  if (user) {
    const { uid, id, name } = user;
    if (id && name) {
      renderEditor(uid, id, name);
      return;
    } else {
      window.location.href = window.location.origin;
      return;
    }
  } else {
    window.location.href = window.location.origin;
    return;
  }
});
