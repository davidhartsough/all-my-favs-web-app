import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAIWGet-1MsYEFUS04zuyKe2yQedb5EeQw",
  authDomain: "all-my-favs.web.app",
  projectId: "all-my-favs",
  storageBucket: "all-my-favs.appspot.com",
  messagingSenderId: "681035335387",
  appId: "1:681035335387:web:b5e8b4c606f38816486efe",
  measurementId: "G-1JZ3EFMXT1",
};

const app = initializeApp(firebaseConfig);

export default app;
