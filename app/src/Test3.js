import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);

  // AsyncStorage에서 저장된 프로필 이미지 불러오기
  useEffect(() => {
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

    loadProfileImage();
  }, []);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      {/* 프로필 사진 표시 */}
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <View style={[styles.profileImage, styles.placeholder]}>
          <Text style={{color: '#888', fontSize: 16}}>프로필 사진</Text>
        </View>
      )}

      <Button title="프로필 사진 변경" onPress={pickImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
});

export default ProfileScreen;
