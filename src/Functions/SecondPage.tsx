import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SecondPage = ({ navigation }) => {
  const GotoThird = () => {
    navigation.navigate('ThirdPage');
  }

  return (
    <View style={styles.container}>
      <Image
        style={{
          marginTop: 10,
          marginHorizontal: 60,
        }}
        source={require('../Assets/Jobs.png')}
      />
      <Image
        style={{
          marginTop: 5,
          marginLeft: 10,
        }}
        source={require('../Assets/Girl.png')}
      />
      <Text
        style={{
          fontSize: 40,
          color: '#000000',
          fontWeight: '600',
          marginTop: 5,
          marginLeft: 30,
        }}>
        {'Find a Perfect Job Match'}
      </Text>
      <View
        style={styles.buttonContainer}>
        <TouchableOpacity onPress={GotoThird} style={[styles.button, { marginRight: 10 }]}>
          <Text style={styles.buttonText}>As Job Poster</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>As Job Seeker</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SecondPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#F2994A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
