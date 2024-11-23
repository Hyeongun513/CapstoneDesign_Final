import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
SplashScreen.preventAutoHideAsync(); //SplashScreen : 앱이 뜰 때, 서버에서 데이터를 가져오는 동안 사용자에게 보여주는 스크린.(일종의 로딩?)
//preventAutoHideAsync : SplashScreen을 감추지 말고 보여줘라 라는 의미
export default function RootLayout() {
    useEffect(() => { //첫번째 리턴 후에 한번만 호출, 
        SplashScreen.hideAsync(); //SplashScreen을 감춰라
    }, []);
    return ( //헤더 부분의 스타일 지정
        <Stack screenOptions={{
            cardStyle: { backgroundColor: "#ffffff" },
            headerStyle: {
                height: 110,
                backgroundColor: "#95a5a6", //#95a5a6
                borderBottomWidth: 5,
                borderBottomColor: "#34495e", //#34495e
            },
            headerTiteStyle: { color: "#ffffff", fontSize: 24 },
            headerTitleAlign: "center",
        }}>
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: "Football Park",
                }}
            />
            <Stack.Screen
                name="Home"
                options={{
                    headerTitle: "Football Park",
                }}
            />
            <Stack.Screen
                name="App"
                options={{
                    headerTitle: "Football Park",
                }}
            />
            <Stack.Screen
                name="src/Menu"
                options={{
                    headerTitle: "메인 메뉴",
                }}
            />
            <Stack.Screen
                name="src/Rank/Rank_Home"
                options={{
                    headerTitle: "리그 순위",
                }} 
            />
            <Stack.Screen
                name="src/Team/TeamDetails"
                options={{
                    headerTitle: "팀 정보",
                }}
            />
            <Stack.Screen
                name="src/Schedule/ScheduleHome"
                options={{
                    headerTitle: "경기일정",
                }}
            />
            <Stack.Screen
                name="src/Community/NicknameMenu"
                options={{
                    headerTitle: "커뮤니티 센터",
                }}
            />
            <Stack.Screen
                name="src/Community/Chat"
                options={{
                    headerTitle: "커뮤니티 센터 : 채팅",
                }}
            />
            <Stack.Screen
                name="src/Community/ForumHome"
                options={{
                    headerTitle: "커뮤니티 센터 : 게시판",
                }}
            />
            <Stack.Screen
                name="src/Community/ForumPost"
                options={{
                    headerTitle: "커뮤니티 센터 : 게시글 작성",
                }}
            />
            <Stack.Screen
                name="src/DataCenter/DataCenterHome"
                options={{
                    headerTitle: "데이터 센터",
                }}
            />
            <Stack.Screen
                name="src/DataCenter/PlayerData_PL"
                options={{
                    headerTitle: "데이터 센터 : 프리미어리그",
                }}
            />
            <Stack.Screen
                name="src/DataCenter/PlayerData_PD"
                options={{
                    headerTitle: "데이터 센터 : 라리가",
                }}
            />
            <Stack.Screen
                name="src/DataCenter/PlayerData_BL1"
                options={{
                    headerTitle: "데이터 센터 : 분데스리가",
                }}
            />
            <Stack.Screen
                name="src/DataCenter/PlayerData_SA"
                options={{
                    headerTitle: "데이터 센터 : 세리에 A",
                }}
            />
            <Stack.Screen
                name="src/DataCenter/PlayerData_FL1"
                options={{
                    headerTitle: "데이터 센터 : 리그 1",
                }}
            />
            <Stack.Screen
                name="src/DataCenter/PlayerData_CL"
                options={{
                    headerTitle: "데이터 센터 : UEFA 챔피언스리그",
                }}
            />
            <Stack.Screen
                name="src/DataCenter/PlayerDataDetail"
                options={{
                    headerTitle: "데이터 센터 : 통계",
                }}
            />
            <Stack.Screen
                name="src/Community/ServiceCenter_Home"
                options={{
                    headerTitle: "고객센터",
                }}
            />
            <Stack.Screen
                name="src/Community/ServiceCenter_Post"
                options={{
                    headerTitle: "고객센터 문의",
                }}
            />
            <Stack.Screen
                name="src/Menu/Menu_FAQ"
                options={{
                    headerTitle: "FAQ",
                }}
            />
            {/* 
            <Stack.Screen
                name="src/Menu/Menu_FAQ"
                options={{
                    headerTitle: "고객센터",
                }}
            /> */}
        </Stack>
    );
};
