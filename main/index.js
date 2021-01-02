// Native
const { join } = require("path");
const { format } = require("url");
const OSC = require("osc-js");

// Packages
const { BrowserWindow, app, ipcMain, shell } = require("electron");
const isDev = require("electron-is-dev");
const prepareNext = require("electron-next");

// OSC
const OSC_EVENTS = require("./events/osc");

const i18n = require("./i18n");
const menuFactoryService = require("./services/menuFactory");

const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
} = require("electron-devtools-installer");

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  console.log("locale", app.getLocale());
  mainWindow = new BrowserWindow({
    width: 960,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, "preload.js"),
      devTools: isDev,
      backgroundColor: "#000",
    },
  });

  mainWindow.setMenu(null);

  await prepareNext("./renderer");

  const url = isDev
    ? "http://localhost:8000"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(url);

  if (isDev) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    // Install extensions
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
  }

  i18n.on("loaded", (loaded) => {
    i18n.changeLanguage("en");
    i18n.off("loaded");
  });

  i18n.on("languageChanged", (lng) => {
    menuFactoryService.buildMenu(app, mainWindow, shell, i18n, isDev);
    mainWindow.webContents.send("language-changed", {
      language: lng,
      namespace: "translation",
      resource: i18n.getResourceBundle(lng, "translation"),
    });
  });

  ipcMain.on("get-initial-language", (event, arg) => {
    i18n.changeLanguage("en");
  });

  if (i18n.isInitialized) {
    i18n.changeLanguage("en");
    i18n.off("loaded");
  }
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event, message) => {
  event.sender.send("message", message);
});

let client;

ipcMain.on(OSC_EVENTS.send, (event, route, ...messages) => {
  if (client) {
    try {
      client.send(new OSC.Message(route, ...messages));
      event.reply(OSC_EVENTS.sent, `${route}: ${messages}`);
    } catch (error) {
      console.error(error);
    }
  }
});

ipcMain.on(OSC_EVENTS.create, (event, port = 3333) => {
  if (typeof port === "number" && port > 999 && port < 10000) {
    if (client) {
      client.close();
      delete client;
    }
    client = new OSC({
      plugin: new OSC.DatagramPlugin({
        // THIS IS FOR SERVER LOGIC, IT COULD BE USED TO CHANGE VALUES :D
        // open: { host: "127.0.0.1", port },
        send: { host: "127.0.0.1", port },
      }),
    });
    client.open();
    event.reply(OSC_EVENTS.created, client);
  }
});
