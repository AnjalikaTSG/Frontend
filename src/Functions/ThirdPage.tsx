import { Text, View, Image, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native';

const ThirdPage = ({ navigation }) => {
  const GotoLogin = () => {
    navigation.navigate('LoginScreen');
  }

  const GotoRegister = () => {
    navigation.navigate('RegisterScreen');
  }

  return (
    <View style={styles.container}>
      <Image
        style={{
          marginTop: 10,
          marginHorizontal: 60
        }}
        source={require('../Assets/Jobs.png')}
      />
      <Image
        style={{
          marginTop: 5,
          marginLeft: 10
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={GotoLogin} style={[styles.button, { marginRight: 10 }]}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={GotoRegister} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ThirdPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#F2994A',
    paddingVertical: 10, //change the button height
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
