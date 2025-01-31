import { app, BrowserWindow } from 'electron';
import path from 'path';
import { spawn } from 'child_process';
import treeKill from 'tree-kill';

const serverProcess = spawn('npm', ['start'], { shell: true });
serverProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

serverProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

serverProcess.on('close', (code) => {
  console.log(`ng serve foi encerrado com o código ${code}`);
});
function createWindow(){
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false
    }
  })

  win.loadURL('http://localhost:4200/register')
  win.on('close', () =>{
    console.log('closed!!!!!!!')
    treeKill(serverProcess.pid, 'SIGKILL', (err) => {
      if (err) {
        console.error('Failed to kill process tree:', err);
      } else {
        console.log('Process tree killed successfully');
      }
    });
  })
}


setTimeout(() =>{
  app.whenReady().then(createWindow);
}, 8000)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
      app.quit();
    };
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
