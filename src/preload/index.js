import { contextBridge, shell } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import {dbgetNames, dbAddClient, dbRemoveClient, dbGetClient} from "./models/dbmanager";
// const testMgr = require("../models/testmanager");

const getNames = () => {
    // console.log("Preload getNames")
    return dbgetNames();
}

const addClient = () => {
  return dbAddClient();
}

const removeClient = (id) => {
  return dbRemoveClient(id);
}


const openInBrowser = (link) => {
    return shell.openExternal('https://' + link);
}

const getClient = (id) => {
  return dbGetClient(id);
}

// Custom APIs for renderer
const api = {
  getNames: getNames,
  addClient: addClient,
  removeClient: removeClient,
  openInBrowser: openInBrowser,
  getClient: getClient
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
