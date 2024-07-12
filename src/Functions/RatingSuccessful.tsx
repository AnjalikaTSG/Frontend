import React from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const RatingSuccessful = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('RateSeekerScreen');
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
      <Text
        style={{
          fontSize: 30,
          color: '#000000',
          fontWeight: '400',
          marginLeft: 20,
          marginTop: 100,
          textAlign: 'center',
        }}
      >
        Thank you!
      </Text>
      <View
        style={{
          backgroundColor: '#FCF8F8',
          marginTop: 50,
          borderRadius: 20,
          marginHorizontal: 20,
          height: 500,
        }}
      >
        <View
          style={{
            marginTop: 150,
            marginHorizontal: 20,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Icon name="envelope-o" size={100} color="#F2994A" />
          </View>
          <Text
            style={{
              fontSize: 30,
              color: '#000000',
              fontWeight: '400',
              marginLeft: 20,
              marginTop: 50,
              textAlign: 'center',
            }}
          >
            Review has been sent!
          </Text>
          <View style={{ marginTop: 20 }}>
            <Button
              title="Go Back to Jobs"
              onPress={handleGoBack}
              color="#F2994A"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default RatingSuccessful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
