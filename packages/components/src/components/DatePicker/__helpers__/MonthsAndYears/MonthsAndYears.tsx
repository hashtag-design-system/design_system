import { MONTHS } from "@georgekrax-hashtag/common";
import dayjs from "dayjs";
import { AnimatePresence, motion, Variant } from "framer-motion";
import React from "react";
import { useDatePickerContext } from "../../../../utils/contexts";
import Button from "../../../Button";
import { ACTIONS } from "../index";

const containerVariants: Record<"initial" | "visible" | "exit", Variant> = {
  initial: {
    scale: 1,
    height: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    height: "100%",
    opacity: 1,
  },
  exit: {
    scale: 0,
    height: 0,
    opacity: 0,
    transition: {
      delay: 0.1,
    },
  },
};

const btnVariants: Record<"initial" | "visible" | "exit" | "transition", Variant> = {
  initial: {
    opacity: 0,
  },
  visible: (otherYear: boolean) => ({
    opacity: otherYear ? 0.5 : 1,
  }),
  exit: {
    opacity: 0,
  },
  transition: {
    transition: {
      duration: 0.05,
    },
  },
};

export const MonthsAndYears: React.FC = () => {
  const { calendarDate, mode, yearsArr, setMode, dispatch, isDisabled } = useDatePickerContext();

  return (
    <AnimatePresence>
      {(mode === "months" || mode === "years") && (
        <motion.div
          className={`tbody__${mode}-container`}
          variants={containerVariants}
          initial="initial"
          animate="visible"
          exit="exit"
        >
          {mode === "months"
            ? MONTHS.map((name, i) => (
                <Button
                  key={name}
                  className={calendarDate.month() === i ? "selected" : undefined}
                  variant="secondary"
                  variants={btnVariants}
                  initial="initial"
                  animate="visible"
                  exit="exit"
                  custom={false}
                  transition={btnVariants.transition}
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
                    variants={btnVariants}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    custom={otherYear}
                    transition={btnVariants.transition}
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
  );
};
