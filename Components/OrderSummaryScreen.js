import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import CommonDataManager from '../DataManager/DataManager';

const OrderSummaryScreen = ({ route, navigation }) => {
    const params = route.params;

    const handlePlaceOrder = async () => {
        try {
            let commonData = CommonDataManager.getInstance();
            let result = await commonData.setUserOrdersToStorage(params);
            if (result) {
                Alert.alert(
                    "Order Placed",
                    "Your Order has been placed successfully.",
                    [
                        {
                            text: "OK",
                            onPress: () => { navigation.navigate('PlaceOrder') }
                        },
                    ]
                );
            } else {
                alert('Something went wrong. Please try again.')
            }

        } catch (e) {
            console.warn('exception: ' + e);
        }
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
                        <Text style={styles.labelStyle}>{params.rName}</Text>
                    </View>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Receiver's Ph No</Text>
                        <Text style={styles.labelStyle}>{params.phone}</Text>
                    </View>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Pick Up</Text>
                        <Text style={styles.labelStyle}>{params.pickUpAddress}</Text>
                    </View>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Drop Off</Text>
                        <Text style={styles.labelStyle}>{params.dropOffAddress}</Text>
                    </View>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Package Type</Text>
                        <Text style={styles.labelStyle}>{params.type}</Text>
                    </View>
                    <View style={styles.SectionStyle}>
                        <Text style={styles.labelStyle}>Instructions</Text>
                        <Text style={styles.labelStyle}>{params.instructions}</Text>
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