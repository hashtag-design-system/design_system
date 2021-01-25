import dayjs, { Dayjs } from "dayjs";
import { range } from "lodash";
import React, { useEffect, useMemo, useReducer } from "react";
import { getDecade } from "../../utils";
import { DatePickerContextProvider } from "../../utils/contexts";
import { useClassnames, useIsMobile } from "../../utils/hooks";
import BottomSheet, { BottomSheetFProps } from "../BottomSheet";
import Dialog, { DialogDismissInfoType } from "../Dialog";
import Select, { SelectFProps } from "../Select";
import { ACTIONS, DaysTable, MonthContainer, reducer, ReducerInitialStateType } from "./__helpers__";

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

const initialState: ReducerInitialStateType = {
  selectedDate: [],
  calendarDate: dayjs(),
  isShown: false,
  mode: "calendar",
};

export type Props = {
  defaultDates?: DatePickerSelectedDateState;
  mobileView?: { view?: boolean; hover: boolean };
  calendarWeeks?: number;
  yearsRows?: number;
  yearsBeforeAfter?: number;
  dismissOnClick?: boolean;
  isRange?: boolean;
  onChange?: (info: DatePickerOnChangeInfo) => void;
  onClick?: (info: DatePickerOnClickInfo) => void;
  defaultMode?: DatePickerMode;
  allowedModes?: { [k in DatePickerMode]: boolean };
  disabledDays?: {
    days?: Dayjs[];
    from?: DatePickerDisabledDaysObj;
    till?: DatePickerDisabledDaysObj;
  };
  selectBtn?: React.ReactNode | ((info: { selectedDate: DatePickerSelectedDateState }) => React.ReactNode);
};

export type FProps = Props & Omit<SelectFProps, "onChange" | "onClick" | "onDismiss"> & Pick<BottomSheetFProps, "onDismiss">;

const DatePicker: React.FC<FProps> = ({
  isRange = false,
  defaultDates = isRange ? [] : [dayjs()],
  disabledDays = {},
  mobileView,
  defaultOpen = false,
  width = 148,
  calendarWeeks = 6,
  yearsRows = 4,
  yearsBeforeAfter = 3,
  dismissOnClick = true,
  defaultMode = "calendar",
  allowedModes = { calendar: true, months: true, years: true },
  selectBtn,
  onChange,
  onClick,
  onToggle,
  onDismiss,
  ...props
}) => {
  const [{ selectedDate, calendarDate, isShown, mode }, dispatch] = useReducer(reducer, initialState, (): typeof initialState => {
    return {
      ...initialState,
      selectedDate: defaultDates,
      calendarDate: defaultDates.length >= 1 ? defaultDates[0] : dayjs(),
      isShown: defaultOpen,
      mode: defaultMode,
    };
  });
  const [classNames, rest] = useClassnames("date-picker", props);
  const { isMobile } = useIsMobile(mobileView?.view);

  const yearsArr: DatePickerYearsArrObj = useMemo(() => {
    if (mode !== "years") {
      return { fArr: [], years: [], prevYears: [], nextYears: [] };
    }
    const totalShownYears = yearsRows * 4;
    const shownYears = totalShownYears - yearsBeforeAfter * 2;
    const decade = getDecade(calendarDate);
    const years = range(decade, decade + shownYears);
    const prevYears = range(decade - yearsBeforeAfter, decade);
    const nextYears = range(decade + shownYears, decade + shownYears + yearsBeforeAfter);
    const fArr = [
      ...prevYears.map(year => ({ otherYear: true, year })),
      ...years.map(year => ({ otherYear: false, year })),
      ...nextYears.map(year => ({ otherYear: true, year })),
    ];
    return { fArr: fArr, years: years, prevYears, nextYears };
  }, [calendarDate, mode, yearsRows, yearsBeforeAfter]);

  const disabled: DatePickerDisabledType = useMemo(() => {
    let newFrom: Dayjs | undefined = undefined;
    let newTill: Dayjs | undefined = undefined;
    if (!disabledDays) {
      return { next: false, previous: false, from: newFrom, till: newTill };
    }

    const { from, till } = disabledDays;
    if (from) {
      const { date, parse } = from;
      const parsedDate = parse ? parse(date) : date.startOf("day");
      newFrom = parsedDate;
    }
    if (till) {
      const { date, parse } = till;
      const parsedDate = parse ? parse(date) : date.startOf("day");
      newTill = parsedDate;
    }
    const { years } = yearsArr;

    const firstYear = years[0];
    const lastYear = years[years.length - 1];

    return {
      next: newTill
        ? calendarDate.add(1, "month").startOf("month").isAfter(newTill.startOf("month")) ||
          (mode === "years" && lastYear >= newTill.year())
        : false,
      previous: newFrom
        ? calendarDate.subtract(1, "month").startOf("month").isBefore(newFrom.startOf("month")) ||
          (mode === "years" && firstYear <= newFrom.year())
        : false,
      from: newFrom,
      till: newTill,
    };
  }, [disabledDays, calendarDate, mode, yearsArr]);

  const handleToggle = (e: React.SyntheticEvent<HTMLElement>) => {
    const open = e.currentTarget.attributes.getNamedItem("open");
    dispatch({ type: ACTIONS.HANDLE_TOGGLE, payload: { open: open ? true : false } });
    if (onToggle) {
      onToggle(e);
    }
  };

  const handleOperation = (operation: DatePickerCalendarOperation) => {
    dispatch({ type: ACTIONS.HANDLE_OPERATION, payload: { operation, disabled } });
  };

  const handleDismiss = (info?: DialogDismissInfoType, e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    dispatch({ type: ACTIONS.HANDLE_DISMISS });
    if (onDismiss) {
      onDismiss(info ? info : { cancel: false }, e);
    }
  };

  const setMode = (newMode: DatePickerMode) => {
    dispatch({ type: ACTIONS.SET_MODE, payload: { newMode, allowedModes } });
  };

  useEffect(() => {
    if (onChange) {
      onChange({ selectedDate, calendarDate, isShown, isMobile, mode, disabled, yearsArr });
    }
  }, [onChange, selectedDate, calendarDate, isShown, isMobile, mode, disabled, yearsArr]);

  return (
    <DatePickerContextProvider
      value={{
        mode,
        isRange,
        selectedDate,
        calendarDate,
        calendarWeeks,
        disabledDays,
        disabled,
        yearsArr,
        dismissOnClick,
        setMode,
        dispatch,
        handleOperation,
        onClick,
      }}
    >
      <Select
        className={classNames}
        defaultOpen={defaultOpen}
        mobileView={false}
        width={width}
        open={isShown}
        onToggle={e => handleToggle(e)}
        onDismiss={e => handleDismiss({ cancel: true }, e)}
        data-ismobile={mobileView?.view ? mobileView?.view : isMobile}
        {...rest}
      >
        {selectBtn && (typeof selectBtn === "function" ? selectBtn({ selectedDate }) : selectBtn)}
        {!isMobile ? (
          <Select.Modal>
            <div className="date-picker__content">
              <MonthContainer />
              <DaysTable dismiss={async () => handleDismiss()} />
            </div>
          </Select.Modal>
        ) : (
          <BottomSheet
            className="date-picker"
            data-ismobile={mobileView?.view ? mobileView?.view : isMobile}
            defaultY={380}
            hugContentsHeight
            isShown={isShown}
            onDismiss={(info, e) => handleDismiss(info, e)}
          >
            {({ dismiss }) => {
              return (
                <>
                  <BottomSheet.ScrollBar />
                  <Dialog.Content className="date-picker__content">
                    <MonthContainer />
                    <DaysTable dismiss={dismiss} />
                  </Dialog.Content>
                </>
              );
            }}
          </BottomSheet>
        )}
      </Select>
    </DatePickerContextProvider>
  );
};

export default DatePicker;
