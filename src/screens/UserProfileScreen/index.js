import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, StyleSheet, Modal } from 'react-native'
import globalStyles, { primaryColor, secondColor } from '../../theme/globalStyles';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import TextInputIcon from '../../component/TextInput';
import { userChangePassword } from '../../apis/userLoginApi';
import { removeAccessToken } from '../../ultils/storage';
import { useNavigation } from '@react-navigation/native';
import { getCurrentUserSelector } from '../../redux/selectors/loginSelector'

const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Mật khẩu quá ngắn, độ dài >=6 >=12')
        .max(12, 'Mật khẩu quá dài, độ dài >=6 >=12')
        .required('Password không được bỏ trống'),
    passwordRepeat: Yup.string()
        .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
        .required('Mật khẩu không được bỏ trống'),

});

const UserProfileScreen = () => {
    const user = useSelector(getCurrentUserSelector);

    useEffect(() => {
        if (!user || !user.avatar) {
            user = {
                email: "",
                name: "",
                password: null,
                gender: false,
                phone: "12345678",
                avatar: "http://svcy3.myclass.vn/images/user-icon.png"
            }
        }
    }, [])

    const [isVisibleLogout, setVisibleLogout] = useState(false);
    const [isVisibleChangedPass, setVisibleChangedPass] = useState(false);
    const [modalSuccess, setmodalSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const navigator = useNavigation();

    const navigateUserInforScreen = () => {
        navigator.navigate("UserInfoScreen");
    };
    const navigateHistoryOrderScreen = () => {
        navigator.navigate("HistoryOrderScreen");
    };
    const logOut = () => {
        removeAccessToken();
        dispatch({ type: 'LOGOUT' })

    };

    const handleChangePassword = values => {
        let data = { 'newPassword': values.password }
        console.log(data);
        userChangePassword(data)
            .then(res => {
                if (res.data.statusCode === 200) {
                    setmodalSuccess(true);
                }
            })
            .catch(err => {
                setMessage(err.Error)
            });

    };
    useEffect(() => {
        var timer = setTimeout(() => {
            setmodalSuccess(false);
            setVisibleChangedPass(false);
        }, 1200);
        return () => {
            clearTimeout(timer);
        }
    }, [modalSuccess])

    return (<View style={{ flex: 1 }}>
        <Modal transparent={false}
            visible={isVisibleLogout}
            onRequestClose={() => {
                setVisibleLogout(false);
            }}
        >
            <View style={styles.modalContent}>
                <View style={styles.logOutDialog}>
                    <Text style={[globalStyles.headerText, { color: primaryColor, marginVertical: 10 }]}>Bạn muốn đăng xuất?</Text>
                    <View style={{ flexDirection: 'row', flexShrink: 0 }}>
                        <TouchableOpacity style={styles.actionButton}
                            onPress={() => { logOut() }}
                        >
                            <Text style={[globalStyles.inputTextStyle, { color: '#fff' }]}>
                                Đăng xuất
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setVisibleLogout(false)} style={[styles.actionButton, { backgroundColor: '#e04c4c' }]}>
                            <Text style={[globalStyles.inputTextStyle, { color: '#fff' }]}>
                                Huỷ
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        <Modal transparent={false}
            visible={isVisibleChangedPass}
            onRequestClose={() => {
                setVisibleChangedPass(false);
            }}>
            <View style={styles.modalContent}>
                <View style={styles.changedPasswordDialog}>
                    <Formik
                        validationSchema={changePasswordSchema}
                        initialValues={{ password: '', passwordRepeat: '' }}
                        onSubmit={handleChangePassword}>
                        {({ values, handleSubmit, handleChange, errors }) => (
                            <>
                                <View style={styles.inputContainer}>
                                    <View >
                                        <TextInputIcon
                                            isError={errors.password}
                                            iconName='key'
                                            onChangeText={handleChange('password')}
                                            placeholder="Nhập mật khẩu mới"
                                            value={values.password}
                                            secureTextEntry={true}
                                        />
                                        {errors.password && (
                                            <Text style={styles.errorText}>{errors.password}</Text>
                                        )}
                                    </View>
                                    <View >
                                        <TextInputIcon
                                            isError={errors.passwordRepeat}
                                            iconName='key'
                                            onChangeText={handleChange('passwordRepeat')}
                                            placeholder="Nhập lại mật khẩu"
                                            value={values.passwordRepeat}
                                            secureTextEntry={true}
                                        />
                                        {errors.passwordRepeat && (
                                            <Text style={styles.errorText}>{errors.passwordRepeat}</Text>
                                        )}
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', flexShrink: 0 }}>
                                    <TouchableOpacity style={styles.actionButton}
                                        onPress={handleSubmit}
                                    >
                                        <Text style={[globalStyles.inputTextStyle, { color: '#fff' }]}>
                                            Thay đổi
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setVisibleChangedPass(false)} style={[styles.actionButton, { backgroundColor: '#e04c4c' }]}>
                                        <Text style={[globalStyles.inputTextStyle, { color: '#fff' }]}>
                                            Huỷ
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ alignSelf: 'flex-start', marginVertical: 5 }}>
                                    {
                                        !message &&
                                        (<Text style={[styles.errorText, { paddingHorizontal: 20, color: '#297125' }]}>{message}</Text>)
                                    }
                                </View>

                            </>
                        )}
                    </Formik>
                </View>
            </View>
        </Modal>

        <Modal animationType="fade"
            transparent={true}
            visible={modalSuccess}
        >
            <View style={styles.modalContent}>
                <View style={styles.centerView}>
                    <View style={{ flexDirection: 'column' }}>
                        <FontAwesome5 style={{ padding: 5, alignSelf: 'center' }} name='check-square' size={30} color='#fff' />
                        <Text style={[globalStyles.inputTextStyle, { color: 'white', paddingHorizontal: 5 }]}>
                            Thành công
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>

        <View style={globalStyles.rootContainer}>
            <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={{ uri: user.avatar }} style={globalStyles.logoIcon} />
                <View>
                    <Text style={globalStyles.headerText}>{user.name}</Text>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: 'black', marginHorizontal: 15 }}></View>
            <View style={{ marginTop: 15 }}>
                <TouchableOpacity style={styles.menuButtonStyle} onPress={navigateHistoryOrderScreen}>
                    <View style={styles.menuButtonContentStyle}>
                        <View style={styles.iconButtonContentStyle}>
                            <FontAwesome5 name={'store-alt'} size={20} color={primaryColor}></FontAwesome5>
                        </View>
                        <Text style={{ marginHorizontal: 10, flex: 1 }}>History order</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButtonStyle} onPress={navigateUserInforScreen}>
                    <View style={styles.menuButtonContentStyle}>
                        <View style={styles.iconButtonContentStyle}>
                            <FontAwesome5 name={'user-cog'} size={20} color={primaryColor}></FontAwesome5>
                        </View>
                        <Text style={{ marginHorizontal: 10, flex: 1 }}>Information</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButtonStyle} onPress={() => setVisibleChangedPass(true)}>
                    <View style={styles.menuButtonContentStyle}>
                        <View style={styles.iconButtonContentStyle}>
                            <FontAwesome5 name={'key'} size={20} color={primaryColor}></FontAwesome5>
                        </View>
                        <Text style={{ marginHorizontal: 10, flex: 1 }}>Change password</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuButtonStyle} onPress={() => setVisibleLogout(true)}>
                    <View style={styles.menuButtonContentStyle}>
                        <View style={styles.iconButtonContentStyle}>
                            <FontAwesome5 name={'sign-out-alt'} size={20} color={primaryColor}></FontAwesome5>
                        </View>
                        <Text style={{ marginHorizontal: 10, flex: 1 }}>Log out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    )
}

export default UserProfileScreen

const styles = StyleSheet.create(
    {
        inputContainer: {
            marginVertical: 10,
            justifyContent: 'center',
            flex: 2,
        },
        signUpButton: {
            paddingVertical: 12,
            marginVertical: 10,
            borderRadius: 25,
            alignItems: 'center',
        },
        inputError: {
            borderColor: 'red',
        },
        errorText: {
            color: 'red',
            paddingHorizontal: 15,
        },
        menuButtonStyle: {
            height: 50, backgroundColor: '#fff', borderRadius: 5, borderBottomWidth: 1, borderBottomColor: '#EEEEEE', paddingHorizontal: 15
        },
        menuButtonContentStyle: {
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center'
        },
        iconButtonContentStyle: {
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10
        },
        actionButton: {
            ...globalStyles.secondBackground,
            height: 40,
            width: '35%',
            marginHorizontal: 2,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        textButton: {
            color: '#fff',
            fontSize: 20,
            fontWeight: '700'
        },
        logOutDialog: {
            height: '20%',
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#fff',
            ...globalStyles.shadowEffect,
        },
        centerView: {
            height: '20%',
            width: '50%',

            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: secondColor,
            borderRadius: 10,
        },
        changedPasswordDialog: {
            width: '90%',
            height: 350,
            paddingTop: 20,
            paddingBottom: 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#fff',
            ...globalStyles.shadowEffect,
        },
        modalContent: {
            flex: 1,
            alignItems: "center",
            justifyContent: 'center',
        },
    });