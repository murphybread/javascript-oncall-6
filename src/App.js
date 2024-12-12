import { InputView, OutputView } from './View.js';
import { Calendar } from './Calendar.js';
import { DutySystem } from './DutySystem.js';

class App {
  async run() {
    const [month, nDay] = await InputView.readInput();
    const calendar = new Calendar(month, nDay);
    calendar.initialize();

    const [weekdayWorkerNameArray, weekendWorkerNameArray] = await InputView.readWokerName();
    const dutySystem = new DutySystem(calendar.getCalendarInfo(), weekdayWorkerNameArray, weekendWorkerNameArray);
    dutySystem.createWorkTimeTable();
    dutySystem.modifyDoubleWork();
    OutputView.displayTimeTable(dutySystem.getTimeTable(), calendar.getCurrentMonth());
  }
}

export default App;
