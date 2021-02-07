import fetch from 'unfetch';
import { baseUrl } from '../config';
import constructMenuData from './constructMenuData';
import { getUserId } from '../auth/util';

console.log('baseUrl: ' + baseUrl);

const checkStatus = response => {
  if (response.ok) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
  }
}

const getMenu = async (user_id) => {
   
  console.log('fetching menu...')

  try {
    const result = await fetch(`${baseUrl}/api/menu/${user_id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'GET',
    })
    .then(checkStatus)
    .then(response => response.json(), e => Promise.reject(e))
    .then(data => constructMenuData(data), e => Promise.reject(e));
    return result; 
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
}

const getContent = async (note_id) => {
  try {

    const note = await fetch(`${baseUrl}/api/note/${note_id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'GET',
    })
    .then(checkStatus)
    .then(response => response.json(), e => Promise.reject(e));

    if (!note) throw new Error('note does not exist');
    const content_id = note.content_id;

    const content = await fetch(`${baseUrl}/api/content/${content_id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'GET',
    })
    .then(checkStatus)
    .then(response => response.json(), e => Promise.reject(e));

    if (!content) throw new Error('note does not exist');

    return {text: content.text_value, title: note.title};
  } catch (e) {
    console.log(e);
    return Promise.reject('failed to get the content');
  }
}

const updateNote = async (note_id, text) => {
  try {

    const note = await fetch(`${baseUrl}/api/note/${note_id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'GET',
    })
    .then(checkStatus)
    .then(response => response.json(), e => Promise.reject(e));

    if (!note) throw new Error('note does not exist');
    const content_id = note.content_id;

    const content = await fetch(`${baseUrl}/api/content/${content_id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'GET',
    })
    .then(checkStatus)
    .then(response => response.json(), e => Promise.reject(e));
    
    content.text_value = text;
    delete content.text;

    const result = fetch(`${baseUrl}/api/content`, {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(content),
    })
    .then(checkStatus)
    .then(() => `${note.title} successfully updated!`, e => Promise.reject(e));

    return result;
  } catch (e) {
    console.log(e);
    return Promise.reject('failed to update note');
  }
}

const createNote = async (parent_id, data) => {

  const title = data.value;
  const user_id = getUserId();
  const body = {
    parent_id: parent_id,
    user_id: user_id,
    title: title,
  };

  // console.log({body})

  const result = fetch(`${baseUrl}/api/note`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(body),
  })
  .then(checkStatus)
  .then(() => `${title} successfully created!`, e => Promise.reject('failed to create note'));

  return result;
}

const createDir = async (data) => {

  const notebook_name = data.value;
  const user_id = getUserId();
  const body = {
    user_id: user_id,
    notebook_name: notebook_name,
  };

  const result = fetch(`${baseUrl}/api/dir`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(body),
  })
  .then(checkStatus)
  .then(() => `${notebook_name} successfully created!`, e => Promise.reject('failed to create notebook'));

  return result;
}

const deleteDir = async (id) => {
  const result = fetch(`${baseUrl}/api/dir/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: 'DELETE',
  })
  .then(checkStatus)
  .then(() => `successfully deleted!`, e => Promise.reject('failed to delete notebook'));

  return result;
}

const deleteNote = async (id) => {
  const result = fetch(`${baseUrl}/api/note/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: 'DELETE',
  })
  .then(checkStatus)
  .then(() => `successfully deleted!`, e => Promise.reject('failed to delete note'));

  return result;
}

const renameDir = async (id, data) => {
  const newName = data.value;

  const dir = await fetch(`${baseUrl}/api/dir/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: 'GET',
  })
  .then(checkStatus)
  .then(response => response.json(), e => Promise.reject(e));

  dir.notebook_name = newName;

  const result = fetch(`${baseUrl}/api/dir`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: 'PUT',
    body: JSON.stringify(dir),
  })
  .then(checkStatus)
  .then(() => `${newName} successfully updated!`, async (e) => {
    const msg = await e.response.text();
    return Promise.reject(msg);
  });

  return result;
}

const renameNote = async (id, data) => {
  const newName = data.value;

  const note = await fetch(`${baseUrl}/api/note/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: 'GET',
  })
  .then(checkStatus)
  .then(response => response.json(), e => Promise.reject(e));

  note.title = newName;

  const result = fetch(`${baseUrl}/api/note`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: 'PUT',
    body: JSON.stringify(note),
  })
  .then(checkStatus)
  .then(() => `${newName} successfully updated!`, async (e) => {
    const msg = await e.response.text();
    return Promise.reject(msg);
  });

  return result;
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
  updateNote,
};

