// let's select all required tags or elements
const mainVideo = document.querySelector('#main-Video');
const musicList = document.querySelector('.music-list');
const playlist = document.getElementById('playlist');
const AllLessons = document.querySelector('.AllLessons');
const videoTitle = document.querySelector('.title');


const ulTag = document.querySelector("ul");
AllLessons.innerHTML = `${allVideos.length} VODs`


let musicIndex = 1;
window.addEventListener('load',()=>{
   loadMusic(musicIndex);
   playingNow();
})
function playMusic(){
   mainVideo.play();
   playlist.classList.add('active')
}
function loadMusic(indexNumb){
   mainVideo.src = `${allVideos[indexNumb - 1].src}`;
   videoTitle.innerHTML = `${indexNumb}. ${allVideos[indexNumb - 1].name}`
   
}

for(let i = 0; i < allVideos.length; i++){
   let liTag = `<li li-index="${i + 1}">
      <div class="row">
         <span>${i + 1}. ${allVideos[i].name}</span>
      </div>
      <video class="${allVideos[i].id}" src="${allVideos[i].src}" style="display: none;" title="${allVideos[i].name}"></video>
      <span id="${allVideos[i].id}" class="duration"></span>
   </li>`;
   playlist.insertAdjacentHTML('beforeend',liTag); 

   let liVideoDuration = ulTag.querySelector(`#${allVideos[i].id}`)
   let liVideoTag = ulTag.querySelector(`.${allVideos[i].id}`);
   

   liVideoTag.addEventListener("loadeddata", ()=>{
      let videoDuration = liVideoTag.duration;
      let totalHours = Math.floor(videoDuration / 60 / 60);
      let totalMin = Math.floor(videoDuration / 60 % 60);
      let totalSec = Math.floor(videoDuration % 60);
      // if totalSec is less then 10 then add 0 at the beginging
      totalSec < 10 ? totalSec = "0"+ totalSec : totalSec
      totalMin < 10 ? totalMin = "0"+ totalMin : totalMin
      liVideoDuration.innerText = `${totalHours}:${totalMin}:${totalSec}`;
      // adding t duration attribe which we'll use below
      liVideoDuration.setAttribute("t-duration", `${totalHours}:${totalMin}:${totalSec}`);
   })  
}
// let's work on play particular song on click
const allLiTags = playlist.querySelectorAll('li');
function playingNow(){
   for(let j = 0; j<allVideos.length; j++){
      if(allLiTags[j].classList.contains('playing')){
         allLiTags[j].classList.remove("playing")
      }
      if(allLiTags[j].getAttribute('li-index')==musicIndex){
         allLiTags[j].classList.add('playing')
      }
      // adding onclick attribute in all li tags
      allLiTags[j].setAttribute("onclick", "clicked(this)")
   }
}

function clicked(element){
   // getting li index of particular clicked li tag
   let getIndex = element.getAttribute("li-index");
   musicIndex = Number(getIndex);
   loadMusic(musicIndex);
   playMusic();
   playingNow();
}

function playNext() {
   const nextIndex = Math.min(musicIndex + 1, allVideos.length);
   if (nextIndex === musicIndex) return;

   musicIndex = nextIndex;

   loadMusic(nextIndex);
   playMusic();
   playingNow();
}

mainVideo.addEventListener("ended", playNext, false);