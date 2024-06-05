import { contextBridge, shell } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import {
  dbGetNotes, dbAddNote, dbRemoveNote,
  dbGetClient, dbGetClients, dbAddClient, dbUpdateClient, dbRemoveClient,
  dbGetPersons, dbAddPerson, dbRemovePerson,
  dbGetActions, dbAddAction, dbRemoveAction, dbGetAllActions,
  dbGetRatings, dbAddRating, dbRemoveRating,

} from "./models/dbmanager";

const openInBrowser = (link) => {
    return shell.openExternal('https://' + link);
}

// Custom APIs for renderer
const api = {
  openInBrowser: openInBrowser,
  getNotes: dbGetNotes,
  addNote: dbAddNote,
  removeNote: dbRemoveNote,
  getClient: dbGetClient,
  getClients: dbGetClients,
  addClient: dbAddClient,
  updateClient: dbUpdateClient,
  removeClient: dbRemoveClient,
  getPersons: dbGetPersons,
  addPerson: dbAddPerson,
  removePerson: dbRemovePerson,
  getActions: dbGetActions,
  addAction: dbAddAction,
  getAllActions: dbGetAllActions,
  removeAction: dbRemoveAction,
  getRatings: dbGetRatings,
  addRating: dbAddRating,
  removeRating: dbRemoveRating,
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
