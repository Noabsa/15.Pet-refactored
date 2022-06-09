//██████╗ ███████╗████████╗       ██╗        ██████╗ ██████╗                ██╗      ██╗      █████╗ ██╗   ██╗███╗   ██╗ ██████╗██╗  ██╗███████╗██████╗
//██╔══██╗██╔════╝╚══██╔══╝       ██║       ██╔════╝██╔═══██╗               ╚██╗     ██║     ██╔══██╗██║   ██║████╗  ██║██╔════╝██║  ██║██╔════╝██╔══██╗
//██████╔╝█████╗     ██║       ████████╗    ██║     ██║   ██║    █████╗█████╗╚██╗    ██║     ███████║██║   ██║██╔██╗ ██║██║     ███████║█████╗  ██████╔╝
//██╔═══╝ ██╔══╝     ██║       ██╔═██╔═╝    ██║     ██║   ██║    ╚════╝╚════╝██╔╝    ██║     ██╔══██║██║   ██║██║╚██╗██║██║     ██╔══██║██╔══╝  ██╔══██╗
//██║     ███████╗   ██║       ██████║      ╚██████╗╚██████╔╝               ██╔╝     ███████╗██║  ██║╚██████╔╝██║ ╚████║╚██████╗██║  ██║███████╗██║  ██║
//╚═╝     ╚══════╝   ╚═╝       ╚═════╝       ╚═════╝ ╚═════╝                ╚═╝      ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝

//import { overcare } from './_warnings.js';
import { initButtons } from './_buttons.js';
import { pet, randomTime, statesMap } from './_pet.js';
import { gameRunner } from './_states.js';

//Set game timer and speed
export let timer = {
  //custom settings
  tempo: 1000, //ms
  rainingChances: 150, //percent
  dayLength: 50, //secons
  modalTime: 5000, //ms

  //DO NOT TOUCH
  clock: 0,
  nextClock: 0,
  timeToChange: 0,
  waitingTime(spare) {
    this.timeToChange = this.clock + spare;
  },
  timeToRain: function () {
    let value = (20 * 100) / this.rainingChances;
    return Math.round(value);
  },
  nextTimeToSleep: 0,
  nextTimeToRain: 0,
};

initButtons();

function initGame() {
  timer.nextTimeToSleep = timer.dayLength;
  timer.nextTimeToRain = timer.timeToRain();

  function setTimer() {
    const now = Date.now();
    if (timer.nextClock <= now) {
      timer.clock++;
      timer.nextClock = now + timer.tempo;

      //sleeping clock
      if (pet.currentState === 'idling' && timer.nextTimeToSleep <= timer.clock) {
        pet.currentState = 'sleep';
        gameRunner.moodPetSwitcher(pet.currentState);
        timer.nextTimeToSleep = timer.dayLength + timer.clock + statesMap.sleep.nextActionTime;
      }

      //raining clock
      if (pet.currentState === 'idling' && timer.nextTimeToRain <= timer.clock) {
        pet.currentState = 'rain';
        gameRunner.moodPetSwitcher(pet.currentState);
        timer.nextTimeToRain = timer.timeToRain() + timer.clock + statesMap.rain.nextActionTime;
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
      } else {
        console.log(timer.clock, timer.nextTimeToRain);
      }
    }
    requestAnimationFrame(setTimer);
  }
  requestAnimationFrame(setTimer);
}

initGame();
