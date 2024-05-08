import { StartGame } from "./class/StartGame.js"

addEventListener("DOMContentLoaded", e => {

      new StartGame() ;
      const mainSoundtrack = new Audio("./soundtrack/mainmusic.mp3") ;

      mainSoundtrack.play() ;

      mainSoundtrack.addEventListener("ended", () => {
            mainSoundtrack.currentTime = 0 ;
            mainSoundtrack.play() ;
      })
})