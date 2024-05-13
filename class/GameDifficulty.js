export class GameDifficulty {

       
    #difficulty;

        constructor(difficulty) {

           this.#difficulty = difficulty ; 

        }

     get carteLenght() {

          switch(this.#difficulty) {

            case "easy":
                return 20;
                break;
            case "normal":
                return 30;
                break;
            case "hard":
                return 40;
                break;
            default:
          }
     }

     get trylengh () {

          switch(this.#difficulty) {

            case "easy":
                return 20;
                break;
            case "normal":
                return 25;
                break;
            case "hard":
                return 30;
                break;
            default:
          }
     }

     /**
      * Etablis la dispositions des cartes en fonction de la taille de l'ecran
      * @returns {string}
      */

    get setCardLayoutByScreenSize() {

        if (window.screen.width < 600) return 'cards' ;


         if (this.#difficulty == 'normal' ) {

                return 'cards-normal'  ;      

         } else if (this.#difficulty == 'hard') {

                return 'cards-hard'
         } else {

                return 'cards'
         }
     }
}