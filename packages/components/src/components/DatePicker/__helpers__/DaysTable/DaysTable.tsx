import { DAY_NAMES_ARR } from "@georgekrax-hashtag/common";
import React from "react";
import { MonthDays } from "../index";
import { useClassnames } from "../../../../utils/hooks";
import { BottomSheetDismissType } from "../../../BottomSheet";

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
