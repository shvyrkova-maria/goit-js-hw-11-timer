// import './styles.css';

const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate, onTimeChange }) {
    this.dateIntervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTimeChange = onTimeChange;
  }

  getCurrentDate() {
    const finishDate = this.targetDate.getTime();

    this.dateIntervalId = setInterval(() => {
      const currentDate = Date.now();
      let deltaDate = finishDate - currentDate;
      if (deltaDate < 0) {
        deltaDate = 0;
        clearInterval(this.dateIntervalId);
      }
      const time = this.getTimeComponents(deltaDate);
      this.onTimeChange(time);
    }, 1000);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1', //?
  targetDate: new Date('Jul 17, 2021'),
  onTimeChange: updateTimeComponents,
});

timer.getCurrentDate();

function updateTimeComponents({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.secs.textContent = secs;
}
