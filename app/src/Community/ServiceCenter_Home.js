import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Alert, Image, Modal } from 'react-native';
import { database } from './firebaseConfig';  // firebaseConfig 파일 불러오기
import { Link, router } from 'expo-router'; // 닉네임 받기

const ServiceCenter_Home = () => {

  const [posts, setPosts] = useState([]);      // 게시글 리스트
  const [selectedPost, setSelectedPost] = useState(null); // 선택한 게시글
  const [comment, setComment] = useState('');  // 댓글 입력
  const [commentData, setCommentData] = useState([]) // 댓글 구조 저장
  const [showComment, setShowComment] = useState('show'); //댓글창 출력 여부

  const [modalVisible, setModalVisible] = useState(false);  // 모달 표시 여부
  const [inputPassword, setInputPassword] = useState('');   // 입력된 비밀번호
  const [postPassword, setPostPassword] = useState(''); //선택된 게시글 비밀번호
  const [join, setJoin] = useState(null); //게시글 조회 test, setTest

  // Firebase에서 게시글 불러오기
  useEffect(() => {
    const serviceCenterRef = database.ref('ServiceCenter');
    serviceCenterRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const parsedPosts = data ? Object.entries(data).map(([id, post]) => ({ id, ...post })).reverse() : []; //.reverse()를 통해 역순 설정하여 최근 데이터가 상단에 표기
      setPosts(parsedPosts);
    });

    return () => serviceCenterRef.off(); // 데이터 구독 해제
  }, []);

  // Firebase에서 특정 게시글의 댓글 불러오기
  useEffect(() => {
    if (!selectedPost) return; // 선택된 포스트가 없으면 종료
  
    const postRef = database.ref(`ServiceCenter/${selectedPost.id}/comments`);
    
    postRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const parsedComments = data 
        ? Object.entries(data).map(([commentId, comment]) => ({
            id: commentId, // comment의 고유 ID 추가
            ...comment,
          }))
        : [];
  
        setCommentData(parsedComments); // comments 상태 업데이트
    });
  
    return () => postRef.off(); // 데이터 구독 해제
  }, [selectedPost]); // selectedPostId가 변경될 때마다 실행

  // 댓글 작성 함수
  const addComment = () => {
    if (comment.trim() && selectedPost) {
      const newComment = {
        nickname: '익명',
        text: comment,
        timestamp: Date.now(),
      };

      // 선택된 게시글에 댓글 추가
      const postRef = database.ref(`ServiceCenter/${selectedPost.id}/comments`);
      postRef.push(newComment);
      setComment('');  // 입력란 초기화
    } else {
      Alert.alert('오류', '댓글을 입력해주세요.');
    }
  };

  const joinPost = () => { //postPassword, inputPassword
    if (postPassword == inputPassword) {
        setSelectedPost(join);
        setModalVisible(false);
    } else {
        Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
    }

  };

  return (
    <View style={{ flex: 1, backgroundColor: 'green', alignContent: 'center', justifyContent: 'center' }}>

      {/* 게시글 리스트 */}
      {!selectedPost ? ( //selectedPost가 null일 때
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', margin: 5 }}>

          <TouchableOpacity style={styles.nicknameContainer} onPress={() => Alert.alert(`이용안내`, 
            "화면의 목록을 통해 등록된 문의를 확인하실 수 있으며, 기본적으로 다른 사용자들에게 비공개로 노출됩니다. \n문의글 조회에는 작성시 설정된 비밀번호가 필요하며, 문의 답변은 해당 문의글에 관리자 이름으로 알려드리기에 비밀번호를 메모해 두시기를 권장합니다. \n화면 최하단의 문의하기 버튼을 눌러 문의를 진행하실 수 있으며, 답변에 수 시일이 소요될 수 있습니다.")}>
            <Text style={{color: 'blue', fontWeight:'bold', fontSize: 15, margin: 10}}>[공지] 고객센터 이용안내</Text>
          </TouchableOpacity>

            <FlatList
              data={posts}
              renderItem={({ item }) => ( //setSelectedPost(post) : 게시글 선택 시 해당 게시글과 댓글 보기
                <TouchableOpacity onPress={() => {setPostPassword(item.password); setModalVisible(true); setJoin(item);}} style={styles.postContainer}>
                  <Text style={{fontWeight: 'bold', fontSize: 16}}>[{item.tag}] 비공개 글입니다.</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style= {{fontWeight:'bold'}}>작성자 :</Text>
                    <Text style={styles.postNickname}>비공개 {item.password}</Text>
                  </View>

                  <Text style={{fontSize: 12, color: 'black'}}>{new Date(item.timestamp).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={<Text>작성된 게시글이 없습니다.</Text>}
            />
              <TouchableOpacity style={styles.writeButton} onPress={() => { router.replace(`./ServiceCenter_Post`); }}>
                <Text style={{ fontWeight: 'bold' }}>문의하기</Text>
              </TouchableOpacity>

        </View>
      ) : ( //selectedPost가 null이 아닐 때.(값이 있을 때)
        <>
        <FlatList //스크롤용 FlatList
        data={[]}
        renderItem={null}
        ListEmptyComponent = { () => (
        <View style={{ flex: 1, margin: 5 }}>
          
          {/* 선택된 게시글과 댓글 보기 */}
          {/* 제목 */}
          <View style={{borderWidth:1, borderRadius: 5}}>
            <View style={styles.titleContainer}> 
              <Text style={styles.selectedPostTitle}>{selectedPost.title}</Text>
            </View>

            {/* 작성자 및 게시글 작성 시간 출력 */}
            <View style={styles.infoContainer}> 
              <View style={{flexDirection:'row'}}> 
                <Text style={{fontWeight:'bold'}}>작성자 : </Text> 
                <Text style={styles.postNickname}>{selectedPost.nickname}</Text>
              </View>
              <View style={{alignItems: 'flex-end', marginTop: -10}}>
                <Text>{new Date(selectedPost.timestamp).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</Text>
              </View>
            </View>

            {/* 글 내용 */}
            <View style={styles.contentContainer}> 
              <Text style={{marginBottom: 10}}>{selectedPost.content}</Text>
            </View>
          </View>

          {/* 댓글 제목 및 버튼 */}
          <View style={{flexDirection: 'row', marginTop: 30,}}>
            <Text style={{ fontSize: 25}}> 문의 답변 </Text>
            {showComment == 'show' ? 
            <TouchableOpacity style={{marginTop: 5}} onPress={() => setShowComment('hidden')}>
              <Image
                source={require('../../../assets/icon/On_Button.png')}
                style={{ width: 60, height: 30, }}
              />
            </TouchableOpacity> 
          : 
            <TouchableOpacity style={{marginTop: 5}} onPress={() => setShowComment('show')}>
              {/* <Text style={{fontWeight: 'bold', color:'white'}}> 댓글 보기 </Text> */}
              <Image
                source={require('../../../assets/icon/Off_Button.png')}
                style={{ width: 60, height: 30, }}
              />
            </TouchableOpacity> 
          }
          </View>
          
          {/* 댓글 리스트 */}
          <View style={styles.bigCommentContainer}>
            {showComment == 'show' ? 
            <FlatList
              // data={selectedPost.comments ? Object.values(selectedPost.comments) : []}
              data={commentData ? Object.values(commentData) : []}
              renderItem={({ item }) => (
                <View style={styles.smallCommentContainer}>

                  <View style={{flexDirection:'row'}}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5}}>{item.nickname}</Text>
                  </View>

                  <Text>{item.text}</Text>
                  <Text style={{fontSize: 10, color: '#5F5F5F'}}>{new Date(item.timestamp).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</Text>
                  {/* <Text>{item.id}</Text> */}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={<Text style={{fontWeight:'bold'}}>댓글이 없습니다.</Text>}
              nestedScrollEnabled={true}
            />
            :
            <Text style={{fontWeight:'bold'}}>답변이 숨김 처리 되었습니다.</Text>
            }
          </View>

            {/* 뒤로가기 버튼 */}
            <TouchableOpacity style={styles.returnButton} onPress={() => setSelectedPost(null)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}> 목록으로 </Text>
            </TouchableOpacity>
        </View>
        )}
        />
          {/* 댓글 작성 섹션 */}
          <View style={{flexDirection: 'row', backgroundColor:'#90EE90'}}>
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="댓글을 입력하세요"
              style={styles.input}
            />
            <TouchableOpacity style={styles.sendButton} onPress={addComment}>
              <Image
                source={require('../../../assets/icon/send.png')}
                style={{ width: 25, height: 25, }}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
        {/* 비밀번호 확인 모달 */}
        <Modal
        transparent={true} //modal의 배경색 투명하게. false일 경우 배경색 불투명
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} //modal을 닫을 때 호출. (취소와 거의 동일, 뒤로가기 버튼 입력 시 호출)
        animationType="fade" //modal 창이 나타나는 애니메이션 설정, none, slide, fade 세종류
        >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>문의글 비밀번호</Text>
            <TextInput
                style={styles.modalInput}
                placeholder="비밀번호"
                secureTextEntry={true}
                value={inputPassword}
                onChangeText={setInputPassword}
                maxLength={4}
            />
            <View style={styles.modalButtons}>
                <TouchableOpacity
                style={styles.modalButton}
                onPress={joinPost} // 게시글 조회 함수 호출
                >
                <Text style={{color: 'black', fontWeight: 'bold'}}>조회</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: 'red' }]}
                onPress={() => setModalVisible(false)} // 모달 닫기
                >
                <Text style={{color: 'white', fontWeight: 'bold'}}>취소</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </Modal>

    </View>
  );
};

export default ServiceCenter_Home;

const styles = StyleSheet.create({
  nicknameContainer: {
    // width: '98%',
    padding: 0,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#90EE90', //green: #008000
    borderRadius: 10,
    marginTop: 5,
    },
  postContainer: {
    backgroundColor: '#90EE90',
    borderRadius: 20,
    marginTop: 15,
    padding: 15,
    borderWidth: 1,
  },
  titleContainer: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#90EE90',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  infoContainer: {
    backgroundColor: '#90EE90',
    borderTopWidth: 1,
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  contentContainer: {
    justifyContent:'center',
    backgroundColor: '#90EE90',
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
    marginLeft: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  writeButton: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  sendButton: {
    backgroundColor: "skyblue",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    margin: 5
  },
  returnButton: {
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  postNickname: {
    fontStyle: 'italic',
    color: 'black',
  },
  selectedPostTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 7,
  },
  bigCommentContainer: {
  justifyContent:'center',
  backgroundColor: '#90EE90',
  borderRadius: 10,
  marginTop: 5,
  padding: 10,
  borderWidth: 1,
  },
  smallCommentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
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
