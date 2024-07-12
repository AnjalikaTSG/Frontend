import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { useAuth } from '../Navigation/AuthContext';

const EditProfileScreen = () => {
    const { user } = useAuth(); // change logged job poster details
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setCompanyName(user.CompanyName || '');
            setAddress(user.Address || '');
            setCity(user.City || '');
            setFirstName(user.FirstName || '');
            setLastName(user.LastName || '');
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        try {
            console.log(user)
            const response = await axios.put(`http://10.0.2.2:3000/updateProfile/${user.email}`, {
                CompanyName: companyName,
                Address: address,
                city: city,
                FirstName: firstName,
                LastName: lastName,
            });

            if (response.status === 200) {
                setMessage('Profile updated successfully');
            } else {
                setMessage('Error updating profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.backgroundImage}
                source={require('../Assets/background.png')}
                resizeMode="cover"
            />
            <Text style={styles.headerText}>Edit Profile Info</Text>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Company Name:</Text>
                <TextInput
                    style={styles.input}
                    value={companyName}
                    onChangeText={setCompanyName}
                />
                <Text style={styles.label}>Address:</Text>
                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                />
                <Text style={styles.label}>City:</Text>
                <TextInput
                    style={styles.input}
                    value={city}
                    onChangeText={setCity}
                />
                <Text style={styles.label}>First Name:</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <Text style={styles.label}>Last Name:</Text>
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                />
                <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                    <Text style={styles.buttonText}>Update Profile</Text>
                </TouchableOpacity>
                {message && <Text style={styles.message}>{message}</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'#000000',
        marginHorizontal:25,
        marginTop:50,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    formContainer: {
        backgroundColor: '#FCF8F8',
        marginTop: 50,
        borderRadius: 20,
        marginHorizontal: 30,
        padding: 20,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#F2994A',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    message: {
        marginTop: 10,
        color: 'green',
    },
});

export default EditProfileScreen;
