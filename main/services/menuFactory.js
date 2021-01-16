const Menu = require("electron").Menu;
const darwinTemplate = require("../menus/darwinMenu");
const otherTemplate = require("../menus/otherMenu");

const menu = null;
const platform = process.platform;

function MenuFactoryService(menu) {
  this.menu = menu;
  this.buildMenu = buildMenu;
}

function buildMenu(app, mainWindow, shell, i18n, changeLanguage, isDev) {
  if (platform === "darwin") {
    this.menu = Menu.buildFromTemplate(
      darwinTemplate(app, mainWindow, shell, i18n, changeLanguage, isDev)
    );
    Menu.setApplicationMenu(this.menu);
  } else {
    this.menu = Menu.buildFromTemplate(
      otherTemplate(app, mainWindow, shell, i18n, changeLanguage, isDev)
    );
    mainWindow.setMenu(this.menu);
  }
}

module.exports = new MenuFactoryService(menu);
