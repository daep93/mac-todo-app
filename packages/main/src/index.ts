import { join } from "node:path";
import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";

const isSingleInstance = app.requestSingleInstanceLock();

// if (!isDev) {
//   app.setLoginItemSettings({ openAtLogin: true });
// }

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

async function createWindow() {
  const browserWindow = new BrowserWindow({
    show: false,
    width: 1200,
    height: 768,
    webPreferences: {
      webviewTag: false,
      // Electron current directory will be at `dist/main`, we need to include
      // the preload script from this relative path: `../preload/index.cjs`.
      preload: join(__dirname, "../preload/index.cjs"),
    },
  });

  // If you install `show: true` then it can cause issues when trying to close the window.
  // Use `show: false` and listener events `ready-to-show` to fix these issues.
  // https://github.com/electron/electron/issues/25012
  browserWindow.on("ready-to-show", () => {
    browserWindow?.show();
  });
  //
  browserWindow.loadFile(join(__dirname, "../renderer/index.html"));
  return browserWindow;
}

app.on("second-instance", () => {
  createWindow().catch((err) =>
    console.error(
      "Error while trying to prevent second-instance Electron event:",
      err
    )
  );
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  createWindow().catch((err) =>
    console.error("Error while trying to handle activate Electron event:", err)
  );
});

app
  .whenReady()
  .then(createWindow)
  .catch((e) => console.error("Failed to create window:", e));
