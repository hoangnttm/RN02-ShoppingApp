import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../../theme/globalStyles'

const ProductItem = (params) => {

    const navigator = useNavigation();

    const navigationProductDetail = (id) => {
        console.log(id);
        navigator.navigate("DetailProductScreen", { id ,'categoryName':params.categoryName });
    }

    return (
        <>
            <View style={[styles.itemContainer, { width: params.widthItem, height: params.widthItem * 1.2 }]}>
                <TouchableWithoutFeedback onPress={() => navigationProductDetail(params.item.id)}>
                    <View style={{ flex: 1, paddingLeft: 15, paddingRight: 5 }}>
                        <View>
                            <Text style={styles.categoryText}>{params.categoryName}</Text>
                        </View>
                        <View>
                            <Text style={styles.productText} numberOfLines={2}>{params.item.name}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingRight: 5 }}>
                            <Image style={styles.productImage} source={{ uri: params.item.image }} ></Image>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ paddingLeft: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.priceText}>${params.item.price}</Text>
                    <TouchableOpacity onPress={() => console.log("Add to Cart button press")} style={styles.plusButton}>
                        <Text style={styles.textButton}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    itemContainer: {
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
    priceText: {
        fontWeight: 'bold',
    },

    productImage: {
        height: '95%',
        width: '95%'
    },
    plusButton: {
        height: 35,
        width: 35,
        borderBottomEndRadius: 15,
        borderTopStartRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        ...globalStyles.secondBackground,
    },
    textButton: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700'
    },
    productText: {
        ...globalStyles.inputTextStyle,
    },
    categoryText: {
        ...globalStyles.inputTextStyle,
        fontSize: 13,
        fontWeight: '700'
    },
});