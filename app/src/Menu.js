import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link, router } from "expo-router"; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MenuList from "./Menu/MenuList";
import Menu_Rank from "./Menu/Menu_Rank";
import Menu_Schedule from "./Menu/Menu_Schedule";
import Menu_Community from "./Menu/Menu_Community";
import Menu_Data from "./Menu/Menu_Data";
import Menu_Mypage from "./Menu/Menu_Mypage";

const Tab = createBottomTabNavigator(); //하단 메뉴 버튼

const Menu = () => {

    return (
        <Tab.Navigator
        initialRouteName="Test1"
        screenOptions={{    
            tabBarStyle: { 
                backgroundColor: '#DEF6D7', // 탭 배경색
                borderTopWidth: 2, // 구분선 굵기
                borderTopColor: 'gray', // 구분선 색상
            },
            tabBarLabelStyle: {
                fontSize: 14, // 폰트 크기
                fontWeight: 'bold', // 폰트 굵기
            },
            tabBarItemStyle: {
                borderRightWidth: 0.5, // 각 탭의 우측 경계선 굵기
                borderRightColor: 'gray', // 각 탭의 경계선 색상
            },
            tabBarActiveTintColor: 'green', // 선택된 탭 글씨 색
            tabBarInactiveTintColor: 'gray', // 선택되지 않은 탭 글씨 색

            tabBarActiveBackgroundColor: '#B2D8B2', // 선택된 탭의 배경색
            tabBarInactiveBackgroundColor: '#DEF6D7', // 선택되지 않은 탭의 배경색
        }}
    >
        <Tab.Screen
            name="Test1"
            // component={Test1}
            component={Menu_Rank}
            options={{
                tabBarLabel: '순위',
                headerShown: false, //상단 헤더(제목) 숨김
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../../assets/icon/Rank.png')} // assets에서 아이콘 불러오기
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: focused ? 'green' : 'gray'
                        }}
                    />
                ),
            }}
        />
        <Tab.Screen
            name="Test2"
            // component={Test2}
            component={Menu_Schedule}
            options={{
                tabBarLabel: '일정',
                headerShown: false, //상단 헤더(제목) 숨김
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../../assets/icon/Schedule.png')} // assets에서 아이콘 불러오기
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: focused ? 'green' : 'gray'
                        }}
                    />
                ),
            }}
        />
        <Tab.Screen
            name="Test3"
            // component={Test3}
            component={Menu_Community}
            options={{
                tabBarLabel: '커뮤니티',
                headerShown: false, //상단 헤더(제목) 숨김
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../../assets/icon/Community.png')} // assets에서 아이콘 불러오기
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: focused ? 'green' : 'gray'
                        }}
                    />
                ),
            }}
        />
        <Tab.Screen
            name="Test4"
            // component={Test4}
            component={Menu_Data}
            options={{
                tabBarLabel: '데이터',
                headerShown: false, //상단 헤더(제목) 숨김
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../../assets/icon/Datacenter.png')} // assets에서 아이콘 불러오기
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: focused ? 'green' : 'gray'
                        }}
                    />
                ),
            }}
        />
            <Tab.Screen
            name="Home"
            component={Menu_Mypage}
            options={{
                tabBarLabel: '마이페이지',
                headerShown: false, //상단 헤더(제목) 숨김
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../../assets/icon/Mypage.png')} // assets에서 아이콘 불러오기
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: focused ? 'green' : 'gray'
                        }}
                    />
                ),
            }}
        />
        {/* <Tab.Screen
            name="Test5"
            component={Test5}
            options={{
                tabBarLabel: '팀정보',
                headerShown: false, //상단 헤더(제목) 숨김
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={require('../../assets/icon/Squad.png')} // assets에서 아이콘 불러오기
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: focused ? 'green' : 'gray'
                        }}
                    />
                ),
            }}
        /> */}
        </Tab.Navigator>
    );
};

export default Menu;