document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const mainScreen = document.getElementById("mainScreen");
  const worldScreen = document.getElementById("worldScreen");
  const gameScreen = document.getElementById("gameScreen");
  const nextBtn = document.getElementById("nextBtn");
  const body = document.body;
  const scrollWrapper = document.querySelector(".scroll-wrapper");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      // 메인 화면 숨기기
      if (mainScreen) {
        mainScreen.style.display = "none";
      }
      
      // 세계관 설명 화면 표시
      if (worldScreen) {
        worldScreen.style.display = "flex";
      }
      
      // body에 world-view 클래스 추가하여 배경 이미지 변경
      if (body) {
        body.classList.add("world-view");
      }
      
      // 타임라인 기반 애니메이션 시작
      setTimeout(() => {
        // next 버튼 초기에는 숨기기
        if (nextBtn) {
          nextBtn.style.display = "none";
        }
        startTimelineAnimation();
      }, 50);
    });
  }

  // 다음 페이지 버튼 클릭 시 게임 화면으로 전환
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (worldScreen) {
        worldScreen.style.display = "none";
      }
      if (gameScreen) {
        gameScreen.style.display = "flex";
      }
      // 배경 이미지를 ad.webp로 변경
      if (body) {
        body.classList.remove("world-view");
        body.classList.add("game-view");
      }
    });
  }

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
          setTimeout(() => {
            if (nextBtn) {
              nextBtn.style.display = "inline-flex";
            }
          }, 1000);
        }
      }, index * 2000); // 각 텍스트마다 2초 간격
    });
  }
});
