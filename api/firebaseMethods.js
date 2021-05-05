import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth'
import {Alert} from 'react-native';

export async function signUp(email, password) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection('users')
      .doc(currentUser.uid)
      .set({
        email: currentUser.email
      });
  } catch (err) {
    Alert.alert('Firebase signup failed!', err.message);
  }
}