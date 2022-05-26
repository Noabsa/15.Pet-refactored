import { initButtons } from './_buttons.js';
import { pet } from './_pet.js';
import { gameRunner } from './_states.js';

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
      } else if (timer.timeToChange < timer.clock && pet.currentState !== 'started') {
        gameRunner.moodPetSwitcher(pet.currentState);
      } else {
        console.log('tick', timer.clock, 'at', now, 'and waiting');
      }
    }
    requestAnimationFrame(setTimer);
  }
  requestAnimationFrame(setTimer);
}

initGame();
