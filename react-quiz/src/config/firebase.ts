import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
//import {getFirestore } from 'firebase/compat/firestore';
import config from '../config/config';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const Firebase = firebase.initializeApp(config.firebase);

export const Providers = {
    google: new firebase.auth.GoogleAuthProvider()
}

export const auth = firebase.auth();
export const db = getFirestore(Firebase);
export default Firebase;