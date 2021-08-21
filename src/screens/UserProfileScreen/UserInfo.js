import React, { useEffect, useState } from 'react';

import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
} from 'react-native';
import TextInputIcon from '../../component/TextInput';
import { Dropdown } from 'react-native-element-dropdown';
import globalStyles,{secondColor}  from '../../theme/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { userUpdateProfileAction, userGetProfileAction } from '../../redux/actions/userAction'
import { getCurrentUserSelector } from '../../redux/selectors/loginSelector'

const loginSchema = Yup.object().shape({
    name: Yup.string()
        .required('Tên không được bỏ trống'),
    gender: Yup.boolean().required('Lựa chọn giới tính'),

});

const UserInfo = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(null);
    const [modalSuccess, setModalSuccess] = useState(false);

    const user = useSelector(getCurrentUserSelector);

    useEffect(() => {
        console.log('UserInfo useEffect user');
    }, [user])

    useEffect(() => {
        var timer = setTimeout(() => {
            setModalSuccess(false);
        }, 800);
        return () => {
            clearTimeout(timer);
        }
    }, [modalSuccess])

    const backFunction = () => {
        navigation.canGoBack() && navigation.goBack();
    };
    const updateProfile = async (values) => {
      const status= await dispatch(userUpdateProfileAction({ ...values, password: null }));
       setModalSuccess(status)
    }
    const data = [{ label: 'Male', value: true },
    { label: 'Female', value: false }];
    return (
        <>
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

            <Formik
                validationSchema={loginSchema}
                initialValues={{ name: user.name, email: user.email, phone: user.phone, gender: user.gender }}
                onSubmit={updateProfile}>
                {({ values, handleSubmit, handleChange, errors, setFieldValue }) => (

                    <>
                        <View style={[globalStyles.headerContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                            <TouchableOpacity onPress={backFunction} style={styles.backButtonStyle}>
                                <FontAwesome name='angle-left' size={25} color='#FFF' />
                            </TouchableOpacity>
                            <Text style={globalStyles.headerLabel}>User infor</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={[styles.viewdropdownStyle, { backgroundColor: '#f2f2f2' }]}>
                                <FontAwesome5 name={'envelope'} size={20} style={styles.iconTextInput} />
                                <Text style={[styles.dropdownStyle, {
                                    marginTop: 20
                                }]}>
                                    {user.email}
                                </Text>
                            </View>
                            <View >
                                <TextInputIcon
                                    isError={errors.name}
                                    iconName='user'
                                    onChangeText={handleChange('name')}
                                    placeholder="Tên hiển thị"
                                    value={values.name}
                                />
                                {/* {errors.email && (
                                        <Text style={styles.errorText}>{errors.password}</Text>
                                    )} */}
                            </View>
                            <View >
                                <TextInputIcon
                                    isError={errors.phone}
                                    iconName='phone'
                                    onChangeText={handleChange('phone')}
                                    placeholder="Số điện thoại"
                                    value={values.phone}
                                />
                                {/* {errors.email && (
                                        <Text style={styles.errorText}>{errors.passwordRepeat}</Text>
                                    )} */}
                            </View>
                            <View style={styles.viewdropdownStyle}>
                                <FontAwesome5 name={'venus-mars'} size={20} style={styles.iconTextInput} />
                                <Dropdown style={styles.dropdownStyle}
                                    containerStyle={styles.dropdownConContainer}
                                    data={data}
                                    labelField="label"
                                    valueField="value"
                                    label="Dropdown"
                                    placeholder="Select item"
                                    onChange={(item) => setFieldValue('gender', item.value)}
                                    value={dropdown}
                                    textError="Error"
                                />

                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={handleSubmit}>
                                <LinearGradient start={{ x: 0, y: 0 }} style={styles.signUpButton} end={{ x: 1, y: 0 }} colors={['#F18A00', '#F05C00']}>

                                    <Text style={[styles.logoTitle, { marginTop: 0 }]}>UPDATE</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        {/* <Text style={{ textAlign: 'center', marginBottom: 10 }}>Already a member? <Text onPress={() => navigateLogin()} style={{ color: '#F05C00', fontSize: 18, fontWeight: '900' }}> Login</Text>
            </Text> */}
                    </>
                )}
            </Formik>
        </>
    )
}

export default UserInfo
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerView: {
        height: '20%',
        width: '50%',

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondColor,
        borderRadius: 10,
    },
    backButtonStyle: {
        height: 25,
        width: 35,
        alignItems: 'center',
    },
    modalContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    loginForm: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'red',
    },
    dropdownConContainer: {
    },
    viewdropdownStyle: {
        marginVertical: 5,
        justifyContent: 'center',
        height: 60,
        borderRadius: 25,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        elevation: 3,
    },
    dropdownStyle: {
        minHeight: 40,
        marginLeft: 50,
        width: '80%'
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
    iconTextInput: {
        position: 'absolute',
        marginLeft: 20,
        marginTop: 20,
        color: '#525252',
        borderWidth: 0,
        justifyContent: 'center'
    },
});
