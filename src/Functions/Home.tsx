import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useAuth} from '../Navigation/AuthContext'; // Import your AuthContext
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const containerSize = Math.min(screenWidth, screenHeight) / 4;

const Home = ({navigation}) => {
  const {user} = useAuth(); // Get userEmail from AuthContext
  const [reviews, setReviews] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [badge, setBadge] = useState('blue');
  const [rate, setRate] = useState(0);
  const [name, setName] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (user && user.email) {
      fetchPosterReviews(user.email);
    }
  }, [user]);

  const fetchPosterReviews = async EmailAddress => {
    try {
      setIsLoading(true);
      const resp = await axios.get(
        `http://10.0.2.2:3000/getDataDashBoard/${EmailAddress}`,
      );

      if (resp.status === 200) {
        setName(resp.data.firstName);
        setBadge(resp.data.badge);
        setRate(resp.data.rates);
        setReviews(resp.data.reviews);
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const RateCard = ({name, rates, review}) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewCardHeader}>
        <View style={{width: '60%'}}>
          <Text style={styles.posterName}>{name}</Text>
        </View>
        <View
          style={{
            width: '40%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <MaterialIcons name={'star'} size={20} color={'#FCE404'} />
          <MaterialIcons
            name={'star'}
            size={20}
            color={rates >= 2 ? '#FCE404' : '#C3C3C3'}
          />
          <MaterialIcons
            name={'star'}
            size={20}
            color={rates >= 3 ? '#FCE404' : '#C3C3C3'}
          />
          <MaterialIcons
            name={'star'}
            size={20}
            color={rates >= 4 ? '#FCE404' : '#C3C3C3'}
          />
          <MaterialIcons
            name={'star'}
            size={20}
            color={rates === 5 ? '#FCE404' : '#C3C3C3'}
          />
        </View>
      </View>
      <View>
        <Text style={styles.reviewTxt}>{review}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('PostJobs')}>
          <Icon name="add-circle-outline" size={40} color="#FFFFFF" />
          <Text style={styles.optionText}>Post Job</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('ViewJobsScreen')}>
          <Icon name="eye-outline" size={40} color="#FFFFFF" />
          <Text style={styles.optionText}>View Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('ViewJobsScreen')}>
          <Icon name="pencil" size={40} color="#FFFFFF" />
          <Text style={styles.optionText}>Edit Jobs</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('CancelJobScreen')}>
          <Icon name="trash-outline" size={40} color="#FFFFFF" />
          <Text style={styles.optionText}>Delete Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('ViewJobs')}>
          <Icon name="chatbox" size={40} color="#FFFFFF" />
          <Text style={styles.optionText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('RateSeekerScreen')}>
          <Icon name="star-outline" size={40} color="#FFFFFF" />
          <Text style={styles.optionText}>Give Ratings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon name="person-outline" size={40} color="#FFFFFF" />
          <Text style={styles.optionText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Display overall rating */}
      <View style={styles.rateCard}>
        <View style={{height: '100%', width: '70%'}}>
          <Text style={styles.rateCardTitle}>My Ratings</Text>
          <View style={styles.starContainer}>
            <Ionicons
              name="star"
              size={35}
              color={rate >= 1 ? '#FCE404' : '#C3C3C3'}
            />
            <Ionicons
              name="star"
              size={35}
              color={rate >= 2 ? '#FCE404' : '#C3C3C3'}
              style={styles.star}
            />
            <Ionicons
              name="star"
              size={35}
              color={rate >= 3 ? '#FCE404' : '#C3C3C3'}
              style={styles.star}
            />
            <Ionicons
              name="star"
              size={35}
              color={rate >= 4 ? '#FCE404' : '#C3C3C3'}
              style={styles.star}
            />
            <Ionicons
              name="star"
              size={35}
              color={rate >= 5 ? '#FCE404' : '#C3C3C3'}
              style={styles.star}
            />
          </View>
        </View>
        <View
          style={{
            height: '100%',
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.rateNumber}>{rate}</Text>
        </View>
      </View>

      {/* Display reviews */}
      <Text style={styles.reviewTitle}>My Reviews</Text>
      {isLoading ? (
        <ActivityIndicator
          style={{marginTop: 20}}
          size="large"
          color="#F2994A"
        />
      ) : isError ? (
        <Text style={styles.noContentTxt}>Failed to fetch reviews</Text>
      ) : reviews.length > 0 ? (
        reviews.map((review, index) => (
          <RateCard
            key={index}
            name={review.seekerName}
            rates={review.rate}
            review={review.review}
          />
        ))
      ) : (
        <Text style={styles.noContentTxt}>No reviews to show</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2994A',
    borderRadius: 10,
    width: containerSize,
    height: containerSize,
    marginHorizontal: 10,
    elevation: 3,
  },
  starContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  star: {
    marginHorizontal: 4,
  },
  rateCardTitle: {
    fontSize: 18,
    color: '#373737',
    fontWeight: '600',
  },
  rateCard: {
    width: '90%',
    height: 100,
    backgroundColor: '#FFF',
    borderRadius: 20,
    elevation: 5,
    alignSelf: 'center',
    padding: 10,
    marginVertical: 15,
    flexDirection: 'row',
  },
  rateNumber: {
    fontSize: 50,
    color: '#373737',
    fontWeight: '700',
  },
  rectangularOption: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  posterName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FE8235',
  },
  noContentTxt: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '500',
    fontSize: 14,
    color: '#9AA5B1',
  },
  reviewTxt: {
    fontSize: 14,
    color: '#373737',
    textAlign: 'justify',
  },
  reviewCardHeader: {
    width: '100%',
    flexDirection: 'row',
  },

  reviewCard: {
    width: '90%',
    backgroundColor: '#FFF',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 5,
    elevation: 5,
    padding: 10,
  },

  reviewTitle: {
    textAlign: 'left',
    fontSize: 16,
    color: '#373737',
    fontWeight: '700',
  },
  reviewContainer: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewItem: {
    marginBottom: 10,
  },
  optionText: {
    marginTop: 10,
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  rectangularoptionText: {
    marginTop: 10,
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  noReviewsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666666',
  },
});

export default Home;
