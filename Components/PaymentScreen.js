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


const PaymentScreen = ({ navigation, route }) => {
    const params = route.params;
    const handleNext = () => {
        navigation.navigate({
            name: 'OrderSummary',
            params: {
                rName: params.rName,
                phone: params.rPhNo,
                instructions: params.instructions,
                type: params.size
            },
            merge: true,
        });
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
                            onChangeText={(UserName) => setUserName(UserName)}
                            keyboardType={'number-pad'}
                            placeholder="Credit Card Number"
                            placeholderTextColor="#8b9cb5"
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserName) => setUserName(UserName)}
                            keyboardType={'number-pad'}
                            placeholder="Expiry"
                            placeholderTextColor="#8b9cb5"
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserName) => setUserName(UserName)}
                            keyboardType={'number-pad'}
                            placeholder="Enter CVV"
                            placeholderTextColor="#8b9cb5"
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserName) => setUserName(UserName)}
                            placeholder="Zipcode"
                            placeholderTextColor="#8b9cb5"
                            returnKeyType="next"
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