import dayjs, { Dayjs, UnitTypeLong } from "dayjs";
import { keys, pickBy } from "lodash";
import { BottomSheetDismissType } from "../../BottomSheet";
import { DatePickerCalendarOperation, DatePickerMode, DatePickerOnChangeInfo, DatePickerOtherDay } from "../DatePicker";
import { DatePickerProps } from "../index";

// ------------ Reducer types ------------ //
export const ACTIONS = {
  SET_MODE: "set:mode",
  SET_CALENDAR_DATE: "set:calendar_date",
  HANDLE_TOGGLE: "handle:toggle",
  HANDLE_OPERATION: "handle:operation",
  HANDLE_DISMISS: "handle:dismiss",
  HANDLE_DATE_CLICK: "handle:date:click",
  // HANDLE_KEY_DOWN_CAPTURE: "handle:key_down_capture",
} as const;

export type ACTIONTYPE =
  | {
      type: typeof ACTIONS.HANDLE_OPERATION;
      payload: { operation: DatePickerCalendarOperation } & Pick<DatePickerOnChangeInfo, "disabled">;
    }
  | { type: typeof ACTIONS.HANDLE_DISMISS }
  | { type: typeof ACTIONS.HANDLE_TOGGLE; payload: { open: boolean } }
  | {
      type: typeof ACTIONS.HANDLE_DATE_CLICK;
      payload: {
        dayInCalendar: Dayjs;
        otherDay?: DatePickerOtherDay;
        formatDate: <T extends string | string[]>(value: Dayjs | Dayjs[]) => T;
        isDisabled: (dayInCalendar: Dayjs, unit?: UnitTypeLong) => boolean;
      } & Required<Pick<DatePickerProps, "isRange" | "dismissOnClick"> & BottomSheetDismissType>;
    }
  | { type: typeof ACTIONS.SET_CALENDAR_DATE; payload: { newDate: Dayjs } }
  | { type: typeof ACTIONS.SET_MODE; payload: { newMode: DatePickerMode } & Required<Pick<DatePickerProps, "allowedModes">> };

export type ReducerInitialStateType = Pick<DatePickerOnChangeInfo, "selectedDate" | "calendarDate" | "isShown" | "mode">;

// ------------ The reducer ------------ //
export const reducer = (state: ReducerInitialStateType, action: ACTIONTYPE): ReducerInitialStateType => {
  const { selectedDate, calendarDate, mode } = state;

  switch (action.type) {
    case ACTIONS.HANDLE_TOGGLE: {
      const {
        payload: { open },
      } = action;
      if (open) {
        return { ...state, isShown: true };
      } else {
        return state;
        // In this way, the <BottomSheet /> animates on exit
        // setBottomSheetIsShown(false);
      }
    }
    case ACTIONS.HANDLE_DISMISS: {
      return { ...state, isShown: false };
    }
    case ACTIONS.SET_CALENDAR_DATE: {
      const {
        payload: { newDate },
      } = action;
      return { ...state, calendarDate: newDate };
    }
    case ACTIONS.SET_MODE: {
      const {
        payload: { newMode, allowedModes },
      } = action;
      let newStateMode = newMode;
      if (allowedModes[newMode] === false) {
        newStateMode = (keys(pickBy(allowedModes)).find(allowedMode => allowedMode !== mode) as DatePickerMode) || mode;
      }
      return { ...state, mode: newStateMode };
    }
    case ACTIONS.HANDLE_OPERATION: {
      const {
        payload: {
          operation,
          disabled: { next, previous },
        },
      } = action;

      const unit: "months" | "years" = mode === "calendar" ? "months" : mode;
      let newDate = calendarDate[operation](unit === "months" ? 1 : 10, unit);

      if ((operation === "add" && next) || (operation === "subtract" && previous)) {
        return state;
      } else {
        return { ...state, calendarDate: newDate };
      }
    }
    case ACTIONS.HANDLE_DATE_CLICK: {
      const {
        payload: { dayInCalendar, otherDay, isRange, dismissOnClick, isDisabled, dismiss, formatDate },
      } = action;
      if (!isDisabled(dayInCalendar, "month")) {
        let newMonth = calendarDate.month();
        let newYear = calendarDate.year();

        if (otherDay) {
          if (otherDay === "previous") {
            newMonth = newMonth - 1;
            if (newMonth === -1) {
              newYear = newYear - 1;
            }
          } else {
            newMonth = newMonth + 1;
            if (newMonth === 12) {
              newYear = newYear + 1;
            }
          }
        }

        let newDate = selectedDate;
        const newSecondDate = dayjs().set("month", newMonth).set("date", dayInCalendar.date()).set("year", newYear).startOf("day");
        if (isRange) {
          if (newDate.length === 1) {
            if (newSecondDate.isAfter(newDate[0])) {
              newDate = [...newDate, newSecondDate];
            } else {
              newDate = [newSecondDate, ...newDate];
            }
          } else {
            newDate = [newSecondDate];
          }
        } else {
          if (newDate.length >= 1) {
            newDate = selectedDate.map(date => {
              return date.set("month", newMonth).set("date", dayInCalendar.date()).set("year", newYear).startOf("day");
            });
          } else {
            newDate = [newSecondDate];
          }
        }

        let newState = state;
        if (!isDisabled(dayInCalendar)) {
          newState = { ...newState, selectedDate: newDate };

          if (dismissOnClick) {
            if ((isRange && new Set(formatDate(newDate)).size >= 2) || !isRange) {
              dismiss();
            }
          }
        }

        const firstDate = newDate[0];
        if (newDate.length >= 2 && newDate[1].isAfter(firstDate)) {
          newState = { ...newState, calendarDate: newDate[1] };
        } else {
          newState = { ...newState, calendarDate: firstDate };
        }

        return newState;
      }
    }
    // falls through
    default:
      return state;
  }
};
