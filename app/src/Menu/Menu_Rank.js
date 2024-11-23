import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link, router } from "expo-router"; 

const Menu_Rank = () => {

    return (
        <View style={{ flex: 1, backgroundColor:'green', justifyContent:'center' }}>

            <View style={{justifyContent:'center', alignItems:'center'}}>
                <View style={styles.noticeContainer}>
                    <View style={{borderBottomWidth: 1, marginBottom: 10, width:'100%', alignItems:'center'}}>
                        <Text style={{fontSize: 20, marginTop: 0, marginBottom: 10, fontWeight: 'bold'}}> 리그 순위 </Text>
                    </View>

                    <View style={{justifyContent:'flex-start', width: '100%'}}>
                        <View style={styles.textContainer}>
                            <Image
                            source={require('../../../assets/images/check.png')}
                            style={styles.checkImage}
                            />
                            <Text style={styles.text}>5대리그의 실시간 순위를 제공합니다.</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Image
                            source={require('../../../assets/images/check.png')}
                            style={styles.checkImage}
                            />
                            <Text style={styles.text}>주요 구단들의 스쿼드 정보를 확인하세요.</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Image
                            source={require('../../../assets/images/check.png')}
                            style={styles.checkImage}
                            />
                            <Text style={styles.text}>주요 구단의 경기 일정을 확인하세요.</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Image
                            source={require('../../../assets/images/check.png')}
                            style={styles.checkImage}
                            />
                            <Text style={styles.text}>관심 있는 구단을 즐겨찾기 하세요.</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => { router.replace('src/Rank/Rank_Home'); }}>
                <Text style={{fontSize: 22, fontWeight:'bold'}}>바로가기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Menu_Rank;

const styles = StyleSheet.create({
    noticeContainer: {
        width:'95%',
        padding: 20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#90EE90',
        borderRadius: 20,
        marginVertical: 5,
        borderWidth: 2,
        borderColor:'black'
    },
    nicknameContainer: {
        width: '95%',
        padding: 0,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#90EE90',
        borderRadius: 10,
        marginVertical: 5,
    },
    textContainer: {
        flexDirection: 'row', 
        marginTop: 5, 
        marginBottom: 5,
        alignItems:'center'
    },
    checkImage: {
        width: 17, 
        height: 17, 
        marginLeft: 15,
        marginRight: 4,
    },
    text: {
        flex: 1,
        fontSize: 15,
        color: 'black',
    },
    button: {
        backgroundColor: "skyblue",
        width: 200,
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 10,
    },
});