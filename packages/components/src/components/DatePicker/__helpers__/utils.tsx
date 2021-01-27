import dayjs from "dayjs";
import React from "react";
import Select from "../../Select";
import DatePicker, { DatePickerFProps, DatePickerOnChangeInfo } from "../index";

type FProps = DatePickerFProps;

export const TEST_DEFAULT_DATE = dayjs("2021-01-26");

export const DefaultDatePicker: React.FC<FProps> = ({ ...props }) => {
  return <DatePicker defaultOpen defaultDates={[TEST_DEFAULT_DATE]} defaultCalendarDate={TEST_DEFAULT_DATE} {...props} />;
};

export const TestDatePickerButton: React.FC<Pick<DatePickerOnChangeInfo, "selectedDate">> = ({ selectedDate }) => (
  <Select.Button>{selectedDate.length >= 1 ? selectedDate[0].format("DD/MM/YYYY") : ""}</Select.Button>
);
