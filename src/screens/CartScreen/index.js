import React, { useEffect, useState } from 'react'
import { View, Modal, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Image } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux'
import { getProductInCart, getProductInCartChanged } from '../../redux/selectors/cartSelector';
import globalStyles, { primaryColor, secondColor, textColor } from '../../theme/globalStyles';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { orderAction, removeProductFromCartAction } from '../../redux/actions/cartAction';
import ModalMessage from '../../component/ModalMessage';
import { likeProductAction } from '../../redux/actions/productAction';
const CartScreen = (state) => {
    // const carts = useSelector(getProductInCart);
    const isCartsChanged = useSelector(getProductInCartChanged);
    const carts = useSelector(getProductInCart);
    const [total, setTotalPrice] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleLike, setModalVisibleLike] = useState(false);
    const navigator = useNavigation();

    const dispatch = useDispatch();
    const removeProductAction = (playload) => dispatch(removeProductFromCartAction(playload));

    useEffect(() => {
        let totalPrice = 0;
        console.log("FOCUS CART");
        if (!!carts) {
            carts.forEach(x => totalPrice += x.quanlity * x.price);
        }
        setTotalPrice(totalPrice);
    }, [isCartsChanged])
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
        if (modalVisibleLike) {
            var timer = setTimeout(() => {
                setModalVisibleLike(false);
            }, 800);
        }
        return () => {
            clearTimeout(timer);
        }
    }, [modalVisibleLike])

    const removeProduct = (product) => {
        removeProductAction(product);
    }
    const viewDetailProduct = ({id,name}) => {
        console.log(id);
       navigator.navigate("DetailProductScreen", { id, 'categoryName': name });
    };
    function getProductInCarts(item) {
        return { productId: item.id.toString(), quantity: item.quanlity };
    }
    const userOrder = async () => {
        if (!carts || carts.length == 0) return;

        var products = carts.map(getProductInCarts);
        console.log(products);
        var result = await orderAction(products);
        console.info(result);
        if (result)
            setModalVisible(true);

    };
    const likeProduct = async ({ id }) => {
        var result = await dispatch(likeProductAction(id));
        if (!!result && result)
            setModalVisibleLike(result);
    }
    const CartItem = (product) => (
        <View style={{ flexDirection: 'row' }}>
            <Image style={styles.productCartImage} source={{ uri: product.image }} ></Image>
            <View>
                <Text>{product.name}</Text>
                <Text>{product.size}</Text>
            </View>
            <Text>{product.price * product.quanlity}</Text>
        </View>
    );
    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity style={globalStyles.circleButton} onPress={() => removeProduct(data.item)}>
                <FontAwesome5 name={'trash'} size={20} color={'#fff'}></FontAwesome5>
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 5, justifyContent: 'flex-end' }}>

                <TouchableOpacity
                    style={[globalStyles.circleButton, { marginHorizontal: 5 }]}
                    onPress={() => likeProduct(data.item)}
                >
                    <FontAwesome5 name='heart' size={25} color='#fff'></FontAwesome5>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[globalStyles.circleButton, styles.backRightBtnRight]}
                    onPress={() => viewDetailProduct(data.item)}
                >
                    <FontAwesome5 name='eye' size={25} color='#fff'></FontAwesome5>
                </TouchableOpacity>
            </View>
        </View>
    );
    const renderItem = (data) => {
        var product = data.item;
        return (
            <View style={[styles.rowFront, { flexDirection: 'row' }]}>
                <Image style={styles.productCartImage} source={{ uri: product.image }} ></Image>
                <View style={{ flex: 1, paddingHorizontal: 5 }}>
                    <Text numberOfLines={1} style={styles.textProduct}>{product.name}</Text>
                    <Text style={styles.textDetailProduct}>Slg: {product.quanlity},Size: {product.size} </Text>
                </View>
                <Text style={[styles.textProduct, { paddingHorizontal: 5, fontSize: 17 }]}>${product.price}</Text>
            </View>
        )
    };
    return (
        <View style={{ flex: 1 }}>
            <ModalMessage animationType="fade"
                visible={modalVisible}
                message='Đặt hàng thành công'
                icon='clipboard-check'
            ></ModalMessage>
            <ModalMessage animationType="fade"
                visible={modalVisibleLike}
                message='Đã thêm vào SP yêu thích'
                icon='gratipay'
            ></ModalMessage>
            <View style={globalStyles.headerContainer}>
                <Text style={globalStyles.headerLabel}>Giỏ hàng</Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {carts && (
                        <SwipeListView
                            data={carts}
                            renderItem={(data, rowMap) => renderItem(data)}
                            renderHiddenItem={(data, rowMap) => renderHiddenItem(data)}
                            leftOpenValue={55}
                            rightOpenValue={-90}
                        />)}
                </View>
                <View style={styles.orderAreaView}>
                    <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                        <Text style={[styles.textProduct, { color: primaryColor, paddingHorizontal: 5, fontSize: 17 }]}>Tổng</Text>
                        <Text style={[styles.textProduct, { color: primaryColor, paddingHorizontal: 5, fontSize: 17 }]}>{!total ? "0" : total} $</Text>
                    </View>
                    <TouchableHighlight style={styles.buyNowButton} onPress={() => userOrder()}>
                        <Text style={styles.buyNowButtonContent}>MUA NGAY</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
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
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    buyNowButton: {
        height: 45,
        marginBottom: 5,
        marginHorizontal: 50,
        flexShrink: 0,
        backgroundColor: primaryColor,
        borderRadius: 20,
        justifyContent: 'center', alignItems: 'center'
    },
    orderAreaView: {
        paddingHorizontal: 20,
        flexShrink: 0,
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    buyNowButtonContent: {
        fontSize: 20,
        color: '#FFF',
    },
    productCartImage: {
        height: 80,
        width: 80,
        borderRadius: 20,
    },
    backTextWhite: {
        color: '#FFF',
    },
    textProduct: {
        color: textColor,
        fontWeight: 'bold',
        marginVertical: 3,
    },
    textDetailProduct: {
        color: '#AAA',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        justifyContent: 'center',
        height: 80,
        borderRadius: 25,
        marginVertical: 3,
        marginHorizontal: 5,
        paddingHorizontal: 15,
        ...globalStyles.shadowEffect,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 40,
    },
    backRightBtnLeft: {
        right: 40,
    },
    backRightBtnRight: {
        right: 0,
    },
});
export default CartScreen
