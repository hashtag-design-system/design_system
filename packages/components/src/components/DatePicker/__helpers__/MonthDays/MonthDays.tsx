import { Dayjs } from "dayjs";
import { AnimatePresence, HTMLMotionProps, motion, Variants } from "framer-motion";
import { range } from "lodash";
import React from "react";
import { useDatePickerContext } from "../../../../utils";
import { BottomSheetDismissType } from "../../../BottomSheet";
import { DatePickerOtherDay } from "../../index";
import { ACTIONS, MonthsAndYears } from "../index";

const todayVariants: Variants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto", transition: { stiffness: 50 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

type FProps = HTMLMotionProps<"div"> & BottomSheetDismissType;

export const MonthDays: React.FC<FProps> = ({ dismiss, ...props }) => {
  const {
    selectedDate,
    calendarDate,
    calendarWeeks,
    disabledDays,
    dismissOnClick,
    isRange,
    onClick,
    dispatch,
    isDisabled,
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
    <motion.div className="tbody" data-testid="date-picker-tbody" {...props}>
      {range(1, calendarWeeks * 7 + 1).map(idx => {
        const monthDays = calendarDate.daysInMonth();
        const monthFirstDay = calendarDate.date(1).get("day") + 1;
        const daysFromPrevMonth = monthFirstDay - 1;
        const prevMonthDays = calendarDate.subtract(1, "month").daysInMonth();
        const day = idx - daysFromPrevMonth;
        const dayInCalendar = calendarDate.date(day);
        const disabled = isDisabled(dayInCalendar);
        const { checked: selected, first, middle, last } = isSelected(dayInCalendar);
        const baseClassNames = `td${disabled ? " disabled" : ""}${selected ? " selected" : ""}${first ? " first" : ""}${
          middle ? " middle" : ""
        }${last ? " last" : ""}`;

        if (
          day <= monthDays &&
          idx >= monthFirstDay &&
          ((disabledDays && disabledDays.days && !disabledDays.days.includes(dayInCalendar)) ||
            Object.entries(disabledDays).length === 0)
        ) {
          const classNames = `${disabled ? " other-day" : ""} ${baseClassNames}`.trim();

          return (
            <div key={idx} className={classNames} onMouseDown={e => handleClick(e, dayInCalendar)} data-testid="date-picker-tbody-td">
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
              className={("other-day " + baseClassNames).trimEnd()}
              onMouseDown={e => handleClick(e, dayInCalendar, month)}
              data-testid="date-picker-tbody-td"
            >
              {otherDate}
            </div>
          );
        }
      })}
      <MonthsAndYears />
    </motion.div>
  );
};
