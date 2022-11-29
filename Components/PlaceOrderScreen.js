import React, { useState, useEffect, createRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
    Keyboard,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

const googleAPIkey = 'AIzaSyCL38-s6veWRWi966YAQsTBJ-M-5DTFxgA';
Geocoder.init(googleAPIkey);
const PlaceOrderScreen = ({ navigation }) => {
    const [startOrder, setStartOrder] = useState(false);
    const [location, setLocation] = useState(null);
    const [pickUpAddress, setPickUpAddress] = useState('');
    const [pickUpCoords, setPickUpCoords] = useState(null);
    const [dropOffAddress, setDropOffAddress] = useState('');
    const [dropOffCoords, setDropOffCoords] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
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

    const handleSubmitPickUPAddress = () => {
        Geocoder.from(pickUpAddress)
            .then(json => {
                var location = json.results[0].geometry.location;
                setPickUpCoords({
                    latitude: location.lat,
                    longitude: location.lng,
                });
            })
            .catch(error => {
                console.warn(error);
                setPickUpCoords(null);
            }
            );
    };

    const handleSubmitDropOffAddress = () => {
        Geocoder.from(dropOffAddress)
            .then(json => {
                var location = json.results[0].geometry.location;
                setDropOffCoords({
                    latitude: location.lat,
                    longitude: location.lng,
                });
            })
            .catch(error => {
                console.warn(error);
                setDropOffCoords(null);
            }
            );
    };

    const handleNext = () => {
        // navigation.navigate('PackageDetails');
        if (pickUpAddress != '' && dropOffAddress != '') {
            navigation.navigate('PackageDetails', {
                pickUpAddress: pickUpAddress,
                dropOffAddress: dropOffAddress
            })
        } else {
            alert('Enter pickup and drop off location.');
        }
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
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                                handleSubmitPickUPAddress();
                            }}
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
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                                handleSubmitDropOffAddress();
                            }}
                            blurOnSubmit={false}
                        />
                    </View>
                    <MapView style={styles.mapStyle}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        initialRegion={location}>
                        <Marker coordinate={pickUpCoords} />
                        <Marker coordinate={dropOffCoords} />
                        <MapViewDirections
                            origin={pickUpCoords}
                            destination={dropOffCoords}
                            apikey={googleAPIkey} // insert your API Key here
                            strokeWidth={4}
                            strokeColor="#111111"
                        />
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
        backgroundColor: 'black',

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
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: 'gray',
        color: 'white',
    },
    mapStyle: {
        width: '100%',
        height: '60%',
        marginTop: 10,
    }
});


