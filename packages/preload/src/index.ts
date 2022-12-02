import { contextBridge, shell } from "electron";

// Add a `window.api` object inside the renderer process with the `openUrl`
// function.
export type ContextBridgeApi = {
  // Declare a `readFile` function that will return a promise. This promise
  // will contain the data of the file read from the main process.
  openUrl: (url: string) => Promise<string>;
  hello: string;
};
contextBridge.exposeInMainWorld("api", {
  // Open an URL into the default web-browser.
  openUrl: (url: string) => shell.openExternal(url),
  hello: "world",
});
