import { timer } from './_launch.js';

let randomTime = Math.round(5 * Math.random() + 5);

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
  sleep: 'idling',
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
    document.querySelector(`.day`).classList.toggle('night', false);
    timer.waitingTime(randomTime);
  },
  isHungry() {
    console.log('Feed me!! before', randomTime + 3, 'Current state is', this.currentState);
    timer.waitingTime(randomTime + 3);
  },
  isEating() {
    console.log('Feed and happy!!', 'Current state is', this.currentState);
    timer.waitingTime(3);
  },
  isPooping() {
    console.log('Ups!! Nature calling in 5', 'Current state is', this.currentState);
    timer.waitingTime(5);
  },
  isPooped() {
    console.log('Clean me!! before', randomTime + 10, 'Current state is', this.currentState);
    timer.waitingTime(randomTime + 10);
  },
  isCelebrating() {
    document.querySelector(`.poop-bag`).classList.toggle('hidden', true);
    console.log('Keep calm!! in', randomTime, 'Current state is', this.currentState);
    timer.waitingTime(randomTime);
  },
  isCleaning() {
    document.querySelector(`.poop-bag`).classList.toggle('hidden', false);
    console.log("I'm cleaning!!!, Complete in 3!", 'Current state is', this.currentState);
    timer.waitingTime(3);
  },
  isDead() {
    console.log('game over!', 'Current state is', this.currentState);
    document.querySelector(`.modal-inner`).classList.toggle('hidden');
    statesMap.idling = 'hungry';
  },
  isSleeping() {
    console.log('sleeeeeeping!');
    timer.waitingTime(randomTime);
    document.querySelector(`.day`).classList.toggle('night', true);
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
    if (this.currentState === statesMap.idling) {
      timer.timeToChange = 0;
      this.currentState = 'sleep';
      console.log('sleeping time');
    } else {
      console.log('I cant sleep now!!');
    }
  },
};
