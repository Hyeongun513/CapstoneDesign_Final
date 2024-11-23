import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Link, router } from "expo-router"; 

const DataCenterHome = () => {

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center', backgroundColor:'green'}}>
            <View style={styles.noticeContainer}>
                <View style={{borderBottomWidth: 1, marginBottom: 10}}>
                    <Text style={{fontSize: 15, marginHorizontal: 15, marginTop: 0, marginBottom: 10, fontWeight: 'bold'}}> 리그를 선택하고 데이터 센터를 이용하세요. </Text>
                </View>
                <View style={{justifyContent:'flex-start', width: '100%'}}>
                    <View style={styles.textContainer}>
                        <Image
                        source={require('../../../assets/images/check.png')} // assets에서 아이콘 불러오기
                        style={styles.checkImage}
                        />
                        <Text style={styles.text}> 리그별로 선수의 데이터를 확인하세요.</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Image
                        source={require('../../../assets/images/check.png')} // assets에서 아이콘 불러오기
                        style={styles.checkImage}
                        />
                        <Text style={styles.text}> 최근 3시즌의 데이터를 지원합니다.</Text>
                    </View>
                </View>
            </View>
            
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => { router.navigate('./PlayerData_PL'); }} >
                    <Image source={require('../../../assets/images/Rodri.png')} style={styles.buttonImage} />
                    <Text style={styles.imageText}>프리미어리그</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => { router.navigate('./PlayerData_PD'); }} >
                    <Image source={require('../../../assets/images/Bellingham.png')} style={styles.buttonImage} />
                    <Text style={styles.imageText}>라리가</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => { router.navigate('./PlayerData_BL1'); }} >
                    <Image source={require('../../../assets/images/Wirtz.png')} style={styles.buttonImage} />
                    <Text style={styles.imageText}>분데스리가</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => { router.navigate('./PlayerData_SA'); }} >
                    <Image source={require('../../../assets/images/Lautaro.png')} style={styles.buttonImage} />
                    <Text style={styles.imageText}>세리에 A</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => { router.navigate('./PlayerData_FL1'); }} >
                    <Image source={require('../../../assets/images/Mbappe.png')} style={styles.buttonImage} />
                    <Text style={styles.imageText}>리그 1</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => { router.navigate('./PlayerData_CL'); }} >
                    <Image source={require('../../../assets/images/ChampionsLeague.png')} style={styles.buttonImage} />
                    <Text style={styles.imageText}>챔피언스리그</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.menuButton} onPress={() => {router.replace('../Menu'); }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>메인 메뉴</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

export default DataCenterHome;

const styles = StyleSheet.create({
    noticeContainer: {
        width:Dimensions.get('window').width * 0.9 + 10,
        padding: 15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#90EE90',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 5,
    },
    textContainer: {
        flexDirection: 'row', 
        marginVertical: 5,
        // justifyContent:'center',
    },
    checkImage: {
        width: 17, 
        height: 17, 
        marginLeft: 15,
    },
    text: {
        fontSize: 15,
        color: 'black',
    },
    buttonContainer: {
        width: Dimensions.get('window').width * 0.45,
        height: Dimensions.get('window').width * 0.45,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 20,
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor:'black',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor:'#90EE90',
        position: 'relative',
    },
    buttonImage: {
        width: '100%', 
        height: '100%', 
        opacity: 0.7,
    },
    imageText: {
        position: 'absolute', // 부모 요소 기준으로 절대 위치 설정
        color: 'white', // 텍스트 색상
        fontSize: 17, // 텍스트 크기
        fontWeight: 'bold', // 텍스트 굵기
        // backgroundColor:'white',
    },
    menuButton: {
        backgroundColor: "skyblue",
        width: '90%',
        height: 40,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 10,
    },
});