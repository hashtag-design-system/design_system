// TODO: Remove afterwards removing the <Checkbox /> label Prop
import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import Animated from "./components/Animated";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import DatePicker from "./components/DatePicker";
import Input from "./components/Input";

// https://stackoverflow.com/questions/44497388/typescript-array-to-string-literal-type

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  });

  return (
    <div className="App">
      {/* <Button pill onClick={() => setIsChecked(!isChecked)}> */}
      <button style={{ padding: "1em 2em" }} onClick={() => setIsChecked(true)}>
        Click me
      </button>
      <Button pill>Button</Button>
      <DatePicker
        defaultOpen
        isRange
        // defaultMode="months"
        // mobileView
        // allowedModes={{ calendar: false, months: true, years: false }}
        // defaultCalendarDate={TEST_DEFAULT_DATE}
        // defaultDates={[dayjs().startOf("month")]}
        // allowedModes={{ calendar: false, months: true, years: true }}
        // dismissOnClick={false}
        // onClick={({ e, dayInCalendar }) => console.log(e, dayInCalendar.date())}
        // onChange={({ bottomSheetIsShown }) => console.log(bottomSheetIsShown)}
        // disabledDays={{
        //   days: [dayjs().set("date", 30)],
        //   from: { date: dayjs() },
        //   till: {
        //     // parse: date => date.set("date", 29),
        //     // date: dayjs().add(10, "year").date(dayjs().add(3, "months").daysInMonth()),
        //     // date: dayjs().add(20, "year"),
        //     date: dayjs().add(20, "days"),
        //   },
        // }}
        // selectBtn={({ selectedDate }) => (
        //   <Select.Button>{selectedDate.length >= 1 ? selectedDate[0].format("DD/MM/YYYY") : ""}</Select.Button>
        // )}
      />
      <Checkbox
        // state="disabled|checked"
        // defaultChecked={true}
        checked={isChecked}
        onChange={e => console.log(e.currentTarget.value)}
        label={{
          value:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, voluptates. Doloremque nemo, earum corporis error eum vero nostrum nesciunt, reiciendis dolorum tempora vitae voluptatum reprehenderit nam fuga beatae temporibus dolores!",
        }}
      />
      <Animated.Loading.Dots />
      <Input
        // label="Label"
        secondhelptext={{ value: "2nd Help text", error: true }}
        // floatingplaceholder={true}
        placeholder="Placeholder"
      />
      <Input.Number />
    </div>
  );
}

export default App;
