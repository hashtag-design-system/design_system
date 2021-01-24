import dayjs, { Dayjs } from "dayjs";
import { range } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { getDecade } from "../../utils";
import { DatePickerContextProvider } from "../../utils/contexts";
import { useIsMobile } from "../../utils/hooks";
import BottomSheet, { BottomSheetFProps } from "../BottomSheet";
import Dialog, { DialogDismissInfoType } from "../Dialog";
import Select, { SelectFProps } from "../Select";
import { DaysTable, MonthContainer } from "./__helpers__";

export const DatePickerModes = ["calendar", "months", "years"] as const;
export type DatePickerMode = typeof DatePickerModes[number];
export const DatePickerOtherDays = ["previous", "next"] as const;
export type DatePickerOtherDay = typeof DatePickerOtherDays[number];

export type DatePickerDisabledType = { next: boolean; previous: boolean; from?: Dayjs; till?: Dayjs };
export type DatePickerDisabledDaysObj = { date: Dayjs; parse?: (date: Dayjs) => Dayjs };
export type DatePickerSelectedDateState = { from: Dayjs; till: Dayjs };
export type DatePickerYearsArrObj = {
  fArr: { year: number; otherYear: boolean }[];
  years: number[];
  prevYears: number[];
  nextYears: number[];
};
export type DatePickerOnChangeInfo = {
  selectedDate: DatePickerSelectedDateState;
  calendarDate: Dayjs;
  bottomSheetIsShown: boolean;
  isMobile: boolean;
  disabled: DatePickerDisabledType;
  yearsArr: DatePickerYearsArrObj;
};

export type DatePickerOnClickInfo = {
  e: React.MouseEvent<HTMLElement>;
  dayInCalendar: Dayjs;
  otherDay?: DatePickerOtherDay;
};

export type Props = {
  defaultDate?: DatePickerSelectedDateState;
  mobileView?: { view?: boolean; hover: boolean };
  calendarWeeks?: number;
  yearsRows?: number;
  yearsBeforeAfter?: number;
  dismissOnClick?: boolean;
  isRange?: boolean;
  onChange?: (info: DatePickerOnChangeInfo) => void;
  onClick?: (info: DatePickerOnClickInfo) => void;
  disabledDays?: {
    days?: Dayjs[];
    from?: DatePickerDisabledDaysObj;
    till?: DatePickerDisabledDaysObj;
  };
  selectBtn?: React.ReactNode | ((info: { selectedDate: DatePickerSelectedDateState }) => React.ReactNode);
};

export type FProps = Props & Omit<SelectFProps, "onChange" | "onClick"> & Pick<BottomSheetFProps, "onDismiss">;

const DatePicker: React.FC<FProps> = ({
  defaultDate = { from: dayjs(), till: dayjs().add(1, "day") },
  disabledDays = {},
  mobileView,
  defaultOpen = false,
  width = 148,
  calendarWeeks = 6,
  yearsRows = 4,
  yearsBeforeAfter = 3,
  dismissOnClick = true,
  isRange = false,
  selectBtn,
  onChange,
  onClick,
  onToggle,
  onDismiss,
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState<DatePickerSelectedDateState>(defaultDate);
  const [calendarDate, setCalendarDate] = useState<Dayjs>(defaultDate.from);
  const [bottomSheetIsShown, setBottomSheetIsShown] = useState<boolean>(defaultOpen);
  const [mode, setMode] = useState<DatePickerMode>("calendar");
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
    if (open) {
      setBottomSheetIsShown(true);
    } else {
      // In this way, the <BottomSheet /> animates on exit
      // setBottomSheetIsShown(false);
    }

    if (onToggle) {
      onToggle(e);
    }
  };

  const handleOperation = (operation: "add" | "subtract") => {
    setCalendarDate(prevDate => {
      const unit: "months" | "years" = mode === "calendar" ? "months" : mode;
      const newDate = prevDate[operation](unit === "months" ? 1 : 10, unit);

      if (operation === "add" && disabled.next) {
        return prevDate;
      } else if (operation === "subtract" && disabled.previous) {
        return prevDate;
      } else {
        return newDate;
      }
    });
  };

  const handleDismiss = (info: DialogDismissInfoType, e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    setBottomSheetIsShown(false);

    if (onDismiss) {
      onDismiss(info, e);
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange({ selectedDate, calendarDate, bottomSheetIsShown, isMobile, disabled, yearsArr });
    }
  }, [onChange, selectedDate, calendarDate, bottomSheetIsShown, isMobile, disabled, yearsArr]);

  return (
    <DatePickerContextProvider
      value={{
        mode,
        selectedDate,
        calendarDate,
        calendarWeeks,
        disabledDays,
        disabled,
        yearsArr,
        dismissOnClick,
        setMode,
        setSelectedDate,
        setCalendarDate,
        handleOperation,
        onClick,
      }}
    >
      <Select
        className="date-picker"
        mobileView={false}
        width={width}
        open={isMobile ? bottomSheetIsShown : undefined}
        onToggle={e => handleToggle(e)}
        data-ismobile={mobileView?.view ? mobileView?.view : isMobile}
        {...props}
      >
        {selectBtn && (typeof selectBtn === "function" ? selectBtn({ selectedDate }) : selectBtn)}
        {!isMobile ? (
          <Select.Modal>
            {/* <div className="date-picker__content">
              <Month />
              <table className="date-picker__days-table">
                <thead>
                  <tr>
                    {DAY_NAMES_ARR.map(({ short_abbreviation }) => {
                      return <th>{short_abbreviation}</th>;
                    })}
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div> */}
          </Select.Modal>
        ) : (
          <BottomSheet
            className="date-picker"
            data-ismobile={isMobile}
            defaultY={380}
            hugContentsHeight
            isShown={bottomSheetIsShown}
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
