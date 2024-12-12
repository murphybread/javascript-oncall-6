import { Console } from '@woowacourse/mission-utils';

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const WEEKS = ['월', '화', '수', '목', '금', '토', '일'];

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
        return requestValue;
      } catch (error) {
        Console.print(MESSAGES_ERROR['INPUT']);
      }
    }
  },
};

class Calendar {
  constructor(month, nDay) {
    this.currentMonth = month;
    this.startDay = nDay;
  }
}
class App {
  async run() {
    InputView.readInput();
  }
}

export default App;
