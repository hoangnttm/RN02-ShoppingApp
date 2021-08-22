import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userLogin } from '../../apis/userLoginApi';
import { ShoesIcon } from '../../assets';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../ultils/storage';
import { useNavigation } from '@react-navigation/native';
import TextInputIcon from '../../component/TextInput';
import globalStyles from '../../theme/globalStyles';

export default function LoginScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();


    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email không được bỏ trống')
            .email('Email không hợp lệ'),
        password: Yup.string()
            .min(6, 'Password Too Short!')
            .max(12, 'Password Too Long!')
            .required('Password không được bỏ trống'),
    });


    useEffect(() => {
        //console.log("Didmount");
    }, [])
    const navigateSignUp = () => {
        console.log("Pressed");
        navigation.navigate('SignupScreen');
    }

    const handleSubmitFormik = values => {
        console.log(values);
        userLogin(values)
            .then(async res => {
                if (res.data.statusCode === 200) {
                    console.log(res.data.content.accessToken);

                   await setAccessToken(res.data.content.accessToken);
                    dispatch({ type: 'SET_ACCESS_TOKEN', payload: { accessToken: res.data.content.accessToken } })
                }

            })
            .catch(err => console.log(err));
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#F05C00', '#F18A00']} style={styles.linearGradient}>
                <View style={globalStyles.logoContainer}>
                    <View >
                        <Image source={ShoesIcon} style={globalStyles.logoIcon} />
                    </View>
                    <Text style={globalStyles.logoText}>
                        Login
                    </Text>
                </View>
            </LinearGradient>
            <View style={styles.loginForm}>
                <Formik
                    validationSchema={loginSchema}
                    initialValues={{ email: '', password: '' }}
                    onSubmit={handleSubmitFormik}>
                    {({ values, handleSubmit, handleChange, errors }) => (
                        <>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <View>
                                    <TextInputIcon onChangeText={handleChange('email')}
                                        iconName='envelope'
                                        isError={errors.email}
                                        placeholder={'Email'} />
                                    {errors.email && (
                                        <Text style={styles.errorText}>{errors.email}</Text>
                                    )}
                                </View>
                                <View>
                                    <TextInputIcon secureTextEntry={true}
                                        onChangeText={handleChange('password')}
                                        value={values.password} iconName='key'
                                        isError={errors.email} placeholder={'Password'} />
                                    {errors.password && (
                                        <Text style={styles.errorText}>{errors.password}</Text>
                                    )}
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <TouchableOpacity
                                    onPress={handleSubmit}>
                                    <LinearGradient start={{ x: 0, y: 0 }} style={styles.signInButton} end={{ x: 1, y: 0 }} colors={['#F18A00', '#F05C00']}>

                                        <Text style={[globalStyles.logoText, { marginTop: 0 }]}>LOGIN</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <Text style={[globalStyles.inputTextStyle,{ textAlign: 'center', marginBottom: 10 }]}>Don't have an account? <Text onPress={() => navigateSignUp()} style={{ color: '#F05C00', fontSize: 18, fontWeight: '900' }}> Sign up</Text>
                            </Text>
                        </>
                    )}
                </Formik>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    loginForm: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
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
    inputError: {
        borderColor: 'red',
    },
   
    signInButton: {
        paddingVertical: 12,
        marginVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
    },
});