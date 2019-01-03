const ball: HTMLElement = document.querySelector('#ball');

const KEY_CODES = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

function run(key: number) {
  const ballStyle = window.getComputedStyle(ball);
  const ballLeftNum = parseInt(ballStyle.left.match(/[0-9]+/)[0], 10);
  const ballTopNum = parseInt(ballStyle.top.match(/[0-9]+/)[0], 10);

  let size = 20;
  let newLeft = ballLeftNum;
  let newTop = ballTopNum;
  switch(key) {
    case KEY_CODES['left']:
      newLeft = ballLeftNum - size;
      break;
    case KEY_CODES['right']:
      newLeft = ballLeftNum + size;
      break;
    case KEY_CODES['up']:
      newTop = ballTopNum - size;
      break;
    case KEY_CODES['down']:
      newTop = ballTopNum + size;
      break;
    default:
      console.log('Bad key: ', key);
      break;
  }
  if (newLeft <= 0) {
    newLeft = 0;
  }
  if (newLeft >= 770) {
    newLeft = 770;
  }
  if (newTop <= 0) {
    newTop = 0;
  }
  if (newTop >= 770) {
    newTop = 770;
  }
  ball.style.left = `${newLeft}px`;
  ball.style.top = `${newTop}px`;
}

window.addEventListener('keydown', (e) => {
  if ([37,38,39,40].includes(e.keyCode)) {
    e.preventDefault();
    run(e.keyCode);
  }
});
