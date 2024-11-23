import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Link, router, useLocalSearchParams } from "expo-router";
import { BarChart, LineChart } from 'react-native-chart-kit';
import ScatterChart_Prg from './ScatterChart_Prg';
import ScatterChart_Defens from './ScatterChart_Defens';

import PrimierLeague23_24 from './JsonData/PremierLeague/23-24_PL_data.json';
import PrimierLeague22_23 from './JsonData/PremierLeague/22-23_PL_data.json';
import PrimierLeague21_22 from './JsonData/PremierLeague/21-22_PL_data.json';

import Laliga23_24 from './JsonData/LaLiga/23-24_PD_data.json';
import Laliga22_23 from './JsonData/LaLiga/22-23_PD_data.json';
import Laliga21_22 from './JsonData/LaLiga/21-22_PD_data.json';

import BundesLiga23_24 from './JsonData/BundesLiga/23-24_BL1_data.json'
import BundesLiga22_23 from './JsonData/BundesLiga/22-23_BL1_data.json'
import BundesLiga21_22 from './JsonData/BundesLiga/21-22_BL1_data.json'

import SerieA23_24 from './JsonData/SerieA/23-24_SA_data.json'
import SerieA22_23 from './JsonData/SerieA/22-23_SA_data.json'
import SerieA21_22 from './JsonData/SerieA/21-22_SA_data.json'

import LigueOne23_24 from './JsonData/Ligue1/23-24_FL1_data.json'
import LigueOne22_23 from './JsonData/Ligue1/22-23_FL1_data.json'
import LigueOne21_22 from './JsonData/Ligue1/21-22_FL1_data.json'

import ChampionsLeague23_24 from './JsonData/ChampionsLeague/23-24_CL_data.json';
import ChampionsLeague22_23 from './JsonData/ChampionsLeague/22-23_CL_data.json';
import ChampionsLeague21_22 from './JsonData/ChampionsLeague/21-22_CL_data.json';

import ErrorData from './JsonData/ErrorData.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlayerDataDetail = () => {
    const { Rk, Season, League } = useLocalSearchParams();  // URL에서 teamId 파라미터를 가져옴

    const [xgButton, setXgButton] = useState(true);
    const [scatterButton, setScatterButton] = useState(true);
    const [cardButton, setCardButton] = useState(true);
    const [kpButton, setKpButton] = useState(true);
    const [defensButton, setDefensButton] = useState(true);
    const [followPlayer, setFollowPlayer] = useState('없음'); //팔로우된 선수

    let data;
    
    if (League == 'PL') { //League, Season 값에 따라 data에 json 파일 할당
      if (Season == '23-24') data = PrimierLeague23_24; else if (Season == '22-23') data = PrimierLeague22_23; else if (Season == '21-22') data = PrimierLeague21_22; else data = ErrorData;
    } else if (League == 'PD') {
      if (Season == '23-24') data = Laliga23_24; else if (Season == '22-23') data = Laliga22_23; else if (Season == '21-22') data = Laliga21_22; else data = ErrorData;
    } else if (League == 'BL1') {
      if (Season == '23-24') data = BundesLiga23_24; else if (Season == '22-23') data = BundesLiga22_23; else if (Season == '21-22') data = BundesLiga21_22; else data = ErrorData;
    } else if (League == 'SA') {
      if (Season == '23-24') data = SerieA23_24; else if (Season == '22-23') data = SerieA22_23; else if (Season == '21-22') data = SerieA21_22; else data = ErrorData;
    } else if (League == 'FL1') {
      if (Season == '23-24') data = LigueOne23_24; else if (Season == '22-23') data = LigueOne22_23; else if (Season == '21-22') data = LigueOne21_22; else data = ErrorData;
    } else if (League == 'CL') {
      if (Season == '23-24') data = ChampionsLeague23_24; else if (Season == '22-23') data = ChampionsLeague22_23; else if (Season == '21-22') data = ChampionsLeague21_22; else data = ErrorData;
    } else {
      if (Season == '23-24') data = ErrorData; else data = ErrorData;
    };

    //======================즐겨찾기======================
    // 저장된 팔로우 데이터를 불러오는 함수
    const loadFollowPlayer = async () => {
      try {
      const value = await AsyncStorage.getItem('FollowPlayer');
      if (value !== null) {
        setFollowPlayer(value);
      }
      } catch (e) {
      setFollowPlayer('없음');
      console.error('팔로우 데이터 불러오기 실패:', e);
      }
    };

    useEffect(() => {
      loadFollowPlayer();
    }, []);

    changeStarOn = async () => { //팔로우 활성화 클릭시 팔로우 저장
      try {
        await AsyncStorage.setItem('FollowPlayer', playerDetails.Player);
        setFollowPlayer(playerDetails.Player);
        Alert.alert(`선수 즐겨찾기`, `${playerDetails.Player}를 즐겨찾기에 추가했습니다. \n이전에 즐겨찾기 된 선수가 있다면 자동으로 해제됩니다.`);
      } catch (e) {
        console.error('데이터 저장 실패:', e);
      };
    };

    changeStarOff = async () => { //팔로우 비활성화 클릭시 팔로우 '없음'으로 저장장
      try {
        await AsyncStorage.setItem('FollowPlayer', '없음');
        setFollowPlayer('없음');
        Alert.alert(`즐겨찾기 취소`, `${playerDetails.Player}의 즐겨찾기가 해제되었습니다. \n현재 즐겨찾기에 등록된 선수가 없습니다.`);
      } catch (e) {
        console.error('데이터 저장 실패:', e);
      };
    };

    //======================즐겨찾기======================

    // Rk 값을 통해 해당 플레이어의 상세 정보를 가져옴
    const playerDetails = data.find(item => item.Rk == Rk);

    const Min90 = data.reduce((sum, player) => sum + (player['90s'] || 0), 0); //90s 전체 합
    const Min90Average = Min90 / data.length; //인당 90s 평균

    //================================▽▽▽통계 평균치▽▽▽================================
    AveragePrgC = () => { //90분당 PrgC 리그 평균
      const PrgCtotal = data.reduce((sum, player) => sum + (player.PrgC || 0), 0);
      const PrgCAverage = PrgCtotal / data.length;
      const PerAverage = PrgCAverage / Min90Average //90분당 PrgP 리그 평균

      return (PerAverage.toFixed(2));
    };

    AveragePrgP = () => { //90분당 PrgP 리그 평균
      const PrgPtotal = data.reduce((sum, player) => sum + (player.PrgP || 0), 0); //PrgP 전체 합
      const PrgPAverage = PrgPtotal / data.length; //PrgP 리그 평균
      const PerAverage = PrgPAverage / Min90Average //90분당 PrgP 리그 평균

      return (PerAverage.toFixed(2));
    };
  
    const playerPrgC = ((playerDetails.PrgC) / (playerDetails['90s'])).toFixed(2); //90분당 선수 PrgC
    const playerPrgP = ((playerDetails.PrgP) / (playerDetails['90s'])).toFixed(2); //90분당 선수 PrgP\

    AverageCard = (card) => { //90분당 카드 리그 평균
      const YellowTotal = data.reduce((sum, player) => sum + (player.CrdY || 0), 0); //옐로카드(CrdY) 전체 합
      const YellowAverage = YellowTotal / data.length; //경고 리그 평균
      const PerYellowAverage = YellowAverage / Min90Average //90분당 경고 리그 평균

      const RedTotal = data.reduce((sum, player) => sum + (player.CrdR || 0), 0); //레드카드(CrdR) 전체 합
      const RedAverage = RedTotal / data.length; //퇴장 리그 평균
      const PerRedAverage = RedAverage / Min90Average //90분당 퇴장 리그 평균
      
      return ( card == 'Y' ? (PerYellowAverage.toFixed(2)) : (PerRedAverage.toFixed(2)) ); //경기당 리그 평균 경고 및 퇴장 출력
    };
    //================================△△△통계 평균치△△△================================

  const BarChart_Custom = ({ chartData }) => {
    return (
      <BarChart
        data={chartData}
        width={Dimensions.get('window').width - 40} // 화면 너비에 맞춤
        height={220}
        showBarTops={false} 
        showValuesOnTopOfBars={true} // 막대 위에 값 표시
        // yAxisLabel=""
        fromZero={true} //y축 최소값 0
        chartConfig={{
          backgroundGradientFrom: '#90EE90', //차트 배경색 1(좌측 하단)
          backgroundGradientTo: '#90EE90', //차트 배경색 2(우측 상단)
          decimalPlaces: 2, // 소수점 지정, y축 값 소수점 2번째 자리까지 출력
          //color: () => 'green',
          color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
          // strokeWidth: 12,
          propsForLabels: {
            fontWeight: 'bold', // 라벨 글씨체를 굵게 설정
          },
          fillShadowGradientFrom: 'green', // 막대 상단 색상
          fillShadowGradientFromOpacity: 0.9, // 막대 상단 불투명도 0~1
          fillShadowGradientTo: '#8cd359', // 막대 하단 색상
          fillShadowGradientToOpacity: 0.7, // 막대 하단 불투명도 0~1
          propsForBackgroundLines: {
            strokeDasharray: '', // 점선 여부
          },
        }}
      />
    )
  }

  const XgChart = ({ playerData }) => { //기대값 통계
      const chartData = {
        labels: ['득점', '기대득점', '도움', '기대도움'],
        datasets: [
          {
            data: [playerData.Gls, playerData.xG, playerData.Ast, playerData.xAG],
          },
        ],
      };
  
    return (
      xgButton ? //xgButton의 값에 따라 글자 혹은 차트 출력
      <TouchableOpacity onPress={() => { setXgButton(false); }}>
        <View style={styles.chartContainer}>

          <View style={[styles.infoContainer2, {borderBottomWidth: 1, borderColor:'gray', marginBottom: 15, }]}>
            <View style={[styles.infoContainer3, {marginBottom: 7, flexDirection: 'row', justifyContent:'space-between', width: '100%'}]}>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#90EE90'}}>ᐱ</Text>
              <Text style={{fontSize:18, fontWeight:'bold'}}> 공격 지표 : 기대값 비교</Text>
              <Text style={{fontSize:20, fontWeight:'900'}}>ᐱ </Text>
            </View>
          </View>

          <BarChart_Custom chartData={chartData} />
          </View>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => { setXgButton(true); }}>
        <View style={styles.infoContainer}>
          <View style={[styles.infoContainer2, {borderBottomWidth: 1, borderColor:'gray'}]}>
            <View style={[styles.infoContainer3, {marginBottom: 7, flexDirection: 'row', justifyContent:'space-between', width: '100%'}]}>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#90EE90'}}>ᐯ</Text>
              <Text style={{fontSize:18, fontWeight:'bold'}}> 공격 지표 : 기대값 비교</Text>
              <Text style={{fontSize:20, fontWeight:'900'}}>ᐯ </Text>
            </View>
          </View>
          <View style={styles.infoContainer2}>
            <View style={[styles.infoContainer3, {marginVertical: 7}]}>
              <Text style={{fontSize:15, fontWeight:'bold'}}>{playerDetails.Gls}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>실제득점</Text>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.Ast}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>실제도움</Text>
              
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails['G+A']}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>공격포인트(G+A)</Text>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails['G-PK']}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>PK제외 득점</Text>
              
            </View>
            <View style={[styles.infoContainer3, {marginVertical: 7}]}>
            <Text style={{fontSize:15, fontWeight:'bold'}}>{playerDetails.xG}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>기대득점(xG)</Text>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.xAG}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>기대도움(xA)</Text>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.xG + playerDetails.xAG}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>기대공격포인트(xP)</Text>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.npxG}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>PK제외 xG</Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
    );
  };

  const PrintScatterPrg = () => { //Prg 데이터 통계
    return (
    scatterButton ?
    <TouchableOpacity onPress={() => { setScatterButton(false); }}>
      <ScatterChart_Prg name={playerDetails.Player} playerPrgC={playerPrgC} playerPrgP={playerPrgP} averagePrgC={AveragePrgC()} averagePrgP={AveragePrgP()}/>
    </TouchableOpacity>
    :
    <TouchableOpacity onPress={() => { setScatterButton(true); }}>
        <View style={styles.infoContainer}>
          <View style={[styles.infoContainer2, {borderBottomWidth: 1, borderColor:'gray'}]}>
            <View style={[styles.infoContainer3, {marginBottom: 7, flexDirection: 'row', justifyContent:'space-between', width: '100%'}]}>
              <Text style={{fontSize:18, fontWeight:'bold', color:'#90EE90'}}>ᐯ</Text>
              <Text style={{fontSize:18, fontWeight:'bold'}}>패스 지표 : Prg 비교</Text>
              <Text style={{fontSize:20, fontWeight:'900'}}>ᐯ </Text>
            </View>
          </View>
          <View style={styles.infoContainer2}>
            <View style={[styles.infoContainer3, {marginVertical: 7}]}>
              <Text style={{fontSize:15, fontWeight:'bold'}}>{playerPrgC}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>선수 개인 PrgC</Text>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{AveragePrgC()}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>리그 평균 PrgC</Text>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.PrgC}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>개인 총합 PrgC</Text>
            </View>
            <View style={[styles.infoContainer3, {marginVertical: 7}]}>
              <Text style={{fontSize:15, fontWeight:'bold'}}>{playerPrgP}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>선수 개인 PrgP</Text>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{AveragePrgP()}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>선수 평균 PrgP</Text>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.PrgP}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>개인 총합 PrgP</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  const PrintScatterDefens = () => { //경기당 수비 데이터 통계
    const TklTotal = data.reduce((sum, player) => sum + (player.Tkl || 0), 0); //태클시도(Tkl) 전체 합
    const TklAverage = (TklTotal / data.length) / Min90Average; //경기당 태클시도 리그평균
    const TklWTotal = data.reduce((sum, player) => sum + (player.TklW || 0), 0); //태클성공(TklW) 전체 합
    const TklWAverage = (TklWTotal / data.length) / Min90Average; //경기당 태클성공 리그평균
    const IntTotal = data.reduce((sum, player) => sum + (player.Int || 0), 0); //인터셉트(Int) 전체 합
    const IntAverage = (IntTotal / data.length) / Min90Average; //경기당 인터셉트 리그평균
    const PerTklW = ((playerDetails.TklW) / (playerDetails.Tkl)) * 100; //선수 개인 태클 성공률
    const PerTklWTotal = (TklWTotal / TklTotal) * 100; //리그 태클 성공률

    const playerTklW = (playerDetails.TklW / playerDetails['90s']).toFixed(2); //경기당 태클성공
    const playerInt = (playerDetails.Int / playerDetails['90s']).toFixed(2); //경기당 인터셉트

    return (
    defensButton ?
    <TouchableOpacity onPress={() => { setDefensButton(false); }}>
      <ScatterChart_Defens name={playerDetails.Player} playerTklW={playerTklW} playerInt={playerInt} averageTklW={TklWAverage.toFixed(2)} averageInt={IntAverage.toFixed(2)}/>
    </TouchableOpacity>
    :
    <TouchableOpacity onPress={() => { setDefensButton(true); }}>
        <View style={styles.infoContainer}>
          <View style={[styles.infoContainer2, {borderBottomWidth: 1, borderColor:'gray'}]}>
            <View style={[styles.infoContainer3, {marginBottom: 7, flexDirection: 'row', justifyContent:'space-between', width: '100%'}]}>
              <Text style={{fontSize:18, fontWeight:'bold', color:'#90EE90'}}>ᐯ</Text>
              <Text style={{fontSize:18, fontWeight:'bold'}}>수비 지표 : 경기당 통계 비교</Text>
              <Text style={{fontSize:20, fontWeight:'900'}}>ᐯ </Text>
            </View>
          </View>
          <View style={styles.infoContainer2}>
            <View style={[styles.infoContainer3, {marginVertical: 7}]}>
              <Text style={{fontSize:15, fontWeight:'bold'}}>{(playerDetails.Tkl / playerDetails['90s']).toFixed(2)}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>경기당 태클(선수)</Text>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerTklW}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>경기당 태클성공(선수)</Text>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerInt}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>경기당 인터셉트(선수)</Text>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{PerTklW.toFixed(1)}%</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>태클 성공률(선수)</Text>
            </View>
            <View style={[styles.infoContainer3, {marginVertical: 7}]}>
              <Text style={{fontSize:15, fontWeight:'bold'}}>{TklAverage.toFixed(2)}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>경기당 태클(평균)</Text>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{TklWAverage.toFixed(2)}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>경기당 태클성공(평균)</Text>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{IntAverage.toFixed(2)}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>경기당 인터셉트(평균)</Text>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{PerTklWTotal.toFixed(1)}%</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>태클 성공률(평균)</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  const CardChart = ({ playerData }) => { //경고 및 퇴장 수치 통계
    const playerYellow = (playerData.CrdY / playerDetails['90s']).toFixed(2);
    const playerRed = (playerData.CrdR / playerDetails['90s']).toFixed(2);

    const chartData = {
      labels: ['개인 경고', '평균 경고', '개인 퇴장', '평균 퇴장'],
      datasets: [
        {
          data: [playerYellow, AverageCard('Y'), playerRed, AverageCard('R')],
        },
      ],
    };

    return (
    cardButton ?
    <TouchableOpacity onPress={() => { setCardButton(false); }}>
        <View style={styles.chartContainer}>

          <View style={[styles.infoContainer2, {borderBottomWidth: 1, borderColor:'gray', marginBottom: 15, }]}>
            <View style={[styles.infoContainer3, {marginBottom: 7, flexDirection: 'row', justifyContent:'space-between', width: '100%'}]}>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#90EE90'}}>ᐱ</Text>
              <Text style={{fontSize:18, fontWeight:'bold'}}> 기타 지표 : 카드 통계</Text>
              <Text style={{fontSize:20, fontWeight:'900'}}>ᐱ </Text>
            </View>
          </View>

            <BarChart_Custom chartData={chartData} />
          </View>
        </TouchableOpacity>
    :
    <TouchableOpacity onPress={() => { setCardButton(true); }}>
      <View style={styles.infoContainer}>
        <View style={[styles.infoContainer2, {borderBottomWidth: 1, borderColor:'gray'}]}>
          <View style={[styles.infoContainer3, {marginBottom: 7, flexDirection: 'row', justifyContent:'space-between', width: '100%'}]}>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#90EE90'}}>ᐯ</Text>
            <Text style={{fontSize:18, fontWeight:'bold'}}>경기당 카드 통계</Text>
            <Text style={{fontSize:20, fontWeight:'900'}}>ᐯ </Text>
          </View>
        </View>
        <View style={styles.infoContainer2}>
          <View style={[styles.infoContainer3, {marginVertical: 7}]}>
            <Text style={{fontSize:15, fontWeight:'bold'}}>{playerData.CrdY}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>시즌 경고</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerYellow}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>경기당 경고</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{AverageCard('Y')}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>평균 경고</Text>
          </View>
          <View style={[styles.infoContainer3, {marginVertical: 7}]}>
            <Text style={{fontSize:15, fontWeight:'bold'}}>{playerData.CrdR}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>시즌 퇴장</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerRed}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>경기당 퇴장</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{AverageCard('R')}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>평균 퇴장</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    )
  };

  const AttackIndex = () =>{ //공격 지표
    return (
      <View style={styles.infoContainer}>
        <View style={[styles.infoContainer2, {borderBottomWidth: 1, borderColor:'gray'}]}>
          <View style={[styles.infoContainer3, {marginBottom: 7, justifyContent:'center', width: '100%'}]}>
            <Text style={{fontSize:18, fontWeight:'bold'}}>공격 지표</Text>
          </View>
        </View>
        <View style={styles.infoContainer2}>
          <View style={[styles.infoContainer3, {marginVertical: 7}]}>
            <Text style={{fontSize:15, fontWeight:'bold'}}>{playerDetails.Sh}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>전체 슈팅</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails['Sh/90']}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>경기당 슈팅</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails['G/Sh']}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>슈팅 대비 득점</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.PKatt}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>패널티 득점</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.FK}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>프리킥 득점</Text>
          </View>
          <View style={[styles.infoContainer3, {marginVertical: 7}]}>
            <Text style={{fontSize:15, fontWeight:'bold'}}>{playerDetails.SoT}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>유효 슈팅</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails['SoT/90']}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>경기당 유효 슈팅</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails['G/SoT']}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>유효 슈팅 대비 득점</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.PKatt}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>패널티 시도</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.Dist}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>평균 슈팅거리</Text>
          </View>
        </View>
      </View>
    )
  };

  const PassingIndex = () =>{ //패스 지표
    const PassTotal = data.reduce((sum, player) => sum + (player['Cmp%'] || 0), 0); //패스 성공률 전체 합
    const PassAverage = PassTotal / data.length; //패스 성공률 리그 평균

    return (
      <View style={styles.infoContainer}>
        <View style={[styles.infoContainer2, {borderBottomWidth: 1, borderColor:'gray'}]}>
          <View style={[styles.infoContainer3, {marginBottom: 7, justifyContent:'center', width: '100%'}]}>
            <Text style={{fontSize:18, fontWeight:'bold'}}>패스 지표</Text>
          </View>
        </View>
        <View style={styles.infoContainer2}>
          <View style={[styles.infoContainer3, {marginVertical: 7}]}>
            <Text style={{fontSize:15, fontWeight:'bold'}}>{playerDetails.Att}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>패스 시도</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails['Cmp%']}%</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>패스 성공률(선수)</Text>
          </View>
          <View style={[styles.infoContainer3, {marginVertical: 7}]}>
            <Text style={{fontSize:15, fontWeight:'bold'}}>{playerDetails.Cmp}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>성공한 패스</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{PassAverage.toFixed(1)}%</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>패스 성공률(평균)</Text>
          </View>
        </View>
      </View>
    )
  };

  const KPIndex = () =>{ //키패스 지표
    const Player_PerKP = playerDetails.KP / playerDetails['90s'] //경기당 키패스
    const KPTotal = data.reduce((sum, player) => sum + (player.KP || 0), 0); //KP 전체 합
    const KPAverage = KPTotal / data.length; //KP 리그 평균
    const League_PerKP = KPAverage / Min90Average //90분당 KP 리그 평균

    const chartData = {
      labels: ['경기당 키패스', '리그 평균'],
      datasets: [
        {
          data: [Player_PerKP.toFixed(1), League_PerKP.toFixed(1)],
        },
      ],
    };

    return (
      kpButton ?
      <TouchableOpacity onPress={() => { setKpButton(false); }}>
        <View style={styles.chartContainer}>

          <View style={[styles.infoContainer2, {borderBottomWidth: 1, borderColor:'gray', marginBottom: 15, }]}>
            <View style={[styles.infoContainer3, {marginBottom: 7, flexDirection: 'row', justifyContent:'space-between', width: '100%'}]}>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#90EE90'}}>ᐱ</Text>
              <Text style={{fontSize:18, fontWeight:'bold'}}> 패스 지표 : 키패스 비교</Text>
              <Text style={{fontSize:20, fontWeight:'900'}}>ᐱ </Text>
            </View>
          </View>

          <BarChart_Custom chartData={chartData} />
          </View>
        </TouchableOpacity>
      :
      <TouchableOpacity onPress={() => { setKpButton(true); }}>
        <View style={styles.infoContainer}>
          <View style={[styles.infoContainer2, {borderBottomWidth: 1, borderColor:'gray'}]}>
            <View style={[styles.infoContainer3, {marginBottom: 7, flexDirection: 'row', justifyContent:'space-between', width: '100%'}]}>
              <Text style={{fontSize:18, fontWeight:'bold', color:'#90EE90'}}>ᐯ</Text>
              <Text style={{fontSize:18, fontWeight:'bold'}}>패스 지표 : 키패스 비교</Text>
              <Text style={{fontSize:20, fontWeight:'900'}}>ᐯ </Text>
            </View>
          </View>
          <View style={styles.infoContainer2}>
          <View style={[styles.infoContainer3, {marginVertical: 7}]}>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.KP}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>전체 키패스</Text>
            </View>
            <View style={[styles.infoContainer3, {marginVertical: 7}]}>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{Player_PerKP.toFixed(1)}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>경기당 키패스(선수)</Text>
            </View>
            <View style={[styles.infoContainer3, {marginVertical: 7}]}>
              <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{League_PerKP.toFixed(1)}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>경기당 키패스(평균)</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  const DefensIndex = () => { //수비 지표
    const PerTklW = ((playerDetails.TklW) / (playerDetails.Tkl)) * 100; //태클 성공률

    return (
      <View style={styles.infoContainer}>
        <View style={[styles.infoContainer2, {borderBottomWidth: 1, borderColor:'gray'}]}>
          <View style={[styles.infoContainer3, {marginBottom: 7, justifyContent:'center', width: '100%'}]}>
            <Text style={{fontSize:18, fontWeight:'bold'}}>수비 지표</Text>
          </View>
        </View>
        <View style={styles.infoContainer2}>
          <View style={[styles.infoContainer3, {marginVertical: 7}]}>
            <Text style={{fontSize:15, fontWeight:'bold'}}>{playerDetails.Tkl}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>전체 태클</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.ShB}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>슈팅블록</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.Int}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>인터셉트</Text>
          </View>
          <View style={[styles.infoContainer3, {marginVertical: 7}]}>
            <Text style={{fontSize:15, fontWeight:'bold'}}>{playerDetails.TklW}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>태클 성공</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.Pass}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>패스블록</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.Clr}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>클리어링</Text>
          </View>
          <View style={[styles.infoContainer3, {marginVertical: 7}]}>
            <Text style={{fontSize:15, fontWeight:'bold'}}>{PerTklW.toFixed(1)}%</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>태클 성공률</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.Blocks}</Text>
            <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>총 블록</Text>
            <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.Err}</Text>
              <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>치명적 실수</Text>
          </View>

        </View>
        <View style={{flexDirection: 'row', marginTop: 7}}>
          <Image source={require('../../../assets/icon/Info.png')} style={{width: 18, height: 18}} />
          <Text style={{fontSize: 12, color: 'black', fontWeight: 'bold', marginLeft: 3}}>치명적 실수 : 상대의 슈팅으로 이어진 실수</Text>
        </View>
      </View>
    )
  };

  const PrintInfo1 = () => { //국적, 나이, 포지션
    return (
      <View style={[styles.infoContainer2, {borderBottomWidth: 1, borderColor:'gray'}]}>
        <View style={[styles.infoContainer3, {marginBottom: 7}]}>
          <Text style={{fontSize:15, fontWeight:'bold'}}>{playerDetails.Nation}</Text>
          <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>국적</Text>
        </View>
        <View style={[styles.infoContainer3, {marginBottom: 7}]}>
          <Text style={{fontSize:15, fontWeight:'bold'}}>{playerDetails.Age}세</Text>
          <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>{playerDetails.Born}년생</Text>
        </View>
        <View style={[styles.infoContainer3, {marginBottom: 7}]}>
          <Text style={{fontSize:15, fontWeight:'bold'}}>{playerDetails.Pos}</Text>
          <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>포지션</Text>
        </View>
      </View>
    )
  };

  const PrintInfo2 = () => { //경기수, 득점, 도움, 출전시간
    return (
      <View style={styles.infoContainer2}>
        <View style={styles.infoContainer3}>
          <Text style={{fontSize:15, fontWeight:'bold'}}>{playerDetails.MP}</Text>
          <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>경기</Text>
          <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.Starts}</Text>
          <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>선발</Text>
        </View>
        <View style={styles.infoContainer3}>
          <Text style={{fontSize:15, fontWeight:'bold'}}>{playerDetails.Gls}</Text>
          <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>득점</Text>
          <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.MP - playerDetails.Starts}</Text>
          <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>교체</Text>
          <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.Squad}</Text>
          <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>소속팀</Text>
        </View>
        <View style={styles.infoContainer3}>
          <Text style={{fontSize:15, fontWeight:'bold'}}>{playerDetails.Ast}</Text>
          <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>도움</Text>
          <Text style={{fontSize:15, fontWeight:'bold', marginTop: 15}}>{playerDetails.Min}</Text>
          <Text style={{fontSize:12, fontWeight:'bold', color:'#5F5F5F'}}>출전시간</Text>
        </View>
      </View>
    )
  };

  const PrintLeague = () => { //리그 이미지 출력
    if (League == 'PL') { //League, Season 값에 따라 data에 json 파일 할당
      return (
      <View style={{flexDirection:'row', alignItems:'center', marginVertical:7}}>
        <Image source={require('../../../assets/icon/epl.png')} style={{width: 30, height: 30}} />
        <Text style={{fontSize: 16, fontWeight:'bold'}}> {Season} 잉글랜드 프리미어리그 </Text>
      </View>
      )
    } else if (League == 'PD') {
      return (
      <View style={{flexDirection:'row', alignItems:'center', marginVertical:7}}>
        <Image source={require('../../../assets/icon/primera.png')} style={{width: 30, height: 30}} />
        <Text style={{fontSize: 16, fontWeight:'bold'}}> {Season} 스페인 라리가 </Text>
      </View>
      )
    } else if (League == 'BL1') {
      return (
      <View style={{flexDirection:'row', alignItems:'center', marginVertical:7}}>
        <Image source={require('../../../assets/icon/bundesliga.png')} style={{width: 30, height: 30}} />
        <Text style={{fontSize: 16, fontWeight:'bold'}}> {Season} 독일 분데스리가 </Text>
      </View>
      )
    } else if (League == 'SA') {
      return (
      <View style={{flexDirection:'row', alignItems:'center', marginVertical:7}}>
        <Image source={require('../../../assets/icon/seria.png')} style={{width: 30, height: 30}} />
        <Text style={{fontSize: 16, fontWeight:'bold'}}> {Season} 이탈리아 세리에 A </Text>
      </View>
      )
    } else if (League == 'FL1') {
      return (
      <View style={{flexDirection:'row', alignItems:'center', marginVertical:7}}>
        <Image source={require('../../../assets/icon/ligue1.png')} style={{width: 30, height: 30}} />
        <Text style={{fontSize: 16, fontWeight:'bold'}}> {Season} 프랑스 리그 1 </Text>
      </View>
      )
    } else if (League == 'CL') {
      return (
      <View style={{flexDirection:'row', alignItems:'center', marginVertical:7}}>
        <Image source={require('../../../assets/icon/champs.png')} style={{width: 30, height: 30}} />
        <Text style={{fontSize: 16, fontWeight:'bold'}}> {Season} UEFA 챔피언스리그 </Text>
      </View>
      )
    } else {
      return <Text>League Error!</Text>
    };
  };



  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={{justifyContent: 'space-between', width:'100%', flexDirection: 'row'}}>
        <Image source={require('../../../assets/icon/StarOff.png')} style={{width: 30, height: 30, opacity: 0}} /> 

      <View style={{flexDirection: 'row', alignItems:'center'}}>
        <View style={styles.playerPicture}>
          <Image source={require('../../../assets/images/non_player.png')} style={{width: '95%', height: '95%'}} />
        </View>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color:'white', marginVertical: 20 }}>{playerDetails.Player}</Text>
      </View>

      {followPlayer == playerDetails.Player ? 
      <TouchableOpacity style={{ marginTop:3, marginRight:3 }} onPress={() => {changeStarOff()}}>
          <Image source={require('../../../assets/icon/StarOn.png')} style={{width: 30, height: 30}} /> 
      </TouchableOpacity>
      : 
      <TouchableOpacity style={{ marginTop:3, marginRight:3 }} onPress={() => {changeStarOn()}}>
          <Image source={require('../../../assets/icon/StarOff.png')} style={{width: 30, height: 30}} />
      </TouchableOpacity>
      }
      </View>

      <View style={styles.infoContainer}>
      {PrintInfo1()}
      {PrintLeague()}
      {PrintInfo2()}
      </View>

      {AttackIndex()}
      <XgChart playerData={playerDetails} />
      {PassingIndex()}
      
      {PrintScatterPrg()}
      {KPIndex()}
      {DefensIndex()}
      {PrintScatterDefens()}
      <CardChart playerData={playerDetails} />

      
      {/* <Text>===========공격지표===========</Text>
      <Text>경기당 태클 X, 경기당 인터셉트 Y</Text>
      <Text>전체 슛 : {playerDetails.Sh}</Text>
      <Text>유효 슛 : {playerDetails.SoT}</Text>
      <Text>슈팅정확도(유효슛/전체슛) : {playerDetails['SoT%']}%</Text>
      <Text>경기당 슛 : {playerDetails['Sh/90']}</Text>
      <Text>경기당 유효슛 : {playerDetails['SoT/90']}</Text>
      <Text>슈팅대비득점 : {playerDetails['G/Sh']}</Text>
      <Text>유효슛대비득점 : {playerDetails['G/SoT']}</Text>
      <Text>평균슈팅거리 : {playerDetails.Dist}</Text>
      <Text>프리킥득점 : {playerDetails.FK}</Text>
      <Text>패널티득점 : {playerDetails.PK}</Text>
      <Text>패널티시도 : {playerDetails.PKatt}</Text>
      <Text>===========패스지표===========</Text>
      <Text>성공한 패스 : {playerDetails.Cmp}</Text>
      <Text>패스 시도 : {playerDetails.Att}</Text>
      <Text>패스성공률 : {playerDetails['Cmp%']}%</Text>
      <Text>키패스 : {playerDetails.KP}</Text>
      <Text>===========수비지표===========</Text>
      <Text>태클횟수 : {playerDetails.Tkl}</Text>
      <Text>태클성공횟수 : {playerDetails.TklW}</Text>
      <Text>슈팅블락 : {playerDetails.ShB}</Text>
      <Text>패스블락 : {playerDetails.Pass}</Text>
      <Text>총블락 : {playerDetails.Blocks}</Text>
      <Text>인터셉트 : {playerDetails.Int}</Text>
      <Text>태클+인터셉트 : {playerDetails['Tkl+Int']}</Text>
      <Text>클리어링 : {playerDetails.Clr}</Text>
      <Text>치명적실수 : {playerDetails.Err}</Text> */}
        
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    width: Dimensions.get('window').width - 40,
    backgroundColor:'#90EE90', 
    borderRadius: 16, 
    alignItems:'center', 
    justifyContent:'center',
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 4 }, // 그림자 위치
    shadowOpacity: 0.8, // 그림자 불투명도
    shadowRadius: 6, // 그림자 반경
    elevation: 8, // 안드로이드 그림자
    overflow: 'hidden',
    padding: 10,
    borderWidth: 1,
  },
  infoContainer: {
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#90EE90',
    borderRadius: 20,
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer2: {
    flexDirection:'row', 
    justifyContent:'space-evenly', 
    width:'100%',
  },
  infoContainer3: {
    margin:3, 
    alignItems:'center',
  },
  playerPicture: {
    borderWidth: 2,
    borderColor: '#90EE90',
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 15,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },

});

export default PlayerDataDetail;