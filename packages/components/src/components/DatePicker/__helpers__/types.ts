import { Dayjs } from "dayjs";

export const DatePickerModes = ["calendar", "months", "years"] as const;
export type DatePickerMode = typeof DatePickerModes[number];
export const DatePickerOtherDays = ["previous", "next"] as const;
export type DatePickerOtherDay = typeof DatePickerOtherDays[number];
export const DatePickerCalendarOperations = ["add", "subtract"] as const;
export type DatePickerCalendarOperation = typeof DatePickerCalendarOperations[number];

export type DatePickerDisabledType = { next: boolean; previous: boolean; from?: Dayjs; till?: Dayjs };
export type DatePickerDisabledDaysObj = { date: Dayjs; parse?: (date: Dayjs) => Dayjs };
export type DatePickerSelectedDateState = Dayjs[];
export type DatePickerYearsArrObj = {
  fArr: { year: number; otherYear: boolean }[];
  years: number[];
  prevYears: number[];
  nextYears: number[];
};
export type DatePickerOnChangeInfo = {
  selectedDate: DatePickerSelectedDateState;
  calendarDate: Dayjs;
  isShown: boolean;
  isMobile: boolean;
  mode: DatePickerMode;
  disabled: DatePickerDisabledType;
  yearsArr: DatePickerYearsArrObj;
};

export type DatePickerOnClickInfo = {
  e: React.MouseEvent<HTMLElement>;
  dayInCalendar: Dayjs;
  otherDay?: DatePickerOtherDay;
};
