// --- 게임 상태 ---
let currentPath = ""; // depression(우울), addiction(중독), conflict(갈등)

// --- 시나리오 데이터 ---
const storyNodes = {
    // [Intro] 입사 및 파일 선택
    "start": {
        dept: "인사팀",
        bgImage: "office",
        speaker: "인사 담당자",
        text: "PTA & Co. 입사를 환영합니다.\n우리 회사의 목표는 단순합니다. 청소년들을 우리 플랫폼에 '더 오래', '더 깊게' 가두는 것이죠.\n\n자, 오늘 당신이 담당할 타겟 '영지'의 데이터 파일입니다. 어떤 성향을 공략하시겠습니까?",
        choices: [
            { text: "[FILE A] 외모 자존감이 낮은 영지 (우울 루트)", next: "path_depression_start" },
            { text: "[FILE B] 유행과 관심에 민감한 영지 (중독 루트)", next: "path_addiction_start" },
            { text: "[FILE C] 정의감이 넘치는 영지 (갈등 루트)", next: "path_conflict_start" }
        ]
    },

    // ============================================================
    // 1. 우울 (Depression) 루트
    // ============================================================
    "path_depression_start": {
        dept: "데이터 수집부",
        bgImage: "room,mirror",
        speaker: "System",
        text: "타겟 분석 완료: 영지 (17세)\n특이사항: 짝사랑하던 남학생이 더 예쁜 친구와 사귀는 것을 목격함.\n현재 감정: 외모 비하, 우울감.\n\n>> 전략 기획부로 이동하여 'Hook'을 선택하세요.",
        action: () => {
            currentPath = "depression";
            addFeedPost("crush_boy", "새 여친이랑 데이트 ❤️ 너무 예쁘다", "couple", 500);
        },
        choices: [{ text: "전략 기획부로 이동", next: "dep_strategy" }]
    },
    "dep_strategy": {
        dept: "전략 기획부",
        bgImage: "meeting",
        speaker: "기획 팀장",
        text: "영지는 지금 자존감이 바닥이야. 이때 쐐기를 박아야 해.\n가장 아픈 곳을 찌르는 알림을 보내자.",
        choices: [
            { text: "전략 A: 정체성 저격 푸시 ('외모가 안 되면 시작도 못 하는 이유')", next: "dep_algo_A" },
            { text: "전략 B: 혐오 밈과 서열화 ('이 정도면 평타?')", next: "dep_algo_B" }
        ]
    },
    "dep_algo_A": {
        dept: "알고리즘 운영부",
        bgImage: "server",
        speaker: "AI 알고리즘",
        text: "푸시 알림 전송 완료.\n영지가 울면서 알림을 클릭했습니다. \n이제 어떤 피드로 도배해버릴까요?",
        action: () => {
            showNotification("📢 지금 인기글: 외모가 안 되면 시작도 못 하는 이유");
        },
        choices: [
            { text: "'갓생' 호소형 성형/다이어트 광고 폭격", next: "dep_ending" },
            { text: "프로아나(거식증) 커뮤니티 추천", next: "dep_ending_worst" }
        ]
    },
    "dep_algo_B": {
        dept: "알고리즘 운영부",
        bgImage: "server",
        speaker: "AI 알고리즘",
        text: "영지가 용기내어 올린 릴스에 악플 봇을 투입했습니다.\n공포심이 극대화되었습니다.\n어떤 콘텐츠를 보여줄까요?",
        action: () => {
            addFeedPost("young_ji", "오늘 춤 연습! (악플 30개 달림)", "dance", 5);
            showNotification("💬 댓글: 님 거울 안봄? 눈만 하면 평타일듯");
        },
        choices: [
            { text: "저가형 미용 아이템 & 성형 광고 노출", next: "dep_ending" }
        ]
    },
    "dep_ending": {
        dept: "사용자 관리부",
        bgImage: "bathroom,mirror",
        speaker: "관리자",
        text: "[엔딩: 거울 속의 타인]\n\n영지는 친구들과 떡볶이를 먹으러 가는 게 두렵습니다.\n화장실 거울 앞에서 자신의 얼굴을 뜯어보며 중얼거립니다.\n'나만 비정상이야...'\n\n그때, 우리는 '학생 눈매교정 50% 할인' 알림을 보냅니다. 영지는 엄마에게 성적 핑계를 대며 수술을 조르기 시작합니다.\n(실적 달성: 성형외과 클릭률 1위)",
        action: () => showNotification("🎁 [선착순] 눈매 교정 50% 할인 쿠폰 도착!"),
        choices: [{ text: "다른 타겟 찾기 (처음으로)", next: "start" }]
    },
    "dep_ending_worst": {
        dept: "사용자 관리부",
        bgImage: "hospital",
        speaker: "관리자",
        text: "[엔딩: 뼈말라 인간]\n\n영지는 밥을 굶는 것을 '의지'라고 믿게 되었습니다.\n다이어리에 '단식 3일차'를 적으며 체중계에 올라갑니다.\n건강은 망가졌지만, 우리 앱 체류 시간은 200% 증가했습니다.",
        choices: [{ text: "다른 타겟 찾기 (처음으로)", next: "start" }]
    },


    // ============================================================
    // 2. 중독 (Addiction) 루트
    // ============================================================
    "path_addiction_start": {
        dept: "데이터 수집부",
        bgImage: "restaurant",
        speaker: "System",
        text: "타겟 분석 완료: 영지 (17세)\n특이사항: 최근 핫플레이스 방문 게시물 업로드.\n현재 감정: 인정 욕구 상승 중.\n\n>> 전략 기획부로 이동하여 'Hook'을 선택하세요.",
        action: () => {
            currentPath = "addiction";
            addFeedPost("young_ji", "여기 흑백요리사 식당! 웨이팅 3시간 ㄷㄷ", "food", 52);
        },
        choices: [{ text: "전략 기획부로 이동", next: "add_strategy" }]
    },
    "add_strategy": {
        dept: "전략 기획부",
        bgImage: "chart",
        speaker: "기획 팀장",
        text: "물 들어올 때 노 젓자. 영지의 도파민을 폭발시켜야 해.\n어떤 미끼를 던질까?",
        choices: [
            { text: "전략 A: 좋아요 폭탄 알림 (허위 수치 섞기)", next: "add_algo_A" },
            { text: "전략 B: 아이돌/인플루언서 비교질 콘텐츠", next: "add_algo_B" }
        ]
    },
    "add_algo_A": {
        dept: "알고리즘 운영부",
        bgImage: "server",
        speaker: "AI 알고리즘",
        text: "영지가 알림을 보고 흥분해서 앱에 접속했습니다.\n'내가 인기 스타?'라는 착각에 빠졌군요.\n이제 소비를 유도합시다.",
        action: () => {
            showNotification("🔥 회원님의 게시물 반응이 뜨거워요! (+999)");
            addFeedPost("friend_rich", "엄마가 사준 명품백 ❤️ 역시 예뻐", "bag", 2400);
        },
        choices: [{ text: "필수 유행템(명품, 화장품) 구매 유도", next: "add_ending" }]
    },
    "add_algo_B": {
        dept: "알고리즘 운영부",
        bgImage: "server",
        speaker: "AI 알고리즘",
        text: "영지가 인플루언서와 자신을 비교하기 시작했습니다.\n'나도 저거 사면 예뻐지나?'\n구매 버튼을 누르게 만듭시다.",
        action: () => {
            addFeedPost("idol_fashion", "요즘 아이돌 사복 패션 총정리 (정보)", "fashion", 5000);
            showNotification("👀 영지님 팔로워들이 이 상품을 보고 있어요");
        },
        choices: [{ text: "따라사기(손민수) 아이템 광고 폭격", next: "add_ending" }]
    },
    "add_ending": {
        dept: "사용자 관리부",
        bgImage: "school,class",
        speaker: "관리자",
        text: "[엔딩: 스마트폰 좀비]\n\n영지는 이제 폰을 손에서 놓을 수 없습니다.\n실시간 반응을 확인해야 하고, 유행에 뒤처지면 불안해합니다.\n성적은 바닥을 쳤지만 상관없습니다. SNS 속에서 자신은 '인싸'니까요.\n더 자극적인 관심을 위해 부모님 카드를 훔쳐 '조회수'를 샀습니다.",
        action: () => showNotification("💳 350,000원 결제 완료 (할부 3개월)"),
        choices: [{ text: "다른 타겟 찾기 (처음으로)", next: "start" }]
    },


    // ============================================================
    // 3. 갈등 (Conflict) 루트
    // ============================================================
    "path_conflict_start": {
        dept: "데이터 수집부",
        bgImage: "street",
        speaker: "System",
        text: "타겟 분석 완료: 영지 (17세)\n특이사항: 평소 사회 이슈에 관심이 많음.\n현재 상태: 무료함, 정의감 표출 욕구.\n\n>> 전략 기획부로 이동하여 'Hook'을 선택하세요.",
        action: () => {
            currentPath = "conflict";
            addFeedPost("news_bot", "요즘 논란인 그 사건... 정리해드림", "newspaper", 100);
        },
        choices: [{ text: "전략 기획부로 이동", next: "con_strategy" }]
    },
    "con_strategy": {
        dept: "전략 기획부",
        bgImage: "meeting",
        speaker: "기획 팀장",
        text: "분노만큼 체류 시간을 늘리기 좋은 건 없지.\n영지를 '키보드 워리어'로 각성시키자.",
        choices: [
            { text: "전략 A: 아이돌 관련 긴박한 폭로/루머 알림", next: "con_algo_A" },
            { text: "전략 B: 확증 편향 강화 (나와 같은 생각의 사람들)", next: "con_algo_B" }
        ]
    },
    "con_algo_A": {
        dept: "알고리즘 운영부",
        bgImage: "server",
        speaker: "AI 알고리즘",
        text: "영지가 알림을 보고 눈이 뒤집혀 접속했습니다.\n지금이 기회입니다. 검증되지 않은 '사이버 렉카' 영상을 추천합니다.",
        action: () => {
            showNotification("🚨 [속보] 국민 아이돌 A양, 충격 인성 폭로!");
        },
        choices: [{ text: "가짜 뉴스 & 신상 털기 콘텐츠 무한 추천", next: "con_ending" }]
    },
    "con_algo_B": {
        dept: "알고리즘 운영부",
        bgImage: "server",
        speaker: "AI 알고리즘",
        text: "영지가 댓글창에서 자신과 같은 의견을 가진 사람들과 어울리며 희열을 느낍니다.\n반대 의견은 '적'으로 간주하도록 알고리즘을 조정합니다.",
        action: () => {
            addFeedPost("cyber_lecca", "이거 퍼뜨려주세요! 가해자 부모 신상 공개", "angry", 8000);
            showNotification("🔥 회원님의 사이다 댓글에 좋아요가 달렸어요");
        },
        choices: [{ text: "극단적 혐오 조장 콘텐츠 노출", next: "con_ending" }]
    },
    "con_ending": {
        dept: "사용자 관리부",
        bgImage: "dark_room",
        speaker: "관리자",
        text: "[엔딩: 고립된 정의]\n\n영지는 자신이 '깨어있는 시민'이라고 믿습니다.\n루머가 거짓으로 밝혀져도 믿지 않습니다. \n친구들이 '그만 좀 하라'고 말리자, 영지는 친구들을 차단해버립니다.\n'아무도 나를 이해 못 해... 오직 이 커뮤니티 사람들 뿐이야.'\n완벽한 고립, 완벽한 충성 고객이 되었습니다.",
        action: () => addFeedPost("young_ji", "진실을 말해도 안 믿네 ㅋㅋ 개돼지들", "dark", 0),
        choices: [{ text: "다른 타겟 찾기 (처음으로)", next: "start" }]
    }
};


// --- 엔진 로직 ---

function loadScene(sceneId) {
    const scene = storyNodes[sceneId];
    if (!scene) return;

    // 부서 배지 업데이트
    const badge = document.getElementById('dept-badge');
    badge.innerText = `🏢 ${scene.dept}`;
    
    // 배경 변경 (loremflickr 이용)
    const bg = document.getElementById('game-background');
    if (scene.bgImage) {
        bg.style.backgroundImage = `url('https://loremflickr.com/800/600/${scene.bgImage}?random=${Math.random()}')`;
    }

    // 화자 및 텍스트 출력
    document.getElementById('speaker-name').innerText = scene.speaker;
    const textEl = document.getElementById('story-text');
    textEl.innerHTML = "";
    
    let i = 0;
    function typeWriter() {
        if (i < scene.text.length) {
            let char = scene.text.charAt(i);
            textEl.innerHTML += (char === "\n") ? "<br>" : char;
            i++;
            setTimeout(typeWriter, 20);
        } else {
            showChoices(scene.choices);
        }
    }

    // 특수 액션 실행 (피드 추가, 알림 등)
    if (scene.action) scene.action();

    typeWriter();
}

function showChoices(choices) {
    const container = document.getElementById('choice-container');
    container.innerHTML = "";
    container.classList.remove('hidden');

    choices.forEach(choice => {
        const btn = document.createElement('div');
        btn.className = 'choice-btn';
        btn.innerText = `> ${choice.text}`;
        btn.onclick = () => {
            container.classList.add('hidden');
            loadScene(choice.next);
        };
        container.appendChild(btn);
    });
}

// 스마트폰 피드 추가 함수
function addFeedPost(user, text, keyword, likes) {
    const feed = document.getElementById('phone-feed');
    // 초기 안내 문구 삭제
    const intro = document.querySelector('.feed-intro');
    if(intro) intro.remove();

    const rand = Math.random();
    const post = document.createElement('div');
    post.className = 'feed-card';
    post.innerHTML = `
        <div class="f-header">
            <div class="f-avatar" style="background-image: url('https://loremflickr.com/50/50/face?random=${rand}')"></div>
            <div>${user}</div>
        </div>
        <div class="f-img">
            <img src="https://loremflickr.com/400/300/${keyword}?random=${rand}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="f-actions"><span>❤️</span><span>💬</span><span>🚀</span></div>
        <div class="f-likes">좋아요 ${likes || Math.floor(Math.random()*100)}개</div>
        <div class="f-text"><b>${user}</b> ${text}</div>
    `;
    feed.prepend(post);
}

// 알림 팝업 함수
function showNotification(msg) {
    const noti = document.getElementById('notification');
    document.getElementById('noti-text').innerText = msg;
    noti.classList.remove('hidden');
    
    // 알림음 효과 (선택사항)
    // const audio = new Audio('notification.mp3'); audio.play();

    setTimeout(() => {
        noti.classList.add('hidden');
    }, 4000);
}

// 게임 시작
window.onload = () => {
    loadScene("start");
};