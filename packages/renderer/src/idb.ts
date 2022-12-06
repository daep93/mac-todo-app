import { openDB } from "idb";
const DB_NAME = "todoDB";
const STORE_NAME = "todo";
const dbPromise = await openDB(DB_NAME, 1, {
  upgrade(db: any) {
    db.createObjectStore(STORE_NAME, { autoIncrement: true });
  },
});
export async function getAll() {
  return (await dbPromise).getAll(STORE_NAME);
}
export async function getAllKeys() {
  return (await dbPromise).getAllKeys(STORE_NAME);
}
export async function add(value: any) {
  return (await dbPromise).add(STORE_NAME, value);
}
export async function set(key: string, value: any) {
  return (await dbPromise).put(STORE_NAME, key, value);
}
export async function del(key: string) {
  return (await dbPromise).delete(STORE_NAME, key);
}
