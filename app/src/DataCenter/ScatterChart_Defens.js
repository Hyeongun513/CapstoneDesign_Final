import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

const ScatterChart_Defens = (props) => {
  const name = props.name; //선수명
  const playerTklW = props.playerTklW; //선수 개인 90분당 태클성공
  const playerInt = props.playerInt; //선수 개인 90분당 인터셉트
  const averageTklW = props.averageTklW; //리그 평균 90분당 태클성공
  const averageInt = props.averageInt; //리그 평균 90분당 인터셉트

  // const playerx = 1.71; //1.71
  // const playery = 3.52; //3.52
  // 데이터 설정 (X, Y 좌표)
  const dataA = { x: (playerTklW>4) ? 4.1 : playerTklW, y: (playerInt>4) ? 4.1 : playerInt, name: name };
  const dataB = { x: averageTklW, y: averageInt, name: '리그 평균' };

  // 축 범위 설정
  const xMin = 0.0;
  const xMax = 4.0;
  const yMin = 0.0;
  const yMax = 4.0;

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
    for (let i = yMin; i <= yMax; i += 0.5) {
      labels.push(i);
    }
    return labels;
  };
//playerPrgC
  return (
    <View style={styles.container}>
      <View style={{borderBottomWidth: 1, borderColor:'gray'}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between', width: '100%', marginBottom: 7}}>
              <Text style={{fontSize:18, fontWeight:'bold', color:'#90EE90'}}>ᐱ</Text>
              <Text style={{fontSize:18, fontWeight:'bold'}}> 수비 지표 : 경기당 통계 비교</Text>
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
          태클
        </SvgText>

        {/* Y축 레이블 */}
        <SvgText x={45} y={chartHeight / 2 - 130} fontSize="12" textAnchor="middle" fontWeight='bold' fill='gray'>
          인터셉트
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
        <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}> {name} : ({playerTklW}, {playerInt})</Text>
      </View>

      <View style={{flexDirection: 'row', marginTop: 5}}>
        <View style={{backgroundColor:'blue', width:10, height:10, marginTop: 5, marginLeft: 5, borderRadius: 10}}/>
        <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}> 리그 평균 : ({averageTklW}, {averageInt})</Text>
      </View>

    </View>
  );
};

export default ScatterChart_Defens;

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
