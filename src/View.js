import { Console } from '@woowacourse/mission-utils';

const MESSAGES_INPUT = {
  START: '비상 근무를 배정할 월과 시작 요일을 입력하세요> ',
  WEEKDAY_WORKER: `평일 비상 근무 순번대로 사원 닉네임을 입력하세요> `,
  WEEKEND_WORKER: '휴일 비상 근무 순번대로 사원 닉네임을 입력하세요> ',
};

const MESSAGES_ERROR = {
  INPUT: '[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.',
  WORKER: `[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.`,
};

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const WEEKS = ['월', '화', '수', '목', '금', '토', '일'];
const WEEKDAYS = ['월', '화', '수', '목', '금'];
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

class Validator {
  static format(input) {
    const [month, nDay] = input.split(',');

    if (!MONTHS.includes(Number(month)) || !WEEKS.includes(nDay)) {
      throw new Error(MESSAGES_ERROR['INPUT']);
    }
  }

  static formatWorkers(workerNameAraary) {
    // 이름 중복 케이스
    if (workerNameAraary.length !== new Set(workerNameAraary).size) {
      throw new Error(MESSAGES_ERROR['WORKER']);
    }

    // 최소 1글자 최대 5글자
    for (const workerName of workerNameAraary) {
      if (workerName.length < 1 || workerName.length > 5) {
        throw new Error(MESSAGES_ERROR['WORKER']);
      }
    }

    // 최소5명, 최대 5명
    if (workerNameAraary.length < 5 || workerNameAraary.length > 35) {
      throw new Error(MESSAGES_ERROR['WORKER']);
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

export class InputView {
  // throw new error 이후 에러메시지 출력
  static async readInput() {
    while (true) {
      try {
        const requestValue = await Console.readLineAsync(MESSAGES_INPUT['START']);
        Validator.format(requestValue);
        const [month, nDay] = requestValue.split(',');
        return [month, nDay];
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  static async readWokerName() {
    while (true) {
      try {
        const weekdayValue = await Console.readLineAsync(MESSAGES_INPUT['WEEKDAY_WORKER']);
        const weekendValue = await Console.readLineAsync(MESSAGES_INPUT['WEEKEND_WORKER']);
        const weekdayWorkerNameArray = weekdayValue.split(',');
        const weekendWorkerNameArray = weekendValue.split(',');

        Validator.formatWorkers(weekdayWorkerNameArray);
        Validator.formatWorkers(weekendWorkerNameArray);

        return [weekdayWorkerNameArray, weekendWorkerNameArray];
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
}

export class OutputView {
  static displayTimeTable(timeTable, month) {
    for (const eachDay of timeTable) {
      if (eachDay.isHoliday && WEEKDAYS.includes(eachDay.days)) {
        Console.print(`${month}월 ${eachDay.date}일 ${eachDay.days}(휴일) ${eachDay.worker}`);
      } else {
        Console.print(`${month}월 ${eachDay.date}일 ${eachDay.days} ${eachDay.worker}`);
      }
    }
  }
}
