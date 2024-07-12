import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import { useAuth } from '../Navigation/AuthContext'; 

// JobItem Component
const JobItem = ({ job, onDelete }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{job.title}</Text>
    <Text style={styles.details}>Posted Date: {job.posted_date}</Text>
    <Text style={styles.details}>Job Date: {job.job_date}</Text>
    <Text style={styles.details}>Work Hours: {job.work_hours}</Text>
    <Text style={styles.details}>Hourly Rate: {job.hourly_rate}</Text>
    <Text style={styles.details}>Number of Seekers: {job.amount_of_seekers}</Text>
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => onDelete(job.tempory_job_id)}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  </View>
);

const CancelJobScreen = () => {
  const { user } = useAuth(); // Get the logged-in user's information
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/displayallJob', {
        params: { jobPosterEmail: user.email } // Send job poster's email as a query parameter
      });
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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://10.0.2.2:3000/deleteJob/${id}`, {
        data: { jobPosterEmail: user.email } // Ensure job poster email is sent with the delete request
      });
  
      if (response.data.message === 'Job deleted successfully') {
        const updatedJobs = jobs.filter(job => job.tempory_job_id !== id);
        setJobs(updatedJobs);
        Alert.alert('Success', 'Job deleted successfully');
      } else {
        Alert.alert('Error', 'Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      Alert.alert('Error', 'Error deleting job');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />
      <Text style={styles.headerText}>
        Cancel/Delete the Jobs
      </Text>
      <View style={styles.jobsContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {jobs.map(job => (
            <JobItem key={job.tempory_job_id} job={job} onDelete={handleDelete} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    width: '112%',
    height: '100%',
    position: 'absolute',
  },
  headerText: {
    fontSize: 25,
    color: '#000000',
    fontWeight: '400',
    marginLeft: 15,
    marginTop: 50,
  },
  jobsContainer: {
    flex: 1,
    backgroundColor: '#FCF8F8',
    marginTop: 30,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#E5E5E5',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CancelJobScreen;
