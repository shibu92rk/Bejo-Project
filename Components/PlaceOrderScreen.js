import React, { useState, useEffect, createRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import PacakgeDetailsScreen from './PacakgeDetailsScreen';
import {
    Keyboard,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

const PlaceOrderScreen = ({ navigation }) => {
    const [startOrder, setStartOrder] = useState(false);
    const [location, setLocation] = useState(null);
    const [pickUpAddress, setPickUpAddress] = useState('');
    const [dropOffAddress, setDropOffAddress] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            console.warn('Location received: ' + location.coords.latitude + ' ' + location.coords.longitude);
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        })();
    }, []);

    const handleStartOrder = () => {
        setStartOrder(true);
    };

    const handleNext = () => {
        navigation.navigate('PackageDetails');
        // if (pickUpAddress != null && dropOffAddress != null) {
        //     navigation.navigate('PacakgeDetailsScreen');
        // }
    };

    return (
        <View style={styles.mainBody}>
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleStartOrder}>
                <Text style={styles.buttonTextStyle}>Place an Order</Text>
            </TouchableOpacity>
            {startOrder == true && errorMsg == null ? (
                <View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(pickUpAddress) =>
                                setPickUpAddress(pickUpAddress)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Pickup Address"
                            placeholderTextColor="#8b9cb5"
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(dropOffAddress) =>
                                setDropOffAddress(dropOffAddress)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Drop Off Address"
                            placeholderTextColor="#8b9cb5"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    <MapView style={styles.mapStyle}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        initialRegion={location}>
                        <Marker coordinate={location}
                            pinColor="green" />
                    </MapView>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleNext}>
                        <Text style={styles.buttonTextStyle}>Next</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};
export default PlaceOrderScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        alignSelf: 'stretch',
        alignContent: 'center',

    },
    buttonStyle: {
        backgroundColor: '#007aff',
        borderWidth: 0,
        color: '#007aff',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 10,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: 'gray',
    },
    mapStyle: {
        width: '100%',
        height: '60%',
        marginTop: 10,
    }
});


