const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('myApi', {
    sendMsg: (msg) => ipcRenderer.send('ipc-example', msg)
});

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title),
    on: (title, callBack) => ipcRenderer.on(title, callBack),
    receiveMainMsg: (callback) => {
        ipcRenderer.on('message-from-main', (event, message) => {
            callback(message);
        });
    },
    openPort: () => ipcRenderer.send('openPort'),
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback),
})

// message-from-main

