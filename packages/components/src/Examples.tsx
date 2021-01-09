import React, { useEffect, useState } from "react";
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
              <Select.Item state="hover" id="hey_george">
                Hey george
              </Select.Item>
              <Select.Item state="focus" id="amsterda,">
                Amsterdam<p>george</p>
              </Select.Item>
              <Select.Item state="disabled" id="georgekrax">
                georgekrax
              </Select.Item>
              <Select.Item id="georgekrax2">georgekrachropou;os</Select.Item>
              <Select.Item id="test_id">
                <strong>NL</strong> Amsterdam
              </Select.Item>
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
      <Select multiSelectable mobileView onSelect={items => console.log(items)}>
        <Select.Button style={{ width: "200px" }}>Project</Select.Button>
        <Select.Modal>
          <Select.Header value="header" />
          <Select.Filter placeholder="Filter" floatingplaceholder={false} />
          <Select.Options>
            <Select.Item id="hey_george">Hey george</Select.Item>
            <Select.Item id="amsterda,">
              Amsterdam<p>george</p>
            </Select.Item>
            <Select.Item id="georgekrax">georgekrax</Select.Item>
            <Select.Item id="georgekrax2">georgekrachropou;os</Select.Item>
            <Select.Item id="georgekrax2">georgekrachropou;os</Select.Item>
            <Select.Item id="georgekrax2">georgekrachropou;os</Select.Item>
            <Select.Item id="georgekrax2">georgekrachropou;os</Select.Item>
            <Select.Item id="georgekrax2">georgekrachropou;os</Select.Item>
            <Select.Item id="georgekrax2">georgekrachropou;os</Select.Item>
            <Select.Item id="georgekrax2">georgekrachropou;os</Select.Item>
            <Select.Item id="georgekrax2">georgekrachropou;os</Select.Item>
            <Select.Item id="test_id">
              <strong>NL</strong> Amsterdam
            </Select.Item>
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
      <Button onClick={() => setIsShown(true)}>Click me</Button>
      <Dialog
        isShown={isShown}
        bgColor="light"
        onDismiss={() => {
          setIsShown(false);
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
          <Dialog.Btn variant="secondary">Cancel</Dialog.Btn>
          <Dialog.Btn>Confirm</Dialog.Btn>
        </Dialog.Btn.Group>
      </Dialog>
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
