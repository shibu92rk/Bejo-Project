import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PlaceOrderScreen from './PlaceOrderScreen';
import PacakgeDetailsScreen from './PacakgeDetailsScreen';
import OrderSummaryScreen from './OrderSummaryScreen';
import PaymentScreen from './PaymentScreen';


const Stack = createStackNavigator()
const HomeScreen = ({ navigation }) => {
    return <Stack.Navigator initialRouteName="PlaceOrder">
        <Stack.Screen
            name="PlaceOrder"
            component={PlaceOrderScreen}
            options={{ headerShown: false }} />
        <Stack.Screen name="PackageDetails"
            component={PacakgeDetailsScreen}
            options={{
                headerShown: true,
                title: 'Pacakge Details', //Set Header Title
                headerStyle: {
                    backgroundColor: '#307ecc', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
                headerBackTitleVisible: false
            }} />
        <Stack.Screen name="Payment"
            component={PaymentScreen}
            options={{
                headerShown: true,
                title: 'Payment Details', //Set Header Title
                headerStyle: {
                    backgroundColor: '#307ecc', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
                headerBackTitleVisible: false
            }} />
        <Stack.Screen name="OrderSummary"
            component={OrderSummaryScreen}
            options={{
                headerShown: true,
                title: 'Order Summary', //Set Header Title
                headerStyle: {
                    backgroundColor: '#307ecc', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
                headerBackTitleVisible: false
            }} />
    </Stack.Navigator>
};
export default HomeScreen;

