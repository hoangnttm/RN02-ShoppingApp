import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, SectionList, StatusBar } from "react-native";
import { userGetProfile } from '../../apis/userLoginApi'
import globalStyles, { primaryColor, secondColor, textColor } from '../../theme/globalStyles';
import { useNavigation } from '@react-navigation/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const HistoryOrder = (props) => {

    const [orders, setOrders] = useState([])
    const navigation = useNavigation();

    const backFunction = () => {
        navigation.canGoBack() && navigation.goBack();
    };

    // var { width } = useWindowDimensions();
    // var productItemWidth = width / 2 - 20;
    useEffect(() => {
        userGetProfile(null)
            .then(res => {
                if (res.data.statusCode == 200) {
                    var data = res.data.content.ordersHistory.map(mapping);
                    setOrders(data)
                }
            })
            .catch(err => {
                console.error(err);
            });

        return () => {
            console.log(`HistoryOrder unmount`);
        }
    }, []);


    const mapping = (item) => {

        return {
            id: item.id,
            date: new Date(item.date),
            status: "Đã giao thành công",
            totalQuantity: item.orderDetail.length,
            data: [...item.orderDetail]
        }
    };

    const renderItem = (product) => {
        return (
            <View style={[styles.rowFront, { flexDirection: 'row' }]}>
                <Image style={styles.productCartImage} source={{ uri: product.image }} ></Image>
                <View style={{ flex: 1, paddingHorizontal: 5 }}>
                    <Text numberOfLines={1} style={styles.textProduct}>{product.name}</Text>
                    <Text numberOfLines={2} style={styles.textDetailProduct}>  {product.shortDescription} </Text>
                </View>
            </View>
        )
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[globalStyles.headerContainer, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                <TouchableOpacity onPress={backFunction} style={styles.backButtonStyle}>
                    <FontAwesome name='angle-left' size={25} color='#FFF' />
                </TouchableOpacity>
                <Text style={globalStyles.headerLabel}>LỊCH SỬ ĐƠN HÀNG</Text>
            </View>
            <SectionList style={styles.container}
                sections={orders}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => renderItem(item)}
                renderSectionHeader={({ section: { id, date, status, totalQuantity } }) => (
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Mã đơn: {id}</Text>

                        <View>
                            <Text style={styles.header}>Date: {date.getDate()} - {parseInt(date.getMonth() + 1)} - {date.getFullYear()}</Text>
                            <Text style={[styles.header, { color: 'green' }]}>{!status ? "" : status}</Text>
                            {/* <Text style={[styles.header,{color:'green'}]}>{!totalQuantity ? 0 : totalQuantity}</Text> */}
                        </View>
                    </View>
                )}
            />

        </SafeAreaView>
    )
}

export default HistoryOrder


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10
    },
    headerContainer:
    {
        height: 60,
        flexDirection: 'row',
        borderRadius: 5,
        marginHorizontal: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        backgroundColor: secondColor
    },
    productCartImage: {
        height: 80,
        width: 80,
        borderRadius: 20,
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        justifyContent: 'center',
        height: 80,
        marginVertical: 3,
        marginLeft: 15,
        marginRight: 5,
        ...globalStyles.shadowEffect,
    },
    backTextWhite: {
        color: '#FFF',
    },
    textProduct: {
        color: textColor,
        fontWeight: 'bold',
        marginVertical: 3,
    },
    backButtonStyle: {
        height: 25,
        width: 35,
        alignItems: 'center',
    },
    textDetailProduct: {
        color: '#AAA',
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 15,
        color: '#FFF',
    },
    title: {
        fontSize: 24
    }
});