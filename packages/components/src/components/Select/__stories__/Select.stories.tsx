import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../../config/storybook";
import Select, { SelectSBProps } from "../index";
import { StoriesComponent } from "./utils";

export default {
  title: titleGroups.FORM_SELECT,
  component: Select,
  argTypes: {
    onSelect: { action: "selected" },
  },
} as Meta;

const Template: Story<SelectSBProps> = args => <StoriesComponent {...args} />;

export const Default = Template.bind({});

export const Multiselectable = Template.bind({});
Multiselectable.args = {
  multiSelectable: true,
  defaultOpen: true,
};

export const Open = Template.bind({});
Open.args = {
  defaultOpen: true,
};

export const MobileView = Template.bind({});
MobileView.args = {
  mobileView: true,
};
MobileView.storyName = "Mobile view";
