import dayjs, { Dayjs } from "dayjs";

export const getDecade = (date: Dayjs | Date = dayjs()) => {
  let yearArr = [];
  if (date instanceof Date) {
    yearArr = [...date.getFullYear().toString()];
  } else {
    yearArr = [...date.year().toString()];
  }

  const century = yearArr.slice(0, 2);
  const decadeNum = String(parseInt(yearArr[2]) * 10).padEnd(2, "0");
  const decade = parseInt(century.join("") + decadeNum);
  return decade;
};
