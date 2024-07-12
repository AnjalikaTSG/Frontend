import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import axios from 'axios';
import { useAuth } from '../Navigation/AuthContext'; // Adjust the path
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icon library

interface LoginFieldProps {
  navigation: any;
}

interface FormData {
  username: string;
  password: string;
}

const LoginField = ({ navigation }: LoginFieldProps) => {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [formErrors, setFormErrors] = useState<FormData & { errorMessage: string }>({
    username: '',
    password: '',
    errorMessage: '',
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginSubmit = () => {
    let errors: Partial<FormData> = {};
    let hasError = false;

    // Validate all input fields
    for (const key in formData) {
      const value = formData[key as keyof FormData];
      if (!value.trim()) {
        errors[key as keyof FormData] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        hasError = true;
      } else {
        errors[key as keyof FormData] = '';
      }
    }

    if (hasError) {
      setFormErrors({
        ...formErrors,
        ...errors,
        errorMessage: 'Please fill all fields',
      });
    } else {
      // Perform the login request
      axios.post('http://10.0.2.2:3000/login', {
        EmailAddress: formData.username,
        Password: formData.password,
      })
      .then(response => {
        // Set user email in context
        setUser({ email: formData.username });

        // Clear form data
        setFormData({
          username: '',
          password: '',
        });

        // Clear form errors
        setFormErrors({
          username: '',
          password: '',
          errorMessage: '',
        });

        // Navigate to the login success page
        navigation.navigate('LoginSuccessful');
      })
      .catch(error => {
        console.error('Login error:', error);
        setFormErrors({
          ...formErrors,
          errorMessage: 'Login failed. Please try again.',
        });
      });
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 0.85 }}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Username:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            placeholderTextColor={'#000000'}
            value={formData.username}
            onChangeText={text => handleChange('username', text)}
          />
          {formErrors.username !== '' && (
            <Text style={styles.error}>{formErrors.username}</Text>
          )}
        </View>
        <Text style={styles.label}>Password:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={'#000000'}
            value={formData.password}
            onChangeText={text => handleChange('password', text)}
            secureTextEntry={!passwordVisible} // Toggle visibility
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.icon}>
            <Icon name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="#000" />
          </TouchableOpacity>
          {formErrors.password !== '' && (
            <Text style={styles.error}>{formErrors.password}</Text>
          )}
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={loginSubmit}
            style={{
              backgroundColor: '#F2994A',
              paddingVertical: 8,
              paddingHorizontal: 20,
              borderRadius: 5,
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      {formErrors.errorMessage !== '' && (
        <Text style={styles.errorMessage}>{formErrors.errorMessage}</Text>
      )}
      <Text
        style={{
          fontSize: 10,
          color: '#000000',
          fontWeight: '600',
          marginTop: 13,
          marginLeft: 20,
          textAlign: 'center',
        }}>
        {'Let us get started! '}
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={{ fontSize: 12, color: '#F2994A', textDecorationLine: 'underline' }}>
            SignUp
          </Text>
        </TouchableOpacity>
      </Text>
    </GestureHandlerRootView>
  );
};

const LoginScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />
      <Text style={styles.header}>Login</Text>
      <Text style={styles.subheader}>Login as Job Poster</Text>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <LoginField navigation={navigation} />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 30,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  inputContainer: {
    backgroundColor: '#FCF8F8',
    borderRadius: 20,
    height: 60,
    marginVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 15,
    color: '#000000',
  },
  error: {
    color: 'red',
    marginLeft: 15,
  },
  errorMessage: {
    color: 'red',
    marginLeft: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  header: {
    fontSize: 30,
    color: '#000000',
    fontWeight: '600',
    marginTop: 80,
    marginLeft: 20,
  },
  subheader: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '400',
    marginLeft: 20,
  },
  icon: {
    position: 'absolute',
    right: 20,
  },
});

export default LoginScreen;
