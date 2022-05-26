import { initButtons } from './_buttons.js';
import { pet } from './_pet.js';
//import { game, gameRunner } from './_states.js';
import { gameRunner } from './_states2.js';

//Set game timer and speed
export let timer = {
  tempo: 1000,
  clock: 0,
  nextClock: 0,
  timeToChange: 0,
  waitingTime(spare) {
    this.timeToChange = this.clock + spare;
  },
};

initButtons();

function initGame() {
  function setTimer() {
    const now = Date.now();
    if (timer.nextClock <= now) {
      timer.clock++;
      timer.nextClock = now + timer.tempo;

      if (timer.timeToChange === timer.clock && timer.timeToChange > 0) {
        if (pet.currentState === 'waitingToEat' || pet.currentState === 'waitToClean') {
          pet.currentState = 'dead';
          timer.timeToChange = 0;
        }
        //function pet.checkNeeds  js aparte
        //pet.checkNeeds();
        /* if (game.currentState === 'hungry' || game.pooped === true) {
          game.currentState = 'dead';
          timer.timeToChange = 0;
          game.pooped = false;
        } else {
          timer.timeToChange = 0;
          game.currentState = game.nextState;
          console.log('done');
          console.log(game.currentState);
        }*/
        //
      } else if (timer.timeToChange < timer.clock && pet.currentState !== 'started') {
        //console.log('tick', timer.clock, 'at', now);
        gameRunner.moodPetSwitcher(pet.currentState);
      } else {
        console.log('tick', timer.clock, 'at', now, 'and waiting');
        //console.log('waiting');
      }
    }
    requestAnimationFrame(setTimer);
  }
  requestAnimationFrame(setTimer);
}

initGame();
