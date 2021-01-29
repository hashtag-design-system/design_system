import React from "react";
import "swiper/swiper.scss";
import { useIsMobile } from "../../utils/hooks";
import BottomSheet, { BottomSheetFProps } from "../BottomSheet";
import Dialog from "../Dialog";
import Content from "./Content";
import Hours from "./Hours";
import Minutes from "./Minutes";
import Seconds from "./Seconds";

type SubComponents = {
  Hours: typeof Hours;
  Minutes: typeof Minutes;
  Seconds: typeof Seconds;
  Content: typeof Content;
};

export type Props = {
  mobileView?: boolean;
  bottomSheetProps?: BottomSheetFProps;
};

export type FProps = Props;

const TimePicker: React.FC<FProps> & SubComponents = ({ mobileView, bottomSheetProps, children }) => {
  const { isMobile } = useIsMobile(mobileView);

  return isMobile ? (
    <BottomSheet
      isShown={bottomSheetProps?.isShown || false}
      dragElastic={0}
      allowedPositions={{ middle: true, expanded: false, hidden: false }}
      {...bottomSheetProps}
    >
      <Dialog.Content className="flex-column-center-center">
        <>{children}</>
      </Dialog.Content>
    </BottomSheet>
  ) : (
    <>{children}</>
  );
};

TimePicker.Hours = Hours;
TimePicker.Minutes = Minutes;
TimePicker.Seconds = Seconds;
TimePicker.Content = Content;

TimePicker.displayName = "TimePicker";

export default TimePicker;
