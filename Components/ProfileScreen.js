import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.mainBody}>
            <Text>Profile Screen</Text>
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

    },
});


