import React, {useEffect} from 'react'
import { View, FlatList, Image, Text, StyleSheet, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import globalStyles, { textColor, primaryColor, secondColor } from '../../theme/globalStyles';
import { fetchProductsFavoriteAction, fetchProductsFavourite, removeProductFromCartAction, unlikeProductAction } from '../../redux/actions/productAction';
import { useSelector, useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { getProductsFavoriteSelector } from '../../redux/selectors/productsFavouriteSelector';

// const productsFavorite = [
//     {
//         "id": 10,
//         "name": "Nike Air Max 97",
//         "image": "http://svcy3.myclass.vn/images/nike-air-max-97.png"
//     },
//     {
//         "id": 16,
//         "name": "Nike SP Dunk",
//         "image": "http://svcy3.myclass.vn/images/nike-sp-dunk.png"
//     },
//     {
//         "id": 8,
//         "name": "Adidas Yeezy 350",
//         "image": "http://svcy3.myclass.vn/images/adidas-yeezy-350.png"
//     }
// ];




const _renderItem = ({ item }, navigator,dispatch) => {
    const navigationProductDetail = (id) => {
        console.log(id);
        navigator.navigate("DetailProductScreen", { id, 'categoryName': "Yêu thich" });
    };
    const unlike = (id) => {
        dispatch(unlikeProductAction(id));
    };


    return (
        <TouchableWithoutFeedback onPress={() => navigationProductDetail(item.id)}>
            <View style={[styles.rowFront, { flexDirection: 'row' }]}>
                <Image style={styles.productCartImage} source={{ uri: item.image }} ></Image>
                <View style={{ flex: 1, paddingHorizontal: 5 }}>
                    <Text numberOfLines={1} style={styles.textDetailProduct}>{item.name}</Text>
                    {/* <Text style={styles.textDetailProduct}>Slg: {product.quanlity},Size: {product.size} </Text> */}
                </View>
                {/* <Text style={[styles.textProduct, { paddingHorizontal: 5, fontSize: 17 }]}>${product.price}</Text> */}
                <TouchableOpacity style={globalStyles.circleButton} onPress={() => unlike(item.id)}>
                    <FontAwesome5 name={'trash'} size={18} color='#fff'></FontAwesome5>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
};
const FavoriteScreen = () => {
    const productsFavorite = useSelector(getProductsFavoriteSelector)
    const navigator = useNavigation();
    const dispatch = useDispatch();
    useFocusEffect(
        React.useCallback(() => {
            if (productsFavorite.length == 0) {
                console.log("FOCUS CART");
                dispatch(fetchProductsFavoriteAction());
            }
            return () => {

            };
        }, [])
    );

    useEffect(() => {
      
    }, [productsFavorite])
    return (
        <View style={{ flex: 1 }}>
            <View style={globalStyles.headerContainer}>
                <Text style={globalStyles.headerLabel}>Yêu thích</Text>
            </View>
            {!!productsFavorite.length && (
                <View style={{ flex: 1 }}>
                    <FlatList contentContainerStyle={{ backgroundColor: null }}
                        ItemSeparatorComponent={() => <View style={styles.sperateItem}></View>}
                        numColumns={1}
                        style={styles.container} data={productsFavorite}
                        renderItem={(item) => _renderItem(item, navigator,dispatch)}
                        keyExtractor={(item) => item.id}></FlatList>
                </View>
            )
            }
        </View>
    )
}

export default FavoriteScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    sperateItem: {
        height: 5,
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
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