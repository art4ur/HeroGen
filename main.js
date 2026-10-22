// HeroGen desktop app — Electron main process.
'use strict';
const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const profilesPath = () => path.join(app.getPath('userData'), 'herogen-profiles.json');

ipcMain.handle('profiles-load', async () => {
  try {
    const raw = await fs.promises.readFile(profilesPath(), 'utf8');
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {}; // first run / unreadable file = no profiles yet
  }
});

ipcMain.handle('profiles-save', async (_event, profiles) => {
  const tmp = profilesPath() + '.tmp';
  await fs.promises.writeFile(tmp, JSON.stringify(profiles ?? {}, null, 2), 'utf8');
  await fs.promises.rename(tmp, profilesPath()); // atomic-ish replace
  return true;
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1500,
    height: 1000,
    minWidth: 900,
    minHeight: 700,
    title: 'HeroGen',
    // Explicit window icon: without this, Linux desktops (KDE/GNOME) show a
    // generic icon for the running app/taskbar even when the launcher
    // entry has one.
    icon: path.join(__dirname, 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
