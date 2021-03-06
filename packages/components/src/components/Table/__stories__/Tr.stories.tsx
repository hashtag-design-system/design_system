import { Meta, Story } from "@storybook/react";
import { TableTrStates } from "..";
import { storybookTitles } from "../../../config";
import { TableTestWrapper, TableTestWrapperFProps, TEST_TABLE_TOTAL_ROWS } from "../__tests__/Table.test";

export default {
  title: `${storybookTitles.DATA_TABLE}/Tr`,
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
  extraColumn: { component: "checkbox", totalRows: TEST_TABLE_TOTAL_ROWS },
};
WithExtraColumnCheckbox.storyName = "With extra column | <Checkbox />";

export const WithExtraColumnRadioButton = Template.bind({});
WithExtraColumnRadioButton.args = {
  extraColumn: { component: "radio", totalRows: TEST_TABLE_TOTAL_ROWS },
};
WithExtraColumnRadioButton.storyName = "With extra column | <RadioButton />";

export const WithExtraColumnCheckboxAndBorder = Template.bind({});
WithExtraColumnCheckboxAndBorder.args = {
  extraColumn: { component: "checkbox", withBorderRight: true, totalRows: TEST_TABLE_TOTAL_ROWS },
};
WithExtraColumnCheckboxAndBorder.storyName = "With extra column & border | <Checkbox />";

export const WithExtraColumnRadioButtonAndBorder = Template.bind({});
WithExtraColumnRadioButtonAndBorder.args = {
  extraColumn: { component: "radio", withBorderRight: true, totalRows: TEST_TABLE_TOTAL_ROWS },
};
WithExtraColumnRadioButtonAndBorder.storyName = "With extra column & border | <RadioButton />";
