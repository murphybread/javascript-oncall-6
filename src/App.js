import { Console } from '@woowacourse/mission-utils';

// 필요시 Validator.js로 추출
class Validator {
  static format(input) {
    const [month, nDay] = input.split(',');

    if (!MONTHS.includes(Number(month)) || !WEEKS.includes(nDay)) {
      throw new Error(MESSAGES_ERROR['INPUT']);
    }
  }
  formatArray(arr) {
    // 배열줄 한 원소라도 특정값 초과시
    if (arr.some((num) => num > 100)) {
      throw new Error();
    }

    // 한 원소라도 숫자가 아니라면
    if (!arr.every((num) => !isNaN(num))) {
      throw new Error();
    }
  }
  formatString(value) {
    // 숫자가 아닌경우
    if (isNaN(value)) {
      throw new Error();
    }

    // 문자열 값 포함하지 않을때여부
    const answers = ['A', 'B'];
    if (!answers.includes(value)) {
      throw new Error();
    }
  }

  formatString() {}
}

const MESSAGES_INPUT = {
  START: '비상 근무를 배정할 월과 시작 요일을 입력하세요> ',
};

const MESSAGES_ERROR = {
  INPUT: '[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.',
};

export const InputView = {
  // throw new error 이후 에러메시지 출력
  async readInput() {
    while (true) {
      try {
        const requestValue = await Console.readLineAsync(MESSAGES_INPUT['START']);
        Validator.format(requestValue);
        const [month, nDay] = requestValue.split(',');
        return [month, nDay];
      } catch (error) {
        Console.print(MESSAGES_ERROR['INPUT']);
      }
    }
  },
};

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

  getAllProperty() {
    console.log(this.calendarInfo);
    console.log(`${this.currentMonth}, ${this.startDay}요일, 월말 ${this.endOfDay}`);
  }
}
class App {
  async run() {
    const [month, nDay] = await InputView.readInput();
    const calendar = new Calendar(month, nDay);
    calendar.initialize();
    calendar.getAllProperty();
  }
}

export default App;
