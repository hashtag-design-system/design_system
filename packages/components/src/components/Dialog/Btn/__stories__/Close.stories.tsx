import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../../../config/storybook";
import { ButtonSBProps } from "../../../Button";
import Dialog, { DialogProps } from "../../index";

export default {
  title: `${titleGroups.FEEDBACK}/Btn/Close`,
  component: Dialog.Btn.Close,
  argTypes: {
    onDismiss: { action: "dismissed" },
  },
} as Meta;

const Template: Story<ButtonSBProps & Pick<DialogProps, "onDismiss">> = ({ onDismiss, ...args }) => (
  <Dialog isShown bgColor="light" onDismiss={onDismiss}>
    <Dialog.Btn.Close {...args} />
  </Dialog>
);

export const Default = Template.bind({});
Default.args = {
  state: "default",
};

export const Hover = Template.bind({});
Hover.args = {
  state: "hover",
};
