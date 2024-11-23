import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link, router } from "expo-router"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPage = () => {
  const [inputText, setInputText] = useState('');
  const [storedText, setStoredText] = useState('');
  const [star, setStar] = useState('Off');

  // 저장된 데이터를 불러오는 함수
  const loadStoredText = async () => {
    try {
      const value = await AsyncStorage.getItem('favoriteText2');
      if (value !== null) {
        setStoredText(value);
      }
    } catch (e) {
      console.error('데이터 불러오기 실패:', e);
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

  // 컴포넌트가 처음 마운트될 때 저장된 데이터를 불러옴
  useEffect(() => {
    loadStoredText();
  }, []);

  changeStarOn = async () => { //팔로우 활성화 클릭시
    try {
      await AsyncStorage.setItem('favoriteText', inputText);
      setStoredText(inputText);
      alert('해당 팀을 팔로우합니다.');
    } catch (e) {
      console.error('데이터 저장 실패:', e);
    };

    setStar('On')
  };

  changeStarOff = async () => { //팔로우 비활성화 클릭시
    try {
      await AsyncStorage.setItem('favoriteText', '없음');
      setStoredText(inputText);
      alert('팔로우가 취소됩니다.');
    } catch (e) {
      console.error('데이터 저장 실패:', e);
    };

    setStar('Off')
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}> Test1.js </Text>
      <Text style={styles.label}>좋아하는 팀이나 선수 입력:</Text>
      <TextInput
        style={styles.input}
        placeholder="입력하세요"
        value={inputText}
        onChangeText={text => setInputText(text)}
      />
      <Button title="저장" onPress={saveText} />
      <Text style={styles.output}>저장된 정보: {storedText}</Text>

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

        <View style={{justifyContent: 'space-between', width:'100%', height: 50, backgroundColor: 'green', flexDirection: 'row'}}>
        <Text>asdf</Text>
          {star == 'On' ? 
          <TouchableOpacity style={{ marginTop:3, marginRight:3 }} onPress={() => {changeStarOff()}}>
            <Image source={require('../../assets/icon/StarOn.png')} style={{width: 30, height: 30}} /> 
          </TouchableOpacity>
          : 
          <TouchableOpacity style={{marginTop:3, marginRight:3 }} onPress={() => {changeStarOn()}}>
            <Image source={require('../../assets/icon/StarOff.png')} style={{width: 30, height: 30}} />
          </TouchableOpacity>
          }
            
        </View>
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
    fontSize: 18,
  },
});

export default MyPage;
