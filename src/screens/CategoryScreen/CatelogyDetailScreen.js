import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, StyleSheet, useWindowDimensions, TouchableWithoutFeedback } from 'react-native'
import { getProductByCategoryId } from '../../apis/productApi'
import ProductItem from './ProductItem'

const CatelogyDetailScreen = (props) => {

    const [products, setsproducts] = useState([])
    var { width } = useWindowDimensions();
    var productItemWidth = width / 2 - 20;
    var category = props.params;
    useEffect(() => {
        getProductByCategoryId(category.id)
            .then(res => {
                setsproducts(res.data.content)
            })
            .catch(err => {
                console.error(err);
            });

        return () => {
            console.log(`Tab ${props.params.alias} unmount`);
        }
    }, [])

 




    const _renderItem = ({ item }) => {
       return (<ProductItem categoryName={category.id} item={item} widthItem={productItemWidth} />)
    };
    return (
        <View style={{ flex: 1 }}>
            <FlatList contentContainerStyle={{ backgroundColor: null }}
                ItemSeparatorComponent={() => <View style={styles.sperateItem}></View>}
                numColumns={2}
                style={styles.container} data={products}
                renderItem={(item) => _renderItem(item)}
                keyExtractor={(item) => item.id}></FlatList>
        </View>
    )
}

export default CatelogyDetailScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    sperateItem: {
        height: 10,
    },



});