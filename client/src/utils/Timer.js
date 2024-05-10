import { formatTimestamp } from "./format.js";

class Timer {
  constructor() {
    this.startTime = null;
    this.endTime = null;
    this.intervalId = null;
  }

  start() {
    this.startTime = new Date();
    this.intervalId = setInterval(() => {
      const minutesLabel = document.getElementById("minutes");
      const secondsLabel = document.getElementById("seconds");
      const currentTime = new Date();
      const elapsedTime = Math.floor((currentTime - this.startTime) / 1000);
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      if (minutesLabel && secondsLabel) {
        minutesLabel.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
        secondsLabel.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.endTime = new Date();
    const elapsedTime = Math.floor((this.endTime - this.startTime) / 1000);
    return formatTimestamp(elapsedTime);
  }

  reset() {
    clearInterval(this.intervalId);
    this.startTime = null;
    this.endTime = null;
    const minutesLabel = document.getElementById("minutes");
    const secondsLabel = document.getElementById("seconds");

    if (minutesLabel && secondsLabel) {
      minutesLabel.innerHTML = "00";
      secondsLabel.innerHTML = "00";
    }
  }

  pause() {
    clearInterval(this.intervalId);
  }

  resume() {
    this.start();
  }
}

export default Timer;
