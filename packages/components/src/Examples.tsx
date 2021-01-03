import React, { useEffect } from "react";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import { OpenEye } from "./components/Input/__icons__";
import Pagination from "./components/Pagination";
import RadioButton from "./components/RadioButton";
import Select from "./components/Select";
import Slider from "./components/Slider";
import { Modal } from "./components/__helpers__";

const options = [
  { value: "amsterdam", label: "Amsterdam" },
  { value: "colombia", label: "Colombia" },
  { value: "sweden", label: "Sweden" },
];

const Examples: React.FC = () => {
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
      <Pagination
        totalPages={1}
        hideIfOne={false}
        // currentPage={2}
        // surroundingPageCount={3}
        // hrefBuilder={page => `https://georgekrax.com/${page}`}
        // onPageChanged={(_, page) => {
        //   console.log(page);

        // e.preventDefault();
        // console.log(page);
        // }}
      />
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
      <Input
        // label="Label"
        // helptext={{ value: "Help text" }}
        // secondhelptext={{ value: "2nd Help text" }}
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
