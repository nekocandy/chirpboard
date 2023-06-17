importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAl9OBBZtFsxzX0A79XY5YhDzdRKlG2Iew",
  authDomain: "chirpboard-6ef65.firebaseapp.com",
  projectId: "chirpboard-6ef65",
  storageBucket: "chirpboard-6ef65.appspot.com",
  messagingSenderId: "232246526337",
  appId: "1:232246526337:web:e1ed45afe830e227f6e880",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
