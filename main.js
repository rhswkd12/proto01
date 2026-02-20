document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const mainScreen = document.getElementById("mainScreen");
  const worldScreen = document.getElementById("worldScreen");
  const storyScreen = document.getElementById("storyScreen");
  const gameScreen = document.getElementById("gameScreen");
  const gameScreen2 = document.getElementById("gameScreen2");
  const nextBtn = document.getElementById("nextBtn");
  const storyNextArrow = document.getElementById("storyNextArrow");
  const body = document.body;
  const scrollWrapper = document.querySelector(".scroll-wrapper");

  // Scene Manager - 확장 가능한 구조
  const SceneManager = {
    currentScene: 'main',
    scenes: {
      main: {
        element: mainScreen,
        onEnter: () => {
          if (mainScreen) mainScreen.style.display = "flex";
          if (body) {
            body.classList.remove("world-view", "story-view", "game-view");
          }
        },
        onExit: () => {
          if (mainScreen) mainScreen.style.display = "none";
        }
      },
      world: {
        element: worldScreen,
        onEnter: () => {
          if (worldScreen) worldScreen.style.display = "flex";
          if (body) {
            body.classList.remove("story-view", "game-view");
            body.classList.add("world-view");
          }
          setTimeout(() => {
            startTimelineAnimation();
          }, 50);
        },
        onExit: () => {
          if (worldScreen) worldScreen.style.display = "none";
        }
      },
      story: {
        element: storyScreen,
        onEnter: () => {
          if (storyScreen) storyScreen.style.display = "flex";
          if (body) {
            body.classList.remove("world-view", "game-view");
            body.classList.add("story-view");
          }
        },
        onExit: () => {
          if (storyScreen) storyScreen.style.display = "none";
        }
      },
      game: {
        element: gameScreen,
        onEnter: () => {
          if (gameScreen) gameScreen.style.display = "flex";
          if (body) {
            body.classList.remove("world-view", "story-view");
            body.classList.add("game-view");
          }
        },
        onExit: () => {
          if (gameScreen) gameScreen.style.display = "none";
        }
      },
      game2: {
        element: gameScreen2,
        onEnter: () => {
          if (gameScreen2) gameScreen2.style.display = "flex";
          if (body) {
            body.classList.remove("world-view", "story-view", "game-view");
            body.classList.add("game-view");
          }
        },
        onExit: () => {
          if (gameScreen2) gameScreen2.style.display = "none";
        }
      }
    },
    goTo: function(sceneName) {
      // 씬 존재 여부 확인
      if (!this.scenes[sceneName]) {
        console.warn(`Scene "${sceneName}" not found`);
        return false;
      }
      
      // 같은 씬으로 전환 시도 시 무시
      if (this.currentScene === sceneName) {
        return false;
      }
      
      // 현재 씬 종료
      if (this.scenes[this.currentScene]) {
        this.scenes[this.currentScene].onExit();
      }
      
      // 새 씬 진입
      this.currentScene = sceneName;
      this.scenes[sceneName].onEnter();
      
      return true;
    },
    // 새 씬 등록 헬퍼 (확장용)
    register: function(sceneName, config) {
      this.scenes[sceneName] = config;
    },
    // 현재 씬 확인
    getCurrentScene: function() {
      return this.currentScene;
    }
  };

  // 버튼 이벤트
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      SceneManager.goTo('world');
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      SceneManager.goTo('story');
    });
  }

  if (storyNextArrow) {
    storyNextArrow.addEventListener("click", () => {
      SceneManager.goTo('game');
    });
  }

  // 대사 시스템
  const dialogueText = document.getElementById("dialogueText");
  const dialogueNext = document.getElementById("dialogueNext");
  
  // 대사 데이터 (예시 - 나중에 확장 가능)
  const dialogues = [
    "나는 요새 잘나가는 SNS를 제작한, PTA & Co.의 사장이다.",
    "이번에 만든 SNS가 아주 폭발적인 반응을 얻고 있군. 아주 좋았어.",
    "이 인기가 유지되도록 SNS를 다듬는 일을 해야겠지. 그럼 오늘도 출근을 해볼까."
  ];
  
  let currentDialogueIndex = 0;
  let typingTimeout = null;
  let isTyping = false;
  
  function typeText(text, element, speed = 50) {
    if (!element) return;
    
    // 기존 타이핑 애니메이션 취소
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      typingTimeout = null;
    }
    
    isTyping = true;
    element.textContent = "";
    let currentIndex = 0;
    
    function typeChar() {
      if (currentIndex < text.length) {
        element.textContent += text[currentIndex];
        currentIndex++;
        typingTimeout = setTimeout(typeChar, speed);
      } else {
        isTyping = false;
        typingTimeout = null;
      }
    }
    
    typeChar();
  }
  
  function showDialogue(index) {
    if (index >= 0 && index < dialogues.length && dialogueText) {
      currentDialogueIndex = index;
      typeText(dialogues[index], dialogueText);
    }
  }
  
  function nextDialogue() {
    // 타이핑 중이면 즉시 완료하고 다음 대사로
    if (isTyping && dialogueText && currentDialogueIndex < dialogues.length) {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
      }
      dialogueText.textContent = dialogues[currentDialogueIndex];
      isTyping = false;
      return;
    }
    
    if (currentDialogueIndex < dialogues.length - 1) {
      showDialogue(currentDialogueIndex + 1);
    } else {
      // 마지막 대사 이후 gamescreen2로 이동
      SceneManager.goTo('game2');
    }
  }
  
  if (dialogueNext) {
    dialogueNext.addEventListener("click", () => {
      nextDialogue();
    });
  }
  
  // 게임 씬 진입 시 첫 대사 표시
  const originalGameEnter = SceneManager.scenes.game.onEnter;
  SceneManager.scenes.game.onEnter = () => {
    originalGameEnter();
    currentDialogueIndex = 0;
    showDialogue(0);
  };
  
  // 게임 씬 2 타이핑 애니메이션
  const dialogueText2 = document.getElementById("dialogueText2");
  const game2Dialogue = "안녕하십니까 사장님. 출근을 하기 위해서는 카드를 찍고 데이터의 엑세스권을 얻어야합니다. 카드를 찍어주십시오.";
  let typingTimeout2 = null;
  let isTyping2 = false;
  
  function typeText2(text, element, speed = 50) {
    if (!element) return;
    
    // 기존 타이핑 애니메이션 취소
    if (typingTimeout2) {
      clearTimeout(typingTimeout2);
      typingTimeout2 = null;
    }
    
    isTyping2 = true;
    element.textContent = "";
    let currentIndex = 0;
    
    function typeChar() {
      if (currentIndex < text.length) {
        element.textContent += text[currentIndex];
        currentIndex++;
        typingTimeout2 = setTimeout(typeChar, speed);
      } else {
        isTyping2 = false;
        typingTimeout2 = null;
      }
    }
    
    typeChar();
  }
  
  // 게임 씬 2 진입 시 타이핑 애니메이션 시작
  const originalGame2Enter = SceneManager.scenes.game2.onEnter;
  SceneManager.scenes.game2.onEnter = () => {
    originalGame2Enter();
    setTimeout(() => {
      if (dialogueText2) {
        typeText2(game2Dialogue, dialogueText2);
      }
    }, 100);
  };

  // iOS 시간 선택기 스타일 스크롤 효과
  function initIOSScroll() {
    const scrollContent = document.querySelector(".scroll-content");
    const worldTexts = document.querySelectorAll(".world-text");
    
    if (!scrollContent || !worldTexts.length) return;

    function updateTextStyles() {
      const scrollTop = scrollContent.scrollTop;
      const wrapperHeight = scrollContent.clientHeight;
      const centerY = wrapperHeight / 2;

      worldTexts.forEach((text) => {
        const rect = text.getBoundingClientRect();
        const contentRect = scrollContent.getBoundingClientRect();
        const textCenterY = rect.top - contentRect.top + rect.height / 2;
        const distance = Math.abs(textCenterY - centerY);
        const maxDistance = wrapperHeight / 2;
        
        // 중앙에서의 거리에 따른 비율 (0 ~ 1)
        const ratio = Math.max(0, 1 - (distance / maxDistance));
        
        // 중앙에 가까울수록 크고 밝게
        const scale = 0.8 + ratio * 0.2;
        const opacity = 0.3 + ratio * 0.7;
        
        // 폰트 크기 조절
        const baseSize = 1.2;
        const maxSize = 2.5;
        const fontSize = baseSize + ratio * (maxSize - baseSize);
        
        text.style.transform = `scale(${scale})`;
        text.style.opacity = opacity;
        text.style.fontSize = `${fontSize}rem`;
        
        // 중앙에 가까우면 active 클래스 추가
        if (ratio > 0.7) {
          text.classList.add("active");
        } else {
          text.classList.remove("active");
        }
      });
    }

    // 스크롤 이벤트 리스너
    let ticking = false;
    scrollContent.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateTextStyles();
          ticking = false;
        });
        ticking = true;
      }
    });

    // 초기 스타일 업데이트
    updateTextStyles();
  }

  // 타임라인 기반 애니메이션 함수
  function startTimelineAnimation() {
    const worldTexts = document.querySelectorAll(".world-text");
    if (!worldTexts.length) return;

    // 각 텍스트 초기 상태 설정
    worldTexts.forEach((text, index) => {
      text.style.opacity = "0";
      text.style.transform = "translateY(2rem) scale(0.8)";
      text.style.transition = "none";
    });

    // 첫 번째 텍스트를 중앙으로 스크롤
    const scrollContent = document.querySelector(".scroll-content");
    if (scrollContent && worldTexts[0]) {
      const firstPosition = worldTexts[0].offsetTop - scrollContent.clientHeight / 2 + worldTexts[0].clientHeight / 2;
      scrollContent.scrollTo({
        top: firstPosition,
        behavior: "smooth"
      });
    }

    // 각 텍스트를 순차적으로 애니메이션
    worldTexts.forEach((text, index) => {
      setTimeout(() => {
        // 중앙으로 스크롤
        if (scrollContent) {
          const targetPosition = text.offsetTop - scrollContent.clientHeight / 2 + text.clientHeight / 2;
          scrollContent.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }

        // 애니메이션 적용
        text.style.transition = "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        text.style.opacity = "1";
        text.style.transform = "translateY(0) scale(1)";

        // 마지막 텍스트 애니메이션 완료 후 next 버튼 표시
        if (index === worldTexts.length - 1) {
          /* 마지막 텍스트 애니메이션 완료 (Next 버튼은 항상 표시) */
        }
      }, index * 2000); // 각 텍스트마다 2초 간격
    });
  }
});
