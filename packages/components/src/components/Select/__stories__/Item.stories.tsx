import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../../config/storybook";
import Select, { SelectItemSBProps } from "../index";

export default {
  title: `${titleGroups.FORM_SELECT}/Item`,
  component: Select.Item,
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
    defaultChecked: {
      control: {
        type: "boolean",
      },
    },
    id: {
      control: {
        type: "text",
      },
    },
    onClick: { action: "clicked" },
  },
} as Meta;

const Template: Story<SelectItemSBProps> = ({ children = "Item select option", ...args }) => (
  <Select defaultOpen>
    <Select.Button style={{ width: "200px" }}>Projects</Select.Button>
    <Select.Modal>
      <Select.Options>
        <Select.Item {...args}>{children}</Select.Item>
      </Select.Options>
    </Select.Modal>
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

export const Disabled = Template.bind({});
Disabled.args = {
  state: "disabled",
};
