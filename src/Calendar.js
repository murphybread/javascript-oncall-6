import { TIME_INFO } from './constants.js';
export class Calendar {
  constructor(month, nDay) {
    this.currentMonth = month;
    this.startDay = nDay;
    this.endOfDay = 0;
    this.calendarInfo = [];
  }

  initialize() {
    this.endOfDay = TIME_INFO['MONTHS_PAIR'][this.currentMonth];
    let currentDay = TIME_INFO['WEEKS'].indexOf(this.startDay);

    for (let day = 1; day <= this.endOfDay; day++) {
      this.calendarInfo.push({
        date: day,
        days: TIME_INFO['WEEKS'][currentDay % 7],
        isHoliday: this.checkHoliday(this.currentMonth, day, TIME_INFO['WEEKS'][currentDay % 7]),
      });
      currentDay += 1;
    }
  }
  checkHoliday(month, date, day) {
    if (day === '토' || day === '일') {
      return true;
    }
    for (const holiday of TIME_INFO['HOLIDAYS']) {
      if (holiday[0] === Number(month) && holiday[1] === Number(date)) {
        return true;
      }
    }

    return false;
  }
  getCurrentMonth() {
    return this.currentMonth;
  }

  getCalendarInfo() {
    return this.calendarInfo;
  }
}
