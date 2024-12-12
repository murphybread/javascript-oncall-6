export class DutySystem {
  constructor(calendar, weekdayWorkerNameArray, weekendWorkerNameArray) {
    this.systemCalendar = calendar;
    this.weekdayWorkerNameArray = weekdayWorkerNameArray;
    this.weekendWorkerNameArray = weekendWorkerNameArray;
    this.timeTable = [];
  }

  createWorkTimeTable() {
    let weekdayWorkerCount = 0,
      weekendWorkerCount = 0;
    for (let i = 0; i < this.systemCalendar.length; i++) {
      const holiday = this.systemCalendar[i].isHoliday;
      //주말이나 공휴일 경우
      if (holiday) {
        this.updateTimeTable(holiday, i, weekendWorkerCount);
        weekendWorkerCount += 1;
      } else {
        this.updateTimeTable(holiday, i, weekdayWorkerCount);
        weekdayWorkerCount += 1;
      }
    }
  }

  updateTimeTable(holiday, currentTimeTableCount, currentWorkerCount) {
    if (holiday) {
      this.timeTable.push({
        ...this.systemCalendar[currentTimeTableCount],
        worker: this.weekendWorkerNameArray[currentWorkerCount % this.weekendWorkerNameArray.length],
      });
    } else {
      this.timeTable.push({
        ...this.systemCalendar[currentTimeTableCount],
        worker: this.weekdayWorkerNameArray[currentWorkerCount % this.weekdayWorkerNameArray.length],
      });
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
