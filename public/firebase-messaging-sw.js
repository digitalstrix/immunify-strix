// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config

// const apiKey = process.env.REACT_APP_FIREBASE_API_KEY
// const authDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
// const databaseURL = process.env.REACT_APP_FIREBASE_DB_URL
// const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID
// const storageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
// const messagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID
// const appId = process.env.REACT_APP_FIREBASE_APP_ID
// const measurementId = process.env.REACT_APP_MEASSUREMENT_ID

const firebaseConfig = {
  // apiKey,
  // authDomain,
  // databaseURL,
  // projectId,
  // storageBucket,
  // messagingSenderId,
  // appId,
  // measurementId,
  apiKey: "AIzaSyDQik-tWbR5DRktHm_oY2sqaWhCicD1BM0",
  authDomain: "imm-parent-test.firebaseapp.com",
  databaseURL: "https://imm-parent-test.firebaseio.com",
  projectId: "imm-parent-test",
  storageBucket: "imm-parent-test.appspot.com",
  messagingSenderId: "83020582788",
  appId: "1:83020582788:web:b8cbdcfe12082c5ed497d1",
  measurementId: "G-46JC7XH173",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message---- ", payload);

  const notificationTitleCall = "Incoming Call";
  const notificationOptionsCall = {
    body: "Video Call From: Dr. " + payload?.data?.userName,
    icon: "./favicon.ico",
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    requireInteraction: true,
    actions: [{ action: "ACCEPT", title: "Accept" }],
  };

  if(!payload?.data?.isPushNotification){
    self.registration.showNotification(notificationTitleCall, notificationOptionsCall);
  }

  self.addEventListener("notificationclick", (e) => {
    // Close the notification popout
    e.notification.close();
    // Get all the Window clients
    e.waitUntil(
      clients.matchAll({ type: "window" }).then((clientsArr) => {
        // If a Window tab matching the targeted URL already exists, focus that;
        const hadWindowToFocus = clientsArr.some((windowClient) =>
          windowClient.url === "http://localhost:3000"
            ? (windowClient.focus(), true)
            : false
        );
        // Otherwise, open a new tab to the applicable URL and focus it.
        if (!hadWindowToFocus)

        var uri = encodeURIComponent(`${payload?.data?.token}&uid=${payload?.data?.uid}&channel=${payload?.data?.channel}&slotId=${payload?.data?.slotId}&userName=${payload?.data?.userName}`)
          clients
            .openWindow(
              `http://localhost:3000/call-view?token=${uri}`
            )
            .then((windowClient) =>
              windowClient ? windowClient.focus() : null
            );
      })
    );
  });
});
