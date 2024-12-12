import { Console } from '@woowacourse/mission-utils';
import { MESSAGES_INPUT, MESSAGES_ERROR, TIME_INFO } from './constants.js';

class Validator {
  static format(input) {
    const [month, nDay] = input.split(',');

    if (!TIME_INFO['MONTHS'].includes(Number(month)) || !TIME_INFO['WEEKS'].includes(nDay)) {
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
    if (workerNameAraary.length < 5 || workerNameAraary.length > 35) {
      throw new Error(MESSAGES_ERROR['WORKER']);
    }
  }
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
      if (eachDay.isHoliday && TIME_INFO['WEEKDAYS'].includes(eachDay.days)) {
        Console.print(`${month}월 ${eachDay.date}일 ${eachDay.days}(휴일) ${eachDay.worker}`);
      } else {
        Console.print(`${month}월 ${eachDay.date}일 ${eachDay.days} ${eachDay.worker}`);
      }
    }
  }
}
