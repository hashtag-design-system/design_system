import React from "react";
import { SwiperCol, TimePickerSwiperColFProps } from "./__helpers__/index";

export type FProps = TimePickerSwiperColFProps;

const Minutes: React.FC<FProps> = ({ ...props }) => {
  return <SwiperCol {...props} />;
};

Minutes.displayName = "TimePickerMinutes";

export default Minutes;
