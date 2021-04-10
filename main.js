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

  // ipcMain.on('open-invoice', function (event) {
  //   const win = new BrowserWindow({
  //     // width: 1200,
  //     //  Main window width 1200px + DevTools width = 1683px
  //     width: 595,
  //     // width: 1683,
  //     height: 842,
  //     title: 'Pregled računa',
  //     webPreferences: {
  //       nodeIntegration: true,
  //       enableRemoteModule: true,
  //       plugins: true,
  //       nativeWindowOpen: true,
  //     },
  //   });

  //   win.loadURL(`file://${__dirname}/src/pages/Invoices/Invoice/Invoice.js`);
  // });

  let pdfWin;
  let pdfPrint;

  ipcMain.on('open-invoice', function (event) {
    pdfWin = new BrowserWindow({
      // width: 1200,
      //  Main window width 1200px + DevTools width = 1683px
      width: 595,
      // width: 1683,
      height: 842,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        plugins: true,
      },
    });

    pdfWin.loadURL('http://localhost:3000/#/invoice-preview');
  });

  pdfPrint = new BrowserWindow({
    // width: 1200,
    //  Main window width 1200px + DevTools width = 1683px
    width: 595,
    // width: 1683,
    height: 842,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      plugins: true,
    },
  });

  pdfPrint.loadURL('http://localhost:3000/#/invoice-preview');
  pdfPrint.hide();

  ipcMain.on('print-to-pdf', function (event) {
    const options = {
      marginsType: 0,
      pageSize: 'A4',
      printBackground: true,
      printSelectionOnly: false,
      landscape: false,
    };

    pdfPrint.webContents
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

  let printPaper = new BrowserWindow({
    // width: 1200,
    //  Main window width 1200px + DevTools width = 1683px
    width: 595,
    // width: 1683,
    height: 842,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      plugins: true,
    },
  });

  printPaper.loadURL('http://localhost:3000/#/invoice-preview');
  printPaper.hide();

  ipcMain.on('print-paper', function (event) {
    const options = {
      silent: false,
      printBackground: true,
      color: false,
      margin: {
        marginType: 'printableArea',
      },
      landscape: false,
      pagesPerSheet: 1,
      collate: false,
      copies: 1,
      header: 'Header of the Page',
      footer: 'Footer of the Page',
    };

    printPaper.webContents.print(options, (success, failureReason) => {
      if (!success) console.log(failureReason);

      console.log('Print Initiated');
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
