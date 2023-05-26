import { nwkLoading, stopNwkLoading } from "../common";

const $loginStatus = document.querySelector('#loginStatus');
const $cocoPlayBtn = document.querySelector("#cocoPlayBtn");
const $cocoPlayUrl = document.querySelector("#cocoPlayUrl");
const $progrss = document.querySelector("#playerProgress");
const $playCocos = document.querySelectorAll(".playCoco");
const ALBUM_ROOT = "/album/";
const ARTIST_ROOT = "/artist/";
const TRACK_ROOT = "/song/";

/**
 * playlist에서 선택한 트랙 정보를 플레이어 정보로 옮김
 * [alid, image, tid, audio, duration, name, arid, artist]
 * @param {object} $target 
 */
function displayPlayer($target) {
  // [클릭한 트랙 정보]
  const $trackElement = $target.closest(".trackElement");
  const $albumImg = $trackElement.querySelector(".albumImg");
  const $trackInfo = $trackElement.querySelector(".trackInfo");
  const { tid } = $trackElement.dataset;
  const { alid } = $albumImg.dataset;
  const albumImg = $albumImg.querySelector(".imgSrc").value;
  const trackUri = $target.dataset.audio;
  const { arid, name, artist } = $trackInfo.dataset;
  // 게스트인 경우 재생 시간을 30초로
  let duration = 0;
  if($loginStatus.value === true) {
    duration = $target.dataset.duration;
  } else {
    duration = $target.dataset.duration;
  }

  // [플레이어 정보]
  const $cocoPlayer = document.querySelector("#cocoPlayerContainer");
  const $playerImg = $cocoPlayer.querySelector(".albumImg");
  const $playerArtist = $cocoPlayer.querySelector(".artist");
  const $playerName = $cocoPlayer.querySelector(".name");
  
  $progrss.dataset.duration = duration;
  $playerImg.href = `${ALBUM_ROOT}${alid}`;
  $playerImg.querySelector("img").style.backgroundImage = `url(${albumImg})`;
  $playerName.href = `${TRACK_ROOT}${tid}`;
  $playerName.querySelector("span").innerText = name.length > 30 ? name.slice(0, 30) + "..." : name;
  $playerArtist.href = `${ARTIST_ROOT}${arid}`;
  $playerArtist.querySelector("span").innerText = artist.length > 40 ? artist.slice(0, 40) + "..." : artist;
  $cocoPlayer.querySelector(".likeBtn").dataset.tid = tid;
  $cocoPlayUrl.value = trackUri;

  playCoco(1);
}

const $playTime = document.querySelector("#playTime");
let realDuration = 0;
let progressWidth = 0;
let playTime = 0;
let moveWidth = 0;
const designTime = (time) => {
  const seconds = String(time % 60).padStart(2, "0");
  let minutes = "";
  let hours = "";
  let durationTime = `00:${seconds}`;
  if(time > 60) {
    minutes = String(Math.floor(time / 60) % 60).padStart(2, "0");
    durationTime = `${minutes}:${seconds}`;
  }
  if(time > 3600) {
    hours = String(Math.floor(time / 3600)).padStart(2, "0");
    durationTime = `${hours}:${minutes}:${seconds}`;
  }
  return durationTime;
}
const moveProgress = () => {
  progressWidth += moveWidth;
  $progrss.style.width = progressWidth + "%";
  playTime += 1;
  $playTime.innerText = designTime(playTime);
}
/**
 * 프로그레스바 세팅
 * @param {*} audio 
 * @param {*} duration 
 */
function setProgressBar() {
  const $durationTime = document.querySelector("#durationTime");
  const duration = $progrss.dataset.duration;
  moveWidth = 100 / realDuration;
  $durationTime.innerText = designTime(duration);
}
let progressInterval;
function startProgress() {
  progressInterval = setInterval(moveProgress, 1000);
}
function stopProgress() {
  clearInterval(progressInterval);
  realDuration = 0;
  progressWidth = 0;
  playTime = 0;
  moveWidth = 0;
  $progrss.style.width = 0;
  $playTime.innerText = "00:00";
}

/**
 * 재생 여부에 따라 재생버튼 아이콘 변경
 * @param {boolean} isPlay 
 */
function togglePlayIcon(isPlay) {
  const iconClassList = $cocoPlayBtn.querySelector("i").classList;
  if(isPlay) {
    $cocoPlayBtn.removeEventListener("click", playCoco);
    $cocoPlayBtn.addEventListener("click", pauseCoco);
    iconClassList.remove("fa-play");
    iconClassList.add("fa-pause");
    $cocoPlayBtn.classList.add('audioActive');
  } else {
    $cocoPlayBtn.removeEventListener("click", pauseCoco);
    $cocoPlayBtn.addEventListener("click", playCoco);
    iconClassList.remove("fa-pause");
    iconClassList.add("fa-play");
    $cocoPlayBtn.classList.remove('audioActive');
  }
}


let audio = null;  //음성 객체를 담을 변수
let loopN = 0; //반복횟수
let audioloadTimer;
/********************************[플레이어 재생]**********************************/
/**
 * fileUri: 재생할 파일을 요청할 uri
 * loopNum: 재생하려는 횟수.
 * target: 재생 버튼 element를 넣으면 재생 상태에 따라 버튼 모양을 토글.
 * 파일명을 url인코딩 하여 서버로부터 파일을 가져와 원하는 횟수 만큼 0.8초 간격으로 재생한다.
 * 멈추고 싶을 땐 다시 누른다.
 */
function playCoco(loopNum){
  const fileUri = $cocoPlayUrl.value;
  const handleError = () => {
    clearTimeout(audioloadTimer);
    audioloadTimer = setTimeout(stopNwkLoading, 300);
  };
  const handleLoadedData = () => {
    clearTimeout(audioloadTimer);
		audioloadTimer = setTimeout(stopNwkLoading, 300);
  };
  const handleCanPlayThrough = () => {
    if($cocoPlayBtn !== undefined && !$cocoPlayBtn.classList.contains('audioActive')){
      togglePlayIcon(true);
      realDuration = audio.duration;
    }
    audio.play();
    setProgressBar();
    startProgress();
  };
  const handleTimeout = () => {
    if(loopN > 1) {
      loopN--;
      audio.play();
      togglePlayIcon(true);
    } else {  // 반복 재생이 끝나면 
      if($cocoPlayBtn !== undefined && $cocoPlayBtn.classList.contains('audioActive')){
        togglePlayIcon(false);
        stopProgress();
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
			togglePlayIcon(false);
      stopProgress();
		}
		if(!audio.paused){  // 멈춤 상태가 아닐 시 
			audio.pause();  // 정지.
      togglePlayIcon(false);
      stopProgress();
		}
		loopN = 0;  // 반복횟수값은 0으로 변경
		audio = null;
	} else {  // audio 변수에 음악 객체가 없다면
		const active = document.querySelector('.audioActive');
		if(active !== null){
			togglePlayIcon(false);
      stopProgress();
		}
	}
  try {
    loopN = loopNum;
    audio = new Audio(fileUri);
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
};

function pauseCoco() {
	if(audio !== null && !audio.paused) {
		audio.pause();
    togglePlayIcon(false);
    stopProgress();
	}
};

function stopCoco() {
	if(audio !== null) {  // player 변수에 음악 객체가 있다면
		if(!audio.paused) {  // 멈춤 상태가 아닐 시 
			audio.pause();  // 정지.
      togglePlayIcon(false);
      stopProgress();
		}
		loopN = 0;  // 반복횟수값은 0으로 변경
		audio = null;
	}
};

function resumeCoco() {
	if(audio !== null && audio.paused){
		audio.play();
    togglePlayIcon(true);
	}
};

let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: "Xit3nVfE18M",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onMusicCardClick(videoId) {
  player.loadVideoById(videoId);
}

const musicCards = document.getElementsByClassName("music-card");
console.log("music", musicCards);
for (var i = 0; i < musicCards.length; i++) {
  musicCards[i].addEventListener("click", function () {
    onMusicCardClick(this.dataset.videoId);
  });
}



$cocoPlayBtn.addEventListener("click", playCoco);
$playCocos.forEach($coco => {
  const playUri = $coco.dataset.audio;
  $coco.addEventListener("click", () => displayPlayer($coco));
});