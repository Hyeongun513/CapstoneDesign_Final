import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, Image, ActivityIndicator } from "react-native";
import { Link, router } from "expo-router";
import App from "./App";

const Home = () => {
    const [time, setTime] = useState(0);
    const windoWidth = Dimensions.get("window").width;

    useEffect(() => {
        setTimeout(() => { setTime(1); }, 3000);
    }, []);

    return (
        time == 1 ?
        <App />
        :
        <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor: 'green'}}>
            <View style={{ flex:1.3, alignItems:'center', flexDirection: 'column-reverse' }}>
                <Image
                    source={require('../assets/icon/Logo.png')} // assets에서 아이콘 불러오기
                    style={{width: windoWidth, height: windoWidth*0.42}}
                />
            </View>
            <View style={{flex: 1}}>
                <View style={{alignItems:'center', justifyContent:'center', marginTop:30}}>
                <ActivityIndicator size="large"/>
                </View>
            </View>
        </View>
    );
};

export default Home;