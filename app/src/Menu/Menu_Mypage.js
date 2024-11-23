import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, Modal, Dimensions } from 'react-native';
import { Link, router } from "expo-router"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const Menu_Mypage = () => {
  const [inputText, setInputText] = useState('');
  const [followTeam, setFollowTeam] = useState(''); //즐겨찾기 팀
  const [followPlayer, setFollowPlayer] = useState(''); //즐겨찾기 선수
  const [profileImage, setProfileImage] = useState(null); //프로필사진
  const [userNickname, setUserNickname] = useState(''); //프로필 닉네임
  const [modalVisible, setModalVisible] = useState(false);  // 모달 표시 여부

  const windoWidth = Dimensions.get("window").width;

  // 저장된 데이터 호출
  useEffect(() => {
    loadProfileImage();
    loadStoredText();
    getAllStoredData();
  }, []);

  //프로필 사진 불러오기
  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('profileImage');
      if (savedImage) {
        setProfileImage(savedImage);
      }
    } catch (error) {
      console.error('Failed to load profile image:', error);
    }
  };

  // 이미지 선택 및 저장
  const pickImage = async () => {
    // 권한 요청
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('권한 필요', '프로필 사진을 설정하려면 사진 접근 권한이 필요합니다.');
      return;
    }

    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // 정사각형으로 잘라내기
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      // AsyncStorage에 저장
      try {
        await AsyncStorage.setItem('profileImage', uri);
        setProfileImage(uri); // 상태 업데이트
        Alert.alert('성공', '프로필 사진이 저장되었습니다!');
      } catch (error) {
        console.error('Failed to save profile image:', error);
      }
    }
  };

  // 저장된 데이터를 불러오는 함수
  const loadStoredText = async () => {
    try { //구단 즐겨찾기 불러오기
      const value1 = await AsyncStorage.getItem('FollowTeam');
      if (value1 !== null) {
        setFollowTeam(value1);
      }
    } catch (e) {
      console.error('구단 즐겨찾기 불러오기 실패:', e);
    }

    try { //선수 즐겨찾기 불러오기
      const value2 = await AsyncStorage.getItem('FollowPlayer');
      if (value2 !== null) {
        setFollowPlayer(value2);
      }
    } catch (e) {
      console.error('선수 즐겨찾기 불러오기 실패:', e);
    }

    try { //유저 닉네임 불러오기
      const value3 = await AsyncStorage.getItem('userNickname');
      if (value3 !== null) {
        setUserNickname(value3);
      }
    } catch (e) {
      console.error('닉네임 불러오기 실패:', e);
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

    //유저 닉네임 저장
    const userNicknameSave = async () => { 
      try {
        await AsyncStorage.setItem('userNickname', inputText);
        setUserNickname(inputText);
        Alert.alert(`닉네임 설정 완료`, `설정된 닉네임은 커뮤니티에서 활용하실 수 있습니다.`);
      } catch (e) {
        console.error('닉네임 설정 실패:', e);
      };
    };

    //유저 닉네임 삭제
    const userNicknameDelete = async () => {
      try {
        await AsyncStorage.removeItem('userNickname'); // 키에 해당하는 데이터 삭제
        Alert.alert('닉네임 삭제 완료', '저장된 닉네임이 성공적으로 삭제되었습니다.' );
        setUserNickname('');
      } catch (e) {
        console.error('닉네임 삭제 실패:', e);
      }
    };

    //즐겨찾기 구단 '없음'으로 저장(초기화)
    const followTeamClear = async () => { 
      try {
        await AsyncStorage.setItem('FollowTeam', '없음');
        setFollowTeam('없음');
        Alert.alert(`즐겨찾기 취소`, `${followTeam}의 즐겨찾기가 해제되었습니다. \n리그 순위에서 구단 즐겨찾기가 가능합니다.`);
      } catch (e) {
        console.error('데이터 저장 실패:', e);
      };
    };

    //즐겨찾기 선수 '없음'으로 저장(초기화)
    const followPlayerClear = async () => { 
      try {
        await AsyncStorage.setItem('FollowPlayer', '없음');
        setFollowPlayer('없음');
        Alert.alert(`즐겨찾기 취소`, `${followPlayer}의 즐겨찾기가 해제되었습니다. \n데이터 센터에서 선수 즐겨찾기가 가능합니다.`);
      } catch (e) {
        console.error('데이터 저장 실패:', e);
      };
    };

    //즐겨찾기 초기화 시 경고창
    const confirmClear = (status) => { 
      Alert.alert(
        '알림',
        `정말로 현재 ${status} 초기화 하시겠습니까?`,
        [
          {
            text: '예', // 확인 버튼
            onPress: status=='구단의 즐겨찾기를' ? followTeamClear : status=='닉네임을' ? userNicknameDelete : followPlayerClear,
          },
          {
            text: '아니요', // 취소 버튼
            onPress: () => console.log('즐겨찾기 해제 취소됨'),
            style: 'cancel', // iOS에서 취소 버튼 스타일
          },
        ],
        { cancelable: true } // 경고창 밖을 눌렀을 때 닫힘 여부
      );
    };

  return (
    <ScrollView contentContainerStyle={{backgroundColor: 'green', alignItems: 'center'}}>
      {profileImage ? ( //프로필 사진 출력
        <Image source={{ uri: profileImage }} style={styles.profile} />
      ) : (
        <View style={[styles.profile, styles.placeholder]}>
          <Text style={{color: '#888', fontSize: 16}}>프로필 사진</Text>
        </View>
      )}

      {userNickname == '' ? 
      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop: 7}}>
        <Text style={{color:'white', fontWeight:'bold', fontSize: 25}}> Football Park</Text>
        <TouchableOpacity style={{marginLeft: 5}} onPress={() => { Alert.alert("현재 설정된 닉네임이 없습니다.", "닉네임은 마이페이지와 커뮤니티 센터에서 설정할 수 있으며, 마이페이지에서 설정된 닉네임은 유지됩니다.")}}>
            <Image source={require('../../../assets/icon/Info.png')} style={{width: 27, height: 27}} />
        </TouchableOpacity>
      </View>
      :
      <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white', marginTop: 7}}> {userNickname} </Text>
      }

      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>즐겨찾기</Text>
        <View style={styles.buttonView}>
          <Text style={styles.buttonFont}>  구단  |   </Text>
          <Text style={styles.buttonFont}>{followTeam} </Text>
          <View style={{flex:1, flexDirection:'row-reverse'}}>
          {/* <Text style={styles.buttonFont}>{'>'} </Text> */}
          </View>
        </View>
        <View style={styles.buttonView}>
          <Text style={styles.buttonFont}>  선수  |   </Text>
          <Text style={styles.buttonFont}>{followPlayer} </Text>
          <View style={{flex:1, flexDirection:'row-reverse'}}>
          {/* <Text style={styles.buttonFont}>{'>'} </Text> */}
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>프로필 설정</Text>

        <TouchableOpacity onPress={() => { pickImage(); }}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonFont}>  프로필 사진 설정</Text>
            <View style={{flex:1, flexDirection:'row-reverse'}}>
            <Text style={styles.buttonFont}>{'>'} </Text>
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setModalVisible(true); }}>
        <View style={styles.buttonView}>
          <Text style={styles.buttonFont}>  닉네임 설정</Text>
          <View style={{flex:1, flexDirection:'row-reverse'}}>
          <Text style={styles.buttonFont}>{'>'} </Text>
          </View>
        </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>설정 초기화</Text>

        <TouchableOpacity onPress={() => { confirmClear('구단의 즐겨찾기를'); }}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonFont}>  구단 즐겨찾기 초기화</Text>
            <View style={{flex:1, flexDirection:'row-reverse'}}>
            <Text style={styles.buttonFont}>{'>'} </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { confirmClear('선수의 즐겨찾기를'); }}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonFont}>  선수 즐겨찾기 초기화</Text>
            <View style={{flex:1, flexDirection:'row-reverse'}}>
            <Text style={styles.buttonFont}>{'>'} </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { confirmClear('닉네임을'); }}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonFont}>  닉네임 초기화 </Text>
            <View style={{flex:1, flexDirection:'row-reverse'}}>
            <Text style={styles.buttonFont}>{'>'} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>사용자 메뉴</Text>

        <TouchableOpacity onPress={() => { router.navigate('../Community/ServiceCenter_Home'); }}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonFont}>  고객센터</Text>
            <View style={{flex:1, flexDirection:'row-reverse'}}>
            <Text style={styles.buttonFont}>{'>'} </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { router.navigate('./Menu_FAQ'); }}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonFont}>  FAQ</Text>
            <View style={{flex:1, flexDirection:'row-reverse'}}>
            <Text style={styles.buttonFont}>{'>'} </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { router.replace('../../App'); }}>
          <View style={styles.buttonView}>
            <Text style={styles.buttonFont}>  최초화면</Text>
            <View style={{flex:1, flexDirection:'row-reverse'}}>
            <Text style={styles.buttonFont}>{'>'} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <Image
          source={require('../../../assets/icon/Logo.png')} // assets에서 아이콘 불러오기 windoWidth*0.8*0.42
          style={{width: windoWidth*0.7, height: windoWidth*0.7*0.42, marginTop:10}}
      />


        {/*닉네임 설정 modal*/}
        <Modal
          transparent={true} //modal의 배경색 투명하게. false일 경우 배경색 불투명
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)} //modal을 닫을 때 호출. (취소와 거의 동일, 뒤로가기 버튼 입력 시 호출)
          animationType="fade" //modal 창이 나타나는 애니메이션 설정, none, slide, fade 세종류
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={{flexDirection: 'row', alignItems:'center'}}>
                  <Text style={styles.modalTitle}>유저 닉네임 설정</Text>
                  <TouchableOpacity style={{marginBottom: 10, marginLeft: 5}} onPress={() => { Alert.alert("닉네임 설정 안내", "설정된 닉네임은 커뮤니티에서 사용됩니다. \n마이페이지에서 설정한 닉네임은 유지되어, 커뮤니티 센터에서 추가로 닉네임을 설정할 필요가 없습니다.")}}>
                      <Image source={require('../../../assets/icon/Info.png')} style={{width: 22, height: 22}} />
                  </TouchableOpacity>
              </View>
              <TextInput
                style={styles.modalInput}
                placeholder="닉네임 입력"
                // secureTextEntry={true}
                value={inputText}
                onChangeText={setInputText}
                maxLength={10}
              />

              <View style={styles.modalButtons}>
                  {inputText ? 
                  <TouchableOpacity style={styles.modalButton} onPress={() => { setModalVisible(false); userNicknameSave(); }}>
                      <Text style={{color: 'black', fontWeight: 'bold',}}>닉네임 설정</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={[styles.modalButton, {backgroundColor: 'gray'}]} onPress={() => { Alert.alert("닉네임 오류", "설정할 닉네임을 입력해주세요.")}}>
                      <Text style={{color: 'white', fontWeight: 'bold',}}>닉네임 설정</Text>
                  </TouchableOpacity>
                  }

                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: 'red' }]}
                  onPress={() => setModalVisible(false)} // 모달 닫기
                >
                  <Text style={{color: 'white', fontWeight: 'bold',}}>취소</Text>
                </TouchableOpacity>

              </View>
              
            </View>
          </View>
        </Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#90EE90',
    borderRadius: 10,
    marginTop: 15,
    padding: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  profile: {
    width: 130,
    height: 130,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#90EE90',
    margin: 5,
    marginTop: 15,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '80%'
  },
  output: {
    marginTop: 20,
    fontSize: 25,
  },
  buttonNormal: {
    backgroundColor: "skyblue",
    width: 200,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 2,
  },
  buttonView: {
    width:'100%', 
    flexDirection:'row', 
    borderBottomWidth: 1, 
    borderColor:'gray', 
    paddingVertical: 5, 
    marginVertical: 7,
  },
  buttonFont: {
    fontWeight: 'bold', 
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    
  },
});

export default Menu_Mypage;
