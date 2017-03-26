import Cookies from 'js-cookie';

const query = (url, options = {}) => {

  let headers = new Headers();
  if (Cookies.get('secret')) {
    headers.append('X-Image-Secret', Cookies.get('secret'));
  }
  options.headers = headers;

  return fetch(`http://localhost:4000/${url}`, options)
  .then(response => {
    // OK
    if (response.status === 200 || response.status === 201) {
      return response.json();
    // No content
    } else if (response.status === 204) {
      return {};
    } else {
      throw response.error;
    }
  }).catch(err => {
      throw err;
  });
}

export {query};
