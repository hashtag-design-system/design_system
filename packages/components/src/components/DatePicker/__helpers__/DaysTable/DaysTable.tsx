import { DAY_NAMES_ARR, MONTHS } from "@georgekrax-hashtag/common";
import dayjs, { Dayjs, UnitTypeLong } from "dayjs";
import { AnimatePresence, HTMLMotionProps, motion, Variants } from "framer-motion";
import { range } from "lodash";
import React from "react";
import { useDatePickerContext } from "../../../../utils/contexts";
import { useClassnames } from "../../../../utils/hooks";
import { BottomSheetDismissType } from "../../../BottomSheet";
import Button from "../../../Button";
import { DatePickerOtherDay } from "../../DatePicker";
import { ACTIONS } from "../index";

const MonthDays: React.FC<HTMLMotionProps<"div"> & BottomSheetDismissType> = ({ dismiss, ...props }) => {
  const {
    mode,
    disabled,
    selectedDate,
    calendarDate,
    calendarWeeks,
    disabledDays,
    yearsArr,
    dismissOnClick,
    isRange,
    setMode,
    onClick,
    dispatch,
  } = useDatePickerContext();

  const formatDate = <T extends string | string[]>(value: Dayjs | Dayjs[]): T => {
    const format = "DD/MM/YYYY";
    let formattedValue: any;
    if (Array.isArray(value)) {
      formattedValue = value.map(date => date.format(format));
    } else {
      formattedValue = value.format(format);
    }
    return formattedValue;
  };

  const isSelected = (dayInCalendar: Dayjs): { checked: boolean; first: boolean; middle: boolean; last: boolean } => {
    if (isRange && selectedDate.length === 1 && dayInCalendar.isSame(selectedDate[0])) {
      return {
        checked: true,
        middle: false,
        first: false,
        last: false,
      };
    }

    const formattedSelectedDate = formatDate(selectedDate);
    const formattedDayInCalendar = formatDate<string>(dayInCalendar);

    if (formattedSelectedDate.includes(formattedDayInCalendar)) {
      return {
        checked: true,
        middle: false,
        first: formattedSelectedDate.indexOf(formattedDayInCalendar) === 0 && new Set(formattedSelectedDate).size >= 2,
        last: formattedSelectedDate.indexOf(formattedDayInCalendar) === 1,
      };
    }

    if (isRange && selectedDate.length === 2) {
      if (dayInCalendar.isAfter(selectedDate[0]) && dayInCalendar.isBefore(selectedDate[1])) {
        return {
          checked: true,
          middle: true,
          first: false,
          last: false,
        };
      }
    }
    return {
      checked: false,
      middle: false,
      first: false,
      last: false,
    };
  };

  const isDisabled = (dayInCalendar: Dayjs, unit?: UnitTypeLong): boolean => {
    const { days } = disabledDays;
    const { from, till } = disabled;
    const format = "DD-MM-YYYY";

    if (days && days.map(day => day.format(format)).includes(dayInCalendar.format(format))) {
      return true;
    } else if (till && dayInCalendar.startOf("day").isAfter(till, unit)) {
      return true;
    } else if (from && dayInCalendar.startOf("day").isBefore(from, unit)) {
      return true;
    } else {
      return false;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>, dayInCalendar: Dayjs, otherDay?: DatePickerOtherDay) => {
    dispatch({
      type: ACTIONS.HANDLE_DATE_CLICK,
      payload: { dayInCalendar, isRange, otherDay, dismissOnClick, isDisabled, dismiss, formatDate },
    });

    if (onClick) {
      onClick({ e, dayInCalendar, otherDay });
    }
  };

  return (
    <motion.div className="tbody" {...props}>
      {range(1, calendarWeeks * 7 + 1).map(idx => {
        const monthDays = calendarDate.daysInMonth();
        const monthFirstDay = calendarDate.date(1).get("day") + 1;
        const daysFromPrevMonth = monthFirstDay - 1;
        const prevMonthDays = calendarDate.subtract(1, "month").daysInMonth();
        const day = idx - daysFromPrevMonth;
        const dayInCalendar = calendarDate.date(day);
        const disabled = isDisabled(dayInCalendar);

        if (day <= monthDays && idx >= monthFirstDay && disabledDays.days && !disabledDays.days.includes(dayInCalendar)) {
          const { checked: selected, first, middle, last } = isSelected(dayInCalendar);
          const classNames = `td ${selected ? "selected" : ""} ${first ? "first" : ""} ${middle ? "middle" : ""} ${
            last ? "last" : ""
          } ${disabled ? "other-day disabled" : ""}`.trim();

          return (
            <div key={idx} className={classNames} onMouseDown={e => handleClick(e, dayInCalendar)}>
              {day}
              <AnimatePresence>
                {dayInCalendar.isToday() && !selected && (
                  <motion.span className="today" variants={todayVariants} initial="initial" animate="animate" exit="exit">
                    Today
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          );
        } else {
          let otherDate: number;
          let month: DatePickerOtherDay;
          if (idx <= daysFromPrevMonth) {
            otherDate = prevMonthDays - Math.abs(day);
            month = "previous";
          } else {
            otherDate = day - monthDays;
            month = "next";
          }
          return (
            <div
              key={idx}
              className={`td other-day ${disabled ? "disabled" : ""}`.trimEnd()}
              onMouseDown={e => handleClick(e, dayInCalendar, month)}
            >
              {otherDate}
            </div>
          );
        }
      })}
      <AnimatePresence>
        {(mode === "months" || mode === "years") && (
          <motion.div
            className={`tbody__${mode}-container`}
            initial={{ scale: 1, height: 0, opacity: 0 }}
            animate={{ scale: 1, height: "100%", opacity: 1 }}
            exit={{ scale: 0, height: 0, opacity: 0, transition: { delay: 0.1 } }}
          >
            {mode === "months"
              ? MONTHS.map((name, i) => (
                  <Button
                    key={name}
                    className={calendarDate.month() === i ? "selected" : undefined}
                    variant="secondary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.05 }}
                    onMouseDown={() => {
                      setMode("calendar");
                      dispatch({ type: ACTIONS.SET_CALENDAR_DATE, payload: { newDate: calendarDate.month(i) } });
                    }}
                  >
                    {name}
                  </Button>
                ))
              : yearsArr.fArr.map(({ year, otherYear }) => {
                  const classNames = `${otherYear || isDisabled(dayjs().year(year).startOf("year")) ? "other-year" : ""} ${
                    calendarDate.year() === year ? "selected" : ""
                  }`;
                  return (
                    <Button
                      key={year}
                      variant="secondary"
                      className={classNames}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: otherYear ? 0.5 : 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.05 }}
                      onMouseDown={() => {
                        setMode("months");
                        dispatch({ type: ACTIONS.SET_CALENDAR_DATE, payload: { newDate: calendarDate.year(year) } });
                      }}
                    >
                      {year}
                    </Button>
                  );
                })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const todayVariants: Variants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto", transition: { stiffness: 50 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

type FProps = React.ComponentPropsWithoutRef<"div"> & BottomSheetDismissType;

export const DaysTable: React.FC<FProps> = ({ dismiss, ...props }) => {
  const [classNames, rest] = useClassnames("date-picker__days-container", props);

  return (
    <div className={classNames} {...rest}>
      <div className="thead">
        {DAY_NAMES_ARR.map(({ id, short_abbreviation }) => (
          <div className="th" key={id}>
            {short_abbreviation}
          </div>
        ))}
      </div>
      <MonthDays dismiss={dismiss} />
      {/* <VirtualizeSwipeableViews
        index={calendarDate.month()}
        enableMouseEvents
        animateHeight={false}
        onChangeIndex={(i, latestI) => handleOperation(i < latestI ? "subtract" : "add")}
        slideRenderer={({ key }) => <MonthDays key={key} />}
      /> */}
    </div>
  );
};
