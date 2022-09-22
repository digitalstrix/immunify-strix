/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useKeycloak } from "@react-keycloak/web";
import { useHistory } from "react-router-dom";
import UserApp from "./UserApp";
import {
  checkAuthAsync,
  logoutAsync,
} from "./features/LoginEntry/loginEntrySlice";
import EntryApp from "./features/LoginEntry/index";

import "./App.css";

import AdminApp from "./AdminApp";
import Loader from "./common/components/Loader";
import ParentApp from "./ParentApp";
import { getUser, setUserFcmToken } from "./features/User/userSlice";
import { selectUser, selectUserLoadingStatus } from "./features/User/selector";
import {
  selectEntrySuccessUserData,
  selectEntryOtpStatus,
} from "./features/LoginEntry/selector";
import { setCookie, getCookie } from "./utils/commonUtils";
import { initializeApp } from "@firebase/app";
import { getMessaging, getToken, onMessage } from "@firebase/messaging";
import { selectReceivingCallStatus } from "./features/Common/selector";
import {
  setCallerData,
  setReceivingCallStatus,
} from "./features/Common/commonSlice";
import Incomingcall from "./common/components/IncomingCall";
import GlobalStyles from "./GlobalStyles";
import { AuthContext } from "./hooks/auth/GloabalStates";
import Mainstate from "./context/MainState";

const PORTAL_TYPE_GENERAL = "GENERAL";
const USER_TYPE_GENERAL = "GENERAL";
const PORTAL_TYPE_IMM = "IMM";
const PORTAL_TYPE_VAC = "VAC";

const DEVICE_TYPE = "WEB";

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const authDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const databaseURL = process.env.REACT_APP_FIREBASE_DB_URL;
const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const storageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID;
const appId = process.env.REACT_APP_FIREBASE_APP_ID;
const measurementId = process.env.REACT_APP_FIREBASE_MEASSUREMENT_ID;
const vapidKey = process.env.REACT_APP_FIREBASE_VAP_ID_KEY;

export default function App() {
  // const isReceivingCall = useSelector(selectReceivingCallStatus);
  const user = useSelector(selectUser);
  const userLoadingStatus = useSelector(selectUserLoadingStatus);
  const dispatch = useDispatch();
  // const { keycloak, initialized } = useKeycloak();

  const entrySuccessUserData = useSelector((state) =>
    selectEntrySuccessUserData(state)
  );
  const entrySuccessUserDataStatus = useSelector((state) =>
    selectEntryOtpStatus(state)
  );
  const [authState, setauthState] = useContext(AuthContext);
  const history = useHistory();

  const firebaseConfig = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  };

  initializeApp(firebaseConfig);

  const messaging = getMessaging();

  useEffect(() => {
    if (entrySuccessUserData?.token) {
      setCookie("login", entrySuccessUserData?.token, 30);
    }
  }, [entrySuccessUserData?.token]);

  const setUserFcmTokenAsync = useCallback(
    ({ authUserId, deviceType, fcmToken }) => {
      dispatch(setUserFcmToken({ authUserId, deviceType, fcmToken }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (
      entrySuccessUserData &&
      !entrySuccessUserData?.userGroups &&
      entrySuccessUserDataStatus === "idle"
    ) {
      alert(
        "Registration flow is still in progress. Please use mobile App for registration!"
      );
      initialLogout();
    } else if (
      entrySuccessUserData &&
      !user &&
      entrySuccessUserDataStatus === "idle"
    ) {
      const { authUserId } = entrySuccessUserData;
      dispatch(getUser({ authUserId }));

      if (authUserId) {
        getToken(messaging, { vapidKey })
          .then((currentToken) => {
            if (currentToken) {
              const { sub: authUserId } = entrySuccessUserData;
              setUserFcmTokenAsync({
                authUserId,
                deviceType: DEVICE_TYPE,
                fcmToken: currentToken,
              });
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
          });
      }
    } else if (entrySuccessUserData && user) {
      setauthState({
        ...authState,
        token: entrySuccessUserData?.token,
        authUserId: entrySuccessUserData?.authUserId,
        firstName: entrySuccessUserData?.firstName,
        lastName: entrySuccessUserData?.lastName,
        email: entrySuccessUserData?.email,
        contact: entrySuccessUserData?.mobile_number,
      });
    }
  }, [
    entrySuccessUserData,
    user,
    userLoadingStatus,
    dispatch,
    entrySuccessUserDataStatus,
  ]);

  onMessage(messaging, (payload) => {
    console.log("Foreground Message Received===>. ", payload);

    if (payload?.data?.isPushNotification !== "YES") {
      dispatch(setReceivingCallStatus(true));
      dispatch(setCallerData(payload));
    }
    // ...
  });

  useEffect(() => {
    if (getCookie("login")) {
      dispatch(
        checkAuthAsync({
          authUserId: entrySuccessUserData?.authUserId,
          deviceId: entrySuccessUserData?.deviceId,
          history,
        })
      );
    }
  }, [entrySuccessUserData]);

  const initialLogout = useCallback(
    (info) => {
      dispatch(logoutAsync(info));
      // info?.history.push("/");
      setCookie("login", "", 0);
    },
    [dispatch]
  );

  console.log("user ======> =============", user, getCookie("login"));
  // initialLogout();
  // setCookie("login", "", 0);

  if (!user && !getCookie("login")) {
    return <AdminApp />;
    // return <EntryApp />;
  }

  if (user?.portalType === PORTAL_TYPE_IMM) {
    return (
      <>
        {/* <Mainstate> */}
          <GlobalStyles />
          <AdminApp />
        {/* </Mainstate> */}
      </>
    );
  }

  return <Loader />;
}
