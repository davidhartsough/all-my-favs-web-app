import { authCallback } from "./auth";
import { createNewList, editName, getUsersLists } from "./db";
import {
  getEl,
  getTemplate,
  isValidName,
  loaderHTML,
  mainAppEl,
} from "./utils";
import Sortable from "sortablejs";
import type { List } from "./types";

function addList({ id, title, items, numbered }: List) {
  const listDiv = document.createElement("div");
  const o_u = numbered ? "o" : "u";
  listDiv.innerHTML = `
    <section class="show">
      <h3 tabindex="1">${title}</h3>
      <${o_u}l>
        <li>${items.join("</li> <li>")}</li>
      </${o_u}l>
    </section>
    <form class="hide">
      <input type="hidden" value="${id}" />
    </form>
  `;
  mainAppEl.appendChild(listDiv);
}
function renderLists(lists: List[]) {
  lists
    .slice()
    .sort((a, b) => a.order - b.order)
    .forEach(addList);
}

let totalCount = 0;

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
      editName(uid, username, newName).then(() => {
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
    // save/create new list
    createNewList(uid, username, title, items, numbered, order).then(
      (newList) => {
        addList(newList);
        totalCount += 1;
        // reset form
        newListForm.className = "hide";
        newBtnContainer.className = "show";
        formHeading.innerText = "Create a new list";
        (getEl("new-list-title") as HTMLInputElement).value = "";
        firstInputItem.value = "";
        liInputsDiv.innerHTML = `<input type="text" name="item" id="first-item" maxlength="80" placeholder="Your first item on the list" autocomplete="off" required />`;
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
