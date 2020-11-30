import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

export function hash(x) {
  return sha256(x).toString(Base64);
}

export class Cookie {
  static exists = (key) => {
    return document.cookie.indexOf(key+'=') !== -1;
  }
}

export async function fetch(url, options={}) {
  options.credentials = 'include';
  const urlBase = window.location.href.match('localhost') ? 'http://localhost:3010'
    : 'https://zlind-beers.herokuapp.com';
  return await window.fetch(urlBase+url, options);
}
