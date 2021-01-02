const { locales } = require("../i18n.config");

module.exports = (app, mainWindow, shell, i18n, isDev) =>
  [
    {
      label: "Electron OSC Cam",
      submenu: [
        {
          label: i18n.t("menu.app.about"),
          role: "about",
        },
        {
          type: "separator",
        },
        {
          label: i18n.t("menu.app.help"),
          accelerator: "Command+H",
          role: "hide",
        },
        {
          label: i18n.t("menu.app.quit"),
          accelerator: "Command+Q",
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: i18n.t("menu.view.title"),
      submenu: [
        {
          label: i18n.t("menu.view.reload"),
          accelerator: "Command+R",
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          },
        },
        {
          label: i18n.t("menu.view.fullscreen"),
          accelerator: "Ctrl+Command+F",
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          },
        },
        {
          label: i18n.t("menu.view.minimize"),
          accelerator: "Command+M",
          role: "minimize",
        },
      ],
    },
    {
      label: i18n.t("menu.help.title"),
      submenu: [
        {
          label: i18n.t("menu.help.about"),
          click: function (item, focusedWindow) {
            if (focusedWindow) {
              shell.openExternal("https://github.com/royeden/electron-osc-cam");
            }
          },
        },
        {
          label: i18n.t("menu.help.examples"),
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
    isDev && {
      label: i18n.t("menu.development.inspector"),
      accelerator: "Alt+Command+I",
      click: (item, focusedWindow) => {
        focusedWindow.webContents.toggleDevTools();
      },
    },
    {
      label: i18n.t("menu.language.title"),
      submenu: locales.map((locale) => ({
        label: i18n.t(`menu.language.${locale}`),
        type: "radio",
        checked: i18n.language === locale,
        click: () => {
          i18n.changeLanguage(locale);
        },
      })),
    },
  ].filter(Boolean);
