import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../Navigation/AuthContext'; 

const ViewJobsScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth(); // Get the logged-in user's information
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!user || !user.email) {
      Alert.alert('Error', 'User email is not available');
      return;
    }
    
    try {
      const response = await axios.get('http://10.0.2.2:3000/displayallJob', {
        params: { jobPosterEmail: user.email }
      });
      console.log('Fetched jobs:', response.data);  // Check fetched data
      if (response.data) {
        setJobs(response.data);
      } else {
        console.error('Failed to fetch jobs');
        Alert.alert('Error', 'Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs', error);
      Alert.alert('Error', 'Error fetching jobs');
    }
  };

  const handleEditJob = (job_id) => {
    navigation.navigate('EditJobsScreen', { job_id });
  };

  const renderItem = ({ item }) => (
    <View style={styles.jobItem}>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Job Title:</Text>
        <Text>{item.title}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Posted Date:</Text>
        <Text>{item.posted_date}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Job Date:</Text>
        <Text>{item.job_date}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Amount of Seekers:</Text>
        <Text>{item.amount_of_seekers}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Work Hours:</Text>
        <Text>{item.work_hours}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Hourly Rate:</Text>
        <Text>{item.hourly_rate}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Status:</Text>
        <Text>{item.status}</Text>
      </View>
      <TouchableOpacity
        style={styles.editIcon}
        onPress={() => handleEditJob(item.tempory_job_id)}
      >
        <Icon name={'pencil'} size={30} color={'#F2994A'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: '120%',
          height: '100%',
          position: 'absolute',
        }}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />
      <Text
        style={{
          fontSize: 25,
          color: '#000000',
          fontWeight: '400',
          marginLeft: 15,
          marginTop: 50,
        }}
      >
        View Posted Jobs
      </Text>
      <View
        style={{
          backgroundColor: '#FCF8F8',
          marginTop: 20,
          borderRadius: 20,
          marginHorizontal: 20,
          flex: 1,
          padding: 10,
        }}
      >
        <FlatList
          data={jobs}
          renderItem={renderItem}
          keyExtractor={(item) => item.tempory_job_id.toString()}
        />
      </View>
    </View>
  );
};

export default ViewJobsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  jobItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  section: {
    marginBottom: 10,
  },
  sectionLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
