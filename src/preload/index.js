import { contextBridge, shell } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import {dbgetNames, dbAddClient, dbUpdateClient, dbRemoveClient, dbGetClient, dbAddPerson, dbGetPersons} from "./models/dbmanager";

const openInBrowser = (link) => {
    return shell.openExternal('https://' + link);
}

// Custom APIs for renderer
const api = {
  getNames: dbgetNames,
  addClient: dbAddClient,
  removeClient: dbRemoveClient,
  openInBrowser: openInBrowser,
  getClient: dbGetClient,
  addPerson: dbAddPerson,
  getPersons: dbGetPersons,
  updateClient: dbUpdateClient
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
