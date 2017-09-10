const BASE_PATH = 'https://api.github.com/';

export function get(path, headers = {}) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status > 200) {
          reject(xhr, xhr.status);
        } else {
          resolve(JSON.parse(xhr.responseText));
        }
      }
    };

    xhr.open('GET', `${BASE_PATH}${path}`);

    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.send();
  });
}
