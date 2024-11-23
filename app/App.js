import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Link, router } from "expo-router"; 

const App = () => {
    const windoWidth = Dimensions.get("window").width;

    return (
        <TouchableOpacity activeOpacity={0.7} style={{ flex: 1, backgroundColor:'green', alignItems: 'center', justifyContent:'center'}} onPress={() => { router.replace('./src/Menu'); }}>
            <View style={{ flex: 1.3, alignItems: 'center', flexDirection: 'column-reverse'}}>
                    <Image
                        source={require('../assets/icon/Logo.png')} // assets에서 아이콘 불러오기 windoWidth*0.8*0.42
                        style={{width: windoWidth, height: windoWidth*0.42}}
                    />
            </View>
            <View style={{flex: 1}}>
                <View style={{alignItems:'center', justifyContent:'center', marginTop:30}}>
                    <Text style={{ fontSize:22, fontWeight:'bold', color:'lightgray' }}> 화면을 터치하여 시작하세요 </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default App;