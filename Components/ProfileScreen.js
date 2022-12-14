import React, { useState } from 'react';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    Keyboard,
    TouchableOpacity,
    View
} from 'react-native';
import CommonDataManager from '../DataManager/DataManager';

const ProfileScreen = ({ navigation }) => {
    let commonData = CommonDataManager.getInstance();
    const [user, setUser] = useState(commonData.getUser());
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userAddress, setUserAddress] = useState('');

    const handleLogout = () => {
        navigation.dispatch(StackActions.popToTop());
    };

    const handleEditOrSaveProfile = async () => {
        try {
            if (isEditing) {
                const userData = {
                    userId: user.userId,
                    email: user.email,
                    password: user.password,
                    userName: userName,
                    userAddress: userAddress,
                    userAge: userAge
                };
                const jsonValue = JSON.stringify(userData);
                await AsyncStorage.setItem(user.email, jsonValue);
                commonData.setUser(userData);
                setUser(userData);
            }
            setIsEditing(!isEditing);
        } catch (e) {
            console.warn('exception: ' + e);
        }

    };

    return (
        <View style={styles.mainBody}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Username</Text>
                        {
                            isEditing ?
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(userName) =>
                                        setUserName(userName)
                                    }
                                    defaultValue={user.userName}
                                    placeholderTextColor='white'
                                    returnKeyType="next"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                                : <Text style={styles.labelStyle}>{user.userName}</Text>}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Email</Text>
                        <Text style={styles.labelStyle}>{user.email}</Text>
                    </View>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Age</Text>
                        {
                            isEditing ?
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(age) =>
                                        setUserAge(age)
                                    }
                                    defaultValue={user.userAge}
                                    placeholderTextColor='white'
                                    returnKeyType="next"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                                : <Text style={styles.labelStyle}>{user.userAge}</Text>}
                    </View>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Address</Text>
                        {
                            isEditing ?
                                <TextInput
                                    style={styles.inputStyle}
                                    onChangeText={(address) =>
                                        setUserAddress(address)
                                    }
                                    defaultValue={user.userAddress}
                                    placeholderTextColor='white'
                                    returnKeyType="next"
                                    onSubmitEditing={Keyboard.dismiss}
                                    blurOnSubmit={false}
                                />
                                : <Text style={styles.labelStyle}>{user.userAddress}</Text>
                        }
                    </View>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleEditOrSaveProfile}>
                        <Text style={styles.buttonTextStyle}>{
                            (!isEditing ? 'Edit Profile' : 'Save Profile')
                        }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleLogout}>
                        <Text style={styles.buttonTextStyle}>Log out</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default ProfileScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#2f2f2f'
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
    labelStyle: {
        flex: 1,
        color: 'white',
        textAlignVertical: 'center',
        marginRight: 10,
        paddingTop: 10,
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        color: 'white',
        borderColor: '#dadae8',
    },
});


