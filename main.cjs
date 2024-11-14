const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Asegúrate de tener un archivo preload si lo usas
      nodeIntegration: true,
    },
  });

  // Detecta si está en modo desarrollo o producción
  if (process.env.NODE_ENV === 'development') {
    // En desarrollo, carga el servidor de Vite
    win.loadURL('http://localhost:5173');
  } else {
    // En producción, carga el archivo HTML generado por Vite
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
