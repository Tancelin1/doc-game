const { app, BrowserWindow } = require("electron");

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
});
