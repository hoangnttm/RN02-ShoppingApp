import React, { useState, useEffect } from 'react'
import { View, Text, Alert, Image, Modal, TouchableOpacity, StyleSheet, Pressable, TouchableNativeFeedback, ScrollView, SafeAreaView } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { getProductById } from '../../apis/productApi';
import globalStyles, { primaryColor, secondColor } from '../../theme/globalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useSelector, useDispatch } from 'react-redux';
import { addProductToCartAction } from '../../redux/actions/cartAction'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from '@react-navigation/native'
import { likeProductAction } from '../../redux/actions/productAction';

const ProductDetail = (props) => {
    // console.log(props.route.params);

    const navigation = useNavigation();

    const idProduct = props.route.params.id;
    const categoryName = props.route.params.categoryName;
    const [product, setProduct] = useState({});
    const [sizeCurrent, setSizeCurrent] = useState(null);
    const [isShowDescription, setisShowDescription] = useState(false)
    const [quality, setQuality] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleFavourite, setModalVisibleFavourite] = useState(false);

    const dispatch = useDispatch();
    const addToCartDispatch = (playload) => dispatch(addProductToCartAction(playload));


    useEffect(() => {
        getProductById(idProduct)
            .then(res => {
                var productApi = res.data.content;
                setProduct(productApi);
            })
            .catch(err => console.error(err));
    }, []);

    const backFunction = () => {
        navigation.canGoBack() && navigation.goBack();
    };
    const addToCart = (product) => {
        addToCartDispatch({ 'id': product.id, 'name': product.name, 'image': product.image, 'price': product.price, 'size': sizeCurrent, 'quanlity': quality });
    }
    const buyNowFunction = (product) => {
        addToCart(product);
        navigation.navigate("CartTab");
    }

    useEffect(() => {
        if (modalVisible) {
            var timer = setTimeout(() => {
                setModalVisible(false);
            }, 800);
        }
        return () => {
            clearTimeout(timer);
        }
    }, [modalVisible])
    useEffect(() => {
        if (modalVisibleFavourite) {
            var timer1 = setTimeout(() => {
                setModalVisibleFavourite(false);
            }, 800);
        }
        return () => {
            clearTimeout(timer1);
        }
    }, [modalVisibleFavourite])

    const likeProduct = (id) => {
        console.log(id);
        dispatch(likeProductAction(id));
        setModalVisibleFavourite(true);
    }
    return (
        <>
            <Modal animationType="fade"
                transparent={true}
                visible={modalVisible}
                style={styles.modalView}
            >
                <View style={styles.modalContentView}>
                    <View style={styles.centerView}>
                        <View style={{ flexDirection: 'column' }}>
                            <FontAwesome5 style={{ padding: 5, alignSelf: 'center' }} name='clipboard-check' size={30} color='#fff' />
                            <Text style={[globalStyles.inputTextStyle, { color: 'white', paddingHorizontal: 5 }]}>
                                Đã thêm vào giỏ hàng
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal animationType="fade"
                transparent={true}
                visible={modalVisibleFavourite}
                style={styles.modalView}
            >
                <View style={styles.modalContentView}>
                    <View style={styles.centerView}>
                        <View style={{ flexDirection: 'column' }}>
                            <FontAwesome5 style={{ padding: 5, alignSelf: 'center' }} name='gratipay' size={30} color='#fff' />
                            <Text style={[globalStyles.inputTextStyle, { color: 'white', paddingHorizontal: 5 }]}>
                                Đã thêm vào SP yêu thích
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={[globalStyles.headerContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                <TouchableOpacity onPress={backFunction} style={styles.backButtonStyle}>
                    <FontAwesome name='angle-left' size={25} color='#FFF' />
                </TouchableOpacity>
                <Text style={globalStyles.headerLabel}>{categoryName}</Text>
            </View>
            <View style={globalStyles.rootContainer}>
                <ScrollView>
                    <View key='mainView' style={{ flex: 1, paddingLeft: 15, paddingRight: 5 }}>
                        <View style={styles.spaceContainer}>
                            <Text style={styles.categoryText} numberOfLines={2}>{product.name}</Text>
                        </View>
                        <View style={styles.spaceContainer}>
                            <Image style={styles.productImage} source={{ uri: product.image }} ></Image>
                        </View>
                        <View style={[styles.spaceContainer, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={globalStyles.inputTextStyle}>Còn lại <Text style={[styles.priceText, { color: secondColor }]} >{product.quantity}</Text> sản phẩm</Text>
                            <Text style={styles.priceText}>${product.price}</Text>
                        </View>
                        <>
                            {isShowDescription ?
                                (
                                    <>
                                        <Text style={[styles.categoryText, styles.spaceContainer]} >{product.description}</Text>
                                        <LinearGradient style={{ opacity: 0.8, width: '100%', alignSelf: 'center', height: 30, marginTop: -20 }} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 5 }} colors={['white', 'orange']}>
                                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => setisShowDescription(false)}>
                                                <Text>Ẩn bớt</Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                        {/* } */}
                                    </>
                                )
                                :
                                (
                                    <>
                                        <Text style={[styles.categoryText, styles.spaceContainer]} >{product.shortDescription}</Text>
                                        <LinearGradient style={{ opacity: 0.8, width: '100%', alignSelf: 'center', height: 30, marginTop: -20 }} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 5 }} colors={['white', 'orange']}>
                                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => setisShowDescription(true)}>

                                                <Text>Xem thêm</Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                        {/* } */}
                                    </>
                                )
                            }
                        </>
                        <View style={[styles.spaceContainer]}>
                            <Text style={globalStyles.inputTextStyle}>Kích thước</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {
                                    product && product.size && (
                                        product.size.map((item, index) => {
                                            return (<Pressable key={item} onPress={() => setSizeCurrent(item)} style={[styles.sizeItem, item == sizeCurrent && { backgroundColor: secondColor }]}>
                                                <Text style={[globalStyles.inputTextStyle, item == sizeCurrent && { color: '#fff' }]}>{item}</Text>
                                            </Pressable>);
                                        }))
                                }
                            </View>

                        </View>
                    </View>
                </ScrollView>

            </View>

            <View style={styles.buttonArea}>
                <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10, width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View >
                        <Text>Kích cỡ</Text>
                        <TouchableOpacity style={{
                            width: 40,
                            height: 40,
                            borderRadius: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={[styles.textButton, { color: primaryColor, fontSize: 20 }]}>{!sizeCurrent ? '--' : sizeCurrent}</Text>

                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text>Màu sắc</Text>
                        <TouchableOpacity style={[styles.circleButton, { width: 35, height: 35 }]}>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Text>Số lượng</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                            <TouchableOpacity style={[styles.circleButton, { width: 35, height: 35, backgroundColor: null, borderColor: primaryColor, borderWidth: 1 }]}
                                onPress={() => {
                                    if (quality > 1) {
                                        let _quality = quality - 1;
                                        setQuality(_quality)
                                    }
                                }
                                }>
                                <Text style={[styles.textButton, { color: primaryColor, fontSize: 25 }]}>-</Text>
                            </TouchableOpacity>
                            <Text style={[styles.textButton, { minWidth: 40, textAlign: 'center', color: primaryColor, alignSelf: 'center' }]}>{quality}</Text>

                            <TouchableOpacity style={[styles.circleButton, { width: 35, height: 35, backgroundColor: null, borderColor: primaryColor, borderWidth: 1 }]} onPress={() => {
                                let _quality = quality + 1;
                                setQuality(_quality)
                            }}>
                                <Text style={[styles.textButton, { color: primaryColor, fontSize: 25 }]}>+</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end', paddingHorizontal: 20, width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => likeProduct({ 'id': product.id, 'name': product.name, 'image': product.image })} style={styles.circleButton}>
                        <FontAwesome5 name='heart' size={18} color='#fff' />
                    </TouchableOpacity>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                        <TouchableOpacity activeOpacity={!!sizeCurrent ? 0.2 : 1} style={[styles.plusButton, { marginHorizontal: 2, width: '30%', backgroundColor: 'green' }]} onPress={() => {
                            if (sizeCurrent == undefined) return;
                           // addToCartDispatch({ 'id': product.id, 'name': product.name, 'image': product.image, 'price': product.price, 'size': sizeCurrent, 'quanlity': quality });
                           addToCart(product); 
                           setModalVisible(true)
                        }}>
                            <FontAwesome5 name='cart-plus' size={18} color='#fff' />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={!sizeCurrent ? 1 : 0.2} style={styles.plusButton}
                            onPress={() => {
                                if (!sizeCurrent) return;
                                buyNowFunction(product);
                            }}
                        >
                            <Text style={styles.textButton}>Mua ngay </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: 'stretch',
        marginHorizontal: 3,
        borderRadius: 15,
        paddingTop: 5,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
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
    sizeItem: {
        margin: 2,
        height: 45,
        width: 45,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: secondColor,
        borderRadius: 8,
    },

    spaceContainer: {
        paddingVertical: 5,
    },
    backButtonStyle: {
        height: 25,
        width: 35,
        alignItems: 'center',
    },
    priceText: {
        fontWeight: 'bold',
        fontSize: 15,
    },

    productImage: {
        width: '95%',
        height: 250,
    },
    plusButton: {
        height: 40,
        width: '55%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        ...globalStyles.secondBackground,
    },
    circleButton: {
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        ...globalStyles.secondBackground,
    },
    textButton: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700'
    },
    productTextXL: {
        ...globalStyles.inputTextStyle,
        fontSize: 20,
        fontWeight: '900',
    },
    categoryText: {
        ...globalStyles.inputTextStyle,
        fontSize: 15,
        fontWeight: 'normal'
    },
    buttonArea: {
        height: 140,
        flexDirection: 'column',
        paddingVertical: 10,
        alignItems: 'center',
        paddingLeft: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        ...globalStyles.shadowEffect,

    }
});
