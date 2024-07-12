import {Text, View, StyleSheet, Image, Button} from 'react-native';
import React, {Component} from 'react';
import {Icon} from '@rneui/base/dist/Icon';

const RegistrationSuccessful = (p: any) => {
  function GotoHome() {
    //NAVIGATE TO HOME PAGE
    p.navigation.navigate('Home');
  }
  return (
    <View style={Sty.container}>
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
          marginTop: 200,
          borderRadius: 20,
          marginHorizontal: 20,
          height: 500,
        }}>
        <View
          style={{
            marginTop: 150,
            marginHorizontal: 20,
          }}>
          <Icon name={'check-circle'} size={100} color={'#F2994A'} />

          <Text
            style={{
              fontSize: 30,
              color: '#000000',
              fontWeight: '400',
              marginLeft: 20,
              marginTop: 50,
              textAlign: 'center',
            }}>
            {'Registration Successsfully Completed!'}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: 100,
          borderRadius: 50,
        }}>
        <Button onPress={GotoHome} title="Home" color="#F2994A" />
      </View>
    </View>
  );
};

export default RegistrationSuccessful;

const Sty = StyleSheet.create({
  container: {
    flex: 1,
  },
});
