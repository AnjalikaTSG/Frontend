import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const JobCategory = (p:any) => {
  const navigation = useNavigation(); // Hook to access navigation object

  const handleCategoryPress = (PostJobScreen: any) => {
    p.navigation.navigate('PostJobScreen');
  };
  

  const renderCategory = (iconName: string, text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined, PostJobScreen: string) => (
    <TouchableOpacity
      style={Sty.category}
      onPress={() => handleCategoryPress(PostJobScreen)}>
      <View style={Sty.categoryContent}>
        <Icon name={iconName} size={30} color="#F2994A" style={Sty.icon} />
        <Text style={Sty.categoryText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

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
      <Text
        style={{
          fontSize: 40,
          color: '#000000',
          fontWeight: '600',
          marginTop: 90,
          marginLeft: 20,
        }}>
        {'Job Category'}
      </Text>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          marginHorizontal: 30,
          marginTop: 20,
        }}>
        {renderCategory('cutlery', 'Food Server', 'PostJobsScreen')}
        {renderCategory('spoon', 'Kitchen Helper', 'PostJobsScreen')}
        {renderCategory('paint-brush', 'Cleaner', 'PostJobsScreen')}
        {renderCategory('tree', 'Decoration Creator', 'PostJobsScreen')}
      </View>
    </View>
  );
};

export default JobCategory;

const Sty = StyleSheet.create({
  container: {
    flex: 1,
  },
  category: {
    borderRadius: 20,
    margin: 10,
    marginTop: 2,
    height: 100,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FCF8F8',
    height: 90,
  },
  icon: {
    marginRight: 10,
  },
  categoryText: {
    fontSize: 18,
  },
});