import "../scss/styles.scss";

const $btn = document.querySelectorAll(".btn");
const $player = document.querySelector(".player");
const $cocoPlayerList = document.querySelectorAll(".cocoPlayerList");

$btn.forEach((value) => {
  const youtubeId = value.getAttribute("data-youtube-id");
  value.addEventListener("click", () => {
    $player.innerHTML = `
      <div class="video_container">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/MSRcC626prw" title="YouTube video player" frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      
      </div>
    `;
  });
});

function handleClickPlayerList() {
  
}

$cocoPlayerList.forEach((playerList) => 
  playerList.addEventListener("click", handleClickPlayerList));
