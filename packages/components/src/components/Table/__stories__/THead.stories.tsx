import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../../config/storybook";
import { TableTestWrapper, TableTestWrapperFProps } from "../__tests__/Table.test";

export default {
  title: `${titleGroups.DATA_TABLE}/THead`,
  component: TableTestWrapper,
  argTypes: {
    onClick: { action: "clicked" },
  },
} as Meta;

const Template: Story<TableTestWrapperFProps> = args => <TableTestWrapper {...args} />;

export const Default = Template.bind({});
Default.args = {
  sort: false,
};

export const WithSort = Template.bind({});
WithSort.args = {
  sort: true,
};
WithSort.storyName = "With sort";

export const WithoutHeader = Template.bind({});
WithoutHeader.args = {
  header: false,
};
WithoutHeader.storyName = "Without header";
