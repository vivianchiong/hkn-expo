import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity, Keyboard, SafeAreaView, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import keys from './config/keys';
import {signUp} from './api/firebaseMethods';

export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePress = () => {
    if (!email) {
      Alert.alert('Email field is required!');
    } else if (!password) {
      Alert.alert('Password field is required!');
    } else {
      signUp(email, password);
      setEmail('');
      setPassword('');
      Alert.alert('Sign up clicked!');
    }
  };

  if (firebase.apps.length === 0) {
    console.log('Connected with Firebase!')
    firebase.initializeApp(keys);
  }

  return (
    <SafeAreaView>
     <View style={styles.container}>
       <Text style={styles.text}>Create Account</Text>

       <ScrollView onBlur={Keyboard.dismiss}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter email"
            value={email}
            onChangeText={(email) => setEmail(email)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.textInput}
            placeholder="Enter password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
       </ScrollView>
     </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    padding: 10,
    backgroundColor: '#000000',
    alignSelf: 'center',
    marginTop: '25%',

  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },

  text: {
    textAlign: 'center',
    fontSize: 24,
    margin: '15%',
    color: 'black',
  },

  textInput: {
    width: 300,
    fontSize: 18,
    borderWidth: 1,
    borderColor:'black',
    padding: 10,
    margin: 5,
  },
});