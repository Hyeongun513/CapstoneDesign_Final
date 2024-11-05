import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link, router, useLocalSearchParams } from "expo-router";

import PrimierLeague23_24 from './JsonData/PremierLeague/23-24_PrimierLeague_data.json';
import PrimierLeague22_23 from './JsonData/PremierLeague/22-23_PrimierLeague_data.json';
import PrimierLeague21_22 from './JsonData/PremierLeague/21-22_PrimierLeague_data.json';

import Laliga23_24 from './JsonData/LaLiga/23-24_LaLiga_data.json';
import Laliga22_23 from './JsonData/LaLiga/22-23_LaLiga_data.json';
import Laliga21_22 from './JsonData/LaLiga/21-22_LaLiga_data.json';

import BundesLiga23_24 from './JsonData/BundesLiga/23-24_BundesLiga_data.json'
import BundesLiga22_23 from './JsonData/BundesLiga/22-23_BundesLiga_data.json'
import BundesLiga21_22 from './JsonData/BundesLiga/21-22_BundesLiga_data.json'

import SerieA23_24 from './JsonData/SerieA/23-24_SerieA_data.json'
import SerieA22_23 from './JsonData/SerieA/22-23_SerieA_data.json'
import SerieA21_22 from './JsonData/SerieA/21-22_SerieA_data.json'

import LigueOne23_24 from './JsonData/Ligue1/23-24_Ligue1_data.json'
import LigueOne22_23 from './JsonData/Ligue1/22-23_Ligue1_data.json'
import LigueOne21_22 from './JsonData/Ligue1/21-22_Ligue1_data.json'

import ErrorData from './JsonData/ErrorData.json'

const PlayerDataDetail = () => {
    const { Rk, Season, League } = useLocalSearchParams();  // URL에서 teamId 파라미터를 가져옴

    let data;
    
    if (League == 'PL') {
      if (Season == '23-24') data = PrimierLeague23_24; else if (Season == '22-23') data = PrimierLeague22_23; else if (Season == '21-22') data = PrimierLeague21_22; else data = ErrorData;
    } else if (League == 'PD') {
      if (Season == '23-24') data = Laliga23_24; else if (Season == '22-23') data = Laliga22_23; else if (Season == '21-22') data = Laliga21_22; else data = ErrorData;
    } else if (League == 'BL1') {
      if (Season == '23-24') data = BundesLiga23_24; else if (Season == '22-23') data = BundesLiga22_23; else if (Season == '21-22') data = BundesLiga21_22; else data = ErrorData;
    } else if (League == 'SA') {
      if (Season == '23-24') data = SerieA23_24; else if (Season == '22-23') data = SerieA22_23; else if (Season == '21-22') data = SerieA21_22; else data = ErrorData;
    } else if (League == 'FL1') {
      if (Season == '23-24') data = LigueOne23_24; else if (Season == '22-23') data = LigueOne22_23; else if (Season == '21-22') data = LigueOne21_22; else data = ErrorData;
    } else {
      if (Season == '23-24') data = ErrorData; else data = ErrorData;
    }
  
  // Rk 값을 통해 해당 플레이어의 상세 정보를 가져옴
  const playerDetails = data.find(item => item.Rk == Rk);

  return (
    <View style={styles.container}>
        <Text style={styles.title}>선수명 : {playerDetails.Player}</Text>
        <Text>시즌 : {Season}</Text>
        <Text>리그 : {League}</Text>
        <Text>Rk : {Rk}</Text>
        <Text>국적: {playerDetails.Nation}</Text>
        <Text>소속팀: {playerDetails.Squad}</Text>
        <Text>포지션: {playerDetails.Pos}</Text>
        <Text>나이: {playerDetails.Age} ({playerDetails.Born}년 출생)</Text>
        <Text>경기수: {playerDetails.MP}(선발 : {playerDetails.Starts})</Text>
        <Text>출전시간: {playerDetails.Min}</Text>
        <Text>시즌 득점: {playerDetails.Gls}</Text>
        <Text>시즌 도움: {playerDetails.Ast}</Text>
        {/* <Text>시즌 공포: {playerDetails.G+A}</Text> */}
        <Text>시즌 공포: {playerDetails['G+A']}</Text> 
        <Text>경고: {playerDetails.CrdY}</Text>
        <Text>퇴장: {playerDetails.CrdR}</Text>
        <Text>전진 드리블 성공: {playerDetails.PrgC}</Text>
        <Text>전진 패스 횟수: {playerDetails.PrgP}</Text>
        <Text>전진 이동 횟수: {playerDetails.PrgR}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
});

export default PlayerDataDetail;