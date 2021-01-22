import React, { useEffect, useState } from "react";
import Autosuggest from "./components/Autosuggest";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Dialog from "./components/Dialog";
import Form from "./components/Form";
import Input from "./components/Input";
import { OpenEye } from "./components/Input/__icons__";
import Pagination from "./components/Pagination";
import RadioButton from "./components/RadioButton";
import Select from "./components/Select";
import Slider from "./components/Slider";
import Switch from "./components/Switch";
import Table from "./components/Table";
import { Modal } from "./components/__helpers__";
import { useSortableData } from "./utils/hooks";

type InitialDataType = {
  id: number;
  amount: number;
  hey: string;
  test: boolean;
  username: string;
};

const initialData: InitialDataType[] = [
  { id: 1, amount: 0.75, hey: "hey", test: true, username: "georgekrax" },
  { id: 2, amount: 1.0, hey: "hey", test: false, username: "me" },
  { id: 3, amount: 0.65, hey: "hey", test: false, username: "skg" },
  { id: 4, amount: 1.5, hey: "hey", test: true, username: "spoon" },
];

const options = [
  { value: "amsterdam", label: "Amsterdam" },
  { value: "colombia", label: "Colombia" },
  { value: "sweden", label: "Sweden" },
];

const Examples: React.FC = () => {
  const [isShown, setIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data, setSort } = useSortableData<InitialDataType>(initialData);

  const loadData = async () => {
    const res = await fetch("http://ip-api.com/json/");
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Checkbox
        label={{
          value:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, voluptates. Doloremque nemo, earum corporis error eum vero nostrum nesciunt, reiciendis dolorum tempora vitae voluptatum reprehenderit nam fuga beatae temporibus dolores!",
        }}
      />
      <Pagination
        totalPages={10}
        // currentPage={page}
        // surroundingPageCount={3}
        // hrefBuilder={page => `https://georgekrax.com/${page}`}
        onPageChange={(e, page) => {
          e.preventDefault();
          console.log(page);
        }}
        // onClick={(e, page) => {
        // e.preventDefault();
        // setPage(page);
        // console.log(page);
        // }}
      />
      <Table extraColumn={{ component: "radio", withBorderRight: true, selectedRows: e => console.log(e) }}>
        <Table.THead>
          <Table.Tr>
            <Table.Th
              sort
              onClick={(_, { direction }) => {
                setSort({ direction, key: "id" });
              }}
            >
              ID
            </Table.Th>
            <Table.Th
              sort
              onClick={(_, { direction }) => {
                setSort({ direction, key: "amount" });
              }}
            >
              Amount
            </Table.Th>
            <Table.Th
              sort
              onClick={(_, { direction }) => {
                setSort({ direction, key: "hey" });
              }}
            >
              Hey
            </Table.Th>
            <Table.Th
              sort
              onClick={(_, { direction }) => {
                setSort({ direction, key: "test" });
              }}
            >
              Test
            </Table.Th>
            <Table.Th
              sort
              onClick={(_, { direction }) => {
                setSort({ direction, key: "username" });
              }}
            >
              Username
            </Table.Th>
          </Table.Tr>
        </Table.THead>
        <Table.TBody>
          {data.map(({ id, amount, hey, test, username }, i) => {
            return (
              <Table.Tr key={i}>
                <Table.Td>{id}</Table.Td>
                <Table.Td>{amount}</Table.Td>
                <Table.Td>{hey}</Table.Td>
                <Table.Td>{String(test).toUpperCase()}</Table.Td>
                <Table.Td>{username}</Table.Td>
              </Table.Tr>
            );
          })}
        </Table.TBody>
      </Table>
      <Slider
        marks={[
          { value: 0, label: "0" },
          { value: 10, label: "10" },
          { value: 20, label: "20" },
          { value: 30, label: "30" },
          { value: 40, label: "40" },
          { value: 50, label: "50" },
          { value: 60, label: "60" },
          { value: 70, label: "70" },
          { value: 80, label: "80" },
          { value: 90, label: "90" },
          { value: 100, label: "100" },
        ]}
        zeroPercentageOnEdgeMarks
        chart={{
          type: "bar",
          data: [
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
            { value: 6 },
            { value: 7 },
            { value: 8 },
            { value: 9 },
            { value: 10 },
          ],
        }}
      />
      {/* <Select multiSelectable={false} placeholder="Projects" onSelect={e => console.log(e)}> */}
      <Select multiSelectable placeholder="Projects" onSelect={items => console.log(items)}>
        <Select.Button style={{ width: "200px" }}>Project</Select.Button>
        <Select.Modal>
          <Select.Header value="header">
            <Select.Options>
              <Select.Filter placeholder="Filter" floatingplaceholder={false} />
              <Select.Item state="hover" id="hey_george" content="Hey george" />
              <Select.Item state="focus" id="amsterdam" content="Amsterdam" htmlContent={{ after: <p>george</p> }} />
              <Select.Item state="disabled" id="georgekrax" content="georgekrax" />
              <Select.Item id="georgekrax2" content="georgekrachtopoulos" />
              <Select.Item id="test_id" content=" Amsterdam" htmlContent={{ before: <strong>NL</strong> }} />
            </Select.Options>
          </Select.Header>
        </Select.Modal>
      </Select>
      <Slider.Double
        marks={[
          { value: 0 },
          { value: 10 },
          { value: 20 },
          { value: 30 },
          { value: 40 },
          { value: 50 },
          { value: 60 },
          { value: 70 },
          { value: 80 },
          { value: 90 },
          { value: 100 },
        ]}
        zeroPercentageOnEdgeMarks
        chart={{
          type: "bar",
          data: [
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
            { value: 6 },
            { value: 7 },
            { value: 8 },
            { value: 9 },
            { value: 10 },
          ],
        }}
      />
      <RadioButton label={{ value: "Label" }} />
      <RadioButton state="disabled|checked" />
      <Pagination
        totalPages={10}
        // currentPage={page}
        // surroundingPageCount={3}
        // hrefBuilder={page => `https://georgekrax.com/${page}`}
        // onPageChange={(e, page) => {
        //   e.preventDefault();
        //   console.log(e);
        // }}
        // onClick={(e, page) => {
        //   // e.preventDefault();
        //   setPage(page);
        //   console.log(page);
        // }}
      />
      <Pagination
        totalPages={1}
        hideIfOne={false}
        // currentPage={2}
        // surroundingPageCount={3}
        // hrefBuilder={page => `https://georgekrax.com/${page}`}
        onPageChange={(e, page) => {
          e.preventDefault();
          console.log(page);
        }}
      />
      <Select width="200px" placeholder="Projects" onSelect={items => console.log(items)}>
        <Select.Button>Project</Select.Button>
        <Select.Modal fullWidth>
          {/* <Select.Header value="header" /> */}
          <Select.Filter bold={true} placeholder="Filter" floatingplaceholder={false} />
          <Select.Options>
            {/* <Select.Countries /> */}
            {/* <Select.Item id="hey_george" content="Hey_george" state="disabled" valueAlternative="hey" /> */}
            <Select.Countries />
            {/* <Select.Item id="amsterdam" content="Amsterdam george" valueAlternative="hey" />
              <Select.Item id="amsterdamstrong" content="Amsterdam" />
              <Select.Item id="georgekrax" content="Hey" />
              <Select.Item id="georgekrax2" content="Me" />
              <Select.Item id="georgekrax3" content="Me3" />
              <Select.Item id="georgekrax4" content="Me4" />
              <Select.Item id="georgekrax5" content="Me5" />
              <Select.Item id="georgekrax6" content="Me6" />
              <Select.Item id="georgekrax7" content="Me7" />
              <Select.Item id="georgekrax8" content="Me8" /> */}
          </Select.Options>
        </Select.Modal>
      </Select>
      <Autosuggest onChange={value => console.log(value)} placeholder="Filter">
        {/* <Select.Item id="hey_george" content="Hey_george" htmlContent={{ after: <div>Hey</div> }} />
        <Select.Item id="amsterdamgeorge" content="Amsterdam george" />
        <Select.Item id="amsterdam" content="Amsterdam" />
        <Select.Item id="hey" content="Hey" />
        <Select.Item id="me" content="Me" />
        <Select.Item id="me2" content="Me2" /> */}
        <Select.Countries />
        {/* <Select.Item id="georgekrax4" content="Me3" />
            <Select.Item id="georgekrax4" content="Me3" />
            <Select.Item id="georgekrax5" content="Me4" />
            <Select.Item id="georgekrax6" content="Me5" />
            <Select.Item id="georgekrax7" content="Me7" />
            <Select.Item id="georgekrax8" content="Me8" />
            <Select.Item id="georgekrax9" content="Me9" /> */}
      </Autosuggest>
      <Select multiSelectable mobileView={false} onSelect={items => console.log(items)}>
        <Select.Button style={{ width: "200px" }}>Project</Select.Button>
        <Select.Modal>
          <Select.Header value="header" />
          <Select.Filter placeholder="Filter" floatingplaceholder={false} />
          <Select.Options>
            <Select.Item id="hey_george" content="Hey george" />
            <Select.Item id="amsterdam" content="Amsterdam" htmlContent={{ after: <strong>george</strong> }} />
            <Select.Item id="georgekrax" content="georgekrax" />
            <Select.Item id="georgekrax2" content="georgekrachtopoulos" />
            <Select.Item id="georgekrax2" content="georgekrachtopoulos" />
            <Select.Item id="test_id" content=" Amsterdam" htmlContent={{ before: <strong>NL</strong> }} />
          </Select.Options>
        </Select.Modal>
      </Select>
      <Form onSubmit={d => console.log(d)} defaultValues={{ text: "georgerkax", number: 5 }}>
        <Input name="text" placeholder="Placeholder" floatingplaceholder={true} />
        <Input.Number name="number" />
        <Button type="submit">Submit</Button>
      </Form>
      <div>
        <Form.Header withBorder={false}>HEADER</Form.Header>
        <Form.Group>
          <Input.Number label="Label" />
        </Form.Group>
      </div>
      <Switch insideText={{ value: "hedcsdfsdffsfdsdy", position: "toggle" }} />
      <Switch />
      <Button onClick={() => setIsShown(true)}>Click me</Button>
      <Dialog
        loading={isLoading}
        allowDismissOnLoading
        isShown={isShown}
        overlayProps={{ background: { color: "light" } }}
        onDismiss={(e, { cancel }) => {
          if (!cancel) {
            setIsLoading(true);
            setTimeout(() => {
              setIsShown(false);
              setIsLoading(false);
            }, 2000);
          } else {
            if (!cancel) {
              setIsLoading(true);
              setTimeout(() => {
                setIsShown(false);
                setIsLoading(false);
              }, 2000);
            } else {
              if (true) {
                setIsShown(false);
              }
            }
          }
        }}
      >
        <Dialog.Btn.Close />
        <Dialog.Content>
          {/* <Dialog.Title>Are you sure you want to cancel your reservation?</Dialog.Title> */}
          <Dialog.Title>
            Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content
            here. Dialog content here. Dialog content here. Dialog content here.
          </Dialog.Title>
        </Dialog.Content>
        <Dialog.Btn.Group>
          <Dialog.Btn>Cancel</Dialog.Btn>
          <Dialog.Btn confirm>Confirm</Dialog.Btn>
        </Dialog.Btn.Group>
      </Dialog>
      <Input.Tel defaultCountry="GREECE" inputProps={{ value: "6974954916" }} />
      <Slider
        marks={[
          { value: 0, label: "0" },
          { value: 10, label: "10" },
          { value: 20, label: "20" },
          { value: 30, label: "30" },
          { value: 40, label: "40" },
          { value: 50, label: "50" },
          { value: 60, label: "60" },
          { value: 70, label: "70" },
          { value: 80, label: "80" },
          { value: 90, label: "90" },
          { value: 100, label: "100" },
        ]}
        lockOnMarks
        zeroPercentageOnEdgeMarks
        chart={{
          type: "bar",
          data: [
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
            { value: 6 },
            { value: 7 },
            { value: 8 },
            { value: 9 },
            { value: 10 },
          ],
        }}
      />
      <RadioButton label={{ value: "Label" }} />
      <Modal.Overlay grayscale isShown={true}>
        Hey
      </Modal.Overlay>
      <Switch />
      <Input
        // label="Label"
        // helptext={{ value: "Help text" }}
        // secondhelptext={{ value: "2nd Help text", error: true }}
        // characterLimit
        // maxLength={30}
        // state="disabled"
        placeholder="Placeholder"
        floatingplaceholder={false}
        // defaultValue="georgekraxt@gmail.com"
        // prefix="€"
        // prefix={<OpenEye />}
        // suffix="€"
        // suffix={<OpenEye />}
        // forwardref={ref}
      />
      <Input.Password label="Label" placeholder="Password" />
      <Input.Multiline label="Label" placeholder="Multiline" onChange={e => console.log(e.target.value)} />
      <Input.IncrDcr state="default" />
      <Input.Digit state="error" />
      <Input.DigitSequence numberOfDigits={6} helptext={{ value: "george", icon: <OpenEye /> }} />
    </div>
  );
};
