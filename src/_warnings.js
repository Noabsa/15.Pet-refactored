import { pet, statesMap } from './_pet';
import { timer } from './_launch';

export let overcare = {
  messages: {
    start: 'Press the middle button to star',
    earlyFood: "Isn't too early for lunch?",
    tooMuchFood: "I'm feed up, please, no more!",
    earlyClean: 'Everything is clean, thanks!!',
    tooMuchClean: "I don't need to be cleaned, thanks!!",
    noSleep: "Mhhh... I don't feel like just now...",
    hungry: 'I cannot sleep so hungry!!',
    dirty: 'I cannot sleep so dirty!!',
    idling: "I'm...",
    sleep: "I'm still sleeping!",
  },
  showModal(msg, hidden = false) {
    document.querySelector('.modal-inner').innerHTML = this.messages[msg];
    document.querySelector('.modal').classList.toggle('hidden', hidden);
    setTimeout(() => {
      this.showModal('', true);
    }, timer.modalTime);
  },
  feedUpCheck() {
    if (statesMap.idling.nextState === 'hungry') {
      this.showModal('earlyFood');
    } else {
      this.showModal('tooMuchFood');
    }
  },
};

/* standardCheck(earlyArray, earlyMsg, tooMuchArray, tooMuchMsg) {
    let nextState = statesMap[pet.currentState].nextState;
    let currentState = pet.currentState;

    if (tooMuchArray.includes(nextState) || tooMuchArray.includes(currentState)) {
      this.modalAdviser(tooMuchMsg, false);
    } else if (earlyArray.includes(nextState)) {
      this.modalAdviser(earlyMsg, false);
    } else if (earlyArray.includes(currentState)) {
      this.modalAdviser('', true);
    } else {
      this.modalAdviser(tooMuchMsg, false);
    }
    console.log('currently', currentState.toUpperCase(), 'next', nextState.toUpperCase());
  },
  feedUpCheck() {
    earlyArray = ['waiting', 'hungry'];
    tooMuchArray = ['pooped', 'poop-bag'];
    this.standardCheck(earlyArray, 'earlyFood', tooMuchArray, 'tooMuchFood');
  },
  cleanCheck() {
    earlyArray = ['waiting', 'pooping', 'pooped'];
    tooMuchArray = ['hungry', 'eating'];
    this.standardCheck(earlyArray, 'earlyClean', tooMuchArray, 'tooMuchClean');
  },
  sleepCheck() {
    let animation = document.querySelector(`.fox`).className.substring(8);
    function customSleepMsg(state) {
      const customStates = {
        noSleepingStates: 'egg rain celebrate pooping eating',
        dirtyStates: 'pooped poop-bag',
        hungryStates: 'hungry',
        sleepStates: 'sleep',
      };
      if (customStates.noSleepingStates.includes(animation)) {
        state = 'noSleep';
      } else if (customStates.dirtyStates.includes(animation)) {
        state = 'dirty';
      } else if (customStates.hungryStates.includes(animation)) {
        state = 'hungry';
      } else if (customStates.sleepStates.includes(animation)) {
        state = 'sleep';
      }
      return state;
    }
    if (animation === 'idling' || animation === undefined) {
      overcare.modalAdviser('', true);
    } else {
      overcare.modalAdviser(customSleepMsg(), false);
    }
  },
};*/
