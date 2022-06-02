//██████╗ ███████╗████████╗       ██╗        ██████╗ ██████╗                ██╗      ███████╗████████╗ █████╗ ████████╗███████╗███████╗
//██╔══██╗██╔════╝╚══██╔══╝       ██║       ██╔════╝██╔═══██╗               ╚██╗     ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝
//██████╔╝█████╗     ██║       ████████╗    ██║     ██║   ██║    █████╗█████╗╚██╗    ███████╗   ██║   ███████║   ██║   █████╗  ███████╗
//██╔═══╝ ██╔══╝     ██║       ██╔═██╔═╝    ██║     ██║   ██║    ╚════╝╚════╝██╔╝    ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  ╚════██║
//██║     ███████╗   ██║       ██████║      ╚██████╗╚██████╔╝               ██╔╝     ███████║   ██║   ██║  ██║   ██║   ███████╗███████║
//╚═╝     ╚══════╝   ╚═╝       ╚═════╝       ╚═════╝ ╚═════╝                ╚═╝      ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝

import { timer } from './_launch.js';
import { overcare } from './_warnings.js';

export let randomTime = Math.round(5 * Math.random() + 5);

export const statesMap = {
  started: { nextState: 'idling', nextActionTime: 4 },
  idling: { nextState: 'hungry', nextActionTime: randomTime }, // nextState: hungry or pooping
  hungry: { nextState: 'waiting', nextActionTime: randomTime + 3 },
  waiting: { nextState: 'eating' }, //eating or poop-bag
  eating: { nextState: 'celebrate', nextActionTime: 3 },
  celebrate: { nextState: 'idling', nextActionTime: randomTime },
  pooping: { nextState: 'pooped', nextActionTime: 5 },
  pooped: { nextState: 'waiting', nextActionTime: randomTime + 10 },
  'poop-bag': { nextState: 'celebrate', nextActionTime: 3 },
  dead: { nextState: 'started' },
  sleep: { nextState: 'idling', nextActionTime: randomTime },
  rain: { nextState: 'idling', nextActionTime: randomTime + 10 },
};

export let pet = {
  currentState: 'started',
  //pet and UI states-changes
  changesAction() {
    timer.waitingTime(statesMap[this.currentState].nextActionTime);
  },
  isIdling() {
    document.querySelector(`.day`).classList.toggle('night', false);
    document.querySelector(`.foreground-rain`).style.display = 'none';
  },
  isCelebrating() {
    document.querySelector(`.poop-bag`).classList.toggle('hidden', true);
  },
  isCleaning() {
    document.querySelector(`.poop-bag`).classList.toggle('hidden', false);
  },
  isDead() {
    document.querySelector('.modal-inner').innerHTML = overcare.messages.start;
    document.querySelector(`.modal`).classList.toggle('hidden', false);
    statesMap.idling.nextState = 'hungry';
  },
  isSleeping() {
    document.querySelector(`.day`).classList.toggle('night', true);
  },
  isRaining() {
    document.querySelector(`.foreground-rain`).style.display = 'initial';
  },

  //action-buttons functions
  orderFeed() {
    overcare.feedUpCheck();
    if (this.currentState === 'waiting' && statesMap.waiting.nextState === 'eating') {
      timer.timeToChange = 0;
      pet.currentState = statesMap[pet.currentState].nextState;
      statesMap.idling.nextState = 'pooping';
      statesMap.waiting.nextState = 'poop-bag';
    }
  },
  orderClean() {
    overcare.cleanCheck();
    if (this.currentState === 'waiting' && statesMap.waiting.nextState === 'poop-bag') {
      timer.timeToChange = 0;
      pet.currentState = statesMap[pet.currentState].nextState;
      statesMap.idling.nextState = 'hungry';
      statesMap.waiting.nextState = 'eating';
    }
  },
  orderSleep() {
    overcare.sleepCheck();
    if (this.currentState === statesMap.idling.nextState) {
      timer.timeToChange = 0;
      this.currentState = 'sleep';
    }
  },
};
