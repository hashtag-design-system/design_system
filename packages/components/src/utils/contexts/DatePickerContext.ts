import { Dayjs, UnitTypeLong } from "dayjs";
import {
  DatePickerDisabledType,
  DatePickerMode,
  DatePickerProps,
  DatePickerSelectedDateState,
  DatePickerYearsArrObj,
} from "../../components/DatePicker";
import { ACTIONTYPE } from "../../components/DatePicker/__helpers__";
import { createCtx } from "../createCtx";

export type DatePickerContextType = Required<Pick<DatePickerProps, "calendarWeeks" | "disabledDays" | "dismissOnClick" | "isRange">> &
  Pick<DatePickerProps, "onClick"> & {
    selectedDate: DatePickerSelectedDateState;
    calendarDate: Dayjs;
    mode: DatePickerMode;
    disabled: DatePickerDisabledType;
    yearsArr: DatePickerYearsArrObj;
    dispatch: React.Dispatch<ACTIONTYPE>;
    setMode: (mode: DatePickerMode) => void;
    isDisabled: (dayInCalendar: Dayjs, unit?: UnitTypeLong) => boolean;
    handleOperation: (operation: "add" | "subtract") => void;
  };

export const [DatePickerContextProvider, useDatePickerContext] = createCtx<DatePickerContextType>();
