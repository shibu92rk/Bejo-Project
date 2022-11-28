import React, { useState, createRef, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from 'react-native';
import CommonDataManager from '../DataManager/DataManager';

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const OrderScreen = ({ navigation }) => {
    var orders = null;

    useEffect(() => {
        orders = CommonDataManager.getInstance().getOrdersFromStorage();
        for (const order in orders) {
            console.warn('order: ' + orders.rName);
        }
    });

    const renderItem = ({ item }) => (
        < Item title={item.title} />
    );

    return (
        <View style={styles.mainBody}>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={item => item.rName}
            />
        </View>
    );
}

export default OrderScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignContent: 'center',

    },
    labelStyle: {
        flex: 1,
        color: 'black',
        textAlignVertical: 'center',
        marginRight: 10,
        paddingTop: 10,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        height: 30,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});


