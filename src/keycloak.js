import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: process.env.REACT_APP_KEYCLOCK_URL,
  realm: process.env.REACT_APP_KEYCLOCK_REALM,
  clientId: process.env.REACT_APP_KEYCLOCK_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_KEYCLOCK_REDIRECT_URI,
  'login-required': true,
};

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
