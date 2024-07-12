import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../Navigation/AuthContext';
import { RadioButton } from 'react-native-paper';

const PostJobScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    selectedTitle: '',
    job_date: new Date(),
    amount_of_seekers: '',
    work_hours: '',
    hourly_rate: '',
    status: 'Pending',
    job_poster: user ? user.email : '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formErrors, setFormErrors] = useState({
    selectedTitle: '',
    amount_of_seekers: '',
    work_hours: '',
    hourly_rate: '',
  });

  const jobTitles = ['Food Server', 'Kitchen Helper', 'Cleaner', 'Decoration Creator'];

  const handleTitleSelection = (title) => {
    setFormData({ ...formData, selectedTitle: title });
    setFormErrors({ ...formErrors, selectedTitle: '' });
    console.log('Selected title:', title);
  };

  const handleChange = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'amount_of_seekers':
        if (value.trim() === '') {
          errorMessage = 'Amount Of Seekers is required';
        } else if (parseInt(value) < 1) {
          errorMessage = 'Number of Seekers must be at least 1';
        }
        break;
      case 'work_hours':
        if (value.trim() === '') {
          errorMessage = 'Work Hours is required';
        }
        break;
      case 'hourly_rate':
        if (value.trim() === '') {
          errorMessage = 'Hourly Rate is required';
        }
        break;
      default:
        break;
    }

    setFormErrors({ ...formErrors, [name]: errorMessage });
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.job_date;
    setFormData({ ...formData, job_date: currentDate });
    setShowDatePicker(false);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const postSubmit = async () => {
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const fieldValue = formData[key];
        if (key === 'selectedTitle' && !fieldValue) {
          setFormErrors({ ...formErrors, [key]: 'Please select a job title' });
          return;
        }
        if (!fieldValue || (typeof fieldValue === 'string' && fieldValue.trim() === '')) {
          setFormErrors({ ...formErrors, [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required` });
          return;
        }
      }
    }

    // Ensure formData includes selectedTitle correctly
const formattedFormData = {
  ...formData,
  job_date: formData.job_date.toISOString().split('T')[0],
  selectedTitle: formData.selectedTitle, // Ensure selectedTitle is explicitly included
};

try {
  const response = await axios.post('http://10.0.2.2:3000/postJob', formattedFormData);
  console.log('Response:', response.data);
  Alert.alert('Success', 'Job posted successfully.', [{ text: 'OK', onPress: navigateToHome }]);
} catch (error) {
  console.error('Error posting job:', error);
  let errorMessage = 'Error posting job. Please try again.';
  if (error.response) {
    errorMessage = error.response.data.message || errorMessage;
  }
  Alert.alert('Error', errorMessage, [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
}


    setFormData({
      selectedTitle: '',
      job_date: new Date(),
      amount_of_seekers: '',
      work_hours: '',
      hourly_rate: '',
      status: 'Pending',
      job_poster: user ? user.email : '',
    });

    setFormErrors({
      selectedTitle: '',
      amount_of_seekers: '',
      work_hours: '',
      hourly_rate: '',
    });
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />
      <Text style={styles.header}>Post the Jobs</Text>
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Title:</Text>
            <View style={styles.radioContainer}>
              {jobTitles.map((title) => (
                <View key={title} style={styles.radioButtonContainer}>
                  <RadioButton
                    value={title}
                    status={formData.selectedTitle === title ? 'checked' : 'unchecked'}
                    onPress={() => handleTitleSelection(title)}
                  />
                  <Text style={styles.radioLabel}>{title}</Text>
                </View>
              ))}
              {formErrors.selectedTitle !== '' && <Text style={styles.error}>{formErrors.selectedTitle}</Text>}
            </View>

            <Text style={styles.label}>Job Date:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Job Date"
                placeholderTextColor={'#000000'}
                value={formData.job_date.toDateString()}
                onTouchStart={toggleDatePicker}
                editable={true}
              />
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={formData.job_date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <Text style={styles.label}>Amount Of Seekers:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Amount Of Seekers"
                placeholderTextColor={'#000000'}
                value={formData.amount_of_seekers}
                onChangeText={text => handleChange('amount_of_seekers', text)}
              />
              {formErrors.amount_of_seekers !== '' && (
                <Text style={styles.error}>{formErrors.amount_of_seekers}</Text>
              )}
            </View>

            <Text style={styles.label}>Work Hours:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Work Hours"
                placeholderTextColor={'#000000'}
                value={formData.work_hours}
                onChangeText={text => handleChange('work_hours', text)}
              />
              {formErrors.work_hours !== '' && <Text style={styles.error}>{formErrors.work_hours}</Text>}
            </View>

            <Text style={styles.label}>Hourly Rate:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Hourly Rate"
                placeholderTextColor={'#000000'}
                value={formData.hourly_rate}
                onChangeText={text => handleChange('hourly_rate', text)}
              />
              {formErrors.hourly_rate !== '' && (
                <Text style={styles.error}>{formErrors.hourly_rate}</Text>
              )}
            </View>

            <TouchableOpacity onPress={postSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </GestureHandlerRootView>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 30,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  inputContainer: {
    backgroundColor: '#FCF8F8',
    borderRadius: 20,
    height: 60,
    marginVertical: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 15,
    color: '#000000',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 15,
  },
  button: {
    backgroundColor: '#F2994A',
    borderRadius: 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
    fontWeight: 'bold',
    color: '#000000',
  },
  radioContainer: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  radioLabel: {
    fontSize: 14,
    color: '#000000',
  },
});

export default PostJobScreen;
