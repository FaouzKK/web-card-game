 /**
  * Une class Pour gerer efficacement les actions du jeu
  */
 import { GameDifficulty } from "./GameDifficulty.js";
 export  class StartGame {

    /**
     * Stockage des cartes ouverte
     */
     static #openCard = [] ;

     /**
      * Contient les cartes resolu
      */
     static #resolvedCard = [] ;

     /**
      * Definie le mode d'audition ;
      */
     static #audio = {music : false , sound : true} ;
 
        constructor() {
            
            let highscore = localStorage.getItem("highscore") || 0 ;

            const StartGamePanel = `<p class = "fw-bold">Highscore : <span class = "text-primary">${highscore}</span></p>
            <h3 class="text-warning fw-bold">Regles :</h3>
            <p>Le but du jeu est de trouver toutes les paires de cartes identiques dans une limite de mouvement</p>
            <div class="d-flex align-items-center justify-content-between p-4 flex-lg-row  flex-sm-column flex-xs-column">
                  <div>
                        <label for="difficulty" class="form-label fw-bold text-danger">Choisir un mode de jeu</label>

                        <div class="form-check">
                            <input type="radio" name="difficulty" id="difficulty-easy" class = "form-check-input" value="easy" checked>
                            <label for="difficulty-easy" class="form-check-label" >Facile</label>
                      </div>
                      <div class="form-check">
                          <input type="radio" name="difficulty" id="difficulty-medium" class = "form-check-input" value="normal">
                          <label for="difficulty-medium" class="form-check-label">Normal</label>
                      </div>

                      <div class="form-check">
                        <input type="radio" name="difficulty" id="difficulty-hard" class = "form-check-input" value="hard">
                        <label for="difficulty-hard" class="form-check-label">Difficile</label>
                     </div>    
                   </div>
                   <div id="music-btn" class="d-flex justify-content-evenly align-items-center" style="gap : 50px">
                            <a href="#"><i class="bi bi-volume-mute-fill h1" id = "muted"></i></a>
                   </div>
            </div>
            <div class="text-center pt-2">
                <a href = "#" id = "btn-start-game" class="btn btn-success">Commencez le jeu</a>
            </div>`

          const gameContent = document.querySelector("#game-content") ;

            gameContent.innerHTML = StartGamePanel ;

          const startBtn = document.querySelector("#btn-start-game") ;

           startBtn.addEventListener("click" , e => {

               e.preventDefault() ;

               const difficulty = document.querySelector('input[name="difficulty"]:checked').value ;

               const gameDifficulty = new GameDifficulty(difficulty) ;

               this.#startGame(gameDifficulty) ;

           }) ;

           const musicBtn = document.querySelector("#music-btn > a") ;

           const audio = new Audio("soundtrack/mainmusic.mp3") ;
             
             musicBtn.addEventListener("click" , e => {

                  e.preventDefault() ;
               
                  this.#musicGestion(audio) ;
             })
            
        }   

        /**
         * Cette fonction  initialise le jeu
         * @param {GameDifficulty} gameDifficulty 
         */
     #startGame(gameDifficulty) {


           const CardIndex = [] ;
           StartGame.#resolvedCard = [] ;
           StartGame.#openCard = [] ;
           
          sessionStorage.setItem("score",0) ;

/************************************************************* */
            //Malheureusement cette approche faisait beuger mon pc lol
            // while(CardIndex.length < 20) {

            //     let number = Math.floor(Math.random() * 8) + 1 ;
            //     let numberCount = 0 ;

            //        for(let i = 0 ; i < CardIndex.length ; i++) {

            //             if (CardIndex[i] == number) {

            //                   numberCount++ ;
            //             }
            //        }

            //     if (numberCount < 2) {

            //          CardIndex.push(number) ;
            //     }
            // }
/*********************************************************** */

            //Creer un tableau conteneant des id de 1 a 20 ;

            for (let i = 1; i <= gameDifficulty.carteLenght / 2 ; i++) {
                CardIndex.push(i);
                CardIndex.push(i);
            }
            
            // Mélanger le tableau
            for (let i = CardIndex.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [CardIndex[i], CardIndex[j]] = [CardIndex[j], CardIndex[i]];
            }
       
            console.log(CardIndex) ;

            /***
             * Creaction des <a> contenant les card de jeu avec identifiants aleatoire
             */

           let gameInnerHTML = `<p class="h4 py-3">Movement : <span class = "text-danger" id = "move" >${gameDifficulty.trylengh}</span></p>\n<p  class="h4 py-3">Score : <span id = "score" class = "text-primary">0</span></p>\n<div id="${gameDifficulty.setCardLayoutByScreenSize}">`

           CardIndex.forEach(i => {

                gameInnerHTML += `<a href="#" id="card-${i}" class="card">
                  <img class="back" src="./card/card-i.png" alt="">
                  <img class="face" src="./card/card-${i}.png" alt="">
                </a>
                `;
           }) ;

           gameInnerHTML += `</div>` ;


        const gameContent = document.querySelector("#game-content") ;


        gameContent.innerHTML = gameInnerHTML ;

        //On ajoute un evenement pour l'interaction avec les cartes ;
        //gameDifficulty.setCardLayoutByScreenSize() ;
        
        const cards = document.querySelectorAll('#cards > a') ;

        //console.log(cards) ;

        cards.forEach(card =>{

              card.addEventListener("click" , e => {

                  e.preventDefault() ;

                  const target = e.currentTarget ;

                   this.#checkCard(target,gameDifficulty) ;


              })



        })

        
     }


        /**
         * Cette fonction va verifier les cartes
         * @param {HTMLAnchorElement} card 
         * @param {gameDifficulty} gameDifficulty 
         * @returns {void}
         */
     
      #checkCard(card , gameDifficulty) {

      // console.log(card) ;
      

      if (StartGame.#openCard.length >= 2 || StartGame.#openCard.includes(card)) return ; 

         StartGame.#openCard.push(card) ;

       card.classList.add('face_up') ;
       const swipe = new Audio("./soundtrack/turne.mp3") ;
       swipe.play() ;
       
       
        if(StartGame.#openCard.length < 2) return ;

       new Promise( (resolve,reject) => {

                 setTimeout(()=>{

                       resolve() ;
                 },1000)
       }).then(()=> {

        let [card1 , card2] = StartGame.#openCard ;

            if (card1.id == card2.id) {
                StartGame.#resolvedCard.push(card1.id) ;
                 let score = document.querySelector("#score") ;
                 let  scoreInt = parseInt(score.innerText.trim()) ;
                 scoreInt = scoreInt + 20 ;
                 score.innerText = scoreInt ;
                             

                   if (StartGame.#resolvedCard.length == gameDifficulty.trylengh / 2) {

                        let move = document.querySelector("#move") ;
                        let moveInt = parseInt(move.innerText.trim()) ; 
                        
                        sessionStorage.setItem("score",scoreInt + moveInt*10) ;

                        return this.#endGame(1,gameDifficulty) ;
                        
                   } ;
                   
                   sessionStorage.setItem("score",scoreInt) ;
                }
                else {
                    
                    StartGame.#openCard.forEach(card =>{

                    /**On referme les cartes ouverte */
                    card.classList.remove('face_up') ;

                    }) ;
                    let move = document.querySelector("#move") ;
                    let moveInt = parseInt(move.innerText.trim()) ;

                    let rest = moveInt - 1 ;

                    if (rest == 0)  return this.#endGame(0,gameDifficulty) ;
                   
                            move.innerText = rest ;
         
                     } ;
   

            /**On remitialise le nombre de carte ouverte */
            StartGame.#openCard = [] ;
       })

      }


    /**
     * Declare la Fin de la partie
     * @param {number} state 0 si c'est un gameOver et 1 si c'est un gameWin
     * @param {gameDifficulty} difficulty  
     */
      #endGame(state,difficulty) {

            //console.log('Fin normal du jeu') ;

            let text = state == 0? 'Fin de la partie!!' : "Felicitation!!" ;

            const gameContent = document.querySelector("#game-content") ;

            let score = parseInt(sessionStorage.getItem("score")) ;
            let HighScore = parseInt(localStorage.getItem("highscore")) || 0 ;

             let finalScore = HighScore > score ? HighScore : score ;

              localStorage.setItem("highscore",finalScore) ;

            gameContent.innerHTML = `<p class = "text-center fw-bold">${text}</p>
            <p>Votre score etait de <span class="text-success fw-bold text-center">${score}</span></p>
            <div class="py-2 d-flex justify-content-evenly align-items-center">
                  <a id = "restart" href="" class="btn btn-success"><i class="bi bi-arrow-clockwise"></i>Rejouer</a>
                  <a id = "home" href="" class="btn btn-danger"><i class="bi bi-house-fill"></i>Menu</a>
            </div>`

          const restart = document.querySelector('#restart') ;
           restart.addEventListener("click", e => {

                e.preventDefault() ;
                this.#startGame(difficulty) ;
                 
           })
        
           const home = document.querySelector("#home") ;
           home.addEventListener("click", e =>{

                e.preventDefault() ;

                new StartGame() ;
           } )

      }

      /**
       * Gestion de la musique
       * @param {audio} audio 
       * 
       */
      #musicGestion(audio) {

          const id = document.querySelector("#music-btn > a > i") ;

           switch(id.getAttribute("class")) {

              case "bi bi-volume-mute-fill h1" :

                  id.setAttribute("class","bi bi-volume-up-fill h1") ;
                  
                  audio.play() ;

                  audio.addEventListener("ended", () => {
                    
                    audio.play() ;
                  })
                
                  break ;
              
              case "bi bi-volume-up-fill h1" :

                  id.setAttribute("class","bi bi-volume-mute-fill h1") ;

                  audio.pause() ;
                  break ;
           }

      }
        

 }