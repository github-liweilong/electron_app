const { app, BrowserWindow, nativeImage, Menu, shell } = require("electron");
const url = require('url');
const path = require('path');

function menuFunc(win) {
    const template = [
        // {
        //     label: '文件',
        //     submenu: [
        //         {
        //             label: '新建窗口',
        //             click() {
        //                 new BrowserWindow({
        //                     width: 500,
        //                     height: 500,
        //                 });
        //             }
        //         }
        //     ]
        // },
        {
            label: '工具',
            submenu: [
                {
                    label: '打开调试工具',
                    click(e) {
                        win.webContents.openDevTools();
                    }
                },
                {
                    label: '百度',
                    click(e) {
                        shell.openExternal('https://www.baidu.com')
                    }
                }
            ]
        }
    ]
    const menu = Menu.buildFromTemplate(template);
    // 设置菜单
    Menu.setApplicationMenu(menu);
}

function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 1000, // 窗口宽度
        height: 700, // 窗口高度
        title: "Electron", // 窗口标题,如果由loadURL()加载的HTML文件中含有标签<title>，该属性可忽略
        icon: nativeImage.createFromPath('src/public/favicon.ico'), // "string" || nativeImage.createFromPath('src/image/icons/256x256.ico')从位于 path 的文件创建新的 NativeImage 实例
        webPreferences: { // 网页功能设置
            preload: path.join(__dirname, 'preload.js'),
            // nodeIntegration: true, // 是否启用node集成 渲染进程的内容有访问node的能力
            webviewTag: true, // 是否使用<webview>标签 在一个独立的 frame 和进程里显示外部 web 内容
            webSecurity: false, // 禁用同源策略
            nodeIntegrationInSubFrames: true // 是否允许在子页面(iframe)或子窗口(child window)中集成Node.js
        }
    });

    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
        // 加载应用 --开发阶段  需要运行 npm run start
        mainWindow.loadURL('http://localhost:3000/');
    } else {
        // 加载应用 --打包react应用后，__dirname为当前文件路径
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, './build/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    menuFunc(mainWindow);

    // 解决应用启动白屏问题
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    // 当窗口关闭时发出。在你收到这个事件后，你应该删除对窗口的引用，并避免再使用它。
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});
