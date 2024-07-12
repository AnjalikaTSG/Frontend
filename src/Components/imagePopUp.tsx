import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ImagePopUp = (props: any) => {
    return (
        <Modal animationIn={'zoomIn'} isVisible={true} backdropOpacity={0.4} onBackdropPress={() => props.closeModal()} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleTxt}> 
                        UPLOAD IMAGE{'\n'}FROM
                    </Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => props.openCamera()}>
                        <View style={styles.icon}>
                            <FontAwesome name="camera-retro" size={35} color={'#FFF'} />
                        </View>
                        <Text style={styles.iconTxt}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => props.openFiles()}>
                        <View style={styles.icon}>
                            <FontAwesome name="file-photo-o" size={35} color={'#FFF'} />
                        </View>
                        <Text style={styles.iconTxt}>Files</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    iconTxt: {
        fontSize: 12,
        color: '#FE8235',
        fontWeight: '500'
    },

    icon: {
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: '#FE8235',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconContainer: {
        width: '100%',
        height: '70%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '15%'
    },

    titleTxt: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FE8235',
        textAlign: 'center'
    },

    titleContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#FFF',
        elevation: 10,
        width: '70%',
        height: '25%'
    },
});

export default ImagePopUp;