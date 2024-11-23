import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, router } from "expo-router"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPage = () => {
  const [inputText, setInputText] = useState('');
  const [storedText, setStoredText] = useState('');

  // 컴포넌트가 처음 마운트될 때 저장된 데이터를 불러옴
  useEffect(() => {
    loadStoredText();
    getAllStoredData();
  }, []);

  // 저장된 데이터를 불러오는 함수
  const loadStoredText = async () => {
    try {
      const value = await AsyncStorage.getItem('FollowTeam');
      if (value !== null) {
        setStoredText(value);
      }
    } catch (e) {
      console.error('데이터 불러오기 실패:', e);
    }
  };

  //저장된 모든 데이터 불러오기
  const getAllStoredData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      
      // 각 [key, value] 쌍을 로그로 출력
      result.forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value}`);
      });
      
      return result;
    } catch (e) {
      console.error('데이터 불러오기 실패:', e);
    }
  };

  //저장된 모든 데이터 삭제
  const clearAllStoredData = async () => {
    try {
      await AsyncStorage.clear();
      alert('모든 데이터가 삭제되었습니다.');
    } catch (e) {
      console.error('데이터 삭제 실패:', e);
    }
  };

  // 텍스트를 저장하는 함수
  const saveText = async () => {
    try {
      await AsyncStorage.setItem('favoriteText', inputText);
      setStoredText(inputText);
      alert('데이터 저장 완료!');
    } catch (e) {
      console.error('데이터 저장 실패:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}> Test2.js </Text>
      <Button title="삭제" onPress={clearAllStoredData} />
      <View style={{justifyContent: 'center', alignItems:'center', width: '100%'}}>
        <Text style={styles.output}>저장된 정보</Text>
        <Text style={styles.output}>{storedText}</Text>
      </View>

        <TouchableOpacity style={{
        backgroundColor: "skyblue",
        width: 200,
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 10,
        marginTop: 20,
        }} onPress={() => { router.replace('./Menu'); }}>
            <Text style={{fontSize: 25}}>메인 메뉴</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  output: {
    marginTop: 20,
    fontSize: 25,
  },
});

export default MyPage;
