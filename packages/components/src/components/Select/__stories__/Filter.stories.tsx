import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../../config/storybook";
import Select from "../index";
import { StoriesComponent } from "./utils";

export default {
  title: `${titleGroups.FORM_SELECT}/Filter`,
  component: Select.Filter,
} as Meta;

const Template: Story = args => <StoriesComponent defaultOpen {...args} />;

export const Default = Template.bind({});
