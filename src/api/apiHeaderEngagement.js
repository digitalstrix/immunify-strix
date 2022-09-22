/* eslint-disable no-dupe-keys */
import fetch from 'isomorphic-fetch';
import { getCookie } from '../utils/commonUtils';

const getHeaders = (stringify = true) => {
    const basicHeaders = {
        // 'Access-Control-Allow-Headers': '*',
        // 'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      cache: 'no-cache',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    }
    if (stringify) {
        basicHeaders['Content-Type'] = 'application/json';
    }
    return basicHeaders;
}

const constructApiURL = (apiBaseURL, path) => `${apiBaseURL}${path}`;

export const createAPIClient = (apiBaseURL) => ({
    doGet: (path) => {
        return fetch(constructApiURL(apiBaseURL, path), {
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include',
            timeout: 1000,
        });
    },
    doPost: (path, data, stringify = true) => {
        return fetch(constructApiURL(apiBaseURL, path), {
            method: 'POST',
            headers: getHeaders(stringify),
            credentials: 'include',
            timeout: 1000,
            body: stringify ? JSON.stringify(data) : data
        });
    },
    doPost2: (path, data, stringify = true) => {
        return fetch(constructApiURL(apiBaseURL, path), {
            method: 'POST',
            headers: getHeaders(stringify),
            credentials: 'include',
            timeout: Infinity,
            body: stringify ? JSON.stringify(data) : data
        });
    },
    doPost3: (path, data, stringify = false) => {
        return fetch(constructApiURL(apiBaseURL, path), {
            method: 'POST',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
              cache: 'no-cache',
              mode: 'cors',
              redirect: 'follow',
              referrer: 'no-referrer',
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            },
            credentials: 'include',
            timeout: 5000,
            data,
            // body: stringify ? JSON.stringify(data) : data
        });
    },
    doPut: (path, data) => {
        return fetch(constructApiURL(apiBaseURL, path), {
            method: 'PUT',
            headers: getHeaders(),
            credentials: 'include',
            timeout: 1000,
            body: JSON.stringify(data)
        });
    },
    doPatch: (path, data) => {
        return fetch(constructApiURL(apiBaseURL, path), {
            method: 'PATCH',
            headers: getHeaders(),
            credentials: 'include',
            timeout: 1000,
            body: JSON.stringify(data)
        });
    }
});
