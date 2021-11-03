import { MONTHS } from "@the_hashtag/common";
import dayjs from "dayjs";
import { AnimatePresence, motion, Variant } from "framer-motion";
import React from "react";
import { useDatePickerContext } from "../../../../utils";
import Button from "../../../Button";
import { ACTIONS } from "../index";

const containerVariants: Record<"initial" | "visible" | "exit", Variant> = {
  initial: { scale: 1, height: 0, opacity: 0 },
  visible: { scale: 1, height: "100%", opacity: 1 },
  exit: { scale: 0, height: 0, opacity: 0, transition: { delay: 0.1 } },
};

const btnVariants: Record<"initial" | "exit" | "transition", Variant> = {
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  transition: { transition: { duration: 0.05 } },
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
          data-testid={`date-picker-tbody-${mode}-container`}
        >
          {mode === "months"
            ? MONTHS.map((name, i) => {
                const disabled = isDisabled(dayjs().month(i).startOf("month"), "month");

                return (
                  <Button
                    key={name}
                    className={calendarDate.month() === i ? "selected" : undefined}
                    variant="secondary"
                    variants={btnVariants}
                    initial="initial"
                    animate={{ opacity: disabled ? 0.5 : 1 }}
                    exit="exit"
                    transition={btnVariants.transition}
                    disabled={disabled}
                    onMouseDown={() => {
                      if (!disabled) {
                        setMode("calendar");
                        dispatch({ type: ACTIONS.SET_CALENDAR_DATE, payload: { newDate: calendarDate.month(i) } });
                      }
                    }}
                    data-testid="date-picker-tbody-months-container-btn"
                  >
                    {name}
                  </Button>
                );
              })
            : yearsArr.fArr.map(({ year, otherYear }) => {
                const disabled = isDisabled(dayjs().year(year).startOf("year"), "year");
                const other = otherYear || disabled;
                const classNames = `${other ? "other-year" : ""} ${calendarDate.year() === year ? "selected" : ""}`.trim();

                return (
                  <Button
                    key={year}
                    variant="secondary"
                    className={classNames}
                    variants={btnVariants}
                    initial="initial"
                    animate={{ opacity: other ? 0.5 : 1 }}
                    exit="exit"
                    transition={btnVariants.transition}
                    disabled={disabled}
                    onMouseDown={() => {
                      if (!disabled) {
                        setMode("months");
                        dispatch({ type: ACTIONS.SET_CALENDAR_DATE, payload: { newDate: calendarDate.year(year) } });
                      }
                    }}
                    data-testid="date-picker-tbody-years-container-btn"
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
