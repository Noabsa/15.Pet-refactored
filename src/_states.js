import { timer } from './_launch.js';
import { pet, statesMap } from './_pet.js';

export function runUserAction(icon) {
  if (pet.currentState === 'started' || pet.currentState === 'dead') {
    gameRunner.moodPetSwitcher('egg');
    return;
  }
  switch (icon) {
    case 'fish':
      pet.orderFeed();
      break;
    case 'poop':
      pet.orderClean();
      break;
    case 'weather':
      pet.orderSleep();
      break;
  }
  return pet.currentState;
}

export const gameRunner = {
  moodPetSwitcher(state) {
    document.querySelector('.fox').className = `fox fox-${state}`;
    state = pet.currentState;

    if (state === 'started') {
      pet.started();
    } else if (state === 'idling') {
      pet.isIdling();
    } else if (state === 'hungry') {
      pet.isHungry();
    } else if (state === 'eating') {
      pet.isEating();
    } else if (state === 'celebrate') {
      pet.isCelebrating();
    } else if (state === 'dead') {
      pet.isDead();
    } else if (state === 'pooping') {
      pet.isPooping();
    } else if (state === 'pooped') {
      pet.isPooped();
    } else if (state === 'poop-bag') {
      pet.isCleaning();
    }

    pet.currentState = statesMap[pet.currentState];
    console.log('Next state, ', pet.currentState, 'at clock', timer.timeToChange);
  },
};
