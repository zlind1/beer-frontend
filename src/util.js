import sha256 from 'crypto-js/sha256';
import Hex from 'crypto-js/enc-hex';

export function hash(x) {
  return sha256(x).toString(Hex);
}

export class LocalStorage {
  static get = (key) => {
    return JSON.parse(window.localStorage.getItem(key));
  }
  static set = (key, val) => {
    window.localStorage.setItem(key, JSON.stringify(val));
  }
  static delete = (key) => {
    window.localStorage.removeItem(key);
  }
}
