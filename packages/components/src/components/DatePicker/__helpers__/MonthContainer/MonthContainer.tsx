import { MONTHS } from "@georgekrax-hashtag/common";
import { useMemo } from "react";
import { useDatePickerContext } from "../../../../utils/contexts";
import { useClassnames } from "../../../../utils/hooks";
import { IconButton } from "./IconButton";

type FProps = React.ComponentPropsWithoutRef<"div">;

export const MonthContainer: React.FC<FProps> = ({ ...props }) => {
  const [classNames, rest] = useClassnames("date-picker__months-container", props);

  const {
    disabled: { previous, next },
    calendarDate,
    yearsArr: { years },
    mode,
    setMode,
  } = useDatePickerContext();

  const firstYear = useMemo(() => years[0], [years]);
  const lastYear = useMemo(() => years[years.length - 1], [years]);

  return (
    <div className={classNames} {...rest}>
      <IconButton state={previous || mode === "months" ? "disabled" : undefined} operation="subtract">
        <svg
          width={16}
          height={16}
          className="icon"
          data-testid="icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17 21L7 12l10-9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconButton>
      <div
        className="date-picker__months-container__date"
        onMouseDown={() => {
          switch (mode) {
            case "calendar":
              setMode("months");
              break;
            case "months":
              setMode("years");
              break;
            case "years":
              setMode("years");
              break;

            default:
              setMode("calendar");
              break;
          }
        }}
      >
        {mode === "calendar" && <span>{MONTHS[calendarDate.month()]}</span>}
        {mode !== "years" && <span>{calendarDate.year()}</span>}
        {mode === "years" && (
          <>
            <span>{firstYear}</span>
            <span className="dash">&ndash;</span>
            <span>{lastYear}</span>
          </>
        )}
      </div>
      <IconButton state={next || mode === "months" ? "disabled" : undefined} operation="add">
        <svg
          width={16}
          height={16}
          className="icon"
          data-testid="icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 21l10-9L7 3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconButton>
    </div>
  );
};
