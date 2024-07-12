import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install and link react-native-vector-icons

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    email: '',
    telephone: '',
    password: '',
    city: '',
    firstName: '',
    lastName: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const registerSubmit = async () => {
    let errors = {};
    let hasError = false;

    // Basic validation for required fields
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const value = formData[key];
        if (!value.trim()) {
          errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
          hasError = true;
        } else {
          errors[key] = '';
        }
      }
    }

    // Email validation
    if (formData.email.trim() && !isValidEmail(formData.email)) {
      errors.email = 'Invalid Email Address';
      hasError = true;
    }

    // Telephone number validation
    if (!/^\d{10}$/.test(formData.telephone)) {
      errors.telephone = 'Telephone number must be 10 digits';
      hasError = true;
    } else {
      errors.telephone = '';
    }

    // Update errors state if there are validation errors
    if (hasError) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      try {
        const response = await axios.post('http://10.0.2.2:3000/register', {
          Password: formData.password,
          EmailAddress: formData.email,
          TpNumber: formData.telephone,
          CompanyName: formData.companyName,
          Address: formData.address,
          city: formData.city,
          FirstName: formData.firstName,
          LastName: formData.lastName,
          proofDoc_front: "https://wallpapers.com/images/hd/tommy-shelby-4k-concerned-2id280orhcyqgpqy.jpg",
          proofDoc_back: "https://wallpapers.com/images/hd/tommy-shelby-4k-concerned-2id280orhcyqgpqy.jpg"
        });

        if (response.status === 201) {
          navigation.navigate('EmailVerificationScreen', {
            email: formData.email,
            telephone: formData.telephone
          });
        } else {
          Alert.alert('Registration failed', 'Please try again later.');
        }
      } catch (error) {
        console.error("Error occurred during registration:", error.message);
        if (error.response) {
          if (error.response.status === 400 && error.response.data.error === "User with the same details already exists.") {
            Alert.alert('Registration failed', 'User with the same details already exists.');
          } else {
            Alert.alert('Registration failed', 'An error occurred. Please try again later.');
          }
          console.error("Response data:", error.response.data);
        }
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          source={require('../Assets/background.png')}
          resizeMode="cover"
        />
        <Text style={styles.header}>Register</Text>
        <Text style={styles.subheader}>Register as Job Poster</Text>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.formContainer}>
            {/* Form fields */}
            <Text style={styles.label}>First Name:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="First Name"
                placeholderTextColor={'#000000'}
                value={formData.firstName}
                onChangeText={text => handleChange('firstName', text)}
              />
              {formErrors.firstName && (
                <Text style={styles.error}>{formErrors.firstName}</Text>
              )}
            </View>
            <Text style={styles.label}>Last Name:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Last Name"
                placeholderTextColor={'#000000'}
                value={formData.lastName}
                onChangeText={text => handleChange('lastName', text)}
              />
              {formErrors.lastName && (
                <Text style={styles.error}>{formErrors.lastName}</Text>
              )}
            </View>
            <Text style={styles.label}>Company Name:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Company Name"
                placeholderTextColor={'#000000'}
                value={formData.companyName}
                onChangeText={text => handleChange('companyName', text)}
              />
              {formErrors.companyName && (
                <Text style={styles.error}>{formErrors.companyName}</Text>
              )}
            </View>
            <Text style={styles.label}>Password:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={'#000000'}
                value={formData.password}
                onChangeText={text => handleChange('password', text)}
                secureTextEntry={!passwordVisible} // Hide password input
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.togglePassword}
              >
                <Icon name={passwordVisible ? "eye" : "eye-slash"} size={20} color="#000" />
              </TouchableOpacity>
              {formErrors.password && (
                <Text style={styles.error}>{formErrors.password}</Text>
              )}
            </View>
            <Text style={styles.label}>Address:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Address"
                placeholderTextColor={'#000000'}
                value={formData.address}
                onChangeText={text => handleChange('address', text)}
              />
              {formErrors.address && (
                <Text style={styles.error}>{formErrors.address}</Text>
              )}
            </View>
            <Text style={styles.label}>City:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="City"
                placeholderTextColor={'#000000'}
                value={formData.city}
                onChangeText={text => handleChange('city', text)}
              />
              {formErrors.city && (
                <Text style={styles.error}>{formErrors.city}</Text>
              )}
            </View>
            <Text style={styles.label}>Email Address:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email Address"
                placeholderTextColor={'#000000'}
                value={formData.email}
                onChangeText={text => handleChange('email', text)}
              />
              {formErrors.email && (
                <Text style={styles.error}>{formErrors.email}</Text>
              )}
            </View>
            <Text style={styles.label}>Telephone Number:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Telephone Number"
                placeholderTextColor={'#000000'}
                value={formData.telephone}
                onChangeText={text => {
                  const formattedText = text.replace(/\D/g, '').slice(0, 10);
                  handleChange('telephone', formattedText);
                }}
                keyboardType="numeric"
              />
              {formErrors.telephone && (
                <Text style={styles.error}>{formErrors.telephone}</Text>
              )}
            </View>
            <TouchableOpacity
              onPress={registerSubmit}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 10,
              color: '#000000',
              fontWeight: '600',
              marginTop: 2,
              marginLeft: 20,
              textAlign: 'center',
            }}>
            {'Already have an account? '}
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={{ fontSize: 12, color: '#F2994A', textDecorationLine: 'underline' }}>
                Login
              </Text>
            </TouchableOpacity>
          </Text>
        </KeyboardAwareScrollView>
      </View>
    </GestureHandlerRootView>
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
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    height: 60,
    marginVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  togglePassword: {
    position: 'absolute',
    right: 20,
    top: 20,
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
  header: {
    fontSize: 30,
    color: '#000000',
    marginTop: 60,
    marginHorizontal: 20,
  },
  subheader: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  buttonContainer: {
    backgroundColor: '#F2994A',
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

export default RegisterScreen;
