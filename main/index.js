// Native
const { join } = require("path");
const { format } = require("url");
const OSC = require("osc-js");
const rosetta = require("rosetta");

const menuTranslations = require("./i18n/menu");
const { defaultLocale, locales } = require("./i18n/config");
const i18n = rosetta(menuTranslations);
const menuFactoryService = require("./services/menuFactory");

// Packages
const { BrowserWindow, app, ipcMain, shell } = require("electron");
const isDev = require("electron-is-dev");
const prepareNext = require("electron-next");

// EVENTS
const OSC_EVENTS = require("./events/osc");
const I18N_EVENTS = require("./events/i18n");

const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
} = require("electron-devtools-installer");

// Prepare the renderer once the app is ready
app.on("ready", async () => {
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

  const defaultLanguage =
    locales.find((locale) => app.getLocale().includes(locale)) || defaultLocale;
  i18n.locale(defaultLanguage);

  const changeLanguage = (language = defaultLanguage) => {
    if (language !== i18n.locale()) {
      i18n.locale(language);
      menuFactoryService.buildMenu(
        app,
        mainWindow,
        shell,
        i18n,
        changeLanguage,
        isDev
      );
      mainWindow.webContents.send(I18N_EVENTS.changeLanguage, language);
    }
  };

  menuFactoryService.buildMenu(
    app,
    mainWindow,
    shell,
    i18n,
    changeLanguage,
    isDev
  );

  ipcMain.on(I18N_EVENTS.getInitialLanguage, (event) => {
    event.returnValue = i18n.locale();
  });
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
  if (typeof port === "number" && port > 1023 && port < 65536) {
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
