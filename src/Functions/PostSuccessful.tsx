import {Text, View, StyleSheet, Image, Button} from 'react-native';
import React, {Component} from 'react';
import {Icon} from '@rneui/base/dist/Icon';

const PostSuccessful = () => {
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
            {'Successfully posted!'}
          </Text>
        </View>
        {/*<View style={{
          flexDirection:'row',
          marginHorizontal:150,
          marginTop:50,
          //marginHorizontal:50
        }}>
        <Button title="Edit" color="#F2994A"/>
        <Button title="View" color="#C0C0C0"/>
        </View>*/}
    </View>
    </View>
  );
};

export default PostSuccessful;

const Sty = StyleSheet.create({
  container: {
    flex: 1,
  },
});
