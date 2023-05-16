import { nwkLoading, stopNwkLoading } from "../common";

let audio = null;  //음성 객체를 담을 변수
let loopN = 0; //반복횟수
let audioloadTimer;
/*************************플레이어 재생************************************/
/**
 * filUri: 재생할 파일을 요청할 uri (쿼리문자열의 '='까지 쓴다.예: "/player/file/view?path=").
 * vPath: 재생하려는 파일의 경로를 포함한 파일명.
 * loopNum: 재생하려는 횟수.
 * target: 재생 버튼 element를 넣으면 재생 상태에 따라 버튼 모양을 토글.
 * 파일명을 url인코딩 하여 서버로부터 파일을 가져와 원하는 횟수 만큼 0.8초 간격으로 재생한다.
 * 멈추고 싶을 땐 다시 누른다.
 */
function playCoco(fileUri, vPath, loopNum, target){
  const handleError = () => {
    clearTimeout(audioloadTimer);
    audioloadTimer = setTimeout(stopNwkLoading, 300);
  };
  const handleLoadedData = () => {
    clearTimeout(audioloadTimer);
		audioloadTimer = setTimeout(stopNwkLoading, 300);
  };
  const handleCanPlayThrough = () => {
    if(target !== undefined && !target.classList.contains('audioActive')){
      target.classList.add('audioActive');
    }
    audio.play();
  };
  const handleTimeout = () => {
    if(loopN > 1) {
      loopN--;
      audio.play();
    } else {  // 반복 재생이 끝나면 
      if(target !== undefined && target.classList.contains('audioActive')){
        target.classList.remove('audioActive');
      }
      audio = null; // 다시 눌렀을 때 재생하기 위해 null로 초기화.
    }
  }
  let timeout;
  const handleEnded = () => {
    // audio.currentTime = 0;
    clearTimeout(timeout);
    timeout = setTimeout(handleTimeout, 800);
  }
  
  if(audio !== null) {  // player 변수에 음악 객체가 있다면
		const audioActive = document.querySelector('.audioActive') || null;
    if(audioActive !== null){
			audioActive.classList.remove('audioActive');
		}
		if(!audio.paused){  // 멈춤 상태가 아닐 시 
			audio.pause();  // 재생을 정지.
		}
		loopN = 0;  // 반복횟수값은 0으로 변경
		audio = null;
	} else {  // audio 변수에 음악 객체가 없다면
		const actives = document.querySelectorAll('.audioActive');
		if(actives !== null){
			actives.forEach(elt => elt.classList.remove('audioActive'));
		}
		try {
			loopN = loopNum;
			audio = new Audio(fileUri + vPath);
			// 음악을 불러오는 중
			audio.addEventListener('loadstart', nwkLoading);
			// 음악 불러오기 실패
			audio.addEventListener('error', handleError);
			// 음악 불러오기 완료
			audio.addEventListener('loadeddata', handleLoadedData);
			audio.addEventListener('canplaythrough', handleCanPlayThrough);
			audio.addEventListener('ended', handleEnded);
			audio.load();
		} catch(e) {
			alert('음악을 불러올 수 없습니다.');
		}
	}
};

function pauseCoco() {
	if(audio !== null && !audio.paused) {
		audio.pause();
	}
};

function stopCoco() {
	if(audio !== null) {  // player 변수에 음악 객체가 있다면
		if(!audio.paused) {  // 멈춤 상태가 아닐 시 
			audio.pause();  // 정지.
		}
		loopN = 0;  // 반복횟수값은 0으로 변경
		audio = null;
	}
};

function resumeCoco() {
	if(audio !== null && audio.paused){
		audio.play();
	}
};