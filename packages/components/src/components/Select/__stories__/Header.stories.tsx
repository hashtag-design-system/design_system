import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../../config";
import Select, { SelectHeaderProps } from "../index";
import { StoriesComponent, StoriesComponentProps } from "./utils";

export default {
  title: `${storybookTitles.FORM_SELECT}/Header`,
  component: Select.Button,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
  },
} as Meta;

const Template: Story<SelectHeaderProps & StoriesComponentProps> = ({ headerChildren, value = "Header", ...args }) => (
  <StoriesComponent defaultOpen value={value} headerChildren={headerChildren} {...args} />
);

export const WithoutChildren = Template.bind({});
WithoutChildren.args = {
  headerChildren: false,
};
WithoutChildren.storyName = "Without children";

export const WithChildren = Template.bind({});
WithChildren.args = {
  headerChildren: true,
};
WithChildren.storyName = "With children";
