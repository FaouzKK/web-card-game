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
}