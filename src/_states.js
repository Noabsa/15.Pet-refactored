//██████╗ ███████╗████████╗       ██╗        ██████╗ ██████╗                ██╗      ███████╗██╗    ██╗██╗████████╗ ██████╗██╗  ██╗███████╗██████╗
//██╔══██╗██╔════╝╚══██╔══╝       ██║       ██╔════╝██╔═══██╗               ╚██╗     ██╔════╝██║    ██║██║╚══██╔══╝██╔════╝██║  ██║██╔════╝██╔══██╗
//██████╔╝█████╗     ██║       ████████╗    ██║     ██║   ██║    █████╗█████╗╚██╗    ███████╗██║ █╗ ██║██║   ██║   ██║     ███████║█████╗  ██████╔╝
//██╔═══╝ ██╔══╝     ██║       ██╔═██╔═╝    ██║     ██║   ██║    ╚════╝╚════╝██╔╝    ╚════██║██║███╗██║██║   ██║   ██║     ██╔══██║██╔══╝  ██╔══██╗
//██║     ███████╗   ██║       ██████║      ╚██████╗╚██████╔╝               ██╔╝     ███████║╚███╔███╔╝██║   ██║   ╚██████╗██║  ██║███████╗██║  ██║
//╚═╝     ╚══════╝   ╚═╝       ╚═════╝       ╚═════╝ ╚═════╝                ╚═╝      ╚══════╝ ╚══╝╚══╝ ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝

import { pet, statesMap } from './_pet.js';

export function runUserAction(icon) {
  if (pet.currentState === 'started' || pet.currentState === 'dead') {
    gameRunner.moodPetSwitcher('egg');
    document.querySelector(`.modal`).classList.toggle('hidden', true);
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
  simpleStates: ['started', 'hungry', 'eating', 'pooping', 'pooped'],
  moodPetSwitcher(state) {
    document.querySelector('.fox').className = `fox fox-${state}`;
    state = pet.currentState;

    //states only affected by time
    if (this.simpleStates.includes(state)) {
      pet.changesAction();
    }

    //states where the UI changes
    if (state === 'idling') {
      pet.isIdling();
    } else if (state === 'celebrate') {
      pet.isCelebrating();
    } else if (state === 'poop-bag') {
      pet.isCleaning();
    } else if (state === 'sleep') {
      pet.isSleeping();
    } else if (state === 'rain') {
      pet.isRaining();
    }
    pet.changesAction();

    //dead or infinite states
    if (state === 'dead') {
      pet.isDead();
    }
    pet.currentState = statesMap[pet.currentState].nextState;
  },
};
