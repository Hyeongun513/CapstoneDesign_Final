import React, { useState } from 'react'; 
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { database } from './firebaseConfig';  
import { router } from 'expo-router'; 

const ServiceCenter_Post = () => { 
  const [title, setTitle] = useState('');    
  const [content, setContent] = useState(''); 
  const [password, setPassword] = useState(''); // 비밀번호 입력
  const [selectedTag, setSelectedTag] = useState(''); // 태그 선택

  const createPost = () => { 
    if (title.trim() && content.trim() && password.trim() && selectedTag) { 
      const newPost = { 
        nickname: '익명',
        title: title, 
        content: content, 
        password: password,  // 비밀번호 저장
        tag: selectedTag, // 선택된 태그 저장
        timestamp: Date.now(), 
        comments: {}  
      }; 

      database.ref('ServiceCenter').push(newPost); 
      setTitle('');  
      setContent(''); 
      setPassword(''); // 입력란 초기화
      setSelectedTag(''); 
      Alert.alert(
        "알림",
        "문의가 성공적으로 완료되었습니다.",
        [{ text: "확인", onPress: () => { router.replace(`./ServiceCenter_Home`); } }],
        { cancelable: false }
      );

    } else { 
      Alert.alert('오류', '제목, 내용, 비밀번호, 태그를 모두 입력해주세요.'); 
    } 
  }; 

  return ( 
    <View style={{ flex: 1, padding: 10, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}> 
          <TouchableOpacity style={styles.nicknameContainer} onPress={() => Alert.alert(`이용안내`, 
            "하단의 문의 태그, 제목, 내용, 비밀번호를 모두 설정해주셔야 문의가 정상적으로 등록됩니다. \n비밀번호는 추후 문의 답변을 확인하실 때 필요하므로 메모해두시기를 권장합니다.")}>
            <Text style={{color: 'blue', fontWeight:'bold', fontSize: 15, margin: 10}}>[공지] 문의글 작성시 이용안내</Text>
          </TouchableOpacity>

        {/* 태그 선택 메뉴 */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedTag}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedTag(itemValue)}
          >
            <Picker.Item label="문의 태그를 선택해주세요" value='' />
            <Picker.Item label="이용 문의" value="이용 문의" />
            <Picker.Item label="커뮤니티 신고" value="커뮤니티 신고" />
            <Picker.Item label="오류 신고" value="오류 신고" />
            <Picker.Item label="서비스 제안" value="서비스 제안" />
            <Picker.Item label="기타" value="기타" />
          </Picker>
        </View>

        <TextInput 
          value={title} 
          onChangeText={setTitle} 
          placeholder="제목" 
          style={styles.titleInput}
          maxLength={50}
        /> 

      <TextInput 
        value={content} 
        onChangeText={setContent} 
        placeholder="내용" 
        style={styles.contentInput} 
        multiline 
      /> 

      {/* 비밀번호 입력란 */}
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="비밀번호"
        secureTextEntry={true} // 비밀번호 숨김
        maxLength={4}
        style={styles.passwordInput}
      />
      <View style={{flexDirection:'row', width: '98%'}}>
        <TouchableOpacity style={styles.returnButton} onPress={() => { router.replace(`./ServiceCenter_Home`); }}> 
          <Text style={{color: 'white', fontWeight:'bold'}}>이전화면</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.writeButton} onPress={createPost}> 
          <Text style={{fontWeight:'bold'}}>문의 등록</Text> 
        </TouchableOpacity> 
      </View>
    </View> 
  ); 
}; 

export default ServiceCenter_Post;

const styles = StyleSheet.create({ 
  nicknameContainer: { 
    width: '98%', 
    padding: 0, 
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor: '#90EE90', 
    borderRadius: 10, 
    marginBottom: 5, 
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
  titleInput: { 
    width: '98%', 
    borderWidth: 1, 
    backgroundColor: 'white', 
    padding: 10, 
    marginVertical: 5, 
    borderRadius: 10, 
  },
  contentInput: { 
    flex: 1, 
    width: '98%', 
    borderWidth: 1, 
    backgroundColor: 'white', 
    padding: 10, 
    marginVertical: 5, 
    borderRadius: 10, 
  }, 
  passwordInput: {
    width: '98%', 
    borderWidth: 1, 
    backgroundColor: 'white', 
    padding: 10, 
    marginVertical: 5, 
    borderRadius: 10, 
  },
  picker: {
    width: '100%',
    height: 10,
    marginVertical: 5,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  writeButton: {
    flex: 1,
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
  },
  returnButton: {
    flex: 1,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
  },
});
