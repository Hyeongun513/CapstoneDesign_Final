import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

const ScatterChart = (props) => {
  const name = props.name; //선수명
  const playerPrgC = props.playerPrgC; //선수 개인 90분당 PrgC
  const playerPrgP = props.playerPrgP; //선수 개인 90분당 PrgP
  const averagePrgC = props.averagePrgC; //리그 평균 90분당 PrgC
  const averagePrgP = props.averagePrgP; //리그 평균 90분당 PrgP
  const test = Number(playerPrgC).toFixed(1);

  const playerx = 1.71; //1.71
  const playery = 3.52; //3.52
  // 데이터 설정 (X, Y 좌표)
  const dataA = { x: playerPrgC, y: playerPrgP, name: name };
  const dataB = { x: averagePrgC, y: averagePrgP, name: '리그 평균' };

  // 축 범위 설정
  const xMin = 0.0;
  const xMax = 7.0;
  const yMin = 0.0;
  const yMax = 10.0;

  // 차트 크기 설정
  const chartWidth = 300;
  const chartHeight = 300;

  // 좌표를 차트 크기에 맞게 비율 계산
  const scaleX = (x) => ((x - xMin) / (xMax - xMin)) * chartWidth;
  const scaleY = (y) => chartHeight - ((y - yMin) / (yMax - yMin)) * chartHeight;

  // X축, Y축의 레이블 위치 설정
  const getXAxisLabels = () => {
    const labels = [];
    for (let i = xMin; i <= xMax; i += 0.5) {
      labels.push(i);
    }
    return labels;
  };

  const getYAxisLabels = () => {
    const labels = [];
    for (let i = yMin; i <= yMax; i += 1) {
      labels.push(i);
    }
    return labels;
  };

  return (
    <View style={styles.container}>
      <View style={{borderBottomWidth: 1, borderColor:'gray'}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between', width: '100%', marginBottom: 7}}>
              <Text style={{fontSize:18, fontWeight:'bold', color:'#90EE90'}}>ᐱ</Text>
              <Text style={{fontSize:18, fontWeight:'bold'}}> Prg 데이터 통계</Text>
              <Text style={{fontSize:20, fontWeight:'900'}}>ᐱ </Text>
            </View>
          </View>
      <Svg width={chartWidth + 60} height={chartHeight + 40} viewBox={`0 0 ${chartWidth + 20} ${chartHeight + 40}`} style={{ margin: 10 }}>
        {/* 차트 배경 및 축선 */}
        <Line x1="20" y1={chartHeight + 20} x2={chartWidth + 20} y2={chartHeight + 20} stroke="black" strokeWidth="2" />
        <Line x1="20" y1="10" x2="20" y2={chartHeight + 20} stroke="black" strokeWidth="2" />

        {/* X축 숫자 레이블 추가 */}
        {getXAxisLabels().map((label, index) => (
          <SvgText key={`x-label-${index}`} x={scaleX(label) + 20} y={chartHeight + 35} fontSize="10" textAnchor="middle" fontWeight='bold'>
            {label}
          </SvgText>
        ))}

        {/* Y축 숫자 레이블 추가 */}
        {getYAxisLabels().map((label, index) => (
          <SvgText key={`y-label-${index}`} x={5} y={scaleY(label) + 20} fontSize="10" textAnchor="middle" fontWeight='bold'>
            {label}
          </SvgText>
        ))}

        {/* X축 레이블 */}
        <SvgText x={chartWidth + 10} y={chartHeight + 10} fontSize="12" textAnchor="middle" fontWeight='bold' fill='gray'>
          PrgC
        </SvgText>

        {/* Y축 레이블 */}
        <SvgText x={40} y={chartHeight / 2 - 130} fontSize="12" textAnchor="middle" fontWeight='bold' fill='gray'>
          PrgP
        </SvgText>

        {/* A 점 */}
        <Circle cx={scaleX(dataA.x) + 20} cy={scaleY(dataA.y) + 20} r="5" fill="red" />
        {/* B 점 */}
        <Circle cx={scaleX(dataB.x) + 20} cy={scaleY(dataB.y) + 20} r="5" fill="blue" />

        {/* A 점의 이름 */}
        <SvgText x={scaleX(dataA.x) + 20} y={scaleY(dataA.y) + 10} fontSize="12" textAnchor="middle" fill="red">
          {dataA.name}
        </SvgText>

        {/* A 점의 수치 */}
        {/* <SvgText x={scaleX(dataA.x) + 0} y={scaleY(dataA.y) + 35} fontSize="12" textAnchor="middle" fill="blue">
          (  {Number(playerPrgC).toFixed(1)},  {Number(playerPrgP).toFixed(1)})
        </SvgText> */}

        {/* B 점의 이름 */}
        <SvgText x={scaleX(dataB.x) + 20} y={scaleY(dataB.y) + 10} fontSize="12" textAnchor="middle" fill="blue">
          {dataB.name}
        </SvgText>

        {/* B 점의 수치 */}
        {/* <SvgText x={scaleX(dataB.x) + 0} y={scaleY(dataB.y) + 35} fontSize="12" textAnchor="middle" fill="red">
        (  {Number(averagePrgC).toFixed(1)},  {Number(averagePrgP).toFixed(1)})
        </SvgText> */}
      </Svg>
      
      <View style={{flexDirection: 'row', marginTop: 1}}>
        <View style={{backgroundColor:'red', width:10, height:10, marginTop: 5, borderRadius: 10}}/>
        {/* <Image source={require('../../../assets/icon/Info.png')} style={{width: 22, height: 22}} /> */}
        <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}> {name} : ({playerPrgC}, {playerPrgP})</Text>
      </View>

      <View style={{flexDirection: 'row', marginTop: 5}}>
        <View style={{backgroundColor:'blue', width:10, height:10, marginTop: 5, marginLeft: 5, borderRadius: 10}}/>
        <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}> 리그 평균 : ({averagePrgC}, {averagePrgP})</Text>
      </View>

      <View style={{flexDirection: 'row', marginTop: 15}}>
        <TouchableOpacity style={{marginBottom: 10, marginLeft: 5}} onPress={() => { Alert.alert("Progression Carries(PrgC)", "공을 몰고 마지막 6번의 패스 중 가장 먼 곳으로부터 상대 골라인 방향으로 10야드 이상 전진한 행위. 혹은 공을 상대 박스 안으로 몰고 들어간 모든 상황. 아군 진형에서부터 50% 지역에서의 상황은 제함.")}}>
            <Image source={require('../../../assets/icon/Info.png')} style={{width: 18, height: 18}} />
        </TouchableOpacity>
        <Text style={{fontSize: 12, color: 'black', fontWeight: 'bold'}}>PrgC : 90분당 전진 드리블</Text>

        <TouchableOpacity style={{marginBottom: 10, marginLeft: 5}} onPress={() => { Alert.alert("Progressive Passes(PrgP)", "마지막 6번의 패스 중 가장 먼 곳으로부터 상대 골라인 방향으로 공을 10야드 이상 전진시킨 패스. 혹은 공을 상대 박스 안으로 투입시킨 모든 패스. 아군 진형에서부터 40% 지역에서 일어난 경우를 제함")}}>
            <Image source={require('../../../assets/icon/Info.png')} style={{width: 18, height: 18}} />
        </TouchableOpacity>
        <Text style={{fontSize: 12, color: 'black', fontWeight: 'bold'}}>PrgP : 90분당 전진 패스</Text>
      </View>

    </View>
  );
};

export default ScatterChart;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#90EE90', 
    width: Dimensions.get('window').width - 40,
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
    borderWidth: 1,
    padding: 10,
  },
});
