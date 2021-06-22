var neon = document.querySelector('.title-muhlbo');

function setProperty(duration) {
  neon.style.setProperty('--animation-time', duration +'s');
}

function changeAnimationTime() {
  var animationDuration = Math.random();
  setProperty(animationDuration);
}

setInterval(changeAnimationTime, 1000);