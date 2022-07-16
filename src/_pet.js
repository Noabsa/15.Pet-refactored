//██████╗ ███████╗████████╗       ██╗        ██████╗ ██████╗                ██╗      ███████╗████████╗ █████╗ ████████╗███████╗███████╗
//██╔══██╗██╔════╝╚══██╔══╝       ██║       ██╔════╝██╔═══██╗               ╚██╗     ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝
//██████╔╝█████╗     ██║       ████████╗    ██║     ██║   ██║    █████╗█████╗╚██╗    ███████╗   ██║   ███████║   ██║   █████╗  ███████╗
//██╔═══╝ ██╔══╝     ██║       ██╔═██╔═╝    ██║     ██║   ██║    ╚════╝╚════╝██╔╝    ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  ╚════██║
//██║     ███████╗   ██║       ██████║      ╚██████╗╚██████╔╝               ██╔╝     ███████║   ██║   ██║  ██║   ██║   ███████╗███████║
//╚═╝     ╚══════╝   ╚═╝       ╚═════╝       ╚═════╝ ╚═════╝                ╚═╝      ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝

import { timer } from './_launch.js';
import { overcare } from './_warnings.js';
import { gameRunner } from './_states.js';

export let randomTime = Math.round(5 * Math.random() + 5);

export const statesMap = {
  started: { nextState: 'egg' },
  egg: { nextState: 'idling', nextActionTime: 5 },
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
  checkStatus() {
    if (timer.getNexTimeToRain() < 0) {
      timer.rainingChances.countDown = 0;
      pet.currentState = 'rain';
      gameRunner.moodPetSwitcher(pet.currentState);
    } else if (timer.getNextTimeToSleep() < 0) {
      timer.dayLength.countDown = 0;
      pet.currentState = 'sleep';
      gameRunner.moodPetSwitcher(pet.currentState);
    }
  },
  hatch() {
    timer.rainingChances.countDown = 0;
    timer.dayLength.countDown = 0;
    timer.modalTime.countDown = -5;
    document.querySelector('.modal').classList.toggle('hidden', true);
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
    timer.dayLength.countDown = 0;
  },
  isRaining() {
    document.querySelector(`.foreground-rain`).style.display = 'initial';
  },

  //action-buttons functions
  orderFeed() {
    overcare.feedUpCheck();
    if (this.currentState === 'hungry') {
      timer.timeToChange = 0;
      statesMap.idling.nextState = 'pooping';
    }
  },
  orderClean() {
    overcare.cleanCheck();
    if (this.currentState === 'pooped') {
      timer.timeToChange = 0;
      statesMap.idling.nextState = 'hungry';
    }
  },
  orderSleep() {
    overcare.sleepCheck();
    if (this.currentState === 'idling' && timer.getNexTimeToRain() < 25) {
      statesMap.sleep.prevState = statesMap.idling.nextState;
      timer.timeToChange = 0;
      statesMap.idling.nextState = 'sleep';
    }
  },
};
