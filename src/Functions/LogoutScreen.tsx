import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LogoutScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // After logout actions are completed, navigate to the login screen
    navigation.navigate('FontPage');
  };

  const handleCancel = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to log out?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15, //button height
  },
  logoutButton: {
    backgroundColor: '#F2994A',
  },
  cancelButton: {
    backgroundColor: '#F2994A',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
