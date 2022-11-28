import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

var creditcardutils = require('creditcardutils');
const PaymentScreen = ({ navigation, route }) => {
    const [ccNumber, setCCNumber] = useState(null);
    const [expiry, setExpiry] = useState(null);
    const [cvv, setCVV] = useState(null);
    const [zipcode, setZipcode] = useState(null);

    const params = route.params;

    const handleNext = () => {
        console.warn(params);
        if (!ccNumber) {
            alert('Please fill Credit Card Number');
            return;
        }
        if (!expiry) {
            alert('Please fill Expiry ');
            return;
        }
        if (!cvv) {
            alert('Please enter cvv');
            return;
        }
        if (!zipcode) {
            alert('Please enter zipcode');
            return;
        }
        // if (!creditcardutils.validateCardNumber(ccNumber)) {
        //     console.warn('cc number : ' + ccNumber);
        //     alert('Not a valid  Credit card number');
        //     return;
        // }
        navigation.navigate(
            'OrderSummary',
            {
                ccNumber: ccNumber,
                ...params
            },
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(ccNumber) =>
                                setCCNumber(ccNumber)
                            }
                            maxLength={15}
                            keyboardType={'number-pad'}
                            returnKeyType={'done'}
                            placeholder="Credit Card Number"
                            placeholderTextColor="#8b9cb5"
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(expiry) => setExpiry(expiry)}
                            keyboardType={'number-pad'}
                            placeholder="Expiry"
                            placeholderTextColor="#8b9cb5"
                            returnKeyType="done"
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(cvv) => setCVV(cvv)}
                            keyboardType={'number-pad'}
                            maxLength={3}
                            placeholder="Enter CVV"
                            placeholderTextColor="#8b9cb5"
                            returnKeyType="done"
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(zipcode) => setZipcode(zipcode)}
                            placeholder="Zipcode"
                            placeholderTextColor="#8b9cb5"
                            returnKeyType="done"
                            blurOnSubmit={false}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleNext}>
                        <Text style={styles.buttonTextStyle}>Next</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default PaymentScreen;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderColor: '#000',
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
    labelStyle: {
        flex: 1,
        color: 'black',
        textAlignVertical: 'center',
        marginRight: 10,
        paddingTop: 10,
    },
});