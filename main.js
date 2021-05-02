const { app, BrowserWindow, ipcMain } = require('electron');

const fs = require('fs');
const path = require('path');
const os = require('os');

function createWindow() {
  const win = new BrowserWindow({
    // width: 1200,
    //  Main window width 1200px + DevTools width = 1683px
    // width: 1200,
    width: 1683,
    height: 825,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      plugins: true,
    },
  });

  win.loadURL('http://localhost:3000');
  win.webContents.openDevTools();

  let pdfWin;
  let pdfPrint;

  ipcMain.on('open-invoice', function (event, invNumber) {
    console.log(invNumber);

    pdfWin = new BrowserWindow({
      width: 595,
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
    width: 595,
    height: 842,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      plugins: true,
    },
  });

  pdfPrint.hide();

  ipcMain.on('print-to-pdf', function (event, incomingInvoice) {
    pdfPrint.loadURL('http://localhost:3000/#/invoice-preview');

    const options = {
      marginsType: 0,
      pageSize: 'A4',
      printBackground: true,
      printSelectionOnly: false,
      landscape: false,
    };

    // const yearDate = new Date().getFullYear();
    // const monthDate = new Date().getMonth();
    // const getDay = new Date().getDate();
    // const random = Math.floor(Math.random() * 10000 + 1);

    const invoiceName = `${incomingInvoice}.pdf`;

    setTimeout(() => {
      pdfPrint.webContents
        .printToPDF(options)
        .then((data) => {
          // const pdfPath = path.join(os.homedir(), 'Desktop', 'temp.pdf');
          const pdfPath = path.join(os.homedir(), 'Desktop', invoiceName);
          fs.writeFile(pdfPath, data, (error) => {
            if (error) throw error;
            console.log(`Wrote PDF successfully to ${pdfPath}`);
          });
        })
        .catch((error) => {
          console.log(`Failed to write PDF to ${pdfPath}: `, error);
        });
    }, 2000);
  });

  let printPaper = new BrowserWindow({
    width: 595,
    height: 842,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      plugins: true,
    },
  });

  printPaper.hide();

  ipcMain.on('print-paper', function (event) {
    printPaper.loadURL('http://localhost:3000/#/invoice-preview');

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

    // printPaper.webContents.print(options, (success, failureReason) => {
    //   if (!success) console.log(failureReason);

    //   console.log('Print Initiated');
    // });

    setTimeout(() => {
      printPaper.webContents.print(options, (success, failureReason) => {
        if (!success) console.log(failureReason);

        console.log('Print Initiated');
      });
    }, 2000);
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
