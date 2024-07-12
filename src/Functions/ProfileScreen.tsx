import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image, Text, Alert } from 'react-native';
import { Title, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import ImagePopUp from '../Components/imagePopUp';
import { firebaseApp } from '../Service/firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import axios from 'axios';
import { AuthContext } from '../Navigation/AuthContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext); // Get the user from AuthContext
  const EmailAddress = user?.email; // Retrieve email address

  const [profileData, setProfileData] = useState({
    CompanyName: '',
    Address: '',
    city: '',
    FirstName: '',
    LastName: '',
    TpNumber: '', 
    profilePic: '',
  });

  // Fetch profile data when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!EmailAddress) throw new Error('Email address is not available');
        console.log(`Fetching profile data for ${EmailAddress}`);
        const response = await axios.get(
          `http://10.0.2.2:3000/displayProfileInfo/${EmailAddress}`,
        );
        console.log('Profile data fetched:', response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        Alert.alert('Error', 'Failed to fetch profile data.');
      }
    };

    fetchProfileData();
  }, [EmailAddress]);

  // Handle image capturing option selecting modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPicSelected, setIsPicSelected] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [isBtnLoading, setIsBtnLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  let errorTitle = '';
  const getErrorTitle = () => errorTitle;
  const setErrorTitle = (value: string) => {
    errorTitle = value;
  };

  let ErrorMsg = '';
  const getErrorMsg = () => ErrorMsg;
  const setErrorMsg = (value: string) => {
    ErrorMsg = value;
  };

  // Handle camera capture
  const captureDoc = async () => {
    setIsModalOpen(false);
    const result: ImagePickerResponse = await launchCamera({
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
      cameraType: 'front',
    });
    if (result.assets) {
      setSelectedImage(result.assets[0].uri);
      setIsPicSelected(true);
      uploadImage();
    }
  };

  // Handle file selection
  const selectDoc = async () => {
    setIsModalOpen(false);
    const result: ImagePickerResponse = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    });
    if (result.assets) {
      setSelectedImage(result.assets[0].uri);
      setIsPicSelected(true);
      uploadImage();
    }
  };

  let firebaseUrl: any;
  // Handle image uploading to Firebase
  const uploadImage = async () => {
    setIsBtnLoading(true);
    try {
      if (!EmailAddress) throw new Error('Email address is not available');
      firebaseApp;
      const storage = getStorage();
      const frontImageName = `${EmailAddress}_profile_pic`;
      const storageRef = ref(storage, frontImageName);
      if (!selectedImage) return;
      const image = await fetch(selectedImage);
      const imageBlob = await image.blob();
      await uploadBytesResumable(storageRef, imageBlob);
      const url = await getDownloadURL(storageRef);
      firebaseUrl = url;
      updateProfilePicture(firebaseUrl);
    } catch (error) {
      console.log(error);
      setErrorTitle('Oops...!!');
      setErrorMsg('Something went wrong');
      setIsBtnLoading(false);
      setIsError(true);
    }
  };

  const updateProfilePicture = async (url: string) => {
    if (!EmailAddress) throw new Error('Email address is not available');
    const resp = await axios.put(
      `http://10.0.2.2:3000/updateProfilePicture/${EmailAddress}`,
      { profilePic: url },
    );
    setProfileData(prevState => ({ ...prevState, profilePic: url })); // Update the profile picture in the state
  };

  const gotoEditProfileScreen = () => {
    navigation.navigate('EditProfileScreen');
  };

  const gotoChangePasswordScreen = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  const gotoLogoutScreen = () => {
    navigation.navigate('LogoutScreen');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />

      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.proPicFrame}>
            {profileData.profilePic || selectedImage ? (
              <Image source={{ uri: profileData.profilePic || selectedImage }} style={styles.profilePic} />
            ) : (
              <Image source={require('../Assets/profilePic.jpg')} style={styles.profilePic} />
            )}
          </View>
          <Feather
            name={'camera'}
            size={25}
            color={'#777777'}
            style={styles.editIcon}
            onPress={() => setIsModalOpen(true)}
          />
        </View>
        <View style={styles.infoContainer}>
          <Title style={styles.title}>{profileData.CompanyName}</Title>
          <View style={styles.caption}>
            <Text>{profileData.FirstName}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="map-pin" color="#777777" size={20} />
            <Text style={styles.infoText}>
              {profileData.Address}, {profileData.city}
            </Text>
          </View>
          <View style={styles.row}>
            {/* Icon and text for telephone number */}
            <Icon name="phone" color="#777777" size={20} />
            <Text style={styles.infoText}>{profileData.TpNumber}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="envelope-o" color="#777777" size={20} />
            <Text style={styles.infoText}>{EmailAddress}</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <TouchableRipple onPress={gotoEditProfileScreen}>
            <View style={styles.menuItem}>
              <Icon name="pencil" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={gotoChangePasswordScreen}>
            <View style={styles.menuItem}>
              <Icon name="lock" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Change Password</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="question-circle" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="cog" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={gotoLogoutScreen}>
            <View style={styles.menuItem}>
              <Icon name="sign-out" color="#FF6347" size={25} />
              <Text style={styles.menuItemText}>Logout</Text>
            </View>
          </TouchableRipple>
        </View>
      </View>

      {isModalOpen && (
        <ImagePopUp
          closeModal={() => setIsModalOpen(false)}
          openCamera={captureDoc}
          openFiles={selectDoc}
        />
      )}
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
  profileContainer: {
    backgroundColor: '#FCF8F8',
    marginTop: 90,
    borderRadius: 20,
    marginHorizontal: 20,
    height: 500,
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  proPicFrame: {
    width: 160,
    height: 160,
    borderRadius: 90,
    borderColor: 'grey',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: '90%',
    height: '90%',
    borderRadius: 90,
  },
  editIcon: {
    position: 'absolute',
    right: 100,
    bottom: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
  },
  infoContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  caption: {
    fontSize: 10,
    color: '#888888',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoText: {
    color: '#777777',
    marginLeft: 10,
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});

export default ProfileScreen;
