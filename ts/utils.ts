export const getEl = (id: string) => document.getElementById(id);
export const mainAppEl = getEl("app") as HTMLDivElement;

export const loaderHTML = `<div id="loader"> <img src="/icon.svg" alt="All My Favs logo icon" /> <div class="spinner"></div> </div>`;

export function renderLoader() {
  mainAppEl.innerHTML = loaderHTML;
}

export const isValidStr = (str: unknown): str is string =>
  !!str && typeof str === "string" && str.length > 1;

export const namePattern = /^[\p{L}\p{N}\p{P} ]+$/u;

export function isValidName(name: string) {
  return isValidStr(name) && namePattern.test(name) && name.length <= 80;
}

export function getTemplate(id: string) {
  const template = getEl(id) as HTMLTemplateElement;
  const clone = template.content.cloneNode(true) as DocumentFragment;
  return clone;
}

export function renderNewComp(comp: DocumentFragment) {
  mainAppEl.innerHTML = "";
  mainAppEl.appendChild(comp);
}
