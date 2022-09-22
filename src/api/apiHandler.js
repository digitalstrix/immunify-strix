import fetch from "isomorphic-fetch";
import { getCookie } from "../utils/commonUtils";

const getHeaders = (stringify = true) => {
  const basicHeaders = {
    "Access-Control-Allow-Headers": "*",
    Accept: "application/json",
    cache: "no-cache",
    mode: "cors",
    redirect: "follow",
    referrer: "no-referrer",
    Authorization: `Bearer ${getCookie("login")}`,
  };
  if (stringify) {
    basicHeaders["Content-Type"] = "application/json";
  }
  return basicHeaders;
};

const constructApiURL = (apiBaseURL, path) => `${apiBaseURL}${path}`;

export const createAPIClient = (apiBaseURL) => ({
  doGet: (path) => {
    return fetch(constructApiURL(apiBaseURL, path), {
      method: "GET",
      headers: getHeaders(),
      credentials: "include",
      timeout: 1000,
    });
  },
  doPost: (path, data, stringify = true) => {
    return fetch(constructApiURL(apiBaseURL, path), {
      method: "POST",
      headers: getHeaders(stringify),
      credentials: "include",
      timeout: 1000,
      body: stringify ? JSON.stringify(data) : data,
    });
  },
  doPut: (path, data) => {
    return fetch(constructApiURL(apiBaseURL, path), {
      method: "PUT",
      headers: getHeaders(),
      credentials: "include",
      timeout: 1000,
      body: JSON.stringify(data),
    });
  },
  doPatch: (path, data, stringify = true) => {
    return fetch(constructApiURL(apiBaseURL, path), {
      method: "PATCH",
      headers: getHeaders(stringify),
      credentials: "include",
      timeout: 1000,
      body: JSON.stringify(data),
    });
  },
  doDelete: (path, data) => {
    return fetch(constructApiURL(apiBaseURL, path), {
      method: "DELETE",
      headers: getHeaders(),
      credentials: "include",
      timeout: 1000,
      "Content-Type": "application/json",
      query: JSON.stringify(data),
      params: JSON.stringify(data),
      body: JSON.stringify(data),
    });
  },
});
