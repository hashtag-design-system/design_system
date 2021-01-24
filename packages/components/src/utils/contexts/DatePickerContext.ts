import { Dayjs } from "dayjs";
import {
  DatePickerDisabledType,
  DatePickerMode,
  DatePickerProps,
  DatePickerSelectedDateState,
  DatePickerYearsArrObj,
} from "../../components/DatePicker";
import { createCtx } from "../createCtx";

export type DatePickerContextType = Required<Pick<DatePickerProps, "calendarWeeks" | "disabledDays" | "dismissOnClick">> &
  Pick<DatePickerProps, "onClick"> & {
    selectedDate: DatePickerSelectedDateState;
    calendarDate: Dayjs;
    mode: DatePickerMode;
    disabled: DatePickerDisabledType;
    yearsArr: DatePickerYearsArrObj;
    setMode: React.Dispatch<React.SetStateAction<DatePickerMode>>;
    setSelectedDate: React.Dispatch<React.SetStateAction<DatePickerSelectedDateState>>;
    setCalendarDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    handleOperation: (operation: "add" | "subtract") => void;
  };

export const [DatePickerContextProvider, useDatePickerContext] = createCtx<DatePickerContextType>();
