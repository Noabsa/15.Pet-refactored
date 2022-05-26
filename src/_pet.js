let randomTime = Math.round(10 * Math.random());

import { timer } from './_launch.js';
export const statesMap = {
  /*started: function isStarted() {
    //this.currentState = statesMap[this.currentState];
    console.log('The pet is hatching!!, state');
    timer.waitingTime(4);
    return 'idling'; 
  },*/
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

  feedCkeck: false,
};
export let pet = {
  currentState: 'started',
  //nextState: '',
  //needs: false,
  started() {
    console.log('Current state is', this.currentState);
    console.log('The pet is hatching in 4!!');
    timer.waitingTime(4);
    //this.currentState = statesMap[this.currentState];
  },
  isIdling() {
    console.log('Current state is', this.currentState);
    timer.waitingTime(randomTime);
    /*if (this.nextState === 'hungry') {
      console.log("I'm doing nothing!, will be hungry in", randomTime);
      timer.waitingTime(randomTime);
    } else {
      this.nextState = 'pooping';
      console.log('I will poop in', randomTime);
      timer.waitingTime(randomTime);
    }*/
  },
  isHungry() {
    console.log('Feed me!! before', randomTime + 3);
    timer.waitingTime(randomTime + 3);
  },
  isEating() {
    //this.nextState = 'celebrate';
    //pet.needs = true;
    console.log('Feed and happy!!');
    timer.waitingTime(3);
  },
  isPooping() {
    //this.nextState = '';
    console.log('Ups!! Nature calling in 5');
    timer.waitingTime(5);
  },
  isPooped() {
    //this.nextState = '';
    console.log('Clean me!! before', randomTime + 10);
    timer.waitingTime(randomTime + 10);
  },
  isCelebrating() {
    document.querySelector(`.poop-bag`).classList.toggle('hidden', true);
    //this.nextState = 'idling';
    console.log('Keep calm!! in', randomTime);
    timer.waitingTime(randomTime);
  },
  isCleaning() {
    document.querySelector(`.poop-bag`).classList.toggle('hidden', false);
    //this.nextState = 'celebrate';
    console.log("I'm cleaning!!!, Complete in 3!");
    timer.waitingTime(3);
  },
  isDead() {
    //this.currentState = 'started';
    console.log('game over!');
  },
  orderFeed() {
    if (this.currentState === 'waitingToEat') {
      //this.currentState = 'eating';
      console.log('dinner time!!');
      timer.timeToChange = 0;
      pet.currentState = statesMap[pet.currentState];
      statesMap.idling = 'pooping';
    } else {
      console.log('not hungry enough');
      //this.currentState = 'hungry';
    }
  },
  orderClean() {
    if (this.currentState === 'waitToClean') {
      //this.currentState = 'poop-bag';
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
  /*checkNeeds() {
    if (this.currentState === 'hungry' || this.currentState === 'pooping') {
      this.currentState = 'dead';
      timer.timeToChange = 0;
      this.needs = false;
    } else {
      timer.timeToChange = 0;
      //this.currentState = this.nextState;
      console.log('done');
      console.log(this.currentState, this.nextState);
    }
  },*/
};
