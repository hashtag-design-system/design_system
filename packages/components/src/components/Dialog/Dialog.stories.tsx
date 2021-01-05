import { Meta, Story } from "@storybook/react";
import { useState } from "react";
import { titleGroups } from "../../config/storybook";
import Dialog, { DialogFProps } from "./index";
import Button from "../Button";

export default {
  title: titleGroups.FEEDBACK,
  component: Dialog,
  argTypes: {
    onDismiss: { action: "dismissed" },
  },
} as Meta;

const Template: Story<DialogFProps> = ({ isShown: isOpen, confirm, bgColor, onDismiss, ...args }) => {
  const [isShown, setIsShown] = useState(isOpen);

  return (
    <>
      <Button onClick={() => setIsShown(true)}>Open dialog</Button>
      <Dialog
        isShown={isShown}
        bgColor={bgColor}
        confirm={confirm}
        onDismiss={e => {
          if (onDismiss) onDismiss(e);
          setIsShown(false);
        }}
        {...args}
      >
        {!confirm && <Dialog.Btn.Close />}
        <Dialog.Content>
          {confirm ? (
            <Dialog.Title>Are you sure you want to cancel your reservation?</Dialog.Title>
          ) : (
            <Dialog.Title>
              Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content here. Dialog content
              here. Dialog content here. Dialog content here. Dialog content here.
            </Dialog.Title>
          )}
        </Dialog.Content>
        <Dialog.Btn.Group>
          <Dialog.Btn variant="secondary">Cancel</Dialog.Btn>
          <Dialog.Btn>Confirm</Dialog.Btn>
        </Dialog.Btn.Group>
      </Dialog>
    </>
  );
};

export const Default = Template.bind({});

export const Open = Template.bind({});
Open.args = {
  isShown: true,
};

export const Confirm = Template.bind({});
Confirm.args = {
  confirm: true,
};
