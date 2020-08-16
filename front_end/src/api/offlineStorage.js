import constructMenu from './constructMenuJSON';
import { openDB } from 'idb';
import {v4 as uuid} from 'uuid';

let myDB = null;
const ROOT_ID = '00000000-0000-0000-0000-000000000000';

const initialization = async () => {
  return await openDB('myDB', 1, {
    async upgrade(db, oldVersion, newVersion, transaction) {
      if (oldVersion === 0){
        db.createObjectStore('dirs', {keyPath: 'id'});
        db.createObjectStore('notes', {keyPath: 'id'});
        db.createObjectStore('contents', {keyPath: 'id'});
      }
      return;
    },
    terminated() {
     console.log('terminated')
    },
  });
}

const getMenu = async () => {
   
  console.log('fetching menu...')
  if (!myDB) console.log('DB is not ready, need to connect');

  try {
    if (!myDB) myDB = await initialization();
  } catch (e) {
    console.log(e)
  }

  try {
    let root = await myDB.get('dirs', ROOT_ID);

    if (!root) {
      const time = new Date().toISOString();
      const root = {
        id: ROOT_ID,
        parent_id: null,
        name: 'root',
        create_time: time,
        last_update: time,
        type: 'ROOT',
      }
      await myDB.put('dirs', root);
    }

    const dirs = await myDB.getAll('dirs');
    const notes = await myDB.getAll('notes');
    const arr = [...dirs, ...notes];
    const nodeTable = {};

    for (let o of arr) {
      nodeTable[o.id] = o;
    }

    return { nodeTable, rootNode: constructMenu(arr)};
  } catch (e) {
    console.log(e);
    return Promise.reject();
  }
}

const createDir = async (data) => {

  if (!myDB) throw new Error('local DB not available');

  try {
    
    const name = data.value;

    // check name duplication
    const dirs = await myDB.getAll('dirs');
    for (const d of dirs) {
      if (d.name === name) return Promise.reject('name duplication');
    }

    const id = uuid();
    const parent_id = ROOT_ID;
    const time = new Date().toISOString();
    const create_time = time;
    const last_update = time;
    const type = 'DIR';
    const obj = { id, name, parent_id, create_time, last_update, type };
    await myDB.add('dirs', obj);
    return `${name} created`;
  } catch (e) {
    console.log(e);
    return Promise.reject('failed to create notebook');
  }
}

const renameDir = async (id, data) => {
  try {
    const obj = await myDB.get('dirs', id);
    if (!obj) throw new Error('notebook does not exist');
    obj.name = data.value;
    const time = new Date().toISOString();
    obj.last_update = time;
    await myDB.put('dirs', obj);
    return "notebook updated";
  } catch (e) {
    console.log(e);
    return Promise.reject('update failed');
  }
}

const deleteDir = async (id) => {
  try {
    await myDB.delete('dirs', id);
    return "notebook deleted";
  } catch (e) {
    console.log(e);
    return Promise.reject('delete failed');
  }
}

const createNote = async (text, parent_id, data) => {
  try {

    const title = data.value;

    // check name duplication
    const notes = await myDB.getAll('notes');
    for (const n of notes) {
      if (n.name === title) return Promise.reject('name duplication');
    }

    const contextText = `# ${data.value} \n----\n` + text;
    const noteId = uuid();
    const contentId = uuid();
    const time = new Date().toISOString();
    const create_time = time;
    const last_update = time;

    const content = {
      id: contentId,
      text: contextText,
      create_time: create_time,
      last_update: last_update,
    };

    const note = {
      id: noteId,
      parent_id: parent_id,
      content_id: contentId,
      name: title,
      type: 'MKD',
      create_time: create_time,
      last_update: last_update,
    };

    const tx = myDB.transaction(['notes', 'contents'], 'readwrite');

    await Promise.all([
      tx.objectStore('contents').add(content),
      tx.objectStore('notes').add(note),
      tx.done,
    ]);
    return `${title} created`; 
  } catch (e) {
    console.log(e);
    return Promise.reject('failed to create new note');
  }
}

const getContent = async (noteId) => {
  try {
    const note = await myDB.get('notes', noteId);
    if (!note) throw new Error('note does not exist');

    const contentId = note.content_id;
    const content = await myDB.get('contents', contentId);
    if (!content) throw new Error('note does not exist');

    return {text: content.text};
  } catch (e) {
    console.log(e);
    return Promise.reject('failed to get the content');
  }
}

const deleteNote = async (noteId) => {
  try {
    const note = await myDB.get('notes', noteId);
    const contentId = note.content_id;

    await myDB.delete('notes', noteId);
    await myDB.delete('contents', contentId);

    return `note deleted`; 
  } catch (e) {
    console.log(e);
    return Promise.reject('failed to delete note');
  }
}

const renameNote = async (id, data) => {
  try {
    const note = await myDB.get('notes', id);
    if (!note) throw new Error('note does not exist');
    note.name = data.value;
    const time = new Date().toISOString();
    note.last_update = time;
    await myDB.put('notes', note);
    return `note updated`; 
  } catch (e) {
    console.log(e);
    return Promise.reject('failed to update note');
  }
}

const updateNote = async (id, text) => {
  try {
    const note = await myDB.get('notes', id);
    if (!note) throw new Error('note does not exist');
    const time = new Date().toISOString();
    note.last_update = time;

    const content = await myDB.get('contents', note.content_id);
    content.text = text;

    const tx = myDB.transaction(['notes', 'contents'], 'readwrite');

    await Promise.all([
      tx.objectStore('contents').put(content),
      tx.objectStore('notes').put(note),
      tx.done,
    ]);
    return `note updated`; 
  } catch (e) {
    console.log(e);
    return Promise.reject('failed to update note');
  }
}

export default {
  getMenu,
  getContent,
  createNote,
  createDir,
  deleteDir,
  deleteNote,
  renameDir,
  renameNote,
  updateNote,
};