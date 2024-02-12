document.querySelector('.js-start-stop-button').addEventListener('click', () => {
  startStopWatch();
})
document.querySelector('.js-reset-button').addEventListener('click', () => {
  resetStopwatch();
});

const time = JSON.parse(localStorage.getItem('time')) || {
  hourLeft: 0,
  hourRight: 0,
  minuteLeft: 0,
  minuteRight: 0,
  secondLeft: 0,
  secondRight: 0
};
let isWorkStopwatch = false;
let intervalId;
let timeText = localStorage.getItem('timeText') || '00:00,00'; 

document.querySelector('.time_stopwatch').innerHTML = timeText;

function startStopWatch(){
  const startStopButtonElement = document.querySelector('.js-start-stop-button');

  if(!isWorkStopwatch){

    startStopButtonElement.innerHTML = 'Stop';
    startStopButtonElement.classList.add('stop-button');
    startStopButtonElement.classList.remove('start-button');

    isWorkStopwatch = true;
    intervalId = setInterval(() => {

      time.secondRight++;
      if(time.secondRight % 10 === 0){
        time.secondLeft++;
        time.secondRight %= 10;
      }
      if(time.secondLeft === 10){
        time.minuteRight++;
        time.secondLeft %= 10;
      }
      if(time.minuteRight % 10 === 0 && time.minuteRight != 0){
        time.minuteLeft++;
        time.minuteRight %= 10;
      }
      if(time.minuteLeft === 6){
        time.hourRight++;
        time.minuteLeft %= 6;
      }
      if(time.hourRight % 10 === 0 && time.hourRight != 0){
        time.hourLeft++;
        time.hourRight %= 10;
      }
      
      timeText = `${time.hourLeft}${time.hourRight}:${time.minuteLeft}${time.minuteRight},${time.secondLeft}${time.secondRight}`;
      saveTimeText();
      saveTime();
      document.querySelector('.time_stopwatch').innerHTML = timeText;
    }, 10);
  }
  else{
    isWorkStopwatch = false;
    clearInterval(intervalId);
    startStopButtonElement.innerHTML = 'Start';
    startStopButtonElement.classList.remove('stop-button');
    startStopButtonElement.classList.add('start-button');
  }
}

function resetStopwatch(){
  
  time.hourLeft = 0;
  time.hourRight = 0;
  time.minuteLeft = 0;
  time.minuteRight = 0;
  time.secondLeft = 0;
  time.secondRight = 0;
  saveTime();
  
  timeText = `${time.hourLeft}${time.hourRight}:${time.minuteLeft}${time.minuteRight},${time.secondLeft}${time.secondRight}`;
  saveTimeText();
  document.querySelector('.time_stopwatch').innerHTML = timeText;
  
}

function saveTime(){
  localStorage.setItem('time', JSON.stringify(time));
}
function saveTimeText(){
  localStorage.setItem('timeText', timeText);
}