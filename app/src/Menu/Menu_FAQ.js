import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { Link, router } from "expo-router"; 

const Menu_FAQ = () => {
    const [question1, setQuestion1] = useState(false); //질문1 상태
    const [question2, setQuestion2] = useState(false);
    const [question3, setQuestion3] = useState(false);
    const [question4, setQuestion4] = useState(false);
    const [question5, setQuestion5] = useState(false);
    const [question6, setQuestion6] = useState(false);
    const [question7, setQuestion7] = useState(false);
    const [question8, setQuestion8] = useState(false);
    const [question9, setQuestion9] = useState(false);
    const [question10, setQuestion10] = useState(false);
    const [question11, setQuestion11] = useState(false);
    const [question12, setQuestion12] = useState(false);
    const [question13, setQuestion13] = useState(false);

    const windoWidth = Dimensions.get("window").width;

    return (
        <ScrollView contentContainerStyle={{backgroundColor: 'green', alignItems: 'center'}}>
            <View style={styles.container}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>자주 묻는 질문</Text>

                {/* =============================================== 질문 13 =============================================== */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { question13 ? setQuestion13(false) : setQuestion13(true); }}>
                    <View style={styles.buttonView}>
                        <View style={{flex:9, flexDirection:'row'}}>
                            <Text style={styles.buttonFont}>Q. </Text>
                            <Text style={[styles.buttonFont, {flex: 1}]}>고객센터 문의했는데 답변 확인은 어떻게 하나요?</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row-reverse'}}>
                            <Text style={styles.buttonFont}>{question13 ? 'ᐱ' : 'ᐯ'} </Text>
                        </View>
                    </View>
                    {question13 &&
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.answerFont,{fontWeight:'bold'}]}>A. </Text>
                        <Text style={[styles.answerFont,{flex: 1}]}>
                            고객센터 문의에 대한 답변은 해당 문의글에 답변란에 관리자 이름으로 등록됩니다. 문의글을 조회하는 데에는
                            작성자가 설정한 비밀번호가 필요하며, 비밀번호가 일치하지 않는다면 작성자의 경우도 열람이 불가합니다.
                        </Text>
                    </View>
                    }
                </TouchableOpacity>

                {/* =============================================== 질문 12 =============================================== */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { question12 ? setQuestion12(false) : setQuestion12(true); }}>
                    <View style={styles.buttonView}>
                        <View style={{flex:9, flexDirection:'row'}}>
                            <Text style={styles.buttonFont}>Q. </Text>
                            <Text style={[styles.buttonFont, {flex: 1}]}>어플을 재설치 했더니 마이페이지 정보가 초기화됐어요.</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row-reverse'}}>
                            <Text style={styles.buttonFont}>{question12 ? 'ᐱ' : 'ᐯ'} </Text>
                        </View>
                    </View>
                    {question12 &&
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.answerFont,{fontWeight:'bold'}]}>A. </Text>
                        <Text style={[styles.answerFont,{flex: 1}]}>
                            커뮤니티 센터를 제외한 사용자의 정보는 기본적으로 기기의 로컬 데이터에 저장됩니다. 어플을 삭제할 경우 커뮤니티에 작성한
                            채팅 및 게시글, 댓글 데이터는 남아있지만 설정한 닉네임이나 즐겨찾기 정보는 어플과 함께 삭제됩니다.
                        </Text>
                    </View>
                    }
                </TouchableOpacity>

                {/* =============================================== 질문 11 =============================================== */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { question11 ? setQuestion11(false) : setQuestion11(true); }}>
                    <View style={styles.buttonView}>
                        <View style={{flex:9, flexDirection:'row'}}>
                            <Text style={styles.buttonFont}>Q. </Text>
                            <Text style={[styles.buttonFont, {flex: 1}]}>즐겨찾기는 어떻게 등록하나요?</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row-reverse'}}>
                            <Text style={styles.buttonFont}>{question11 ? 'ᐱ' : 'ᐯ'} </Text>
                        </View>
                    </View>
                    {question11 &&
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.answerFont,{fontWeight:'bold'}]}>A. </Text>
                        <Text style={[styles.answerFont,{flex: 1}]}>
                            즐겨찾기 기능은 구단과 선수, 두 가지 분류를 제공합니다. 구단 즐겨찾기는 리그 순위의 구단 상세정보에서 우측 상단의
                            별모양 버튼을 눌러 즐겨찾기를 등록 및 해제할 수 있습니다. 선수 즐겨찾기는 데이터센터의 선수 상세정보에서 우측 상단의
                            별모양 버튼을 눌러 즐겨찾기를 등록 및 해제할 수 있습니다. 즐겨찾기가 등록된 구단과 선수는 알아보기 쉽도록 일반 정보들과
                            다르게 표기됩니다.
                        </Text>
                    </View>
                    }
                </TouchableOpacity>

                {/* =============================================== 질문 10 =============================================== */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { question10 ? setQuestion10(false) : setQuestion10(true); }}>
                    <View style={styles.buttonView}>
                        <View style={{flex:9, flexDirection:'row'}}>
                            <Text style={styles.buttonFont}>Q. </Text>
                            <Text style={[styles.buttonFont, {flex: 1}]}>리그 순위, 일정, 팀정보 등이 안보여요.</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row-reverse'}}>
                            <Text style={styles.buttonFont}>{question10 ? 'ᐱ' : 'ᐯ'} </Text>
                        </View>
                    </View>
                    {question10 &&
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.answerFont,{fontWeight:'bold'}]}>A. </Text>
                        <Text style={[styles.answerFont,{flex: 1}]}>
                            해당 서비스는 인터넷 연결이 필요합니다. 인터넷 연결 상태를 확인해주세요. 이외에는 API 호출 문제일 수 있습니다.
                            로딩이 계속되거나 화면이 출력되지 않는다면 어플을 재시작하거나 잠시 후 다시 시도해주세요.
                        </Text>
                    </View>
                    }
                </TouchableOpacity>

                {/* =============================================== 질문 9 =============================================== */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { question9 ? setQuestion9(false) : setQuestion9(true); }}>
                    <View style={styles.buttonView}>
                        <View style={{flex:9, flexDirection:'row'}}>
                            <Text style={styles.buttonFont}>Q. </Text>
                            <Text style={[styles.buttonFont, {flex: 1}]}>커뮤니티 채팅, 게시글, 댓글이 안보여요.</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row-reverse'}}>
                            <Text style={styles.buttonFont}>{question9 ? 'ᐱ' : 'ᐯ'} </Text>
                        </View>
                    </View>
                    {question9 &&
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.answerFont,{fontWeight:'bold'}]}>A. </Text>
                        <Text style={[styles.answerFont,{flex: 1}]}>
                            해당 서비스는 인터넷 연결이 필요합니다. 인터넷 연결 상태를 확인해주세요. 그럼에도 문제가 지속되면
                            해당 페이지를 새로고침하거나 어플을 재시작해주세요.
                        </Text>
                    </View>
                    }
                </TouchableOpacity>

                {/* =============================================== 질문 8 =============================================== */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { question8 ? setQuestion8(false) : setQuestion8(true); }}>
                    <View style={styles.buttonView}>
                        <View style={{flex:9, flexDirection:'row'}}>
                            <Text style={styles.buttonFont}>Q. </Text>
                            <Text style={[styles.buttonFont, {flex: 1}]}>커뮤니티 유저를 신고하고 싶어요.</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row-reverse'}}>
                            <Text style={styles.buttonFont}>{question8 ? 'ᐱ' : 'ᐯ'} </Text>
                        </View>
                    </View>
                    {question8 &&
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.answerFont,{fontWeight:'bold'}]}>A. </Text>
                        <Text style={[styles.answerFont,{flex: 1}]}>
                            게시판의 목적에 맞지 않거나 커뮤니티에 분쟁 및 혼란을 일으키는 글이나 채팅의 경우
                            기본적으로 관리자에 의해 삭제됩니다. 이에 따른 제재가 이루어지지 않는 경우 마이페이지의
                            고객센터를 통해 신고하실 수 있으며, 처리에는 수 일이 걸릴 수 있습니다.
                        </Text>
                    </View>
                    }
                </TouchableOpacity>

                {/* =============================================== 질문 7 =============================================== */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { question7 ? setQuestion7(false) : setQuestion7(true); }}>
                    <View style={styles.buttonView}>
                        <View style={{flex:9, flexDirection:'row'}}>
                            <Text style={styles.buttonFont}>Q. </Text>
                            <Text style={[styles.buttonFont, {flex: 1}]}>커뮤니티의 댓글을 삭제하고 싶어요.</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row-reverse'}}>
                            <Text style={styles.buttonFont}>{question7 ? 'ᐱ' : 'ᐯ'} </Text>
                        </View>
                    </View>
                    {question7 &&
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.answerFont,{fontWeight:'bold'}]}>A. </Text>
                        <Text style={[styles.answerFont,{flex: 1}]}>
                            게시글과 달리 댓글은 삭제 기능을 지원하지 않습니다. 분쟁 및 혼란을 일으키는 댓글의 경우
                            관리자에 의해 삭제되며, 일반적인 사용자의 경우 한번 작성된 댓글은 삭제하실 수 없습니다.
                        </Text>
                    </View>
                    }
                </TouchableOpacity>

                {/* =============================================== 질문 6 =============================================== */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { question6 ? setQuestion6(false) : setQuestion6(true); }}>
                    <View style={styles.buttonView}>
                        <View style={{flex:9, flexDirection:'row'}}>
                            <Text style={styles.buttonFont}>Q. </Text>
                            <Text style={[styles.buttonFont, {flex: 1}]}>커뮤니티의 게시글을 삭제하고 싶어요.</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row-reverse'}}>
                            <Text style={styles.buttonFont}>{question6 ? 'ᐱ' : 'ᐯ'} </Text>
                        </View>
                    </View>
                    {question6 &&
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.answerFont,{fontWeight:'bold'}]}>A. </Text>
                        <Text style={[styles.answerFont,{flex: 1}]}>
                            Football-Park는 기본적으로 로그인 기능을 지원하지 않기 때문에, 게시글을 삭제하기 위해서는
                            작성자가 설정한 해당 게시글의 비밀번호가 필요합니다. 비밀번호는 4자리로 설정되며, 비밀번호가
                            일치하는 경우에는 누구나 해당 게시글을 삭제할 수 있습니다.
                        </Text>
                    </View>
                    }
                </TouchableOpacity>

                {/* =============================================== 질문 5 =============================================== */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { question5 ? setQuestion5(false) : setQuestion5(true); }}>
                    <View style={styles.buttonView}>
                        <View style={{flex:9, flexDirection:'row'}}>
                            <Text style={styles.buttonFont}>Q. </Text>
                            <Text style={[styles.buttonFont, {flex: 1}]}>커뮤니티에 게시글을 작성하고 싶어요.</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row-reverse'}}>
                            <Text style={styles.buttonFont}>{question5 ? 'ᐱ' : 'ᐯ'} </Text>
                        </View>
                    </View>
                    {question5 &&
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.answerFont,{fontWeight:'bold'}]}>A. </Text>
                        <Text style={[styles.answerFont,{flex: 1}]}>
                            커뮤니티는 닉네임만 설정한다면 누구나 이용할 수 있습니다. 게시글 작성 시에는
                            게시글 제목과 내용, 비밀번호와 태그가 모두 설정되어야 합니다. 
                        </Text>
                    </View>
                    }
                </TouchableOpacity>

                {/* =============================================== 질문 4 =============================================== */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { question4 ? setQuestion4(false) : setQuestion4(true); }}>
                    <View style={styles.buttonView}>
                        <View style={{flex:9, flexDirection:'row'}}>
                            <Text style={styles.buttonFont}>Q. </Text>
                            <Text style={[styles.buttonFont, {flex: 1}]}>해당 데이터들은 어디서 제공받나요?</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row-reverse'}}>
                            <Text style={styles.buttonFont}>{question4 ? 'ᐱ' : 'ᐯ'} </Text>
                        </View>
                    </View>
                    {question4 &&
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.answerFont,{fontWeight:'bold'}]}>A. </Text>
                        <Text style={[styles.answerFont,{flex: 1}]}>
                            실시간으로 반영되는 리그 순위와 일정, 팀 정보 데이터는 www.football-data.org의 API를
                            이용하고 있으며, 데이터 센터의 선수 정보는 www.fbref.com에서 제공하는 통계
                            데이터를 2차로 가공하여 제공하고 있습니다.
                        </Text>
                    </View>
                    }
                </TouchableOpacity>

                {/* =============================================== 질문 3 =============================================== */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { question3 ? setQuestion3(false) : setQuestion3(true); }}>
                    <View style={styles.buttonView}>
                        <View style={{flex:9, flexDirection:'row'}}>
                            <Text style={styles.buttonFont}>Q. </Text>
                            <Text style={[styles.buttonFont, {flex: 1}]}>지난 시즌의 기록들은 볼 수 없나요?</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row-reverse'}}>
                            <Text style={styles.buttonFont}>{question3 ? 'ᐱ' : 'ᐯ'} </Text>
                        </View>
                    </View>
                    {question3 &&
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.answerFont,{fontWeight:'bold'}]}>A. </Text>
                        <Text style={[styles.answerFont,{flex: 1}]}>
                            리그 순위 탭은 현재 시즌의 정보들만 제공합니다. 하지만 일정 탭은 지난 시즌의 일정들을
                            모두 지원하며, 데이터 센터는 최근 3시즌의 기록들을 열람할 수 있습니다.
                        </Text>
                    </View>
                    }
                </TouchableOpacity>

                {/* =============================================== 질문 2 =============================================== */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { question2 ? setQuestion2(false) : setQuestion2(true); }}>
                    <View style={styles.buttonView}>
                        <View style={{flex:9, flexDirection:'row'}}>
                            <Text style={styles.buttonFont}>Q. </Text>
                            <Text style={[styles.buttonFont, {flex: 1}]}>이번 시즌의 선수 데이터는 제공하지 않나요?</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row-reverse'}}>
                            <Text style={styles.buttonFont}>{question2 ? 'ᐱ' : 'ᐯ'} </Text>
                        </View>
                    </View>
                    {question2 &&
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.answerFont,{fontWeight:'bold'}]}>A. </Text>
                        <Text style={[styles.answerFont,{flex: 1}]}>
                            데이터 센터의 선수 데이터 정보는 전반기와 후반기 단위로 나누어 업데이트 됩니다.
                            전반기와 후반기는 리그별로 19경기 혹은 17경기를 기준으로 나뉘며, 전반기 혹은 후반기가
                            지나간 경우 수일 내에 데이터 센터에 정보가 업데이트됩니다.
                        </Text>
                    </View>
                    }
                </TouchableOpacity>

                {/* =============================================== 질문 1 =============================================== */}
                <TouchableOpacity activeOpacity={0.7} onPress={() => { question1 ? setQuestion1(false) : setQuestion1(true); }}>
                    <View style={styles.buttonView}>
                        <View style={{flex:9, flexDirection:'row'}}>
                            <Text style={styles.buttonFont}>Q. </Text>
                            <Text style={[styles.buttonFont, {flex: 1}]}>실시간으로 제공되는 정보는 어떤 것들이 있나요?</Text>
                        </View>
                        <View style={{flex:1, flexDirection:'row-reverse'}}>
                            <Text style={styles.buttonFont}>{question1 ? 'ᐱ' : 'ᐯ'} </Text>
                        </View>
                    </View>
                    {question1 &&
                    <View style={{flexDirection:'row'}}>
                        <Text style={[styles.answerFont,{fontWeight:'bold'}]}>A. </Text>
                        <Text style={[styles.answerFont,{flex: 1}]}>
                            Football-Park는 해외 5대리그(프리미어리그, 라리가, 세리에 A, 분데스리가, 리그 1)의 주요
                            리그의 순위와 일정, 그리고 소속 팀들의 주요 정보들을 실시간으로 제공합니다. 실시간으로 업데이트 하는 과정에서
                            API 환경에 따라 약간의 딜레이가 발생할 수 있습니다.
                        </Text>
                    </View>
                    }
                </TouchableOpacity>

            </View>
            
            <Image
                source={require('../../../assets/icon/Logo.png')} // assets에서 아이콘 불러오기 windoWidth*0.8*0.42
                style={{width: windoWidth*0.7, height: windoWidth*0.7*0.42, marginTop:20}}
            />
        </ScrollView>
    );
};

export default Menu_FAQ;

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
    marginLeft: 2,
  },
  answerFont: {
    fontSize: 15,
    marginLeft: 2,
    color: '#323232',
  },
});