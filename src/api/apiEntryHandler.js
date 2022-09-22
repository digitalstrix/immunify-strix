/* eslint-disable no-dupe-keys */
import fetch from 'isomorphic-fetch';
import axios from 'axios';
import { getCookie } from '../utils/commonUtils';

const getHeaders = (stringify = true) => {
    const basicHeaders = {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Headers": "X-Requested-With, privatekey",
      Accept: "application/json",
      cache: "no-cache",
      mode: "cors",
      redirect: "follow",
      referrer: "no-referrer",
      Authorization: `Bearer ${getCookie('login')}`,
    }
    if (stringify) {
        basicHeaders['Content-Type'] = 'application/json';
    }
    return basicHeaders;
}

const constructApiURL = (apiBaseURL, path) => `${apiBaseURL}${path}`;

export const createAPIClientEntry = (apiBaseURL) => ({
    doGet: async (path) => {
        // return fetch(constructApiURL(apiBaseURL, path), {
        //     method: 'GET',
        //     headers: getHeaders(),
        //     credentials: 'include',
        //     timeout: 1000,
        // });
        return await axios.get(constructApiURL(apiBaseURL, path), {
          headers: getHeaders(),
        	timeout: 5000,
        });
    },
    doPost: async (path, data, stringify = true) => {
        // return fetch(constructApiURL(apiBaseURL, path), {
        //     method: 'POST',
        //     headers: getHeaders(stringify),
        //     credentials: 'include',
        //     timeout: 5000,
        //     body: stringify ? JSON.stringify(data) : data
        // });
        return await axios.post(constructApiURL(apiBaseURL, path), data, {
          headers: getHeaders(stringify),
          timeout: 5000,
        });
      // console.log('come ==> ', come)
    },
    doPost2: (path, data, stringify = true) => {
        return fetch(constructApiURL(apiBaseURL, path), {
            method: 'POST',
            headers: getHeaders(stringify),
            credentials: 'include',
            timeout: 210000,
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
    doPut: async (path, data) => {
        // return fetch(constructApiURL(apiBaseURL, path), {
        //     method: 'PUT',
        //     headers: getHeaders(),
        //     credentials: 'include',
        //     timeout: 1000,
        //     body: JSON.stringify(data)
        // });
		return await axios.put(constructApiURL(apiBaseURL, path), JSON.stringify(data), {
          headers: getHeaders(),
          timeout: 5000,
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
    },
    doDelete: async (path, data) => {
        const header = getHeaders();
        return await axios.delete(constructApiURL(apiBaseURL, path), {
            headers: header,
            timeout: 1000,
        });
    }
});
