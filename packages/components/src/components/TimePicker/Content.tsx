import { range } from "lodash";
import React from "react";
import { useClassnames } from "../../utils/hooks";
import { Dots, Label } from "./__helpers__/index";

export type Props = {
  showLabels?: { hasHours: boolean; hasMinutes: boolean; hasSeconds: boolean };
};

export type FProps = Props & React.ComponentPropsWithoutRef<"div">;

const Content: React.FC<FProps> = ({ showLabels = { hasHours: true, hasMinutes: true, hasSeconds: true }, children, ...props }) => {
  const [classNames, rest] = useClassnames("time-picker__content-container", props);

  return (
    <div className={classNames} {...rest}>
      {showLabels && (
        <div className="time-picker__labels-container">
          {showLabels.hasHours && <Label>Hours</Label>}
          {showLabels.hasMinutes && <Label>Minutes</Label>}
          {showLabels.hasSeconds && <Label>Seconds</Label>}
        </div>
      )}
      <div className="time-picker__container">
        <div className="time-picker__active-box">
          {range(0, Object.values(showLabels).filter(label => label === true).length - 1).map((_, i) => (
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
