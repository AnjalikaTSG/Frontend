import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import { useAuth } from '../Navigation/AuthContext'; // Assuming you have an AuthProvider for context

const RateSeekerScreen = ({ navigation }) => {
  const [jobData, setJobData] = useState([]);
  const { user } = useAuth(); // Get the logged-in user's email

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        console.log('Fetching job data with email:', user.email); // Log the email being used
        const response = await axios.get('http://10.0.2.2:3000/displayJobData', { // Replace with your local IP address
          params: { job_poster: user.email },
        });
        console.log('Response data:', response.data); // Log the response data
        setJobData(response.data);
      } catch (error) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      }
    };

    fetchJobData();
  }, [user.email]);

  const handleRatePress = (jobId) => {
    navigation.navigate('Ratings', { jobId });
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>Job Date: {item.job_date}</Paragraph>
        <Paragraph>Seeker: {item.assigned_job_seeker}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => handleRatePress(item.jobId)}
          buttonColor="#F2994A"
        >
          Rate
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Image
        style={{
          width: '125%',
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
          marginTop: 50,
          textAlign: 'left',
        }}
      >
        Rate and Review
      </Text>
      <View
        style={{
          backgroundColor: '#FCF8F8',
          marginTop: 50,
          borderRadius: 20,
          marginHorizontal: 20,
          height: 'auto',
        }}
      >
        <FlatList
          data={jobData}
          renderItem={renderItem}
          keyExtractor={(item) => item.jobId.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginVertical: 8,
  },
});

export default RateSeekerScreen;
