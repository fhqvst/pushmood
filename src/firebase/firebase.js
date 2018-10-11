import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as secrets from '../constants/secrets';

const config = {
  apiKey: secrets.API_KEY,
  authDomain: secrets.AUTH_DOMAIN,
  databaseURL: secrets.DB_URL,
  projectId: secrets.PROJECT_ID,
  storageBucket: secrets.STORAGE_BUCKET,
  messagingSenderId: secrets.MESSAGING_SENDER_ID
};

// initialize it, if it isn't
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

export {
  auth,
  db,
};
