import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const submitRating = async (seekerEmail, rating, review, posterEmail, jobId) => {
  try {
    const response = await axios.post('http://10.0.2.2:3000/rateSeeker', {
      seeker: seekerEmail,
      rate: rating,
      review: review,
      posterEmail: posterEmail,
      jobId: jobId
    });

    console.log('Rating submission response:', response.data);
    // Optionally handle success message or further actions after successful submission
  } catch (error) {
    console.error('Error submitting rating:', error);
    // Handle error cases, e.g., show error message to user
  }
};

const Ratings = ({ route }) => {
  const { jobTitle } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log('Rating submitted for jobTitle:', jobTitle, 'Rating:', rating, 'Comment:', comment);
    
    // Call submitRating function to send the rating data to server
    submitRating('hmpridmika@gmail.com', rating, comment, 'bcd@example.com', 180);
    
    // Navigate to the success screen
    navigation.navigate('RatingSuccessful');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />
      <Text style={styles.title}>Rate Job {jobTitle}</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Give some love:</Text>
        <StarRating
          rating={rating}
          onChange={setRating}
          starSize={55}
          starStyle={styles.star}
          fractional={false}
        />
        <Text style={styles.label}>Write a review:</Text>
        <TextInput
          style={styles.input}
          placeholder="Add your comment"
          multiline
          maxLength={300}
          value={comment}
          onChangeText={setComment}
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={[styles.button, { backgroundColor: '#F2994A' }]}  // Apply background color here
        >
          Submit
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  title: {
    fontSize: 30,
    color: '#000000',
    fontWeight: '400',
    marginLeft: 20,
    marginTop: 50,
    textAlign: 'left',
  },
  contentContainer: {
    backgroundColor: '#FCF8F8',
    marginTop: 50,
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  star: {
    marginVertical: 20,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default Ratings;
