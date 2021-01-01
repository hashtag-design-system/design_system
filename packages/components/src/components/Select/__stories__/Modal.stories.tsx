import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../../config/storybook";
import Select, { SelectFProps, SelectModalAligns, SelectModalProps } from "../index";
import { StoriesComponent } from "./utils";

export default {
  title: `${titleGroups.FORM_SELECT}/Modal`,
  component: Select.Modal,
  argTypes: {
    align: {
      control: {
        type: "select",
        options: SelectModalAligns,
      },
    },
  },
} as Meta;

const Template: Story<SelectModalProps & Pick<SelectFProps, "mobileView">> = args => <StoriesComponent defaultOpen {...args} />;

export const Default = Template.bind({});
Default.args = {
  align: "left",
};
Default.storyName = "Align | Left - Default";

export const AlignCenter = Template.bind({});
AlignCenter.args = {
  align: "center",
};
AlignCenter.storyName = "Align | Center";

export const AlignRight = Template.bind({});
AlignRight.args = {
  align: "right",
};
AlignRight.storyName = "Align | Right";

export const MobileView = Template.bind({});
MobileView.args = {
  mobileView: true,
};
MobileView.storyName = "Mobile view";
