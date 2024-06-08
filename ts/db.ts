import {
  getFirestore,
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  setDoc,
  addDoc,
} from "firebase/firestore/lite";
import app from "./fire";
import { isValidStr } from "./utils";
import type { List } from "./types";

const db = getFirestore(app);

function storeUserData(uid: string, username: string, name: string) {
  window.localStorage.setItem(
    uid,
    JSON.stringify({
      id: username,
      name,
    })
  );
}

function getStoredUserData(uid: string) {
  const storedData = window.localStorage.getItem(uid);
  if (storedData) {
    const storedUserData = JSON.parse(storedData);
    const { id, name } = storedUserData;
    if (isValidStr(id) && isValidStr(name)) {
      return { uid, name, id };
    } else {
      window.localStorage.removeItem(uid);
    }
  }
  return null;
}

async function fetchUserDoc(uid: string) {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const results = await getDocs(q);
  if (results.empty) return null;
  const doc = results.docs[0];
  const name = doc.data().name as string;
  const { id } = doc;
  return { uid, id, name };
}

export async function getUserData(uid: string) {
  const storedUserData = getStoredUserData(uid);
  if (storedUserData) return storedUserData;
  const userDoc = await fetchUserDoc(uid);
  if (userDoc) {
    const { uid, id, name } = userDoc;
    storeUserData(uid, id, name);
    return userDoc;
  }
  return null;
}

export async function createNewUser(
  uid: string,
  username: string,
  name: string
) {
  await setDoc(doc(db, "users", username), { uid, name });
  storeUserData(uid, username, name);
  let url = `${window.location.href}`;
  if (!url.endsWith("/")) {
    url += "/";
  }
  window.location.href = `${url}edit`;
  return;
}

export async function isUsernameTaken(username: string) {
  const userDoc = await getDoc(doc(db, "users", username));
  return userDoc.exists();
}

export async function editName(uid: string, username: string, name: string) {
  await setDoc(doc(db, "users", username), { name }, { merge: true });
  storeUserData(uid, username, name);
  return true;
}

export async function getUsersLists(username: string): Promise<List[]> {
  const q = query(collection(db, "lists"), where("username", "==", username));
  const results = await getDocs(q);
  if (results.empty) return [];
  return results.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as List);
}

export async function createNewList(
  uid: string,
  username: string,
  title: string,
  items: string[],
  numbered: boolean,
  order: number
) {
  const newList = {
    uid,
    username,
    title,
    items,
    numbered,
    order,
  };
  const docRef = await addDoc(collection(db, "lists"), newList);
  return { id: docRef.id, ...newList };
}

// https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en&authuser=0
