import fetch from 'unfetch';
import constructMenu from './constructMenuJSON';
import { notify } from '../notification';

const baseUrl = 'http://localhost:8080/';

// check the status of all sort of response
const checkStatus = response => {
  if (response.ok) {
    return response;
  } else {
    response.json().then(o => {
      notify('error', o.msg);
    });
    return Promise.reject();
  }
}

const networkIssue = () => {
  notify('netkork issue', 'Please try again later.');
}

// get menu list from back-end and then construct the menu structure
const getMenu = () => fetch(baseUrl + 'api/dir/getMenu/', {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'GET',
})
.then(checkStatus, networkIssue)
.then(response => {
  return response.json();
}, e => {
  return e;
})
.then(arr => {
  if (Array.isArray(arr)) {
    const nodeTable = {};
    for (let o of arr) {
      nodeTable[o.id] = o;
    }
    return { nodeTable, rootNode: constructMenu(arr)};
  } else {
    return Promise.reject();
  }
});

// get the content of a existing note file
const getContent = (id) => fetch(baseUrl + `api/note/getContent/${id}`, {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'GET',
})
.then(checkStatus, networkIssue)
.then(response => {
  return response.json();
}, e => {
  return Promise.reject();
});

// create a new note
const createNote = (text, parent_id, data) => fetch(baseUrl + 'api/note/create', {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
  body: JSON.stringify({ title: data.value, text: `# ${data.value} \n----\n` + text, parent_id }),
})
.then(checkStatus, networkIssue)
.then(res => {
  return `${data.value} created`;
}, e => {
  return Promise.reject();
});

// create a new notebook(directory)
const createDir = data => fetch(baseUrl + 'api/dir/create', {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
  body: JSON.stringify({name: data.value, id: null, parent_id: null}),
})
.then(checkStatus, networkIssue)
.then(res => {
  return `${data.value} created`;
}, e => {
  return Promise.reject();
});

// delete a existing notebook(directory)
const deleteDir = (id) => fetch(baseUrl + `api/dir/delete/${id}`, {
  method: 'DELETE',
})
.then(checkStatus, networkIssue)
.then(res => {
  return "notebook deleted";
}, e => {
  return Promise.reject();
});

// delete a existing note
const deleteNote = (id) => fetch(baseUrl + `api/note/delete/${id}`, {
  method: 'DELETE',
})
.then(checkStatus, networkIssue)
.then(res => {
  return "note deleted";
}, e => {
  return Promise.reject();
});

// rename a existing notebook(directory)
const renameDir = (id, data) => fetch(baseUrl + 'api/dir/update/', {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'PUT',
  body: JSON.stringify({ name: data.value, id: id }),
})
.then(checkStatus, networkIssue)
.then(res => {
  return "notebook updated";
}, e => {
  return Promise.reject();
});

// rename a existing note
const renameNote = (id, data) => fetch(baseUrl + 'api/note/update/', {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'PUT',
  body: JSON.stringify({ title: data.value, id: id }),
})
.then(checkStatus, networkIssue)
.then(res => {
  return "note updated";
}, e => {
  return Promise.reject();
});

// update the content of a note
const updateNote = (id, text) => fetch(baseUrl + 'api/note/update/', {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'PUT',
  body: JSON.stringify({ id, text }),
})
.then(checkStatus, networkIssue)
.then(res => {
  return "note updated";
}, e => {
  return Promise.reject();
});

export default {
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