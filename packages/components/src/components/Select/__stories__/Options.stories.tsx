import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../../config/storybook";
import Select from "../index";
import { StoriesComponent, StoriesComponentProps } from "./utils";

export default {
  title: `${titleGroups.FORM_SELECT}/Options`,
  component: Select.Options,
} as Meta;

const Template: Story<Pick<StoriesComponentProps, "optionsChilden">> = ({ optionsChilden, ...args }) => (
  <StoriesComponent defaultOpen optionsChilden={optionsChilden} {...args} />
);

export const Default = Template.bind({});
Default.args = {
  optionsChilden: false,
};

export const WithChildenOverflow = Template.bind({});
WithChildenOverflow.args = {
  optionsChilden: true,
};
WithChildenOverflow.storyName = 'With children "overflow"';
