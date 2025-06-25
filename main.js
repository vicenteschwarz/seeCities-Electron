const { app, BrowserWindow } = require('electron');
const {createMainWindow} = require('./janelaPrincipal')
const { createLoginWindow} = require('./janelaPrincipal');
const { registrarListeners } = require('./appListeners');

if (process.env.NODE_ENV !== 'production') {
    try {
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`)
        });
    } catch (err) {
        console.error('electron-reload não foi carregado:', err);
    }
}


app.whenReady().then(function () {
    
    registrarListeners()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createLoginWindow();
        }
    });
}
);


app.whenReady().then(function () {

    createLoginWindow();
    registrarListeners()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createLoginWindow();
        }
    });
}
);


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

