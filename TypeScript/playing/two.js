function runAnimation(fn) {
    var lastTime = null;
    var count = 0;
    function frame(time) {
        // if (count === 100) {
        //   return;
        // }
        // count++;
        if (lastTime !== null) {
            var stepTime = Math.min((time - lastTime), 100) / 1000;
            var result = fn(stepTime);
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
var myBall = document.getElementById('ball');
var ballObj = {
    left: 0,
    top: 0
};
var speedEl = document.getElementById('speed');
var speed = 0;
var rate = 10;
var friction = 10;
var dir = 'down';
var count = 0;
var maxHeight = 0;
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
    speedEl.innerText = "Speed " + speed + ". maxHeight: " + maxHeight;
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
    myBall.style.top = ballObj.top + "px";
    return true;
}
runAnimation(moveBall);
