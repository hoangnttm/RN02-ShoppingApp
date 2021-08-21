import { StyleSheet } from "react-native";

const globalFontSize = 15;
const globalHorizontal = 10;
const globalTabBackground = "#eee";
const textColor = "#464646";
const primaryColor = "#F05C00";
const secondColor = "#F18A00";

const globalStyles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: globalHorizontal,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoIcon: {
        width: 80,
        height: 80,
        borderRadius: 80
    },
    inputTextStyle: {
        color: textColor,
        fontFamily: 'Gill Sans',
        fontSize: globalFontSize,
    },
    logoText: {
        fontSize: 17,
        marginTop: 20,
        fontFamily: 'Gill Sans',
        textAlign: 'right',
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    linearGradient: {
        flex: 1,
        borderBottomLeftRadius: 100,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    linearGradientButton: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomLeftRadius: 100,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    primaryColor: {
        color: '#F05C00',
    },
    secondColor: {
        color: '#F18A00',
    },
    primaryBackground: {
        backgroundColor: '#F05C00',
    },
    secondBackground: {
        backgroundColor: '#F18A00',
    },
    errorText: {
        color: 'red',
        textAlign: 'right',
        paddingHorizontal: 15,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '700'
    },
    backButtonStyle: {
        height: 25,
        width: 35,
        alignItems: 'center',
    },
    shadowEffect: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    circleButton: {
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondColor,
    },
    headerContainer: {
        height: 45,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:secondColor,
    },
    headerLabel:{
        color:'#fff',
        fontSize:20,
    }

});

export default globalStyles;
export { globalTabBackground, primaryColor, secondColor, textColor, globalFontSize };
