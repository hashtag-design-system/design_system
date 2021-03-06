import React from "react";
import { SwiperCol, TimePickerSwiperColFProps } from "./__helpers__/index";

export type FProps = TimePickerSwiperColFProps;

const Hours: React.FC<FProps> = ({ ...props }) => {
  return <SwiperCol max={100} {...props} />;
};

Hours.displayName = "TimePickerHours";

export default Hours;
