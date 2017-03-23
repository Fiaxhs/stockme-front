import Cookies from 'js-cookie';

const query = (url, options = {}) => {

  let headers = new Headers();
  if (Cookies.get('secret')) {
    headers.append('X-Image-Secret', Cookies.get('secret'));
  }
  options.headers = headers;

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
