import axios from "axios";
import { getCookie } from "../utils/commonUtils";
const SUBSCRIPTION_BASE_URL = process.env.REACT_APP_SUBSCRIPTION_URL;

const immSubscriptionInstance = axios.create({
  baseURL: SUBSCRIPTION_BASE_URL,
  timeout: 30000,
  headers: {
    "Access-Control-Allow-Origin": process.env.REACT_APP_HOST,
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json",
    Accept: "application/json",
    cache: "no-cache",
    mode: "cors",
    redirect: "follow",
    withCredentials: true,
    referrer: "no-referrer",
    APP_TYPE: "WEBPORTAL",
  },
});

immSubscriptionInstance.interceptors.request.use(
  (config) => {
    config.headers.token = `Bearer ${localStorage.token || getCookie("login")}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default immSubscriptionInstance;
