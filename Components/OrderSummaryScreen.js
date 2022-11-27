import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';


const OrderSummaryScreen = ({ navigation, route }) => {

    const handlePlaceOrder = () => {
        Alert.alert(
            "Order Placed Successfully",
            "Your Order has been placed.",
            [
                {
                    text: "OK",
                    onPress: () => { navigation.navigate('PlaceOrder') }
                },
            ]
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
                        <Text style={styles.labelStyle}>Receiver's Name</Text>
                        <Text style={styles.labelStyle}>route.params?.rName</Text>
                    </View>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Receiver's Ph No</Text>
                        <Text style={styles.labelStyle}>route.params?.rName</Text>
                    </View>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Pick Up</Text>
                        <Text style={styles.labelStyle}>route.params?.pickUp</Text>
                    </View>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Drop Off</Text>
                        <Text style={styles.labelStyle}>route.params?.dropOff</Text>
                    </View>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Package Type</Text>
                        <Text style={styles.labelStyle}>route.params?.type</Text>
                    </View>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Instructions</Text>
                        <Text style={styles.labelStyle}>route.params?.instructions</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handlePlaceOrder}>
                        <Text style={styles.buttonTextStyle}>Place Order</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default OrderSummaryScreen;

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