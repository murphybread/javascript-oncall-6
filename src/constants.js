export const MESSAGES_INPUT = {
  START: '비상 근무를 배정할 월과 시작 요일을 입력하세요> ',
  WEEKDAY_WORKER: `평일 비상 근무 순번대로 사원 닉네임을 입력하세요> `,
  WEEKEND_WORKER: '휴일 비상 근무 순번대로 사원 닉네임을 입력하세요> ',
};

export const MESSAGES_ERROR = {
  INPUT: '[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.',
  WORKER: `[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.`,
};

export const TIME_INFO = {
  MONTHS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  WEEKS: ['월', '화', '수', '목', '금', '토', '일'],
  WEEKDAYS: ['월', '화', '수', '목', '금'],
  HOLIDAYS: [
    [1, 1],
    [3, 1],
    [5, 5],
    [6, 6],
    [8, 15],
    [10, 3],
    [10, 9],
    [12, 25],
  ],
  MONTHS_PAIR: { 1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 },
};
export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const WEEKS = ['월', '화', '수', '목', '금', '토', '일'];
export const WEEKDAYS = ['월', '화', '수', '목', '금'];
export const HOLIDAYS = [
  [1, 1],
  [3, 1],
  [5, 5],
  [6, 6],
  [8, 15],
  [10, 3],
  [10, 9],
  [12, 25],
];
