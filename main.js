const { app, BrowserWindow, ipcMain } = require('electron');

const fs = require('fs');
const path = require('path');
const os = require('os');

function createWindow() {
  const win = new BrowserWindow({
    // width: 1200,
    //  Main window width 1200px + DevTools width = 1683px
    width: 1200,
    // width: 1683,
    height: 825,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      plugins: true,
    },
  });

  win.loadURL('http://localhost:3000');

  // win.webContents.openDevTools();

  ipcMain.on('print-to-pdf', function (event) {
    const options = {
      marginsType: 0,
      pageSize: 'A4',
      printBackground: true,
      printSelectionOnly: false,
      landscape: false,
    };

    win.webContents
      .printToPDF(options)
      .then((data) => {
        const pdfPath = path.join(os.homedir(), 'Desktop', 'temp.pdf');
        fs.writeFile(pdfPath, data, (error) => {
          if (error) throw error;
          console.log(`Wrote PDF successfully to ${pdfPath}`);
        });
      })
      .catch((error) => {
        console.log(`Failed to write PDF to ${pdfPath}: `, error);
      });
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
