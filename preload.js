// Exposes only the profile storage API to the renderer — nothing else.
'use strict';
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('herogen', {
  platform: process.platform,
  loadProfiles: () => ipcRenderer.invoke('profiles-load'),
  saveProfiles: (profiles) => ipcRenderer.invoke('profiles-save', profiles),
});
