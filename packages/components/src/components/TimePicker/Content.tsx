import { range } from "lodash";
import React, { useMemo } from "react";
import { useClassnames } from "../../utils";
import { Dots, Label } from "./__helpers__/index";

export type Props = {
  showLabels?: { hasHours: boolean; hasMinutes: boolean; hasSeconds: boolean };
};

export type FProps = Props & React.ComponentPropsWithoutRef<"div">;

const Content: React.FC<FProps> = ({ showLabels = { hasHours: true, hasMinutes: true, hasSeconds: true }, children, ...props }) => {
  const [classNames, rest] = useClassnames("time-picker__content-container", props);
  const shownLength = useMemo(() => Object.values(showLabels).filter(label => label === true).length, [showLabels]);

  return (
    <div className={classNames} data-testid="time-picker-content-container" {...rest}>
      {shownLength >= 1 && (
        <div className="time-picker__labels-container" data-testid="time-picker-labels-container">
          {showLabels.hasHours && <Label>Hours</Label>}
          {showLabels.hasMinutes && <Label>Minutes</Label>}
          {showLabels.hasSeconds && <Label>Seconds</Label>}
        </div>
      )}
      <div className="time-picker__container" data-testid="time-picker-container">
        <div className="time-picker__active-box" data-testid="time-picker-active-box">
          {range(shownLength <= 0 ? 0 : shownLength - 1).map((_, i) => (
            <Dots key={i} />
          ))}
        </div>
        {children}
      </div>
    </div>
  );
};

Content.displayName = "TimePickerContent";

export default Content;
