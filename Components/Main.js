import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import OrderScreen from './OrderScreen';

const Tab = createBottomTabNavigator();
const MainScreen = ({ navigation }) => {
    return (
        <Tab.Navigator initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Profile') {
                        iconName = 'person';
                    } else if (route.name === 'Orders') {
                        iconName = 'information-circle';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Orders" component={OrderScreen} />
        </Tab.Navigator>

    );
};
export default MainScreen;

