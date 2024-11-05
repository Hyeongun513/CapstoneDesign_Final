import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { Link, router } from "expo-router"; 

const DataCenterHome = () => {

    return (
        <View style={{ flex: 1,backgroundColor:'green'}}>
            <View style={{flex: 9, alignItems: 'center', justifyContent:'center'}}>
                <Text style={{ fontSize: 35, color:'white' }}> FootBall Park </Text> 
                <Text style={{ fontSize: 20, color:'white' }}> DataCenterHome.js </Text> 

                <TouchableOpacity style={{
                backgroundColor: "skyblue",
                width: 200,
                height: 50,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                margin: 10,
                marginTop: 20,
                }} onPress={() => { router.replace('../Menu'); }}>
                <Text style={{fontSize: 25}}>메뉴화면</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                backgroundColor: "skyblue",
                width: 200,
                height: 50,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                margin: 10,
                marginTop: 20,
                }} onPress={() => { router.navigate('./PlayerData_PL'); }}>
                <Text style={{fontSize: 25}}>프리미어리그</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                backgroundColor: "skyblue",
                width: 200,
                height: 50,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                margin: 10,
                marginTop: 20,
                }} onPress={() => { router.navigate('./PlayerData_PD'); }}>
                <Text style={{fontSize: 25}}>라리가</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                backgroundColor: "skyblue",
                width: 200,
                height: 50,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                margin: 10,
                marginTop: 20,
                }} onPress={() => { router.navigate('./PlayerData_BL1'); }}>
                <Text style={{fontSize: 25}}>분데스리가</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                backgroundColor: "skyblue",
                width: 200,
                height: 50,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                margin: 10,
                marginTop: 20,
                }} onPress={() => { router.navigate('./PlayerData_SA'); }}>
                <Text style={{fontSize: 25}}>세리에A</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                backgroundColor: "skyblue",
                width: 200,
                height: 50,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                margin: 10,
                marginTop: 20,
                }} onPress={() => { router.navigate('./PlayerData_FL1'); }}>
                <Text style={{fontSize: 25}}>리그1</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default DataCenterHome;