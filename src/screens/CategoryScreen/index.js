import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../HomeScreen';
import globalStyles, { globalTabBackground, primaryColor } from '../../theme/globalStyles';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CatelogyDetailScreen from './CatelogyDetailScreen';

const Tab = createMaterialTopTabNavigator();

export default function CategoryScreen() {
    const _catalogies = [

        {
            id: "MEN",
            category: "MEN",
            alias: "men",
            categoryChild: "[{\"id\":\"NIKE\",\"category\":\"NIKE\"},{\"id\":\"ADIDAS\",\"category\":\"ADIDAS\"},{\"id\":\"VANS_CONVERSE\",\"category\":\"VANS CONVERSE\"}]",
            categoryParent: "[]",
            deleted: false,
            productList: "[2,4,6,8,10,12,14,16,18,19]"
        },
        {
            id: "WOMEN",
            alias: "women",
            category: "WOMEN",
            categoryChild: "[{\"id\":\"NIKE\",\"category\":\"NIKE\"},{\"id\":\"ADIDAS\",\"category\":\"ADIDAS\"},{\"id\":\"VANS_CONVERSE\",\"category\":\"VANS CONVERSE\"}]",
            categoryParent: "[]",
            deleted: false,
            productList: "[1,3,5,7,9,10,11,13,15,17,18,19]"
        }

    ];
    return (
        <View style={[globalStyles.rootContainer]}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLable}>Categories</Text>
                <TouchableOpacity style={styles.searchButton}>
                    <FontAwesome5 name={'search'} style={[globalStyles.inputTextStyle, { fontSize: 20 }]}></FontAwesome5>
                </TouchableOpacity>

            </View>
            <Tab.Navigator backBehavior='none' tabBarPosition='top'
                sceneContainerStyle={{ backgroundColor: null }} lazy
                tabBarOptions={{
                    bounces: true,
                    activeTintColor: primaryColor,
                    inactiveTintColor: '#454545',

                    scrollEnabled: true,
                    showIcon: false,
                    showLabel: true,
                    labelStyle: {
                        fontSize: 16,
                        fontWeight:'bold',
                    },
                    style: {
                        backgroundColor: null,
                        borderWidth: 0,
                        borderBottomWidth: 0,
                        elevation: 0,
                        padding: 0,
                        maxWidth: '100%',
                        maxWidth: '100%',
                    },
                    indicatorStyle: {
                        backgroundColor: primaryColor,
                        height: 0,
                    },
                }}
            >
                {
                    _catalogies.map((item) => <Tab.Screen key={item.alias} name={item.category} children={() => <CatelogyDetailScreen params={item} />} />)
                }
            </Tab.Navigator>
        </View>
    );
}
const styles = StyleSheet.create({
    headerContainer: {
        height: 60,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        flexDirection: 'row',
        marginHorizontal:5
    },
    headerLable: {
        ...globalStyles.inputTextStyle,
        fontSize: 30,
        fontWeight: '800',
    },
    searchButton: {
        ...globalStyles.inputTextStyle,
        height: 30,
        width: 30,
    },

});
