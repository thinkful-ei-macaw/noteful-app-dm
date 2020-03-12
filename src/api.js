const BASE_URL = 'http://localhost:9090/';

const doFetch = (...params) => {
  let error;
  return fetch(...params)
    .then(res => {
      if (!res.ok) error = res.status;
      if (!res.headers.get('content-type').includes('json')) {
        error = res.statusText;
        return Promise.reject(error);
      }

      return res.json();
    })
    .then(data => {
      if (error) {
        error = data.message;
        return Promise.reject(error);
      }

      return data;
    });
}

const getFolders = () => {
  return doFetch(BASE_URL + 'folders');
}

const getNotes = () => {
  return doFetch(BASE_URL + 'notes');
}

const addFolder = folder => {
  return doFetch(BASE_URL + 'folders', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(folder)
  });
}

const addNote = note => {
  return doFetch(BASE_URL + 'notes', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(note)
  });
}

const deleteNote = id => {
  return doFetch(BASE_URL + 'notes/' + id, {
    headers: {'content-type': 'application/json'},
    method: 'DELETE'
  });
}

export default {
  getFolders,
  getNotes,
  addFolder,
  addNote,
  deleteNote
}