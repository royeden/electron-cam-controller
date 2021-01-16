const { locales } = require("../i18n/config");

module.exports = (app, mainWindow, shell, i18n, changeLanguage, isDev) => [
  {
    label: "&OSC Cam",
    submenu: [
      {
        label: `&${i18n.t("app.quit")}`,
        accelerator: "Ctrl+Q",
        click: function () {
          app.quit();
        },
      },
    ],
  },
  {
    label: `&${i18n.t("view.title")}`,
    submenu: [
      {
        label: `&${i18n.t("view.reload")}`,
        accelerator: "Ctrl+R",
        click: function (item, focusedWindow) {
          focusedWindow.reload();
        },
      },
      {
        label: `&${i18n.t("view.fullscreen")}`,
        accelerator: "Ctrl+Shift+F",
        click: function (item, focusedWindow) {
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        },
      },
      {
        label: `&${i18n.t("view.minimize")}`,
        accelerator: "Ctrl+M",
        role: "minimize",
      },
    ],
  },
  {
    label: `&${i18n.t("help.title")}`,
    submenu: [
      {
        label: `&${i18n.t("help.about")}`,
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            shell.openExternal("https://github.com/royeden/electron-osc-cam");
          }
        },
      },
      {
        label: `&${i18n.t("help.examples")}`,
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            shell.openExternal(
              "https://github.com/royeden/electron-osc-cam/tree/main/examples"
            );
          }
        },
      },
    ],
  },
  {
    label: `&${i18n.t("language.title")}`,
    submenu: locales.map((locale) => ({
      label: `&${i18n.t(`language.${locale}`)}`,
      type: "radio",
      checked: i18n.locale() === locale,
      click: () => {
        changeLanguage(locale);
      },
    })),
  },
  isDev && {
    label: `&${i18n.t("development.inspector")}`,
    accelerator: "Ctrl+Shift+I",
    click: (item, focusedWindow) => {
      focusedWindow.webContents.toggleDevTools();
    },
  },
].filter(Boolean);
