const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
        },
        frame: true,

    });

    const indexPath = path.join(__dirname, 'index.html');
    mainWindow.loadFile(indexPath);

    mainWindow.on('closed', function () {
        mainWindow = null;

    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});

// Handle IPC events for window controls
ipcMain.on('minimize-window', () => {
    console.log('Minimize event received');
    if (mainWindow) {
        mainWindow.minimize();
    }
});

ipcMain.on('maximize-window', () => {
    console.log('Maximize event received');
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    }
});

ipcMain.on('close-window', () => {
    console.log('Close window event received');
    app.quit();
});
