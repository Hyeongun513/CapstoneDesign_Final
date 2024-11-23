import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link, router } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import Laliga23_24 from './JsonData/LaLiga/23-24_LaLiga_data.json';
import Laliga22_23 from './JsonData/LaLiga/22-23_LaLiga_data.json';
import Laliga21_22 from './JsonData/LaLiga/21-22_LaLiga_data.json';
import ErrorData from './JsonData/ErrorData.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlayerData_PD = () => {
  const [search, setSearch] = useState(''); //사용자 검색어
  const [searchChange, setSearchChange] = useState('Player'); //선수검색 / 팀명검색
  const [selectedTag, setSelectedTag] = useState('23-24'); // 시즌 태그 선택
  const [followPlayer, setFollowPlayer] = useState('없음'); //팔로우된 선수
  
  // 검색어로 데이터를 필터링
  // const filteredData = data.filter(item => //toLowerrCase : 해당 부분을 소문자로 치환, 결과적으로 대소문자 구분이 없도록 만듦
  //   item.Player.toLowerCase().includes(search.toLowerCase())
  // );

  let data;
  if (selectedTag == '23-24') {
    data = Laliga23_24;
  } else if (selectedTag == '22-23') {
    data = Laliga22_23;
  } else if (selectedTag == '21-22') {
    data = Laliga21_22;
  } else {
    data = ErrorData;
  }

  const filteredData = (searchChange == 'Player') ? 
  data.filter(item => item.Player.toLowerCase().includes(search.toLowerCase())) 
  : 
  data.filter(item => item.Squad.toLowerCase().includes(search.toLowerCase()))

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

  //팔로우된 선수 데이터
  const followData = data.find(item => item.Player == followPlayer);
  // console.log('followData log값 : ', followData);
  //======================즐겨찾기======================

  const onChangeSearch = () => {
    if (searchChange == 'Player') setSearchChange('Team');
    else setSearchChange('Player');
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.rankItem}
        onPress={() => router.push(`./PlayerDataDetail?Rk=${item.Rk}&Season=${selectedTag}&League=PD`)}
      >
      <View style={styles.row}>
        <Text style={[styles.cell, {width: '10%'}]}>{item.Rk}</Text>
        <Text style={[styles.cell, {width: '40%'}]}>{item.Player}</Text>
        <Text style={[styles.cell, {width: '15%'}]}>{item.Pos}</Text>
        <Text style={[styles.cell, {width: '35%'}]}>{item.Squad}</Text>
      </View>
    </TouchableOpacity>
    )
  };

  return (
    <View style={styles.container}>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedTag}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedTag(itemValue)}
        >
          {/* <Picker.Item label="시즌을 선택해주세요" value="23-24" /> */}
          <Picker.Item label="23-24시즌 라리가" value="23-24" />
          <Picker.Item label="22-23시즌 라리가" value="22-23" />
          <Picker.Item label="21-22시즌 라리가" value="21-22" />
        </Picker>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          style={styles.searchInput}
          placeholder= {(searchChange == 'Player') ? "선수명 검색" : "팀명 검색"}
          value={search}
          onChangeText={setSearch}
        />
          <TouchableOpacity style={styles.changeButton} onPress={() => onChangeSearch()}>
            <Image
              source={require('../../../assets/images/change.png')} // assets에서 아이콘 불러오기
              style={{width: 35, height: 35}}
            />
          </TouchableOpacity>
      </View>

      <View style={styles.header}>
            <Text style={[styles.headerCell, {width: '10%'}]}>번호</Text>
            <Text style={[styles.headerCell, {width: '40%'}]}>선수명</Text>
            <Text style={[styles.headerCell, {width: '15%'}]}>포지션</Text>
            <Text style={[styles.headerCell, {width: '35%'}]}>소속팀</Text>
          </View>

      {/* 즐겨찾기 등록한 선수 */}
      {followData ? //followData가 undefined인 경우 대비
        <TouchableOpacity 
        style={styles.follow}
        onPress={() => router.push(`./PlayerDataDetail?Rk=${followData.Rk}&Season=${selectedTag}&League=PD`)} >
          <View style={styles.row}>
            <Text style={{textAlign: 'center', width: '10%', fontWeight: 'bold'}}>{followData.Rk}</Text>
            <Text style={[styles.cell, {width: '40%'}]}>{followData.Player}</Text>
            <Text style={[styles.cell, {width: '15%'}]}>{followData.Pos}</Text>
            <Text style={[styles.cell, {width: '35%'}]}>{followData.Squad}</Text>
          </View>
        </TouchableOpacity>
      : 
      <View style={styles.follow}>
        <View style={[styles.row, {flexDirection:'column', flex: 1}]}>
          <Text style={[styles.cell, {width: '100%', color:'red', fontWeight: 'bold'}]}>즐겨찾기 등록된 선수를 찾을 수 없습니다.</Text>
          <Text style={[styles.cell, {width: '100%', fontWeight: 'bold'}]}>({followPlayer})</Text>
        </View> 
      </View>
      }
          
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.Rk.toString()}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:'center', 
    backgroundColor: 'green', //#90EE90
    flex: 1,
  },
  searchInput: {
    flex:1,
    height: 40,
    borderColor: '#90EE90',
    borderWidth: 1,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    margin: 10,
    borderRadius: 5,
  },
  changeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#90EE90',
    borderRadius: 5,
    marginRight: 7,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  cell: {
    textAlign: 'center',
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 6,
    backgroundColor: 'lightgray',
    marginBottom: 2,
  },
  headerCell: {
    // flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerContainer: {
    width: '98%', 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center' , 
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 5,
    backgroundColor: '#90EE90',
  },
  picker: {
    width: '100%',
    borderWidth: 1,
  },
  follow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#90EE90',
    marginVertical: 2,
    marginHorizontal: 2,
    borderWidth: 2,
  },
  rankItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#90EE90',
    marginVertical: 2,
    marginHorizontal: 2,
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default PlayerData_PD;