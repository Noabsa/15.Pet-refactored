import { timer } from './_launch.js';

let randomTime = Math.round(10 * Math.random());

export const statesMap = {
  started: 'idling',
  idling: 'hungry', //or pooping
  hungry: 'waitingToEat', //waiting
  waitingToEat: 'eating', //eating or poop-bag
  eating: 'celebrate',
  celebrate: 'idling',
  //idling: 'pooping',
  pooping: 'pooped',
  pooped: 'waitToClean', //waiting
  waitToClean: 'poop-bag',
  'poop-bag': 'celebrate',
  dead: 'started',
};

export let pet = {
  currentState: 'started',
  started() {
    console.log('Current state is', this.currentState);
    console.log('The pet is hatching in 4!!');
    timer.waitingTime(4);
  },
  isIdling() {
    console.log('Current state is', this.currentState);
    timer.waitingTime(randomTime);
  },
  isHungry() {
    console.log('Feed me!! before', randomTime + 3);
    timer.waitingTime(randomTime + 3);
  },
  isEating() {
    console.log('Feed and happy!!');
    timer.waitingTime(3);
  },
  isPooping() {
    console.log('Ups!! Nature calling in 5');
    timer.waitingTime(5);
  },
  isPooped() {
    console.log('Clean me!! before', randomTime + 10);
    timer.waitingTime(randomTime + 10);
  },
  isCelebrating() {
    document.querySelector(`.poop-bag`).classList.toggle('hidden', true);
    console.log('Keep calm!! in', randomTime);
    timer.waitingTime(randomTime);
  },
  isCleaning() {
    document.querySelector(`.poop-bag`).classList.toggle('hidden', false);
    console.log("I'm cleaning!!!, Complete in 3!");
    timer.waitingTime(3);
  },
  isDead() {
    console.log('game over!');
    statesMap.idling = 'hungry';
  },
  orderFeed() {
    if (this.currentState === 'waitingToEat') {
      console.log('dinner time!!');
      timer.timeToChange = 0;
      pet.currentState = statesMap[pet.currentState];
      statesMap.idling = 'pooping';
    } else {
      console.log('not hungry enough');
    }
  },
  orderClean() {
    if (this.currentState === 'waitToClean') {
      console.log('cleaning time!!');
      timer.timeToChange = 0;
      pet.currentState = statesMap[pet.currentState];
      statesMap.idling = 'hungry';
    } else {
      console.log('there is no poop');
    }
  },
  orderSleep() {
    console.log('sleeping time');
  },
};
