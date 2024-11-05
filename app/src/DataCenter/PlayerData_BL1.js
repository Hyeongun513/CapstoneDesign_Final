import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link, router } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import BundesLiga23_24 from './JsonData/BundesLiga/23-24_BundesLiga_data.json'
import BundesLiga22_23 from './JsonData/BundesLiga/22-23_BundesLiga_data.json'
import BundesLiga21_22 from './JsonData/BundesLiga/21-22_BundesLiga_data.json'
import ErrorData from './JsonData/ErrorData.json'

const PlayerData_BL1 = () => {
  const [search, setSearch] = useState(''); //사용자 검색어
  const [searchChange, setSearchChange] = useState('Player'); //선수검색 / 팀명검색
  const [selectedTag, setSelectedTag] = useState('23-24'); // 시즌 태그 선택
  
  // 검색어로 데이터를 필터링
  // const filteredData = data.filter(item => //toLowerrCase : 해당 부분을 소문자로 치환, 결과적으로 대소문자 구분이 없도록 만듦
  //   item.Player.toLowerCase().includes(search.toLowerCase())
  // );

  let data;
  if (selectedTag == '23-24') {
    data = BundesLiga23_24;
  } else if (selectedTag == '22-23') {
    data = BundesLiga22_23;
  } else if (selectedTag == '21-22') {
    data = BundesLiga21_22;
  } else {
    data = ErrorData;
  }

  const filteredData = (searchChange == 'Player') ? 
  data.filter(item => item.Player.toLowerCase().includes(search.toLowerCase())) 
  : 
  data.filter(item => item.Squad.toLowerCase().includes(search.toLowerCase()))

  const onChangeSearch = () => {
    if (searchChange == 'Player') setSearchChange('Team');
    else setSearchChange('Player');
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.rankItem}
        onPress={() => router.push(`./PlayerDataDetail?Rk=${item.Rk}&Season=${selectedTag}&League=BL1`)}
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
    <View style={{alignItems:'center'}}>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedTag}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedTag(itemValue)}
        >
          {/* <Picker.Item label="시즌을 선택해주세요" value="23-24" /> */}
          <Picker.Item label="23-24시즌 분데스리가" value="23-24" />
          <Picker.Item label="22-23시즌 분데스리가" value="22-23" />
          <Picker.Item label="21-22시즌 분데스리가" value="21-22" />
        </Picker>
      </View>
      <Text>선택된 태그 : {selectedTag}</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={styles.searchInput}
          placeholder= {(searchChange == 'Player') ? "선수 이름 검색" : "팀명 검색"}
          value={search}
          onChangeText={setSearch}
        />
          <TouchableOpacity style={styles.deleteButton} onPress={() => onChangeSearch()}>
            <Image
              source={require('../../../assets/images/새로고침.png')} // assets에서 아이콘 불러오기
              style={{width: 40, height: 40, margin: 10}}
            />
          </TouchableOpacity>
      </View>

      <View style={styles.header}>
            <Text style={[styles.headerCell, {width: '10%'}]}>번호</Text>
            <Text style={[styles.headerCell, {width: '40%'}]}>선수명</Text>
            <Text style={[styles.headerCell, {width: '15%'}]}>포지션</Text>
            <Text style={[styles.headerCell, {width: '35%'}]}>소속팀</Text>
          </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.Rk.toString()}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flex:1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    margin: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    // flex: 1,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 6,
    backgroundColor: '#eee',
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
    marginVertical: 5,
  },
  picker: {
    width: '100%',
    borderWidth: 1,
  },
});

export default PlayerData_BL1;