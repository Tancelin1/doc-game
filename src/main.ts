import { app, BrowserWindow, Menu, ipcMain, Notification } from "electron"; // Import de la classe Notification
import path from "path";
import * as Sentry from "@sentry/electron/main";

Sentry.init({
  dsn: "https://3ee750ba2ad7d85fc76a4e2d161fa2b5@o4507407981936640.ingest.de.sentry.io/4507408034693200",
});

let mainWindow: BrowserWindow | null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  // Charge l'URL ou le fichier en fonction de l'environnement
  if (process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(
        __dirname,
        `../renderer/${process.env.MAIN_WINDOW_VITE_NAME}/index.html`,
      ),
    );
  }
  mainWindow.webContents.openDevTools();

  // Création du menu de l'application
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: "Fichier",
      submenu: [
        { type: "separator" },
        {
          label: "Quitter",
          accelerator: "CmdOrCtrl+Q",
          click() {
            app.quit();
          },
        },
      ],
    },
    {
      label: "Aide",
      submenu: [
        {
          label: "À propos",
          click() {},
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

// Initialisation de l'application
app.on("ready", () => {
  createWindow();

  app.setAboutPanelOptions({
    applicationName: "Votre Application",
    applicationVersion: "1.0.0",
  });

  const notification = new Notification({
    title: "doc-game-comics",
    body: "Bienvenue ! Votre application est prête à être utilisée.",
  });

  notification.show();
});

// Quand toutes les fenêtres sont fermées, quitte l'application sauf sur macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Si l'application est activée sur macOS, recrée la fenêtre si aucune fenêtre n'est ouverte
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Ouverture d'un dialogue pour récupérer la note de l'utilisateur
ipcMain.on("open-dialog", (event) => {
  const dialogWindow = new BrowserWindow({
    width: 400,
    height: 200,
    modal: true,
    parent: BrowserWindow.getFocusedWindow(),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  dialogWindow.loadURL(
    "data:text/html;charset=utf-8," +
      encodeURIComponent(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Dialog</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        #note { width: 100%; padding: 10px; margin-bottom: 10px; }
        #submit { padding: 10px 20px; }
      </style>
    </head>
    <body>
      <h1>Informations</h1>
      <p>Ce dialogue correspond à la note que vous alliez m'attribuer</p>
      <p>Veuillez écrire ici la note :</p>
      <input type="text" id="note" />
      <button id="submit">OK</button>
      <script>
        const { ipcRenderer } = require('electron');
        document.getElementById('submit').addEventListener('click', () => {
          const note = document.getElementById('note').value;
          ipcRenderer.send('close-dialog', note);
        });
      </script>
    </body>
    </html>
  `),
  );
});

// Traitement de la note et fermeture du dialogue si la valeur est correcte
ipcMain.on("close-dialog", (event, value) => {
  if (value === "20") {
    const dialogWindow = BrowserWindow.getFocusedWindow();
    dialogWindow?.close();
  } else {
    event.sender.send("note-error", "Veuillez entrer la valeur 20");
  }
});
