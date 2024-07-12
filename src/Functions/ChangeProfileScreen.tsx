// import React, { useState, useContext } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
// import axios from 'axios';
// import { AuthContext } from '../Navigation/AuthContext'; // Adjust the path to your AuthProvider

// const ChangeProfileScreen = ({ navigation }) => {
//     const { user } = useContext(AuthContext);
//     const jobPosterId = user?.jobPosterId; // Safely accessing jobPosterId

//     if (!jobPosterId) {
//         Alert.alert('Error', 'User not logged in or jobPosterId not found');
//         return null;
//     }

//     const [companyName, setCompanyName] = useState('');
//     const [address, setAddress] = useState('');
//     const [city, setCity] = useState('');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');

//     const handleUpdateJob = () => {
//         const updateData = {
//             CompanyName: companyName,
//             Address: address,
//             city: city,
//             FirstName: firstName,
//             LastName: lastName,
//         };

//         axios.put(`http://10.0.2.2:3000/update-job/${jobPosterId}`, updateData)
//             .then(response => {
//                 Alert.alert('Success', 'Job updated successfully');
//                 navigation.goBack();
//             })
//             .catch(error => {
//                 console.error('Error updating job:', error);
//                 Alert.alert('Error', 'Error updating job');
//             });
//     };

//     return (
//         <View style={styles.container}>
//             <Image
//                 style={styles.backgroundImage}
//                 source={require('../Assets/background.png')}
//                 resizeMode="cover"
//             />
//             <View style={styles.formContainer}>
//                 <Text style={styles.label}>Company Name:</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={companyName}
//                     onChangeText={setCompanyName}
//                 />
//                 <Text style={styles.label}>Address:</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={address}
//                     onChangeText={setAddress}
//                 />
//                 <Text style={styles.label}>City:</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={city}
//                     onChangeText={setCity}
//                 />
//                 <Text style={styles.label}>First Name:</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={firstName}
//                     onChangeText={setFirstName}
//                 />
//                 <Text style={styles.label}>Last Name:</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={lastName}
//                     onChangeText={setLastName}
//                 />
//                 <Button title="Update Job" onPress={handleUpdateJob} />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     backgroundImage: {
//         width: '100%',
//         height: '100%',
//         position: 'absolute',
//     },
//     formContainer: {
//         flex: 1,
//         backgroundColor: '#FCF8F8',
//         marginTop: 200,
//         borderRadius: 20,
//         marginHorizontal: 20,
//         padding: 16,
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 8,
//     },
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 16,
//         paddingHorizontal: 8,
//     },
// });

// export default ChangeProfileScreen;
