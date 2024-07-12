import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import { useAuth } from '../Navigation/AuthContext';

const EditJobScreen = ({ route, navigation }) => {
    const { job_id } = route.params;
    const { user } = useAuth(); // Assuming useAuth provides the logged-in user's information
    const [jobData, setJobData] = useState({
        title: '',
        job_date: '',
        amount_of_seekers: 0, // Initialize as integer
        work_hours: 0.0, // Initialize as float
        hourly_rate: 0.0, // Initialize as float
        job_poster: user.email, // Assuming user.email is the logged-in user's email
    });

    useEffect(() => {
        if (job_id) {
            fetchJobData(job_id);
        }
    }, [job_id]);

    const fetchJobData = async (id) => {
        try {
            const response = await axios.get(`http://10.0.2.2:3000/displayJob/${id}`);
            if (response.data) {
                console.log('Fetched job data:', response.data); // Log fetched data
                setJobData({
                    title: response.data.title || '',
                    job_date: response.data.job_date || '',
                    amount_of_seekers: response.data.amount_of_seekers || 0, // Ensure it's parsed as integer
                    work_hours: response.data.work_hours || 0.0, // Ensure it's parsed as float
                    hourly_rate: response.data.hourly_rate || 0.0, // Ensure it's parsed as float
                    job_poster: response.data.job_poster || user.email,
                });
            } else {
                console.error('Failed to fetch job data');
                Alert.alert('Error', 'Failed to fetch job data');
            }
        } catch (error) {
            console.error('Error fetching job data', error);
            Alert.alert('Error', 'Error fetching job data');
        }
    };

    const handleSaveChanges = async () => {
        const formattedJobDate = jobData.job_date ? jobData.job_date.slice(0, 10) : '';
    
        try {
            const response = await axios.put(`http://10.0.2.2:3000/updateJob/${job_id}`, {
                ...jobData,
                job_date: formattedJobDate,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log('Axios PUT request response:', response.data);
    
            if (response.status === 200 && response.data.message === "Job updated successfully") {
                // Refetch the updated job data
                fetchJobData(job_id);
    
                // Show success message
                Alert.alert('Success', 'Job successfully updated');
                navigation.goBack();
            }
        } catch (error) {
            console.error('Error updating job:', error.message);
            Alert.alert('Error', 'Error updating job');
        }
    };
    
    const handleChange = (key, value) => {
        setJobData(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    return (
        <View style={styles.container}>
        <Image
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          source={require('../Assets/background.png')}
          resizeMode="cover"
        />
        <Text style={styles.headerText}>Edit Jobs</Text>
        
            <View style={styles.formContainer}>
                <Text style={styles.labelText}>Job Title:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Job Title"
                    value={jobData.title}
                    onChangeText={text => handleChange('title', text)}
                />

                <Text style={styles.labelText}>Job Date:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Job Date"
                    value={jobData.job_date}
                    onChangeText={text => handleChange('job_date', text)}
                />

                <Text style={styles.labelText}>Amount of Seekers:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Amount of Seekers"
                    value={jobData.amount_of_seekers.toString()} // Convert to string for TextInput
                    onChangeText={text => handleChange('amount_of_seekers', parseInt(text))}
                    keyboardType="numeric" // Set keyboard type to numeric
                />

                <Text style={styles.labelText}>Work Hours:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Work Hours"
                    value={jobData.work_hours.toString()} // Convert to string for TextInput
                    onChangeText={text => handleChange('work_hours', parseFloat(text))}
                    keyboardType="numeric" // Set keyboard type to numeric
                />

                <Text style={styles.labelText}>Hourly Rate:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Hourly Rate"
                    value={jobData.hourly_rate.toString()} // Convert to string for TextInput
                    onChangeText={text => handleChange('hourly_rate', parseFloat(text))}
                    keyboardType="numeric" // Set keyboard type to numeric
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'#000000',
        marginHorizontal:25,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        width: '80%', 
        height: 'auto', 
        alignSelf: 'center', 
      },
    labelText: {
        fontSize: 18,
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#F2994A',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default EditJobScreen;
