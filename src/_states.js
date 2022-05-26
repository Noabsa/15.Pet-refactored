import { timer } from './_launch.js';

export let game = {
  currentState: 'started',
  nextState: '',
  pooped: false,
};

export function runUserAction(icon) {
  if (game.currentState === 'started' || game.currentState === 'dead') {
    gameRunner.moodPetSwitcher('egg');
    return;
  }
  switch (icon) {
    case 'fish':
      if (game.currentState === 'hungry') {
        game.currentState = 'eating';
        game.pooped = undefined;
        console.log('dinner time!!');
        timer.timeToChange = 0;
      } else {
        console.log('not hungry enough');
      }
      break;
    case 'poop':
      if (game.pooped === false) {
        console.log('there is no poop');
      } else {
        game.currentState = 'poop-bag';
        game.pooped = false;
        console.log('cleaning time!!');
        timer.timeToChange = 0;
      }
      break;
    case 'weather':
      console.log('my umbrella!!');
      break;
  }
  return game.currentState;
}

export const gameRunner = {
  moodPetSwitcher(state) {
    document.querySelector('.fox').className = `fox fox-${state}`;

    let randomTime = Math.round(10 * Math.random());

    if (game.currentState === 'started') {
      game.nextState = 'idling';
      console.log('The pet is hatching!!, state', game.currentState, game.nextState);
      timer.waitingTime(4);
    } else if (game.currentState === 'idling') {
      if (game.pooped === undefined) {
        game.nextState = 'pooping';
        console.log('I will poop in', randomTime);
        game.pooped = false;
        timer.waitingTime(randomTime);
      } else {
        game.nextState = 'hungry';
        console.log("I'm doing nothing!, will be hungry in", randomTime);
        timer.waitingTime(randomTime);
      }
    } else if (game.currentState === 'hungry') {
      console.log('Feed me!! before', randomTime + 3);
      timer.waitingTime(randomTime + 3);
    } else if (game.currentState === 'eating') {
      game.nextState = 'celebrate';
      console.log('Feed and happy!!');
      timer.waitingTime(3);
    } else if (game.currentState === 'celebrate') {
      document.querySelector(`.poop-bag`).classList.toggle('hidden', true);
      game.nextState = 'idling';
      console.log('Keep calm!! in', randomTime);
      timer.waitingTime(randomTime);
    } else if (game.currentState === 'dead') {
      game.currentState = 'started';
      console.log('game over!');
    } else if (game.currentState === 'pooping') {
      game.nextState = '';
      game.pooped = true;
      console.log('Clean!! before', randomTime + 10);
      timer.waitingTime(randomTime + 10);
    } else if (game.currentState === 'poop-bag') {
      document.querySelector(`.poop-bag`).classList.toggle('hidden', false);
      game.nextState = 'celebrate';
      console.log("I'm clean!!!");
      timer.waitingTime(3);
    }
  },
};
