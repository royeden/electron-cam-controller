const {
  locales,
} = require("../i18n.config");

module.exports = (app, mainWindow, shell, i18n, isDev) => [
  {
    label: "&OSC Cam",
    submenu: [
      {
        label: `&${i18n.t("menu.app.quit")}`,
        accelerator: "Ctrl+Q",
        click: function () {
          app.quit();
        },
      },
    ],
  },
  {
    label: `&${i18n.t("menu.view.title")}`,
    submenu: [
      {
        label: `&${i18n.t("menu.view.reload")}`,
        accelerator: "Ctrl+R",
        click: function (item, focusedWindow) {
          focusedWindow.reload();
        },
      },
      {
        label: `&${i18n.t("menu.view.fullscreen")}`,
        accelerator: "Ctrl+Shift+F",
        click: function (item, focusedWindow) {
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        },
      },
      {
        label: `&${i18n.t("menu.view.minimize")}`,
        accelerator: "Ctrl+M",
        role: "minimize",
      },
    ],
  },
  {
    label: `&${i18n.t("menu.help.title")}`,
    submenu: [
      {
        label: `&${i18n.t("menu.help.about")}`,
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            shell.openExternal("https://github.com/royeden/electron-osc-cam");
          }
        },
      },
      {
        label: `&${i18n.t("menu.help.examples")}`,
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
    label: `&${i18n.t("menu.language.title")}`,
    submenu: locales.map((locale) => ({
      label: `&${i18n.t(`menu.language.${locale}`)}`,
      type: "radio",
      checked: i18n.language === locale,
      click: () => {
        i18n.changeLanguage(locale);
      },
    })),
  },
  isDev && {
    label: `&${i18n.t("menu.development.inspector")}`,
    accelerator: "Ctrl+Shift+I",
    click: (item, focusedWindow) => {
      focusedWindow.webContents.toggleDevTools();
    },
  },
].filter(Boolean);
