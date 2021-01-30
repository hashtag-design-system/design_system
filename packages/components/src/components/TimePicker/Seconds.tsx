import React from "react";
import { SwiperCol, TimePickerSwiperColFProps } from "./__helpers__/index";

export type FProps = TimePickerSwiperColFProps;

const Seconds: React.FC<FProps> = ({ ...props }) => {
  return <SwiperCol {...props} />;
};

Seconds.displayName = "TimePickerSeconds";

export default Seconds;
