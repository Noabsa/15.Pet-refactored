//██████╗ ███████╗████████╗       ██╗        ██████╗ ██████╗                ██╗      ██████╗ ██╗   ██╗████████╗████████╗ ██████╗ ███╗   ██╗███████╗
//██╔══██╗██╔════╝╚══██╔══╝       ██║       ██╔════╝██╔═══██╗               ╚██╗     ██╔══██╗██║   ██║╚══██╔══╝╚══██╔══╝██╔═══██╗████╗  ██║██╔════╝
//██████╔╝█████╗     ██║       ████████╗    ██║     ██║   ██║    █████╗█████╗╚██╗    ██████╔╝██║   ██║   ██║      ██║   ██║   ██║██╔██╗ ██║███████╗
//██╔═══╝ ██╔══╝     ██║       ██╔═██╔═╝    ██║     ██║   ██║    ╚════╝╚════╝██╔╝    ██╔══██╗██║   ██║   ██║      ██║   ██║   ██║██║╚██╗██║╚════██║
//██║     ███████╗   ██║       ██████║      ╚██████╗╚██████╔╝               ██╔╝     ██████╔╝╚██████╔╝   ██║      ██║   ╚██████╔╝██║ ╚████║███████║
//╚═╝     ╚══════╝   ╚═╝       ╚═════╝       ╚═════╝ ╚═════╝                ╚═╝      ╚═════╝  ╚═════╝    ╚═╝      ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚══════╝
                                                                                                                                                

import { runUserAction } from './_states.js';

//lighting selected icons through buttons

const icons = ['fish', 'poop', 'weather'];
const iconHighlighted = function iconClassModifier(icon, show) {
  document.querySelector(`.${icons[icon]}-icon`).classList.toggle('highlighted', show);
};

export function initButtons() {
  let selectedIcon = 0;

  function leftButtonClick() {
    iconHighlighted(selectedIcon, false);
    selectedIcon > 0 ? selectedIcon-- : (selectedIcon = 2);
    iconHighlighted(selectedIcon, true);
  }
  function rightButtonClick() {
    iconHighlighted(selectedIcon, false);
    selectedIcon < 2 ? selectedIcon++ : (selectedIcon = 0);
    iconHighlighted(selectedIcon, true);
  }
  function middleButtonClick() {
    runUserAction(icons[selectedIcon]);
  }

  document.querySelector('.left-btn').addEventListener('click', leftButtonClick);
  document.querySelector('.right-btn').addEventListener('click', rightButtonClick);
  document.querySelector('.middle-btn').addEventListener('click', middleButtonClick);
}
