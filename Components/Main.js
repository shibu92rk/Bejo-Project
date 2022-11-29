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
            tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: 'lightgray',
                activeBackgroundColor: '#3f3f3f',
                inactiveBackgroundColor: '#2f2f2f',
                style: {
                    backgroundColor: '#007aff',
                    paddingBottom: 3
                }
            }}
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
                tabBarActiveTintColor: '#007aff',
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Orders" component={OrderScreen} />
        </Tab.Navigator>

    );
};
export default MainScreen;

