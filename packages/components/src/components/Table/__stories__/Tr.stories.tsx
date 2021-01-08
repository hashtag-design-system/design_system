import { Meta, Story } from "@storybook/react";
import { TableTrStates } from "..";
import { titleGroups } from "../../../config/storybook";
import { TableTestWrapper, TableTestWrapperFProps } from "../__tests__/Table.test";

export default {
  title: `${titleGroups.DATA_TABLE}/Tr`,
  component: TableTestWrapper,
  argTypes: {
    state: {
      control: {
        type: "select",
        options: TableTrStates,
      },
    },
    selectedRows: { action: "clicked" },
  },
} as Meta;

const Template: Story<TableTestWrapperFProps & { selectedRows?: any }> = ({ extraColumn, selectedRows, ...args }) => (
  <TableTestWrapper sort={false} extraColumn={extraColumn ? { ...extraColumn, selectedRows } : undefined} {...args} />
);

export const Default = Template.bind({});
Default.args = {
  state: "default",
};

export const Hover = Template.bind({});
Hover.args = {
  state: "hover",
};

export const WithExtraColumnCheckbox = Template.bind({});
WithExtraColumnCheckbox.args = {
  extraColumn: { component: "checkbox" },
};
WithExtraColumnCheckbox.storyName = "With extra column | <Checkbox />";

export const WithExtraColumnRadioButton = Template.bind({});
WithExtraColumnRadioButton.args = {
  extraColumn: { component: "radio" },
};
WithExtraColumnRadioButton.storyName = "With extra column | <RadioButton />";

export const WithExtraColumnCheckboxAndBorder = Template.bind({});
WithExtraColumnCheckboxAndBorder.args = {
  extraColumn: { component: "checkbox", withBorderRight: true },
};
WithExtraColumnCheckboxAndBorder.storyName = "With extra column & border | <Checkbox />";

export const WithExtraColumnRadioButtonAndBorder = Template.bind({});
WithExtraColumnRadioButtonAndBorder.args = {
  extraColumn: { component: "radio", withBorderRight: true },
};
WithExtraColumnRadioButtonAndBorder.storyName = "With extra column & border | <RadioButton />";
