import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../config/storybook";
import Dropdown, { DropdownOptionsBoxFProps } from "../Dropdown";
import Select, { SelectFProps } from "./index";

const options = [
  { value: "amsterdam", label: "Amsterdam" },
  { value: "colombia", label: "Colombia" },
  { value: "sweden", label: "Sweden" },
];

export default {
  title: `${titleGroups.FORM}/Select`,
  component: Select,
  args: {
    options,
    maxHeight: 200,
    floatingplaceholder: true,
    optionsBoxDisplayBlock: false,
  },
  argTypes: {
    floatingplaceholder: {
      control: {
        type: "boolean",
      },
    },
    optionsBoxDisplayBlock: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta;

const Template: Story<SelectFProps & DropdownOptionsBoxFProps & { options: typeof options; optionsBoxDisplayBlock: boolean }> = ({
  options,
  maxHeight,
  floatingplaceholder,
  optionsBoxDisplayBlock,
  ...args
}) => (
  <Select placeholder="hey" floatingplaceholder={floatingplaceholder} {...args}>
    <Dropdown.OptionsBox maxHeight={maxHeight} className={optionsBoxDisplayBlock ? "block" : ""}>
      {options.map((option, i) => (
        <Dropdown.Item key={i} id={option.value}>
          {option.label}
        </Dropdown.Item>
      ))}
      <Dropdown.ItemGroup title="Group">
        <Dropdown.Item id="not_configurable">This item is not configurable</Dropdown.Item>
        <Dropdown.Item id="not_configurable">This item is not configurable</Dropdown.Item>
      </Dropdown.ItemGroup>
    </Dropdown.OptionsBox>
  </Select>
);

export const Default = Template.bind({});
Default.args = {
  state: "default",
};

export const Hover = Template.bind({});
Hover.args = {
  state: "hover",
};

export const Focus = Template.bind({});
Focus.args = {
  state: "focus",
};

export const Success = Template.bind({});
Success.args = {
  state: "success",
};

export const Error = Template.bind({});
Error.args = {
  state: "error",
};

export const Disabled = Template.bind({});
Disabled.args = {
  state: "disabled",
};
