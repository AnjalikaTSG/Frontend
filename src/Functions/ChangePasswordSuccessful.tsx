import { Text, View,StyleSheet,Image } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'



const ChangePasswordSuccessful = () => {
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
      {/*<Text
          style={{
            fontSize: 30,
            color: '#000000',
            fontWeight: '400',
            marginLeft: 20,
            marginTop:50,
            textAlign: 'center',
          }}>
          {'Thank you!'}
        </Text>*/}
      <View 
      style={{
        backgroundColor: '#FCF8F8',
        marginTop:200,
        borderRadius:20,
        marginHorizontal:20,
        height:500,
      }}>
        <View
        style={{
            marginTop:150,
            marginHorizontal:20,
          }}>
            <View style={{
              alignItems:'center',
            }}>
        <Icon name={'check-circle-o'} size={100}  color={'#F2994A'}/>
        </View>
        <Text
          style={{
            fontSize: 30,
            color: '#000000',
            fontWeight: '400',
            marginLeft: 20,
            marginTop:50,
            textAlign: 'center',
          }}>
          {'Password changed!'}
        </Text>
      </View>
      </View>
    </View>
  );
}

export default ChangePasswordSuccessful

const Sty=StyleSheet.create({
    container:{
      flex:1,
    },
  })
