import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const MobileVerificationScreen = ({ route, navigation }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const phoneNumber = route?.params?.phoneNumber || '';

  const verifyCode = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verify-mobile', {
        phoneNumber,
        code,
      });
      if (response.data.success) {
        // Navigate to EmailVerificationScreen upon successful verification
        navigation.navigate('EmailVerificationScreen', { phoneNumber });
      } else {
        setError('Invalid verification code');
      }
    } catch (error) {
      console.error('Error verifying code', error);
      setError('Failed to verify code');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />
      <View
        style={{
          backgroundColor: '#FCF8F8',
          marginTop: 300,
          borderRadius: 20,
          marginHorizontal: 25,
          height: 400,
        }}>
        <Text style={styles.label}>Enter Mobile Verification Code:</Text>
        <TextInput
          style={styles.input}
          placeholder="Verification Code"
          value={code}
          onChangeText={text => setCode(text)}
          keyboardType="numeric"
        />
        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity onPress={verifyCode} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 80,
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 25,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F2994A',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MobileVerificationScreen;
