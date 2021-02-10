import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../../config";
import Select from "../index";
import { StoriesComponent, StoriesComponentProps } from "./utils";

export default {
  title: `${storybookTitles.FORM_SELECT}/Options`,
  component: Select.Options,
} as Meta;

const Template: Story<Pick<StoriesComponentProps, "optionsChildren">> = ({ optionsChildren, ...args }) => (
  <StoriesComponent defaultOpen optionsChildren={optionsChildren} {...args} />
);

export const Default = Template.bind({});
Default.args = {
  optionsChildren: false,
};

export const WithChildrenOverflow = Template.bind({});
WithChildrenOverflow.args = {
  optionsChildren: true,
};
WithChildrenOverflow.storyName = 'With children "overflow"';
