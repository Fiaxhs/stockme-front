const query = (url, options = {}) => {
  return fetch(`http://localhost:4000/${url}`, options)
  .then(response => {
    if (response.status !== 200 && response.status !== 201) {
      throw response.error;
    } else {
      return response.json();
    }
  }).catch(err => {
      throw err;
  });
}

export {query};
