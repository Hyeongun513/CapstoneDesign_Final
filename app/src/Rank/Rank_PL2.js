import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { Link, router } from "expo-router";

// PL(피엘), BL1(분데스), PD(라리가), FL1(리그앙), SA(세리에) 

const Rank_PL2 = () => {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const API_Code = 'https://api.football-data.org/v4/competitions/PL/standings';
        const fetchStandings = async () => {
            try {
                const response = await axios.get(API_Code, {
                    headers: {
                        'X-Auth-Token': '22ec1616e6ee4aa5b4b1ea5095555277', // API 키 입력
                    },
                });

                // standings 배열에 각 팀의 순위 정보가 담겨 있음
                setStandings(response.data.standings[0].table); // standings 배열 중 첫 번째 배열에 'table'이 있음
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStandings();
    }, []);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    const Print_Rank = () => {
        return (
            <View>
                {/* 표 제목란 */}
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerText, {width: '10%'}]}>순위</Text>
                    <Text style={[styles.headerText, {width: '50%'}]}>팀명</Text>
                    <Text style={[styles.headerText, {width: '15%'}]}>경기수</Text>
                    <Text style={[styles.headerText, {width: '10%'}]}>승점</Text>
                    <Text style={[styles.headerText, {width: '15%'}]}>득실차</Text>
                </View>

                {/* 한줄씩 출력 */}
                {/* position:순위, team.name:팀명, points:승점, playedGames:경기수, goalDifference:골득실 */}
                <FlatList
                    data={standings}
                    keyExtractor={(item) => item.team.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.rankItem}>

                            <View style={{ width: '10%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.position}</Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={{ fontSize: 16 }}>{item.team.name}</Text>
                            </View>
                            <View style={{ width: '15%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16 }}>{item.playedGames}</Text>
                            </View>
                            <View style={{ width: '10%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.points}</Text>
                            </View>
                            <View style={{ width: '5%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: 'gray' }}>{item.goalsFor}</Text>
                                <Text style={{ fontSize: 12, color: 'gray' }}>{item.goalsAgainst}</Text>
                            </View>
                            <View style={{ width: '10%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16 }}>{item.goalDifference}</Text>
                            </View>

                        </View>
                    )}
                />
            </View>
        );
    };

    const Print_Button = () => {
        return (
            <View>
                <Text> ================================== </Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => { router.replace('./Rank_Home') }}
                    >
                        <Text style={{ fontSize: 15 }}>메뉴화면</Text>
                    </TouchableOpacity>
                    <Text> 리그 : PL </Text>
                </View>
                <Text> ================================= </Text>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
            {Print_Button()}
            {Print_Rank()}
        </View>
    );
};

const styles = StyleSheet.create({
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#aaa',
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        // width: '20%',
        textAlign: 'center',
    },
    rankItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f8f8f8',
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    menuButton: {
        backgroundColor: 'skyblue',
        width: 100,
        height: 30,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
});

export default Rank_PL2;

// won: 팀이 이긴 경기 수
// draw: 팀이 비긴 경기 수
// lost: 팀이 패배한 경기 수
// goalsFor: 팀이 득점한 총 골 수
// goalsAgainst: 팀이 실점한 총 골 수
// form: 팀의 최근 경기 성적을 나타내는 문자열 (최근 경기의 승/패 기록)
// goalDifference: 팀의 득실차
// playedGames: 치른 경기 수