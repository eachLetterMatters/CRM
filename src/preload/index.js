import { contextBridge, shell } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import {dbAddClient, dbUpdateClient, dbRemoveClient, dbGetClient, dbGetClients, 
  dbAddPerson, dbGetPersons, dbRemovePerson,
  dbGetNotes, dbAddNote, dbRemoveNote,
  dbGetActions,dbAddAction, dbRemoveAction,

} from "./models/dbmanager";

const openInBrowser = (link) => {
    return shell.openExternal('https://' + link);
}

// Custom APIs for renderer
const api = {
  addClient: dbAddClient,
  removeClient: dbRemoveClient,
  openInBrowser: openInBrowser,
  getClient: dbGetClient,
  getClients: dbGetClients,
  addPerson: dbAddPerson,
  getPersons: dbGetPersons,
  removePerson: dbRemovePerson,
  updateClient: dbUpdateClient,
  getNotes: dbGetNotes,
  addNote: dbAddNote,
  removeNote: dbRemoveNote,
  getActions: dbGetActions,
  addAction: dbAddAction,
  removeAction: dbRemoveAction,
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
