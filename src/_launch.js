//██████╗ ███████╗████████╗       ██╗        ██████╗ ██████╗                ██╗      ██╗      █████╗ ██╗   ██╗███╗   ██╗ ██████╗██╗  ██╗███████╗██████╗
//██╔══██╗██╔════╝╚══██╔══╝       ██║       ██╔════╝██╔═══██╗               ╚██╗     ██║     ██╔══██╗██║   ██║████╗  ██║██╔════╝██║  ██║██╔════╝██╔══██╗
//██████╔╝█████╗     ██║       ████████╗    ██║     ██║   ██║    █████╗█████╗╚██╗    ██║     ███████║██║   ██║██╔██╗ ██║██║     ███████║█████╗  ██████╔╝
//██╔═══╝ ██╔══╝     ██║       ██╔═██╔═╝    ██║     ██║   ██║    ╚════╝╚════╝██╔╝    ██║     ██╔══██║██║   ██║██║╚██╗██║██║     ██╔══██║██╔══╝  ██╔══██╗
//██║     ███████╗   ██║       ██████║      ╚██████╗╚██████╔╝               ██╔╝     ███████╗██║  ██║╚██████╔╝██║ ╚████║╚██████╗██║  ██║███████╗██║  ██║
//╚═╝     ╚══════╝   ╚═╝       ╚═════╝       ╚═════╝ ╚═════╝                ╚═╝      ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝

import { initButtons } from './_buttons.js';
import { pet, statesMap } from './_pet.js';
import { gameRunner } from './_states.js';

//Set game timers and speed
export let timer = {
  //custom settings
  tempo: 1000, //ms
  rainingChances: { percent: 40, countDown: 0 },
  dayLength: { time: 50, countDown: 0 },
  modalTime: { time: 5, countDown: -5 },

  //DO NOT TOUCH

  clock: 0,
  nextClock: 0,
  timeToChange: 0,
  waitingTime(spare) {
    this.timeToChange = this.clock + spare;
  },
  getNexTimeToRain() {
    let nextTimeToRain = Math.round((20 * 100) / this.rainingChances.percent) + this.rainingChances.countDown;
    return nextTimeToRain;
  },
  getNextTimeToSleep() {
    return this.dayLength.time + this.dayLength.countDown;
  },
  timeToHideModal() {
    return this.modalTime.time + this.modalTime.countDown;
  },
};

initButtons();
function initGame() {
  function setTimer() {
    const now = Date.now();
    if (timer.nextClock <= now) {
      timer.clock++;
      timer.nextClock = now + timer.tempo;

      timer.rainingChances.countDown--;
      timer.dayLength.countDown--;
      timer.modalTime.countDown--;

      //modal clock
      if (timer.timeToHideModal() === 0) {
        document.querySelector('.modal').classList.toggle('hidden', true);
      }

      //general clock
      if (timer.timeToChange === timer.clock && timer.timeToChange > 0) {
        if (statesMap[pet.currentState].deadly) {
          pet.currentState = 'dead';
        }
        pet.currentState = statesMap[pet.currentState].nextState;
        gameRunner.moodPetSwitcher(pet.currentState);
      } else if (timer.timeToChange <= timer.clock && pet.currentState !== 'started') {
        pet.currentState = statesMap[pet.currentState].nextState;
        gameRunner.moodPetSwitcher(pet.currentState);
      } else if (pet.currentState === 'idling') {
        pet.checkStatus();
      } else {
      }
    }
    requestAnimationFrame(setTimer);
  }
  requestAnimationFrame(setTimer);
}

initGame();
