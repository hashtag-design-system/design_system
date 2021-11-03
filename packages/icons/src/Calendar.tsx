import { Icon, IconProps } from "@chakra-ui/icons";
import { forwardRef } from "@chakra-ui/system";
import { IconSVG, Path } from "./utils";

type Props = IconProps & {
  // prettier-ignore
  date?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | (number & {});
};

const Date: React.FC<
  Pick<Props, "date"> & Pick<React.ComponentPropsWithoutRef<"text">, "y" | "fill">
> = ({ date, fill = "currentColor", y = "67.5%" }) => {
  return date === undefined ? null : (
    <text
      className="bold"
      style={{ fontSize: "7px" }}
      x="52%"
      y={y}
      fill={fill}
      dominantBaseline="middle"
      textAnchor="middle"
    >
      {date}
    </text>
  );
};

// @ts-expect-error
export const Calendar: IconSVG<{ Filled: typeof CalendarFilled }> = forwardRef<
  Props,
  "svg"
  >(({ date, viewBox = "0 0 24 24", ...props }, ref) => (
    <Icon ref={ref} viewBox={viewBox} {...props}>
    <Path d="M8.944 2.25a.75.75 0 01.75.75v1.05h5.612V3a.75.75 0 111.5 0v1.05h1.916c1.405 0 2.528 1.15 2.528 2.55v12.6c0 1.4-1.123 2.55-2.528 2.55H6.278c-1.405 0-2.528-1.15-2.528-2.55V6.6c0-1.4 1.123-2.55 2.528-2.55h1.916V3a.75.75 0 01.75-.75zm-.75 3.3H6.278A1.04 1.04 0 005.25 6.6v2.85h14.5V6.6a1.04 1.04 0 00-1.028-1.05h-1.916v1.5a.75.75 0 01-1.5 0v-1.5H9.694v1.5a.75.75 0 11-1.5 0v-1.5zm11.556 5.4H5.25v8.25c0 .589.469 1.05 1.028 1.05h12.444a1.04 1.04 0 001.028-1.05v-8.25z" />
    <Date date={date} />
  </Icon>
));

export const CalendarFilled = forwardRef<Props, "svg">(
  ({ date, viewBox = "0 0 24 24", ...props }, ref) => (
    <Icon ref={ref} viewBox={viewBox} {...props}>
      <Path d="M8.444 2.25a.75.75 0 01.75.75v1.05h5.612V3a.75.75 0 111.5 0v1.05h1.916c1.405 0 2.528 1.15 2.528 2.55v12.6c0 1.4-1.123 2.55-2.528 2.55H5.778c-1.405 0-2.528-1.15-2.528-2.55V6.6c0-1.4 1.123-2.55 2.528-2.55h1.916V3a.75.75 0 01.75-.75z" />
      <Path fill="white" d="M20.75 9.45v1.5H3.25v-1.5h17.5z" />
      <Date fill="white" y="71%" date={date} />
    </Icon>
  )
);

CalendarFilled.displayName = "CalendarFilledIcon";

Calendar.Filled = CalendarFilled;

Calendar.displayName = "CalendarIcon";
