import React from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const TextInputIcon = (props) => {
    return (
        <View style={[styles.inputContainer, props.isError && styles.inputError]}>
            <TextInput
                style={[
                    styles.inputField,
                ]}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                value={props.value}
                secureTextEntry={props.secureTextEntry}
            />
            <FontAwesome5 name={props.iconName} size={20} style={styles.iconTextInput} />

        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        borderRadius: 25,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 3,
    },
    inputError: {
        borderWidth:1, 
        borderColor: 'red'
    },
    iconTextInput: {
        position: 'absolute',
        marginLeft: 20,
        color: '#525252',
        borderWidth: 0,
        alignSelf: 'center'
    }, 
    inputField: {
        marginLeft: 50,
        paddingHorizontal: 5,
        width: '80%',
    },
})
export default TextInputIcon;
