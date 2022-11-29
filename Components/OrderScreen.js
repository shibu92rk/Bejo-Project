import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonDataManager from '../DataManager/DataManager';

const OrderScreen = ({ navigation }) => {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userId = CommonDataManager.getInstance().getUserID();
            const key = 'orders' + userId;
            const existingOrders = await AsyncStorage.getItem(key);
            let orders = JSON.parse(existingOrders);
            setOrders(orders);
            console.warn('Orders: ' + orders)
        }
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData().catch(console.error);
        });
        return unsubscribe;
    }, [navigation]);

    const renderItem = (order) => (
        <View style={styles.item}>
            <View style={styles.SectionStyle}>
                <Text style={styles.labelStyle}>Receiver Name</Text>
                <Text style={styles.labelStyle}>{order.type}</Text>
            </View>
            <View style={styles.SectionStyle}>
                <Text style={styles.labelStyle}>Package Type</Text>
                <Text style={styles.labelStyle}>{order.type}</Text>
            </View>
            <View style={styles.SectionStyle}>
                <Text style={styles.labelStyle}>Pick Up Address</Text>
                <Text style={styles.labelStyle}>{order.pickUpAddress}</Text>
            </View>
            <View style={styles.SectionStyle}>
                <Text style={styles.labelStyle}>Drop Off Address</Text>
                <Text style={styles.labelStyle}>{order.dropOffAddress}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.mainBody}>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={item => item.ccNumber}
            />
        </View>
    );
}
//// <Text style={styles.labelStyle}>{order.rName}</Text>
export default OrderScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'black',
    },
    labelStyle: {
        flex: 1,
        color: 'white',
        textAlignVertical: 'center',
        marginRight: 10,
        paddingTop: 10,
    },
    item: {
        padding: 10,
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 1,
        borderColor: 'white',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
    },
    title: {
        flex: 1,
        color: 'white',
        height: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
    },
});


