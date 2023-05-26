import "../scss/styles.scss";

const $likeBtn = document.querySelectorAll(".likeBtn");


const handleClickLikeBtn = (target, tid) => {
  const $target = target;
  const $icon = $target.querySelector("i");
  if($target.classList.contains("liked")) {
    $target.classList.remove("liked");
    $icon.classList.remove("fa-solid");
    $icon.classList.add("fa-regular");

    // archive 목록에서 제외
  } else {
    $icon.classList.remove("fa-regular");
    $icon.classList.add("fa-solid");
    $target.classList.add("active");
    setTimeout(() => $target.classList.remove("active"), 1500);
    $target.classList.add("liked");

    // archive 목록에 추가
  }
}

$likeBtn.forEach($btn => {
  const tid = $btn.dataset.tid;
  $btn.addEventListener("click", () => handleClickLikeBtn($btn, tid));
});



// $btn.forEach((value) => {
//   const youtubeId = value.getAttribute("data-youtube-id");
//   value.addEventListener("click", () => {
//     $player.innerHTML = `
//       <div class="video_container">
//       <iframe width="560" height="315" src="https://www.youtube.com/embed/MSRcC626prw" title="YouTube video player" frameborder="0" 
//       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      
//       </div>
//     `;
//   });
// });
