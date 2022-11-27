import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

const OrderScreen = ({ navigation }) => {
    return (
        <View style={styles.mainBody}>
            <Text>Order Screen</Text>
        </View>
    );
};
export default OrderScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignContent: 'center',

    },
});


