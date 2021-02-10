import { DAY_NAMES_ARR } from "@the_hashtag/common";
import React from "react";
import { useClassnames } from "../../../../utils";
import { BottomSheetDismissType } from "../../../BottomSheet";
import { MonthDays } from "../index";

type FProps = React.ComponentPropsWithoutRef<"div"> & BottomSheetDismissType;

export const DaysTable: React.FC<FProps> = ({ dismiss, ...props }) => {
  const [classNames, rest] = useClassnames("date-picker__days-container", props);

  return (
    <div className={classNames} data-testid="date-picker-days-container" {...rest}>
      <div className="thead" data-testid="date-picker-thead">
        {DAY_NAMES_ARR.map(({ id, short_abbreviation }) => (
          <div key={id} className="th" data-testid="date-picker-thead-th">
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
