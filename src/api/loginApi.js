import { createAPIClient } from "./apiHandler";
import { createAPIClientEntry } from './apiEntryHandler';

const BASE_URL = process.env.REACT_APP_LOGIN_API_URI;
const loginApiClient = createAPIClientEntry(BASE_URL);

const LoginApi = {
  logout: (data) => loginApiClient.doDelete('/login/admin', data),
  hasRole: (data) => loginApiClient.doGet('/login/admins/admin-roles/'+ data),
  checkAuth: (data) => loginApiClient.goGet('/login/admin' + data?.authUserId + '/' + data?.deviceId),
  adminLogin: (data) => loginApiClient.doPost('/login/admin', data),
  adminPasswordReset: (data) => loginApiClient.doPost('/admin/rest', data),
  adminPasswordChange: (data) => loginApiClient.doPut('/admin/rest', data),
};

export default LoginApi;
