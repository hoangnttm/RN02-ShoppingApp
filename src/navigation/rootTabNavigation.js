import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, CategoryScreen, CartScreen, UserProfileScreen, DiscoveryScreen, FavoriteScreen } from '../screens';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globalStyles, { globalTabBackground, primaryColor, textColor } from '../theme/globalStyles';

const Tab = createBottomTabNavigator();


const RootTab = () => {
    const screenOptions = ({ route }) => ({

        tabBarIcon: ({ focused, color }) => {
            let iconName;
            const backgroundColor = focused ? primaryColor : textColor;
            const size = focused ? 24 : 20;
            switch (route.name) {
                case 'CategoryTab':
                    iconName = 'list-ul';
                    break;
                case 'DiscoveryTab':
                    iconName = 'compass';
                    break;
                case 'FavoriteTab':
                    iconName = 'heart';
                    break;
                case 'CartTab':
                    iconName = 'shopping-cart';
                    break;
                case 'UserProfileTab':
                    iconName = 'user';
                    break;
            }
            return (
                <FontAwesome name={iconName} size={size} color={backgroundColor} />
            );
        }
    });
    return (
        <Tab.Navigator sceneContainerStyle={{ backgroundColor: globalTabBackground }}
            screenOptions={screenOptions}
            tabBarOptions={
                {
                    showLabel: false,
                    style: {
                        borderTopWidth: 0,
                        borderRadius: 50,
                        height:65,
                    },

                }}>
            <Tab.Screen name='CategoryTab' component={CategoryScreen} />
            <Tab.Screen name='DiscoveryTab' component={DiscoveryScreen} />
            <Tab.Screen name='FavoriteTab' component={FavoriteScreen} />
            <Tab.Screen name='CartTab' component={CartScreen} />
            <Tab.Screen name='UserProfileTab' component={UserProfileScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        paddingHorizontal: 20,
        borderRadius: 20
    }

});

export default RootTab;
