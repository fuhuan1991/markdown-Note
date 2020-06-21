import fetch from 'unfetch';
import constructMenu from './constructMenuJSON';
import { notify } from '../notification';

const baseUrl = 'http://localhost:8080/';

// check the status of all sort of response
const checkStatus = response => {
  console.log("response", response);
  if (response.ok) {
    return response;
  } else {
    response.json().then(o => {
      notify('error', o.msg);
    });
    return Promise.reject();
  }
}

// get menu list from back-end and then construct the menu structure
export const getMenu = data => fetch(baseUrl + 'api/dir/getMenu/', {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'GET',
  body: JSON.stringify(data),
})
.then(checkStatus)
.then(response => {
  return response.json();
}, e => {
  return e;
})
.then(arr => {
  if (Array.isArray(arr)) {
    return constructMenu(arr);
  } else {
    return Promise.reject();
  }
});

// create a new notebook(directory)
export const createDir = data => fetch(baseUrl + 'api/dir/create/', {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'POST',
  body: JSON.stringify({name: data.value, id: null, parent_id: null}),
})
.then(checkStatus)
.then(res => {
  return "notebook created";
}, e => {
  return Promise.reject();
});
