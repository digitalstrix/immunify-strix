import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./app/store";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { LoadScript } from "@react-google-maps/api";
import {AuthProvider} from '../src/hooks/auth/GloabalStates';
import { SnackbarProvider } from "notistack";
import Loader from "./common/components/Loader";

import keycloak from "./keycloak";
import Mainstate from "./context/MainState";

const eventLogger = (event, error) => {
  console.log("onKeycloakEvent", event, error);
};

const tokenLogger = (tokens) => {
  // console.log('onKeycloakTokens', tokens);
};

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    {/* <ReactKeycloakProvider
      LoadingComponent={<Loader />}
      authClient={keycloak}
      onEvent={eventLogger}
      onTokens={tokenLogger}
    > */}
    <AuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LoadScript googleMapsApiKey="AIzaSyDeNEl53GBcIR9A3RLAhkILIE6hd4ea5-Y">
            <SnackbarProvider maxSnack={3}>
              <Mainstate>
                <App />
              </Mainstate>
            </SnackbarProvider>
          </LoadScript>
        </PersistGate>
      </Provider>
      </AuthProvider>
    {/* </ReactKeycloakProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
