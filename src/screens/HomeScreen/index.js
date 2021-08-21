import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { removeAccessToken } from '../../ultils/storage';

export default function HomeScreen() {

    const dispatch = useDispatch();

    const logOutHandel = async () => {
        await removeAccessToken();
        dispatch({ type: 'LOGOUT' });
    }
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={() => logOutHandel()}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    }
});
