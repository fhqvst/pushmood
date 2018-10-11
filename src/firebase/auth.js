import firebase from 'firebase/app';
import { auth } from './firebase';

const githubAuthProvider = new firebase.auth.GithubAuthProvider();

export const signup = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const signin = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signInWithGithub = () =>
  auth.signInWithPopup(githubAuthProvider);

export const signout = () =>
  auth.signOut();

export const reset = (email) =>
  auth.sendPasswordResetEmail(email);

export const update = (password) =>
  auth.currentUser.updatePassword(password);

export const getCurrentUserId = () =>
  auth.currentUser.uid


