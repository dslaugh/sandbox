function runAnimation(fn) {
  let lastTime: number = null;
  let count = 0;

  function frame(time: number) {
    // if (count === 100) {
    //   return;
    // }
    // count++;

    if (lastTime !== null) {
      let stepTime = Math.min((time - lastTime), 100) / 1000;
      const result = fn(stepTime);
      if (result === false) {
        return;
      }
    }

    lastTime = time;
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function printTime(time) {
  console.log('stepTime', time);
}

const myBall = document.getElementById('ball');
const ballObj = {
  left: 0,
  top: 0,
};
const speedEl: HTMLElement = document.getElementById('speed');

let speed = 0;
const rate = 10;
const friction = 10;
let dir = 'down';
let count = 0;
let maxHeight = 0;
function moveBall(time) {
  // ballObj.left += time * speed;
  if (dir === 'down') {
    console.log('down');
    ballObj.top += time * speed;
    speed += rate;
  }
  if (dir === 'up') {
    console.log('up');
    ballObj.top -= time * speed;
    speed -= rate + friction;
  }

  speedEl.innerText = `Speed ${speed}. maxHeight: ${maxHeight}`;

  // console.log('moveBall', 'speed', speed);
  // myBall.style.left = `${ballObj.left}px`;
  if (ballObj.top >= 770) {
    // console.log('wha');
    myBall.style.top = '770px';
    ballObj.top = 770;
    dir = 'up';
    if (maxHeight > 766) {
      return false;
    }

    // count++;
    // if (count >= 5) {
    //   console.log('here');
    //   return false;
    // }
    // return false;
  }

  if (speed < 0) {
    maxHeight = ballObj.top;
    dir = 'down';
    speed = 0;
  }

  // if (ballObj.top < 0) {
  //   myBall.style.top = '0px';
  //   ballObj.top = 0;
  //   dir = 'down';
  // }
  myBall.style.top = `${ballObj.top}px`;
  return true;
}

runAnimation(moveBall);