import React, { useState, createRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Alert,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errortext, setErrortext] = useState('');

    const emailInputRef = createRef();
    const ageInputRef = createRef();
    const addressInputRef = createRef();
    const passwordInputRef = createRef();

    const validateEmail = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // console.warn(userEmail);
        if (reg.test(userEmail) === true) {
            return true;
        } else {
            alert("Please enter a valid email address!");
            return false;
        }
    }



    const storeUserData = async (user) => {
        try {
            const jsonValue = JSON.stringify(user)
            await AsyncStorage.setItem(user.email, jsonValue)
            Alert.alert(
                "User Registered.",
                "User registered successfully.",
                [
                    {
                        text: "OK",
                        onPress: () => {

                            navigation.navigate('Login');
                        }
                    },
                ]
            );
        } catch (e) {
            console.warn('exception: ' + e);
        }
    }

    const handleSubmitButton = () => {
        setErrortext('');
        if (!userName) {
            alert('Please fill Name');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userAge) {
            alert('Please fill Age');
            return;
        }
        if (!userAddress) {
            alert('Please fill Address');
            return;
        }
        if (!validateEmail()) {
            return;
        }
        const user = {
            userId: userName + Math.random(),
            email: userEmail,
            password: userPassword,
            userName: userName,
            userAddress: userAddress,
            userAge: userAge
        };
        storeUserData(user);
    }

    return (
        <View style={styles.mainContainer}>
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
                            placeholder="Enter Name"
                            placeholderTextColor="gray"
                            returnKeyType="next"
                            autoCapitalize={false}
                            onSubmitEditing={() =>
                                emailInputRef.current && emailInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                            placeholder="Enter Email"
                            placeholderTextColor="gray"
                            keyboardType="email-address"
                            ref={emailInputRef}
                            returnKeyType="next"
                            autoCapitalize={false}
                            onSubmitEditing={() =>
                                passwordInputRef.current &&
                                passwordInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserPassword) =>
                                setUserPassword(UserPassword)
                            }
                            placeholder="Enter Password"
                            placeholderTextColor="gray"
                            ref={passwordInputRef}
                            autoCapitalize={false}
                            returnKeyType="next"
                            secureTextEntry={true}
                            onSubmitEditing={() =>
                                ageInputRef.current &&
                                ageInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserAge) => setUserAge(UserAge)}
                            placeholder="Enter Age"
                            placeholderTextColor="gray"
                            keyboardType="numeric"
                            ref={ageInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                addressInputRef.current &&
                                addressInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(UserAddress) =>
                                setUserAddress(UserAddress)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Address"
                            placeholderTextColor="gray"
                            ref={addressInputRef}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default RegisterScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#2f2f2f',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
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
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        color: 'white',
        borderColor: '#dadae8',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});