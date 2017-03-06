const query = (url, options = {}) => {
  return new Promise(function (resolve, reject) {
    fetch(`http://localhost:4000/${url}`, options)
    .then(response => {
      if (response.status !== 200 && response.status !== 201) {
        reject(response.error);
      } else {
        resolve(response.json());
      }
    }).catch(err => {
      reject(err);
    });
  });
}

export {query};
