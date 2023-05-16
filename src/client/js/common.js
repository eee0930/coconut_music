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
