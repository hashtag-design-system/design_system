import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../../config";
import { TableTestWrapper, TableTestWrapperFProps } from "../__tests__/Table.test";

export default {
  title: `${storybookTitles.DATA}/Table`,
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
