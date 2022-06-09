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
  started: { nextState: 'egg', nextActionTime: 5 },
  egg: { nextState: 'idling', nextActionTime: 1 },
  idling: { nextState: 'hungry', nextActionTime: 6 }, // nextState: hungry or pooping or sleep
  hungry: { nextState: 'eating', nextActionTime: 3 * 3, deadly: true },
  eating: { nextState: 'celebrate', nextActionTime: 3 },
  celebrate: { nextState: 'idling', nextActionTime: 5 * 2 },
  pooping: { nextState: 'pooped', nextActionTime: 5 },
  pooped: { nextState: 'poop-bag', nextActionTime: 15, deadly: true },
  'poop-bag': { nextState: 'celebrate', nextActionTime: 3 },
  dead: { nextState: 'dead' },
  sleep: { nextState: 'idling', nextActionTime: 10, prevState: 'hungry' },
  rain: { nextState: 'idling', nextActionTime: 10 },
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
    if (statesMap.idling.nextState === 'sleep') {
      statesMap.idling.nextState = statesMap.sleep.prevState;
    }
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
    pet.currentState = 'started';
  },
  isSleeping() {
    document.querySelector(`.day`).classList.toggle('night', true);
    timer.nextTimeToSleep = timer.dayLength;
  },
  isRaining() {
    document.querySelector(`.foreground-rain`).style.display = 'initial';
  },

  //action-buttons functions
  orderFeed() {
    //overcare.feedUpCheck();
    //overcare.showModal('sleep', false);
    overcare.feedUpCheck();
    if (this.currentState === 'hungry') {
      timer.timeToChange = 0;
      statesMap.idling.nextState = 'pooping';
    }
  },
  orderClean() {
    //overcare.cleanCheck();
    if (this.currentState === 'pooped') {
      timer.timeToChange = 0;
      statesMap.idling.nextState = 'hungry';
    }
  },
  orderSleep() {
    //overcare.sleepCheck();
    if (this.currentState === 'idling') {
      statesMap.sleep.prevState = statesMap.idling.nextState;
      timer.timeToChange = 0;
      statesMap.idling.nextState = 'sleep';
    }
  },
};
