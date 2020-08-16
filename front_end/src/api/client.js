import serverAPI from './serverStorage';
import offlineAPI from './offlineStorage';


const offline = true;

let getMenu;
let getContent;
let createNote;
let createDir;
let deleteDir;
let deleteNote;
let renameDir;
let renameNote;
let updateNote;

if (offline) {
  getMenu = offlineAPI.getMenu;
  getContent = offlineAPI.getContent;
  createNote = offlineAPI.createNote;
  createDir = offlineAPI.createDir;
  deleteDir = offlineAPI.deleteDir;
  deleteNote = offlineAPI.deleteNote;
  renameDir = offlineAPI.renameDir;
  renameNote = offlineAPI.renameNote;
  updateNote = offlineAPI.updateNote;
} else {
  getMenu = serverAPI.getMenu;
  getContent = serverAPI.getContent;
  createNote = serverAPI.createNote;
  createDir = serverAPI.createDir;
  deleteDir = serverAPI.deleteDir;
  deleteNote = serverAPI.deleteNote;
  renameDir = serverAPI.renameDir;
  renameNote = serverAPI.renameNote;
  updateNote = serverAPI.updateNote;
}


export {
  getMenu,
  getContent,
  createNote,
  createDir,
  deleteDir,
  deleteNote,
  renameDir,
  renameNote,
  updateNote
};

