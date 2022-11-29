import React, { useState, createRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    TextInput,
    Image,
    View,
    Text,
    ScrollView,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import CommonDataManager from '../DataManager/DataManager';

const LoginScreen = ({ navigation }) => {
    let commonData = CommonDataManager.getInstance();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errortext, setErrortext] = useState('');
    const emailInputRef = createRef();
    const passwordInputRef = createRef();

    const verifyUserData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(userEmail);
            // console.warn(JSON.stringify(jsonValue));
            if ((jsonValue) != null) {
                const json = JSON.parse(jsonValue);
                if (json.password == userPassword) {
                    commonData.setUser(json);
                    emailInputRef.current.clear();
                    passwordInputRef.current.clear();
                    navigation.navigate('MainScreen');
                } else {
                    alert('Password is incorrect!');
                    return;
                }
            } else {
                alert('No user is registered with this email. Please enter a valid email.');
            }
        } catch (e) {
            console.warn(e);
            alert('Something went wrong. Please try again later.');
            return;
        }
    }

    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        verifyUserData();
    };

    return (
        <View style={styles.mainBody}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <Image source={require('../assets/Bejo_logo.png')}
                            style={styles.imageContainer} />
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                ref={emailInputRef}
                                onChangeText={(userEmail) =>
                                    setUserEmail(userEmail)
                                }
                                placeholder="Enter Email" //dummy@abc.com
                                placeholderTextColor="gray"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(UserPassword) =>
                                    setUserPassword(UserPassword)
                                }
                                placeholder="Enter Password" //12345
                                placeholderTextColor="gray"
                                keyboardType="default"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
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
                            onPress={handleSubmitPress}>
                            <Text style={styles.buttonTextStyle}>LOGIN</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.registerTextStyle}
                            onPress={() => navigation.navigate('RegisterScreen')}>
                            New Here? Register!
                        </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#2f2f2f'
    },
    imageContainer: {
        height: 200,
        width: 200,
        alignSelf: 'center'
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
        borderColor: 'gray',
        color: 'white',
    },
    registerTextStyle: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});


