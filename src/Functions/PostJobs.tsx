import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const PostJobs = (p: any) => {
  const navigation = useNavigation(); // Get navigation object using useNavigation hook

  function GotoPostJobCategory() { //NAVIGATE TO HOME PAGE
    navigation.navigate('PostJobScreen');
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
          //marginTop: 5,
          marginLeft: 10
        }}
        source={require('../Assets/Girl.png')}
      />
      <Text
        style={{
          fontSize: 22,
          color: '#000000',
          fontWeight: '600',
          marginTop: 5,
          marginLeft: 30,
        }}>
        {'Streamlined Hiring, Maximum impact, post part-time jobs and build your dream team!'}
      </Text>
      <View style={{
        marginHorizontal: 120,
        marginTop: 10,
      }}>
        <TouchableOpacity
          onPress={GotoPostJobCategory}
          style={{
            backgroundColor: '#F2994A',
            paddingVertical: 8,
            paddingHorizontal: 20,
            borderRadius: 5,
            alignItems:'center',
          }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Post the Jobs</Text>
        </TouchableOpacity>
      </View>
      
      
    </View>
  );
}

export default PostJobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
