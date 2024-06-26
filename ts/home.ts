import { handleGoogleSignIn, initAuth, logout, sendSignInLink } from "./auth";
import { createNewUser, isUsernameTaken } from "./db";
import {
  getEl,
  getTemplate,
  isValidName,
  isValidStr,
  mainAppEl,
  renderLoader,
  renderNewComp,
} from "./utils";

function renderCreator(
  uid: string,
  displayName: string | null,
  usernameSuggestion: string
) {
  const template = getTemplate("creator-template");
  const nameInput = template.querySelector("#name") as HTMLInputElement;
  const usernameInput = template.querySelector("#username") as HTMLInputElement;
  if (displayName) {
    nameInput.value = displayName;
  }
  usernameInput.value = usernameSuggestion;
  const usernamePattern = /^[a-z0-9-]+$/;
  (template.querySelector("form") as HTMLFormElement).addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      const name = nameInput.value.trim();
      if (!isValidName(name)) {
        nameInput.focus();
        return false;
      }
      const username = usernameInput.value.trim();
      if (
        !isValidStr(username) ||
        !usernamePattern.test(username) ||
        username.length > 80
      ) {
        usernameInput.focus();
        return false;
      }
      const submitBtn = getEl("create-btn") as HTMLButtonElement;
      submitBtn.style.display = "none";
      const loader = getEl("loading") as HTMLDivElement;
      loader.className = "show";
      isUsernameTaken(username)
        .then((isTaken) => {
          if (isTaken) {
            getEl("username-taken")!.textContent = username;
            getEl("try-again")!.className = "show";
            loader.className = "hide";
            submitBtn.style.display = "block";
            return;
          }
          renderLoader();
          createNewUser(uid, username, name).catch(console.warn);
        })
        .catch(console.warn);
      return false;
    }
  );
  renderNewComp(template);
}

const greetings = [
  "Hello",
  "Hi",
  "Hey",
  "Hi there",
  "What's up",
  "Hey there",
  "What's good",
  "Yo",
];
function updateGreetingIndex(nextIndex: number) {
  const newIndex = nextIndex >= greetings.length ? 0 : nextIndex;
  window.localStorage.setItem("greetingIndex", `${newIndex}`);
}

function renderAccountDetails(name: string, username: string) {
  const template = getTemplate("account-template");
  const greetingIndex = Number(window.localStorage.getItem("greetingIndex"));
  template.querySelector("#hi")!.textContent = `${greetings[greetingIndex]},`;
  updateGreetingIndex(greetingIndex + 1);
  template.querySelector("#name")!.textContent = name;
  (template.querySelector("#profile-link") as HTMLAnchorElement).href =
    `/${username}`;
  (template.querySelector("#sign-out") as HTMLButtonElement).addEventListener(
    "click",
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    logout
  );
  const shareBtn = template.querySelector("#share") as HTMLButtonElement;
  const shareData = {
    title: `All the favs of * ${name} *`,
    text: "Check out all my favs!",
    url: `https://all-my-favs.web.app/${username}`,
  };
  if (navigator && navigator.canShare && navigator.canShare(shareData)) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    shareBtn.addEventListener("click", () => navigator.share(shareData));
  } else {
    shareBtn.style.display = "none";
  }
  renderNewComp(template);
}

function renderEmailNotice() {
  const template = getTemplate("email-sent");
  renderNewComp(template);
}

function isEmbeddedBrowser() {
  const touchEvents = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const windowSizeCheck = window.innerWidth < 600 || window.innerHeight < 600;
  const orientate = "orientation" in window || "onorientationchange" in window;
  const ua = window.navigator.userAgent;
  const isMobileDevice = /Mobi/i.test(ua);
  const rules = ["WebView", "(iPhone|iPod|iPad)(?!.*Safari/)", "Android.*(wv)"];
  const inAppRegex = new RegExp(`(${rules.join("|")})`, "ig");
  const isInApp = Boolean(ua.match(inAppRegex));
  const embeddedBrowsers = [
    /\bFB[\w_]+\/(Messenger|MESSENGER)/,
    /\bFB[\w_]+\//,
    /\bTwitter/i,
    /\bLine\//i,
    /\bMicroMessenger\//i,
    /\bPuffin/i,
    /\bMiuiBrowser\//i,
    /\bInstagram/i,
  ];
  const isEmbedded = embeddedBrowsers.some((regex) => regex.test(ua));
  return (
    touchEvents &&
    windowSizeCheck &&
    orientate &&
    isMobileDevice &&
    isInApp &&
    isEmbedded
  );
}

function guessAppBrowser() {
  const ua = window.navigator.userAgent;
  const browsers = [
    { name: "Messenger", regex: /\bFB[\w_]+\/(Messenger|MESSENGER)/ },
    { name: "Facebook", regex: /\bFB[\w_]+\// },
    { name: "Twitter", regex: /\bTwitter/i },
    { name: "Line", regex: /\bLine\//i },
    { name: "WeChat", regex: /\bMicroMessenger\//i },
    { name: "Puffin", regex: /\bPuffin/i },
    { name: "Miui", regex: /\bMiuiBrowser\//i },
    { name: "Instagram", regex: /\bInstagram/i },
  ];
  const inAppBrowser = browsers.find(({ regex }) => regex.test(ua));
  return inAppBrowser ? inAppBrowser.name : "Messenger";
}

function renderGoogleSignIn() {
  (getEl("google-sign-in") as HTMLDivElement).innerHTML =
    `<div id="g_id_onload" data-client_id="681035335387-9o307lchkifkasf9jvsf91aug6htb23h.apps.googleusercontent.com" data-context="signin" data-ux_mode="popup" data-login_uri="https://all-my-favs.web.app/__/auth/handler" data-callback="handleGoogleCredentialResponse" data-auto_select="true" data-itp_support="true"></div>
    <div class="g_id_signin" data-type="standard" data-shape="pill" data-theme="outline" data-text="continue_with" data-size="large" data-logo_alignment="left"></div>`;
  // <script src="https://accounts.google.com/gsi/client" async></script>
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  document.body.appendChild(script);
}

function renderSignIn() {
  if (isEmbeddedBrowser()) {
    const temp = getTemplate("embedded-in-app");
    const appGuess = guessAppBrowser();
    (temp.querySelector("#app-guess") as HTMLSpanElement).innerText = appGuess;
    renderNewComp(temp);
    return;
  }
  const template = getTemplate("auth-template");
  const emailPattern =
    /^[\p{L}\p{N}]((?!.*?\.\.)(?!.*?--)(?!.*-\.)(?!.*\.-)[\p{L}\p{N}_.-]{0,63}(?<![.-]))@[\p{L}\p{N}]((?!.*?--)[\p{L}\p{N}-]{0,63}(?<!-))\.[a-zA-Z]{2,64}$/u;
  template.querySelector("form")!.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = getEl("email") as HTMLInputElement;
    const email = emailInput.value.trim();
    if (isValidStr(email) && emailPattern.test(email)) {
      sendSignInLink(email)
        .then((ok) => {
          if (ok) {
            renderEmailNotice();
            return;
          } else {
            mainAppEl.innerHTML = `
          <section class="sign-in">
            <h2>Bummer</h2>
            <p>Unfortunately we were unable to send you an email. Refresh and try again.</p>
          </section>
          `;
            return;
          }
        })
        .catch(console.warn);
    } else {
      emailInput.focus();
    }
    return false;
  });
  renderNewComp(template);
  renderGoogleSignIn();
}

function getUsernameSuggestion(name: string | null, email: string) {
  return name ? name.toLowerCase().replace(/ /g, "") : email.split("@")[0];
}

initAuth((user) => {
  if (user) {
    const { uid, displayName, email, id, name } = user;
    if (id && name) {
      renderAccountDetails(name, id);
      return;
    } else {
      const suggestion = getUsernameSuggestion(displayName, email as string);
      renderCreator(uid, displayName, suggestion);
      return;
    }
  } else {
    renderSignIn();
    return;
  }
});

// Google Sign In
function handleCredentialResponse(response: { credential: string }) {
  renderLoader();
  // Encoded JWT ID token: response.credential
  const idToken = response.credential;
  handleGoogleSignIn(idToken);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
(window as any).handleGoogleCredentialResponse = handleCredentialResponse;
