import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import CommonDataManager from '../DataManager/DataManager';

const ProfileScreen = ({ navigation }) => {
    const user = CommonDataManager.getInstance().getUser();
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
                        <Text style={styles.labelStyle}>Username</Text>
                        <Text style={styles.labelStyle}>{user.userName}</Text>
                    </View>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Email</Text>
                        <Text style={styles.labelStyle}>{user.email}</Text>
                    </View>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Age</Text>
                        <Text style={styles.labelStyle}>{user.age}</Text>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default ProfileScreen;

const styles = StyleSheet.create({
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
        color: 'black',
        textAlignVertical: 'center',
        marginRight: 10,
        paddingTop: 10,
    },
});


