const $loginStatus = document.querySelector("#loginStatus");
const $loginRequired = document.querySelectorAll(".loginRequired");

/**
 * 로딩이미지 띄우기
 */
export function nwkLoading() {

}

/**
 * 로딩이미지 끄기
 */
export function stopNwkLoading() {

}

/**
 * 이미지 미리보기
 * @param {*} e 
 */
export function previewImagefile(e){
  const files = e.target.files;
  const fileArr = Array.prototype.slice.call(files);
 
  fileArr.forEach(function(f){
    if(!f.type.match("image.*")) {
      alert("이미지 확장자만 가능합니다.");
      // input file의 value 비우기
      // tbd
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      // 이미지 보여줄 div의 background의 url에  e.target.result 넣기
      // tbd
    }
    reader.readAsDataURL(f);
  });
}

/**
 * 로그인이 필요한 페이지의 링크를 클릭한 경우
 * 로그인 여부 확인 후 로그인 페이지로 이동하기
 * @returns 
 */
function handleLogin(e) {
  if($loginStatus.value === "true"){
    return;
  } else {
    e.preventDefault();
    location.href = `/auth/login?destPage=${window.location.pathname}`;
  }
}

$loginRequired.forEach((loginBtn) => 
  loginBtn.addEventListener("click", handleLogin));

