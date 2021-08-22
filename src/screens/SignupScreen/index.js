import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userSignUp } from '../../apis/userLoginApi';
import LinearGradient from 'react-native-linear-gradient';
import { ShoesIcon } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import TextInputIcon from '../../component/TextInput';
import globalStyles from '../../theme/globalStyles';
import { Dropdown } from 'react-native-element-dropdown';
import ModalMessage from '../../component/ModalMessage/index'

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email không được bỏ trống')
        .email('Email không hợp lệ'),
    password: Yup.string()
        .min(6, 'Password Too Short!')
        .max(12, 'Password Too Long!')
        .required('Password không được bỏ trống'),
    name: Yup.string()
        .required('Tên không được bỏ trống'),
    passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required('Password không được bỏ trống'),
    gender: Yup.boolean().required('Lựa chọn giới tính'),

});

export default function SignupScreen() {
    const navigation = useNavigation();
    const data = [{ label: 'Male', value: true },
    { label: 'Female', value: false }];
    const [dropdown, setDropdown] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleFalse, setModalVisibleFalse] = useState(false);


    const handleSubmitFormik = values => {
        const data = { ...values, phone: null }
        console.log(data);
        userSignUp(data)
            .then(res => {
                console.log(res);
                setModalVisible(true);

            })
            .catch(err => setModalVisibleFalse(true));
    };


    const navigateLogin = () => {
        if (navigation.canGoBack) {
            navigation.goBack();
        }
        else {
            navigation.navigate('LoginScreen');
        }
    }
    useEffect(() => {
        if (modalVisibleFalse) {
            var timer1 = setTimeout(() => {
                setModalVisibleFalse(false);
            }, 800);
        }
        return () => {
            clearTimeout(timer1);
        }
    }, [modalVisibleFalse])
    useEffect(() => {
        if (modalVisible) {
            var timer = setTimeout(() => {
                setModalVisible(false);
                navigateLogin();
            }, 800);
        }
        return () => {
            clearTimeout(timer);
        }
    }, [modalVisible])
    return (
        <SafeAreaView style={styles.container}>
            <ModalMessage animationType="fade"
                visible={modalVisible}
                message='Đăng ký thành công'
                icon='clipboard-check'
            ></ModalMessage>
        <ModalMessage animationType="fade"
                visible={modalVisibleFalse}
                message='Thất bại'
                icon='window-close'
            ></ModalMessage>
            <LinearGradient colors={['#F05C00', '#F18A00']} style={globalStyles.linearGradient}>
                <View style={globalStyles.logoContainer}>
                    <View >
                        <Image source={ShoesIcon} style={globalStyles.logoIcon} />
                    </View>
                    <Text style={globalStyles.logoText}>
                        Register
                    </Text>
                </View>
            </LinearGradient>
            <View style={styles.loginForm}>
                <Formik
                    validationSchema={loginSchema}
                    initialValues={{ name: '', email: '', password: '', passwordRepeat: '', gender: null }}
                    onSubmit={handleSubmitFormik}>
                    {({ values, handleSubmit, handleChange, errors, setFieldValue }) => (
                        <>
                            <View style={styles.inputContainer}>

                                <View >
                                    <TextInputIcon
                                        isError={errors.email}
                                        iconName='envelope'
                                        onChangeText={handleChange('email')}
                                        placeholder="Input your email"
                                        value={values.email}
                                    />
                                    {/* {errors.name && (
                                        <Text style={styles.errorText}>{errors.name}</Text>
                                    )} */}
                                </View>
                                <View >
                                    <TextInputIcon
                                        isError={errors.password}
                                        iconName='key'
                                        onChangeText={handleChange('password')}
                                        placeholder="Password"
                                        value={values.password}
                                        secureTextEntry={true}
                                    />
                                    {/* {errors.email && (
                                        <Text style={styles.errorText}>{errors.password}</Text>
                                    )} */}
                                </View>
                                <View >
                                    <TextInputIcon
                                        isError={errors.passwordRepeat}
                                        iconName='key'
                                        onChangeText={handleChange('passwordRepeat')}
                                        placeholder="Repeate password"
                                        value={values.passwordRepeat}
                                        secureTextEntry={true}
                                    />
                                    {/* {errors.email && (
                                        <Text style={styles.errorText}>{errors.passwordRepeat}</Text>
                                    )} */}
                                </View>
                                <View >
                                    <TextInputIcon
                                        isError={errors.name}
                                        placeholder={'Input your name'}
                                        onChangeText={handleChange('name')}
                                        iconName='user'
                                        value={values.name}
                                    />
                                </View>
                                <View>
                                    <Dropdown style={styles.dropdownStyle}
                                        containerStyle={styles.dropdownConContainer}
                                        data={data}
                                        labelField="label"
                                        valueField="value"
                                        maxHeight={120}
                                        label="Dropdown"
                                        placeholder="Select item"
                                        value={dropdown}
                                        onChange={(item) => setFieldValue('gender', item.value)}
                                        textError="Error"
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <TouchableOpacity
                                    onPress={handleSubmit}>
                                    <LinearGradient start={{ x: 0, y: 0 }} style={styles.signUpButton} end={{ x: 1, y: 0 }} colors={['#F18A00', '#F05C00']}>

                                        <Text style={[styles.logoTitle, { marginTop: 0 }]}>REGISTER</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ textAlign: 'center', marginBottom: 10 }}>Already a member? <Text onPress={() => navigateLogin()} style={{ color: '#F05C00', fontSize: 18, fontWeight: '900' }}> Login</Text>
                            </Text>
                        </>
                    )}
                </Formik>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginForm: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    dropdownConContainer: {
        marginHorizontal: 5,
        paddingLeft: 30,
    },
    dropdownStyle: {
        marginVertical: 5,
        borderRadius: 25,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 3,
        paddingHorizontal: 5,
        padding: 8,
        paddingLeft: 50,
        ...globalStyles.inputTextStyle,
    },
    // inputError: {
    //     borderWidth:1, 
    //     borderColor: 'red'
    // },
    inputContainer: {
        marginVertical: 10,
        justifyContent: 'center',
        flex: 2,
    },
    inputField: {
        borderWidth: 1,
        padding: 8,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
    },
    signUpButton: {
        paddingVertical: 12,
        marginVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
    },
    logoTitle: {
        fontSize: 16,
        marginTop: 20,
        fontFamily: 'Gill Sans',
        textAlign: 'right',
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});