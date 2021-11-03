import dayjs, { Dayjs, UnitTypeLong } from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { range } from "lodash";
import React, { useEffect, useMemo, useReducer } from "react";
import { DatePickerContextProvider, getDecade, useClassnames, useIsMobile } from "../../utils";
import BottomSheet, { BottomSheetFProps } from "../BottomSheet";
import Dialog, { DialogDismissInfoType } from "../Dialog";
import Select, { SelectFProps, SelectModalFProps } from "../Select";
import {
  ACTIONS,
  DatePickerCalendarOperation,
  DatePickerDisabledDaysObj,
  DatePickerDisabledType,
  DatePickerMode,
  DatePickerOnChangeInfo,
  DatePickerOnClickInfo,
  DatePickerSelectedDateState,
  DatePickerYearsArrObj,
  DaysTable,
  MonthContainer,
  reducer,
  ReducerInitialStateType,
} from "./__helpers__";
dayjs.extend(isToday);

const initialState: ReducerInitialStateType = {
  selectedDate: [],
  calendarDate: dayjs(),
  isShown: false,
  mode: "calendar",
};

export type Props = {
  defaultDates?: DatePickerSelectedDateState;
  defaultCalendarDate?: Dayjs;
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
  modalProps?: SelectModalFProps;
};

export type FProps = Props & Omit<SelectFProps, "onChange" | "onClick" | "onDismiss"> & Pick<BottomSheetFProps, "onDismiss">;

const DatePicker: React.FC<FProps> = ({
  isRange = false,
  defaultDates = isRange ? [] : [dayjs()],
  defaultCalendarDate = defaultDates.length >= 1 ? defaultDates[0] : dayjs(),
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
  modalProps,
  onChange,
  onClick,
  onToggle,
  onDismiss,
  children,
  ...props
}) => {
  const [{ selectedDate, calendarDate, isShown, mode }, dispatch] = useReducer(reducer, initialState, (): typeof initialState => {
    return {
      ...initialState,
      selectedDate: defaultDates,
      calendarDate: defaultCalendarDate,
      isShown: defaultOpen,
      mode: defaultMode,
    };
  });
  const [classNames, rest] = useClassnames("date-picker", props);
  const { isMobile } = useIsMobile(mobileView);

  const yearsArr: DatePickerYearsArrObj = useMemo(() => {
    if (mode !== "years") return { fArr: [], years: [], prevYears: [], nextYears: [] };
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
    /* istanbul ignore next */
    if (!disabledDays) return { next: false, previous: false, from: newFrom, till: newTill };

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
    if (onToggle) onToggle(e);
  };

  const handleOperation = (operation: DatePickerCalendarOperation) => {
    dispatch({ type: ACTIONS.HANDLE_OPERATION, payload: { operation, disabled } });
  };

  const handleDismiss = (info?: DialogDismissInfoType, e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    // https://stackoverflow.com/a/7648619/13142787
    setTimeout(() => dispatch({ type: ACTIONS.HANDLE_DISMISS }), 4);
    if (onDismiss) onDismiss(info ? info : { cancel: false }, e);
  };

  const setMode = (newMode: DatePickerMode) => dispatch({ type: ACTIONS.SET_MODE, payload: { newMode, allowedModes } });

  const isDisabled = (dayInCalendar: Dayjs, unit?: UnitTypeLong): boolean => {
    const { days } = disabledDays;
    const { from, till } = disabled;
    const format = "DD-MM-YYYY";

    if (days && days.map(day => day.format(format)).includes(dayInCalendar.format(format))) return true;
    else if (till && dayInCalendar.startOf("day").isAfter(till, unit)) return true;
    else if (from && dayInCalendar.startOf("day").isBefore(from, unit)) return true;
    else return false;
  };

  useEffect(() => {
    if (onChange) onChange({ selectedDate, calendarDate, isShown, isMobile, mode, disabled, yearsArr });
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
        onClick,
        dispatch,
        isDisabled,
        handleOperation,
      }}
    >
      {/* <button onClick={(e) => handleToggle(e)}>Open</button> */}
      <Select
        className={classNames}
        defaultOpen={defaultOpen}
        mobileView={false}
        width={width}
        open={isShown}
        onToggle={e => handleToggle(e)}
        onDismiss={e => !isMobile && handleDismiss({ cancel: true }, e)}
        data-ismobile={isMobile}
        data-testid="date-picker"
        {...rest}
      >
        {selectBtn && (typeof selectBtn === "function" ? selectBtn({ selectedDate }) : selectBtn)}
        {!isMobile ? (
          <Select.Modal {...modalProps}>
            <div className="date-picker__content">
              <MonthContainer />
              <DaysTable dismiss={async () => handleDismiss()} />
              {children}
            </div>
          </Select.Modal>
        ) : (
          <BottomSheet
            className={classNames}
            data-ismobile={isMobile}
            defaultY={380}
            hugContentsHeight
            isShown={isShown}
            onDismiss={(info, e) => handleDismiss(info, e)}
            data-testid="date-picker"
          >
            {({ dismiss }) => {
              return (
                <>
                  <BottomSheet.ScrollBar />
                  <Dialog.Content className="date-picker__content">
                    <MonthContainer />
                    <DaysTable dismiss={dismiss} />
                    {children}
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

DatePicker.displayName = "DatePicker";

export default DatePicker;
