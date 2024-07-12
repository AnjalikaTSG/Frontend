import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const EmailVerificationScreen = ({ navigation, route }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const { email, telephone } = route.params;

  const handleVerification = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/emailVerify', { email, code: verificationCode });
      if (response.status === 200) {
        navigation.navigate('MobileNoVerification', { email, telephone });
      } else {
        setError('Invalid verification code');
      }
    } catch (error) {
      console.error("Error verifying email:", error.message);
      setError('Verification failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Email Verification</Text>
      <Text style={styles.subheader}>Enter the code sent to your email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Verification Code"
          placeholderTextColor="#000000"
          value={verificationCode}
          onChangeText={text => setVerificationCode(text)}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
      <TouchableOpacity onPress={handleVerification} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    height: 60,
    marginVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#367588',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EmailVerificationScreen;
