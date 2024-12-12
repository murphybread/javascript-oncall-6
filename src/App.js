import { InputView, OutputView } from './View.js';

// 필요시 Validator.js로 추출

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const WEEKS = ['월', '화', '수', '목', '금', '토', '일'];
const HOLIDAYS = [
  [1, 1],
  [3, 1],
  [5, 5],
  [6, 6],
  [8, 15],
  [10, 3],
  [10, 9],
  [12, 25],
];

class DutySystem {
  constructor(calendar, weekdayWorkerNameArray, weekendWorkerNameArray) {
    this.systemCalendar = calendar;
    this.weekdayWorkerNameArray = weekdayWorkerNameArray;
    this.weekendWorkerNameArray = weekendWorkerNameArray;
    this.timeTable = [];
  }

  createWorkTimeTable() {
    let weekdayWorkerCount = 0;
    let weekendWorkerCount = 0;

    for (let i = 0; i < this.systemCalendar.length; i++) {
      const holiday = this.systemCalendar[i].isHoliday;

      //주말이나 공휴일 경우
      if (holiday) {
        this.timeTable.push({
          ...this.systemCalendar[i],
          worker: this.weekendWorkerNameArray[weekendWorkerCount % this.weekendWorkerNameArray.length],
        });
        weekendWorkerCount += 1;
      }
      //평일인경우
      else {
        this.timeTable.push({
          ...this.systemCalendar[i],
          worker: this.weekdayWorkerNameArray[weekdayWorkerCount % this.weekdayWorkerNameArray.length],
        });
        weekdayWorkerCount += 1;
      }
    }
  }

  modifyDoubleWork() {
    for (let i = 1; i < this.timeTable.length; i++) {
      // 연속 근무일 경우
      if (this.timeTable[i].worker === this.timeTable[i - 1].worker) {
        const modifiedToday = { ...this.timeTable[i], worker: this.timeTable[i + 1].worker };
        const modifiedTomorrow = { ...this.timeTable[i + 1], worker: this.timeTable[i].worker };
        this.timeTable[i] = modifiedToday;
        this.timeTable[i + 1] = modifiedTomorrow;
      }
    }
  }

  getTimeTable() {
    // console.log(this.systemCalendar, this.weekdayWorkerNameArray, this.weekendWorkerNameArray);
    return this.timeTable;
  }
}

const MONTHS_PAIR = { 1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 };
class Calendar {
  constructor(month, nDay) {
    this.currentMonth = month;
    this.startDay = nDay;
    this.endOfDay = 0;
    this.calendarInfo = [];
  }

  initialize() {
    this.endOfDay = MONTHS_PAIR[this.currentMonth];
    let currentDay = WEEKS.indexOf(this.startDay);

    for (let day = 1; day <= this.endOfDay; day++) {
      this.calendarInfo.push({ date: day, days: WEEKS[currentDay % 7], isHoliday: this.checkHoliday(this.currentMonth, day, WEEKS[currentDay % 7]) });
      currentDay += 1;
    }
  }
  checkHoliday(month, date, day) {
    if (day === '토' || day === '일') {
      console.log(`${month} ${date}휴일입니다`);
      return true;
    }
    for (const holiday of HOLIDAYS) {
      if (holiday[0] === Number(month) && holiday[1] === Number(date)) {
        console.log(`${month} ${date} 법정 공휴일입니다`);
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
class App {
  async run() {
    const [month, nDay] = await InputView.readInput();
    const calendar = new Calendar(month, nDay);
    calendar.initialize();

    // 근무자 입력받기
    const [weekdayWorkerNameArray, weekendWorkerNameArray] = await InputView.readWokerName();
    console.log(`weekdayWorkerNameArray ${weekdayWorkerNameArray} ${Array.isArray(weekdayWorkerNameArray)}`);
    console.log(`weekendWorkerNameArray ${weekendWorkerNameArray}`);

    const dutySystem = new DutySystem(calendar.getCalendarInfo(), weekdayWorkerNameArray, weekendWorkerNameArray);
    dutySystem.createWorkTimeTable();

    console.log(`after duplicate check`);
    dutySystem.modifyDoubleWork();

    // 결과 출력
    OutputView.displayTimeTable(dutySystem.getTimeTable(), calendar.getCurrentMonth());
  }
}

export default App;
