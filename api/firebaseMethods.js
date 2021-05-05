import * as firebase from 'firebase';
import 'firebase/firestore';
import {Alert} from 'react-native';

export async function signUp(email, password, lastName, firstName) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection('users')
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        lastName: lastName,
        firstName: firstName,
      });
  } catch (err) {
    Alert.alert('Signup through firebase failed!', err.message);
  }
}