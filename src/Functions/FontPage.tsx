import {Text, View, Image, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';

const FontPage = (p: any) => {
  function GotoSecond() {
    p.navigation.navigate('SecondPage');
  }

  return (
    <View style={Sty.container}>
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
          fontSize: 35,
          color: '#000000',
          fontWeight: '600',
          marginTop: 3,
          marginLeft: 30,
        }}>
        {'Find a Perfect Job Match'}
      </Text>
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 80,
        }}>
        <TouchableOpacity
          onPress={GotoSecond}
          style={{
            backgroundColor: '#F2994A',
            paddingVertical: 8,
            paddingHorizontal: 20,
            borderRadius: 5,
            alignItems:'center',
          }}>
          <Text style={{color: 'white', fontSize: 16}}>Let us get start!</Text>
        </TouchableOpacity>
        
      </View>
      
    </View>
  );
};

export default FontPage;

const Sty = StyleSheet.create({
  container: {
    flex: 1,
  },
});