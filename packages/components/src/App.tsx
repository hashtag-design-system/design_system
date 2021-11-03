import { Box, Button as ChakraButton, ChakraProvider, IconButton, InputLeftAddon, NumberInputStepper } from "@chakra-ui/react";
// import { ChevronDownIcon, createIcon } from "@hashtag-design-system/icons/build/index.js";
import { Icon } from "@hashtag-design-system/icons/build/index.js";
import "@hashtag-design-system/primitives/src/globals.scss";
import { useEffect } from "react";
import Form from "./components/Form";
import Input from "./components/Input";
import "./index.scss";
import theme from "./theme";

// const Icon = Down({});

// type InitialDataType = {
//   id: number;
//   amount: number;
//   hey: string;
//   test: boolean;
//   username: string;
// };

// const data: InitialDataType[] = [
//   { id: 1, amount: 0.75, hey: "hey", test: true, username: "georgekrax" },
//   { id: 2, amount: 1.0, hey: "hey", test: false, username: "me" },
//   { id: 3, amount: 0.65, hey: "hey", test: false, username: "skg" },
//   { id: 4, amount: 1.5, hey: "hey", test: true, username: "spoon" },
// ];

// export const CloseAdd = addIcon({
//   displayName: "CloseIcon",
//   d:
//     "M22.033 2.472a.75.75 0 01-.005 1.061L13.476 12l8.552 8.467a.75.75 0 01-1.056 1.066l-8.563-8.478-8.381 8.299a.75.75 0 01-1.056-1.066L11.344 12 2.972 3.712a.75.75 0 111.056-1.066l8.382 8.299 8.562-8.478a.75.75 0 011.061.005z",
// });

// export const Close = createIcon({
//   displayName: "CloseIcon",
//   d:
//     "M22.033 2.472a.75.75 0 01-.005 1.061L13.476 12l8.552 8.467a.75.75 0 01-1.056 1.066l-8.563-8.478-8.381 8.299a.75.75 0 01-1.056-1.066L11.344 12 2.972 3.712a.75.75 0 111.056-1.066l8.382 8.299 8.562-8.478a.75.75 0 011.061.005z",
// });

function App() {
  // const [isChecked, setIsChecked] = useState(false);
  // const { ref: selectionInputRef, onClick, inputs } = useSelectionInput({
  //   type: "radio",
  //   inputsLength: 5,
  //   defaultChecked: [true, true],
  // });
  // const ref = useRef<HTMLDivElement>(null);
  // console.log(Down, IconDown);

  useEffect(() => {
    // if (ref && ref.current) ref.current.focus();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
      <div className="App">
        <Box bg="brand.secondary" style={{ width: 100, height: 100 }} />
        <Icon.Close bg="gray.400" />
        {/* <CloseAdd bg="gray.400" /> */}
        <IconButton aria-label="hey" onClick={() => console.log("hey")}>
          {/* <ChevronDownIcon /> */}
        </IconButton>
        <ChakraButton colorScheme="teal">Button</ChakraButton>
        {/* <button onClick={() => setMax(50)}>Click me!</button>
        <button onClick={() => setMax(30)}>Click me!</button>
        <button onClick={() => setMax(40)}>Click me!</button> */}
        {/* <Form.Control id="first-name" isOptional> */}
        <Form.Control>
          <Input.Group>
            <Input.Password label="Password" />
            {/* <InputRightAddon>hey</InputRightAddon> */}
          </Input.Group>
        </Form.Control>
        <Form.Control isOptional>
          <Form.Label>First name</Form.Label>
          <Input.Group size="md">
            <InputLeftAddon>https://</InputLeftAddon>
            <Input placeholder="First name" maxLength={20} hasClearBtn />
            {/* <InputRightElement
              pointerEvents="none"
              width="auto"
              gridGap={4}
              marginX={4}
              children={
                <>
                  <PhoneIcon color="gray.300" />
                  <div>hey</div>
                </>
              }
            /> */}
            {/* <InputRightAddon>@george</InputRightAddon> */}
          </Input.Group>
          <Form.ErrorMessage>error</Form.ErrorMessage>
          <Form.HelperText>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur deleniti cupiditate numquam ut. Repudiandae impedit
            quisquam iusto voluptatum soluta fugiat!
          </Form.HelperText>
        </Form.Control>
        <Form.Control isOptional>
          <Form.Label>Label</Form.Label>
          <Input.Group size="md">
            {/* <InputLeftElement>https://</InputLeftElement> */}
            <Input.TextArea placeholder="Placeholder" hasClearBtn />
          </Input.Group>
        </Form.Control>
        <Input.NumberGroup
          format={val => "$" + val}
          max={20}
          placeholder="Placeholder"
          defaultValue={15}
          onChange={newVal => console.log(newVal)}
        >
          <Input.Number onChange={newVal => console.log(newVal.target.value)} />
          <NumberInputStepper>
            <Input.NumberStepper type="increment" />
            <Input.NumberStepper type="decrement" />
          </NumberInputStepper>
        </Input.NumberGroup>

        {/* <Form.Control isOptional>
          <Form.Label>First name</Form.Label>
          <Input placeholder="First name" maxLength={20} />
          <Textarea maxLength={50} />
          <Form.ErrorMessage>error</Form.ErrorMessage>
          <Form.HelperText>Helper text</Form.HelperText>
        </Form.Control> */}
      </div>
    </ChakraProvider>
  );
}

export default App;

//   <ConfigProvider<ConfigProviderFProps<{ hey: string }>> colors={{ hey: "50" }}>
//     <RadioButton onValue={val => console.log(val)} />
//     <Switch label={<strong>Hey</strong>} />
//     {/* <Input2 placeholder="Month" optional /> */}
//     <Input2.Number placeholder="Month" floatingplaceholder none onValue={newVal => console.log(newVal)} />
//     <Select multiSelectable placeholder="Projects" onSelect={items => console.log(items.filter(({ selected }) => selected))}>
//       <Select.Button style={{ width: "200px" }}>Project</Select.Button>
//       <Select.Modal>
//         <Select.Options>
//           <Select.Item defaultChecked id="hey_george" content="Hey george" />
//           <Select.Item defaultChecked id="amsterdam" content="Amsterdam" htmlContent={{ after: <p>george</p> }} />
//           <Select.Item id="georgekrax" content="georgekrax" />
//           <Select.Item id="georgekrax2" content="georgekrachtopoulos" />
//           <Select.Item id="test_id" content=" Amsterdam" htmlContent={{ before: <strong>NL</strong> }} />
//         </Select.Options>
//       </Select.Modal>
//     </Select>
//     <Select>
//       <Select.Button>Opening</Select.Button>
//       <Select.Modal fullWidth>
//         <Select.Options>
//           {[0, 1, 2].map(val => (
//             <Select.Item key={"category_" + val} id={val.toString()} content={val.toString()} />
//           ))}
//         </Select.Options>
//       </Select.Modal>
//     </Select>
//     <Input2.Multiline placeholder="Month" floatingplaceholder onChange={e => console.log(e.target.value)} />
//     <DatePicker
//       // defaultOpen
//       // isRange
//       // defaultMode="months"
//       // mobileView
//       allowedModes={{ calendar: false, months: true, years: false }}
//       // defaultCalendarDate={TEST_DEFAULT_DATE}
//       // defaultDates={[dayjs().startOf("month")]}
//       // allowedModes={{ calendar: false, months: true, years: true }}
//       // dismissOnClick={false}
//       onClick={({ selectedDate }) => console.log("click", selectedDate.date())}
//       // onChange={({ selectedDate, isShown }) => console.log(isShown, selectedDate[0].format("YYYY-MM-DD"))}
//       // disabledDays={{
//       //   days: [dayjs().set("date", 30)],
//       //   from: { date: dayjs() },
//       //   till: {
//       //     // parse: date => date.set("date", 29),
//       //     // date: dayjs().add(10, "year").date(dayjs().add(3, "months").daysInMonth()),
//       //     // date: dayjs().add(20, "year"),
//       //     date: dayjs().add(20, "days"),
//       //   },
//       // }}
//       selectBtn={({ selectedDate }) => {
//         return <Select.Button>{selectedDate.length >= 1 ? selectedDate[0].format("DD/MM/YYYY") : ""}</Select.Button>;
//       }}
//     />
//     <Dialog isShown={false} overlayProps={{ background: { color: "light" } }}>
//       <Dialog.Btn.Close />
//       <Dialog.Content>
//         {/* <Dialog.Title>Are you sure you want to cancel your reservation?</Dialog.Title> */}
//         <Dialog.Title>
//           Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content
//           here. Dialog content here. Dialog content here. Dialog content here.
//         </Dialog.Title>
//       </Dialog.Content>
//       <Dialog.Btn.Group>
//         <Dialog.Btn>Cancel</Dialog.Btn>
//         <Dialog.Btn confirm>Confirm</Dialog.Btn>
//       </Dialog.Btn.Group>
//     </Dialog>
//     {/* <TimePicker>
//     <TimePicker.Content showLabels={{ hasHours: true, hasMinutes: true, hasSeconds: true }}>
//       <TimePicker.Hours />
//       <TimePicker.Minutes />
//       <TimePicker.Seconds onSlideChange={swiper => console.log(swiper.realIndex)} />
//     </TimePicker.Content>
//   </TimePicker> */}
//     <div
//       style={{
//         width: "fit-content",
//         height: "fit-content",
//         padding: "1em",
//         background: "linear-gradient(to right, #ec008c, #fc6767)",
//       }}
//     >
//       <CreditCard brand="AMEX" creditNum="8878" ownerName="George Krachtopoulos" expirationDate="03/22" />
//     </div>
//     <Form.Group as="form">
//       <Input2
//         label="Label"
//         placeholder="Password"
//         secondhelptext={{ value: undefined, error: true }}
//         // floatingplaceholder={true}
//         // forwardref={ref}
//       />
//     </Form.Group>
//     <Button variant="secondary" onClick={() => setIsChecked(true)}>
//       Click me
//     </Button>
//     {/* <Autosuggest onChange={value => console.log(value)} placeholder="Filter"> */}
//     {/* <Select.Item id="hey_george" content="Hey_george" htmlContent={{ after: <div>Hey</div> }} />
//   <Select.Item id="amsterdamgeorge" content="Amsterdam george" />
//   <Select.Item id="amsterdam" content="Amsterdam" />
//   <Select.Item id="hey" content="Hey" />
//   <Select.Item id="me" content="Me" />
//   <Select.Item id="me2" content="Me2" /> */}
//     {/* <Select.Countries /> */}
//     {/* <Select.Item id="georgekrax4" content="Me3" />
//       <Select.Item id="georgekrax4" content="Me3" />
//       <Select.Item id="georgekrax5" content="Me4" />
//       <Select.Item id="georgekrax6" content="Me5" />
//       <Select.Item id="georgekrax7" content="Me7" />
//       <Select.Item id="georgekrax8" content="Me8" />
//       <Select.Item id="georgekrax9" content="Me9" /> */}
//     {/* </Autosuggest> */}
//     {/* <Button pill>Button</Button>
//   <form>
//     <Input.Number defaultValue={0} onChange={e => console.log(e.target.value)} />
//     <button type="submit">Submit</button>
//   </form> */}
//     {/* <Input.IncrDcr defaultValue={1} min={1} max={12} onValue={val => console.log(val)} /> */}
//     <BottomSheet isShown={false} defaultY={200} hugContentsHeight={false} onDismiss={() => setIsChecked(false)}>
//       {({ dismiss }) => (
//         <div>
//           <BottomSheet.ScrollBar />
//           <Dialog.Content>
//             <Button onClick={async () => await dismiss()}>Click me</Button>
//             <div>hey</div>
//             <div>hey</div>
//             <div>hey</div>
//           </Dialog.Content>
//         </div>
//       )}
//     </BottomSheet>
//     {/* <BottomSheet isShown={isChecked} onDismiss={() => setIsChecked(false)}>
//     {({ dismiss }) => (
//       <Dialog.Content>
//         <Button onClick={async () => await dismiss()}>Button</Button>
//         <Button onClick={async () => await dismiss()}>Button</Button>
//         <Button onClick={async () => await dismiss()}>Button</Button>
//         <Button onClick={async () => await dismiss()}>Button</Button>
//         <Button onClick={async () => await dismiss()}>Button</Button>
//         <Button onClick={async () => await dismiss()}>Button</Button>
//         <Button onClick={async () => await dismiss()}>Button</Button>
//         <Button onClick={async () => await dismiss()}>Button</Button>
//       </Dialog.Content>
//     )}
//   </BottomSheet> */}
//     <Table extraColumn={{ component: "checkbox", withBorderRight: true, totalRows: 5, selectedRows: row => console.log(row) }}>
//       <Table.THead>
//         <Table.Tr idx={0}>
//           <Table.Th>ID</Table.Th>
//           <Table.Th>Amount</Table.Th>
//           <Table.Th>Hey</Table.Th>
//           <Table.Th>Test</Table.Th>
//           <Table.Th>Username</Table.Th>
//         </Table.Tr>
//       </Table.THead>
//       <Table.TBody>
//         {data.map(({ id, amount, hey, test, username }, i) => {
//           return (
//             <Table.Tr key={i} idx={i + 1}>
//               <Table.Td>{id}</Table.Td>
//               <Table.Td>{amount}</Table.Td>
//               <Table.Td>{hey}</Table.Td>
//               <Table.Td>{String(test).toUpperCase()}</Table.Td>
//               <Table.Td>{username}</Table.Td>
//             </Table.Tr>
//           );
//         })}
//       </Table.TBody>
//     </Table>
//     {/* <Checkbox
//     // state="disabled|checked"
//     // defaultChecked={true}
//     checked={isChecked}
//     onChange={e => setIsChecked(e.currentTarget.value === "true" ? false : true)}
//     label={{
//       value:
//         // "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, voluptates. Doloremque nemo, earum corporis error eum vero nostrum nesciunt, reiciendis dolorum tempora vitae voluptatum reprehenderit nam fuga beatae temporibus dolores!",
//     }}
//   /> */}
//     {/* <div>
//     <RadioButton
//       checked={inputs[0].isChecked}
//       onClick={onClick}
//       ref={element => (selectionInputRef.current[0] = element)}
//       label={{ value: "Label 1" }}
//       // name="header"
//     />
//     <RadioButton
//       checked={inputs[1].isChecked}
//       onClick={onClick}
//       ref={element => (selectionInputRef.current[1] = element)}
//       label={{ value: "Label 2" }}
//     />
//     <RadioButton
//       checked={inputs[2].isChecked}
//       onClick={onClick}
//       ref={element => (selectionInputRef.current[2] = element)}
//       label={{ value: "Label 3" }}
//     />
//     <RadioButton
//       checked={inputs[3].isChecked}
//       onClick={onClick}
//       ref={element => (selectionInputRef.current[3] = element)}
//       label={{ value: "Label 4" }}
//     />
//     <RadioButton
//       checked={inputs[4].isChecked}
//       onClick={onClick}
//       ref={element => (selectionInputRef.current[4] = element)}
//       label={{ value: "Label 5" }}
//     />
//   </div> */}
//     {/* <div>
//   <Checkbox
//     state={inputs[0].state}
//     checked={inputs[0].isChecked}
//     onClick={onClick}
//     ref={element => (selectionInputRef.current[0] = element)}
//     label={{ value: "Label 1" }}
//     name="header"
//   />
//   <Checkbox
//     state={inputs[1].state}
//     checked={inputs[1].isChecked}
//     onClick={onClick}
//     ref={element => (selectionInputRef.current[1] = element)}
//     label={{ value: "Label 2" }}
//   />
//   <Checkbox
//     state={inputs[2].state}
//     checked={inputs[2].isChecked}
//     onClick={onClick}
//     ref={element => (selectionInputRef.current[2] = element)}
//     label={{ value: "Label 3" }}
//   />
//   <Checkbox
//     state={inputs[3].state}
//     checked={inputs[3].isChecked}
//     onClick={onClick}
//     ref={element => (selectionInputRef.current[3] = element)}
//     label={{ value: "Label 4" }}
//   />
//   <Checkbox
//     state={inputs[4].state}
//     checked={inputs[4].isChecked}
//     onClick={onClick}
//     ref={element => (selectionInputRef.current[4] = element)}
//     label={{ value: "Label 5" }}
//   />
// </div> */}
//     <Animated.Loading.Dots />
//   </ConfigProvider>
