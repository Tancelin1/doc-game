const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");

// Vérifier si typeof BrowserWindow est défini
type BrowserWindowConstructorOptions = typeof BrowserWindow extends new (
  ...args: any[]
) => infer R
  ? R
  : never;

// Définir le type de la variable mainWindow
let mainWindow: BrowserWindowConstructorOptions | null = null;

app.on("ready", () => {
  // Créer une fenêtre principale avec les options de type BrowserWindowConstructorOptions
  mainWindow = new BrowserWindow({
    /* options */
  });
  mainWindow.loadFile("index.html");

  // Créer une icône de plateau
  const iconPath = path.join(__dirname, "static/logo.png");
  const tray = new Tray(iconPath);

  // Ajouter un menu contextuel à l'icône de plateau
  const contextMenu = Menu.buildFromTemplate([
    { label: "Ouvrir", click: () => mainWindow?.show() },
    { label: "Fermer", click: () => mainWindow?.hide() },
    { label: "Quitter", click: () => app.quit() },
  ]);
  tray.setToolTip("DiscoComicsGames");
  tray.setContextMenu(contextMenu);

  // Optionnel : afficher ou masquer la fenêtre principale lorsque l'icône est cliquée
  tray.on("click", () => {
    if (mainWindow?.isVisible()) {
      mainWindow?.hide();
    } else {
      mainWindow?.show();
    }
  });
});
