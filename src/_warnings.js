import { pet, statesMap } from './_pet';
import { timer } from './_launch';

export let overcare = {
  messages: {
    earlyFood: "Isn't too early for lunch?",
    tooMuchFood: "I'm feed up, please, no more!",

    earlyClean: 'Everything is clean, thanks!!',
    tooMuchClean: "I don't need to be cleaned, thanks!!",

    starvingToSleep: 'I cannot sleep so hungry!!',
    dirtyToSleep: 'I cannot sleep so dirty!!',
    stillSleeping: "I'm still sleeping!",
    happyToSleep: "I'm so happy, I cannot sleep!!",
    earlyToSleep: "Isn't early for sleeping?",
  },
  toggleHideModal(hidden) {
    document.querySelector('.modal').classList.toggle('hidden', hidden);
  },
  showInfoModal(msg) {
    timer.modalTime.countDown = 0;
    document.querySelector('.modal-inner').innerHTML = this.messages[msg];
    this.toggleHideModal(false);
  },
  feedUpCheck() {
    if (pet.currentState !== 'hungry') {
      if (statesMap.idling.nextState === 'hungry') {
        this.showInfoModal('earlyFood');
      } else {
        this.showInfoModal('tooMuchFood');
      }
    } else {
      this.toggleHideModal(true);
    }
  },
  cleanCheck() {
    if (pet.currentState !== 'pooping' && pet.currentState !== 'pooped') {
      if (statesMap.idling.nextState === 'pooping') {
        this.showInfoModal('earlyClean');
      } else {
        this.showInfoModal('tooMuchClean');
      }
    } else {
      this.toggleHideModal(true);
    }
  },
  sleepCheck() {
    let state = pet.currentState;
    switch (state) {
      case 'hungry':
        this.showInfoModal('starvingToSleep');
        break;
      case 'pooped':
      case 'poop-bag':
        this.showInfoModal('dirtyToSleep');
        break;
      case 'sleep':
        this.showInfoModal('stillSleeping');
        break;
      case 'celebrate':
        this.showInfoModal('happyToSleep');
        break;
      default:
        if (timer.getNexTimeToRain() >= 25) {
          this.showInfoModal('earlyToSleep');
        }
        break;
    }
  },
};
