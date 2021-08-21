import React from 'react'
import { View, TextInput, Text, Modal, StyleSheet } from 'react-native'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import globalStyles, { primaryColor, secondColor, textColor } from '../../theme/globalStyles';


const ModalMessage = (props) => {
    return (
        <Modal animationType={props.animationType}
            transparent={true}
            visible={props.visible}
            style={styles.modalView}
        >
            <View style={styles.modalContentView}>
                <View style={styles.centerView}>
                    <View style={{ flexDirection: 'column' }}>
                        <FontAwesome5 style={{ padding: 5, alignSelf: 'center' }} name={props.icon} size={30} color='#fff' />
                        <Text style={[globalStyles.inputTextStyle, { color: 'white', paddingHorizontal: 5 }]}>
                            {props.message}
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalContentView: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    centerView: {
        height: '20%',
        width: '50%',

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondColor,
        borderRadius: 10,
    },
    modalView: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})
export default ModalMessage;
