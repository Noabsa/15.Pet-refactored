//██████╗ ███████╗████████╗       ██╗        ██████╗ ██████╗                ██╗      ██╗      █████╗ ██╗   ██╗███╗   ██╗ ██████╗██╗  ██╗███████╗██████╗ 
//██╔══██╗██╔════╝╚══██╔══╝       ██║       ██╔════╝██╔═══██╗               ╚██╗     ██║     ██╔══██╗██║   ██║████╗  ██║██╔════╝██║  ██║██╔════╝██╔══██╗
//██████╔╝█████╗     ██║       ████████╗    ██║     ██║   ██║    █████╗█████╗╚██╗    ██║     ███████║██║   ██║██╔██╗ ██║██║     ███████║█████╗  ██████╔╝
//██╔═══╝ ██╔══╝     ██║       ██╔═██╔═╝    ██║     ██║   ██║    ╚════╝╚════╝██╔╝    ██║     ██╔══██║██║   ██║██║╚██╗██║██║     ██╔══██║██╔══╝  ██╔══██╗
//██║     ███████╗   ██║       ██████║      ╚██████╗╚██████╔╝               ██╔╝     ███████╗██║  ██║╚██████╔╝██║ ╚████║╚██████╗██║  ██║███████╗██║  ██║
//╚═╝     ╚══════╝   ╚═╝       ╚═════╝       ╚═════╝ ╚═════╝                ╚═╝      ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝

import { initButtons } from './_buttons.js';
import { pet, randomTime, statesMap } from './_pet.js';
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
  timeToRain: function () {
    return randomTime * 5;
  },
};

initButtons();

function initGame() {
  let nextTimeToRain = timer.timeToRain();
  function setTimer() {
    const now = Date.now();
    if (timer.nextClock <= now) {
      timer.clock++;
      timer.nextClock = now + timer.tempo;

      //raining clock
      if (nextTimeToRain > 0) {
        nextTimeToRain = nextTimeToRain - 1;
      } else if (nextTimeToRain === 0 && pet.currentState === statesMap.idling.nextState) {
        pet.currentState = 'rain';
        nextTimeToRain = timer.timeToRain();
      } else {
      }

      //pet clock
      if (timer.timeToChange === timer.clock && timer.timeToChange > 0) {
        if (pet.currentState === 'waiting') {
          pet.currentState = 'dead';
        }
        timer.timeToChange = 0;
      } else if (timer.timeToChange < timer.clock && pet.currentState !== 'started') {
        gameRunner.moodPetSwitcher(pet.currentState);
      } else {
      }
    }
    requestAnimationFrame(setTimer);
  }
  requestAnimationFrame(setTimer);
}

initGame();
