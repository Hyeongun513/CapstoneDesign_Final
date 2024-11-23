import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link, router } from "expo-router"; 

const Menu_Schedule = () => {

    return (
        <View style={{ flex: 1, backgroundColor:'green', justifyContent:'center' }}>

            <View style={{justifyContent:'center', alignItems:'center'}}>
                <View style={styles.noticeContainer}>
                    <View style={{borderBottomWidth: 1, marginBottom: 10, width:'100%', alignItems:'center'}}>
                        <Text style={{fontSize: 20, marginTop: 0, marginBottom: 10, fontWeight: 'bold'}}> 경기 일정 </Text>
                    </View>

                    <View style={{justifyContent:'flex-start', width: '100%'}}>
                        <View style={styles.textContainer}>
                            <Image
                            source={require('../../../assets/images/check.png')}
                            style={styles.checkImage}
                            />
                            <Text style={styles.text}>5대리그의 주요 일정을 제공합니다.</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Image
                            source={require('../../../assets/images/check.png')}
                            style={styles.checkImage}
                            />
                            <Text style={styles.text}>종료된 경기들의 결과를 확인하세요.</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Image
                            source={require('../../../assets/images/check.png')}
                            style={styles.checkImage}
                            />
                            <Text style={styles.text}>변경된 일정을 바로 체크하세요.</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => { router.replace('src/Schedule/ScheduleHome'); }}>
                <Text style={{fontSize: 22, fontWeight:'bold'}}>바로가기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Menu_Schedule;

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