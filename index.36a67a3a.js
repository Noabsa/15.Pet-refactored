let e={messages:{earlyFood:"Isn't too early for lunch?",tooMuchFood:"I'm feed up, please, no more!",earlyClean:"Everything is clean, thanks!!",tooMuchClean:"I don't need to be cleaned, thanks!!",starvingToSleep:"I cannot sleep so hungry!!",dirtyToSleep:"I cannot sleep so dirty!!",stillSleeping:"I'm still sleeping!",happyToSleep:"I'm so happy, I cannot sleep!!",earlyToSleep:"Isn't early for sleeping?"},toggleHideModal(e){document.querySelector(".modal").classList.toggle("hidden",e)},showInfoModal(e){r.modalTime.countDown=0,document.querySelector(".modal-inner").innerHTML=this.messages[e],this.toggleHideModal(!1)},feedUpCheck(){"hungry"!==n.currentState?"hungry"===t.idling.nextState?this.showInfoModal("earlyFood"):this.showInfoModal("tooMuchFood"):this.toggleHideModal(!0)},cleanCheck(){"pooping"!==n.currentState&&"pooped"!==n.currentState?"pooping"===t.idling.nextState?this.showInfoModal("earlyClean"):this.showInfoModal("tooMuchClean"):this.toggleHideModal(!0)},sleepCheck(){switch(n.currentState){case"hungry":this.showInfoModal("starvingToSleep");break;case"pooped":case"poop-bag":this.showInfoModal("dirtyToSleep");break;case"sleep":this.showInfoModal("stillSleeping");break;case"celebrate":this.showInfoModal("happyToSleep");break;default:r.getNexTimeToRain()>=25&&this.showInfoModal("earlyToSleep")}}};Math.round(5*Math.random()+5);const t={started:{nextState:"egg"},egg:{nextState:"idling",nextActionTime:5},idling:{nextState:"hungry",nextActionTime:6},hungry:{nextState:"eating",nextActionTime:9,deadly:!0},eating:{nextState:"celebrate",nextActionTime:3},celebrate:{nextState:"idling",nextActionTime:10},pooping:{nextState:"pooped",nextActionTime:5},pooped:{nextState:"poop-bag",nextActionTime:15,deadly:!0},"poop-bag":{nextState:"celebrate",nextActionTime:3},dead:{nextState:"dead"},sleep:{nextState:"idling",nextActionTime:10,prevState:"hungry"},rain:{nextState:"idling",nextActionTime:10}};let n={currentState:"started",changesAction(){r.waitingTime(t[this.currentState].nextActionTime)},checkStatus(){r.getNexTimeToRain()<0?(r.rainingChances.countDown=0,n.currentState="rain",o.moodPetSwitcher(n.currentState)):r.getNextTimeToSleep()<0&&(r.dayLength.countDown=0,n.currentState="sleep",o.moodPetSwitcher(n.currentState))},hatch(){r.rainingChances.countDown=0,r.dayLength.countDown=0,r.modalTime.countDown=-5,document.querySelector(".modal").classList.toggle("hidden",!0)},isIdling(){document.querySelector(".day").classList.toggle("night",!1),document.querySelector(".foreground-rain").style.display="none","sleep"===t.idling.nextState&&(t.idling.nextState=t.sleep.prevState)},isCelebrating(){document.querySelector(".poop-bag").classList.toggle("hidden",!0)},isCleaning(){document.querySelector(".poop-bag").classList.toggle("hidden",!1)},isDead(){document.querySelector(".modal-inner").innerHTML=e.messages.start,document.querySelector(".modal").classList.toggle("hidden",!1),t.idling.nextState="hungry",n.currentState="started"},isSleeping(){document.querySelector(".day").classList.toggle("night",!0),r.dayLength.countDown=0},isRaining(){document.querySelector(".foreground-rain").style.display="initial"},orderFeed(){e.feedUpCheck(),"hungry"===this.currentState&&(r.timeToChange=0,t.idling.nextState="pooping")},orderClean(){e.cleanCheck(),"pooped"===this.currentState&&(r.timeToChange=0,t.idling.nextState="hungry")},orderSleep(){e.sleepCheck(),"idling"===this.currentState&&r.getNexTimeToRain()<25&&(t.sleep.prevState=t.idling.nextState,r.timeToChange=0,t.idling.nextState="sleep")}};const o={simpleStates:["started","hungry","eating","pooping","pooped"],moodPetSwitcher(e){document.querySelector(".fox").className=`fox fox-${e}`,e=n.currentState,this.simpleStates.includes(e)&&n.changesAction(),"idling"===e?n.isIdling():"celebrate"===e?n.isCelebrating():"poop-bag"===e?n.isCleaning():"sleep"===e?n.isSleeping():"rain"===e?n.isRaining():"egg"===e&&n.hatch(),n.changesAction(),"dead"===e&&n.isDead()}},i=["fish","poop","weather"],a=function(e,t){document.querySelector(`.${i[e]}-icon`).classList.toggle("highlighted",t)};let r={tempo:1e3,rainingChances:{percent:40,countDown:0},dayLength:{time:50,countDown:0},modalTime:{time:5,countDown:-5},clock:0,nextClock:0,timeToChange:0,waitingTime(e){this.timeToChange=this.clock+e},getNexTimeToRain(){return Math.round(2e3/this.rainingChances.percent)+this.rainingChances.countDown},getNextTimeToSleep(){return this.dayLength.time+this.dayLength.countDown},timeToHideModal(){return this.modalTime.time+this.modalTime.countDown}};!function(){let e=0;document.querySelector(".left-btn").addEventListener("click",(function(){a(e,!1),e>0?e--:e=2,a(e,!0)})),document.querySelector(".right-btn").addEventListener("click",(function(){a(e,!1),e<2?e++:e=0,a(e,!0)})),document.querySelector(".middle-btn").addEventListener("click",(function(){!function(e){if("started"===n.currentState||"dead"===n.currentState)return n.currentState="egg",void o.moodPetSwitcher("egg");switch(e){case"fish":n.orderFeed();break;case"poop":n.orderClean();break;case"weather":n.orderSleep()}n.currentState}(i[e])}))}(),requestAnimationFrame((function e(){const i=Date.now();r.nextClock<=i&&(r.clock++,r.nextClock=i+r.tempo,r.rainingChances.countDown--,r.dayLength.countDown--,r.modalTime.countDown--,0===r.timeToHideModal()&&document.querySelector(".modal").classList.toggle("hidden",!0),r.timeToChange===r.clock&&r.timeToChange>0?(t[n.currentState].deadly&&(n.currentState="dead"),n.currentState=t[n.currentState].nextState,o.moodPetSwitcher(n.currentState)):r.timeToChange<=r.clock&&"started"!==n.currentState?(n.currentState=t[n.currentState].nextState,o.moodPetSwitcher(n.currentState)):"idling"===n.currentState&&n.checkStatus()),requestAnimationFrame(e)}));
//# sourceMappingURL=index.36a67a3a.js.map