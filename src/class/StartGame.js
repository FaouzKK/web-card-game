 /**
  * Une class Pour gerer efficacement les actions du jeu
  */
 
 export  class StartGame {

    /**
     * Cette variable static va stocker les cartes ouvertes
     */
     static #openCard = [] ;
     static #resolvedCard = [] ;
 
        constructor() {
            
            let highscore = localStorage.getItem("highscore") || 0 ;

            const StartGamePanel = `<p class = "fw-bold">Highscore : <span class = "text-primary">${highscore}</span></p>
            <h3 class="text-warning fw-bold">Regles :</h3>
            <p>Le but du jeu est de trouver toutes les paires de cartes identiques dans une limite de mouvement</p>
            <div class="text-center pt-2">
                <a href = "#" id = "btn-start-game"class="btn btn-success">Commencez le jeu</a>
            </div>`

          const gameContent = document.querySelector("#game-content") ;

            gameContent.innerHTML = StartGamePanel ;

          const startBtn = document.querySelector("#btn-start-game") ;

           startBtn.addEventListener("click" , e => {

               e.preventDefault() ;

               this.#startGame() ;

           }) ;
        }   

        /**
         * Cette fonction  initialise le jeu
         */
     #startGame() {


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

            //Creer un tanleau conteneant des id de 1 a 20 ;

            for (let i = 1; i <= 10; i++) {
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
             * Creaction des <a> containant les card de jeu avec identifiants aleatoire
             */

           let gameInnerHTML = `<p class="h4 py-3">Movement : <span class = "text-danger" id = "move" >20</span></p>\n<p  class="h4 py-3">Score : <span id = "score" class = "text-primary">0</span></p>\n<div id="cards">`

           CardIndex.forEach(i => {

                gameInnerHTML += `<a href="#" id="card-${i}" class="card"><img src="/card/card-i.png" alt="" height="80px"></a>\n`
           }) ;

           gameInnerHTML += `</div>` ;


        const gameContent = document.querySelector("#game-content") ;


        gameContent.innerHTML = gameInnerHTML ;

        //On ajoute un evenement pour l'interaction avec les cartes ;

        const cards = document.querySelectorAll('#cards > a') ;

        //console.log(cards) ;

        cards.forEach(card =>{

              card.addEventListener("click" , e => {

                  e.preventDefault() ;

                  const target = e.currentTarget ;

                   this.#checkCard(target) ;


              })



        })

        
     }


        /**
         * Cette fonction va verifier les cartes
         * @param {HTMLAnchorElement} card 
         * @returns {void}
         */
     
      #checkCard(card) {

      // console.log(card) ;
      

      if (StartGame.#openCard.length >= 2 || StartGame.#openCard.includes(card)) return ; 

         StartGame.#openCard.push(card) ;

       card.firstElementChild.setAttribute("src",`/card/${card.id}.png`) ;
        
       
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
                             

                   if (StartGame.#resolvedCard.length == 10) {

                        let move = document.querySelector("#move") ;
                        let moveInt = parseInt(move.innerText.trim()) ; 
                        
                        sessionStorage.setItem("score",scoreInt + moveInt*10) ;

                        return this.#endGame(1) ;
                        
                   } ;
                   
                   sessionStorage.setItem("score",scoreInt) ;
                }
                else {
                    
                    StartGame.#openCard.forEach(card =>{

                    /**On referme les cartes ouverte */
                    card.firstElementChild.setAttribute("src",`/card/card-i.png`) ; 

                    }) ;
                    let move = document.querySelector("#move") ;
                    let moveInt = parseInt(move.innerText.trim()) ;

                    let rest = moveInt - 1 ;

                    if (rest == 0)  return this.#endGame(0) ;
                   
                            move.innerText = rest ;
         
                     } ;
   

            /**On remitialise le nombre de carte ouverte */
            StartGame.#openCard = [] ;
       })

      }


    /**
     * Declare la Fin de la partie
     * @param {number} state 0 si c'est un gameOver et 1 si c'est un gameWin 
     */
      #endGame(state) {

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
                this.#startGame() ;
                 
           })
        
           const home = document.querySelector("#home") ;
           home.addEventListener("click", e =>{

                e.preventDefault() ;

                new StartGame() ;
           } )

      }

        

 }