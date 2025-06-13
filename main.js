const { app, BrowserWindow } = require('electron');
const { createMainWindow } = require('./janelaPrincipal');
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

    createMainWindow();
    registrarListeners()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
}
);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});