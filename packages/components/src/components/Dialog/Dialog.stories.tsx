import { Meta, Story } from "@storybook/react";
import { useState } from "react";
import { storybookTitles } from "../../config";
import Button from "../Button";
import Dialog, { DialogFProps } from "./index";

export default {
  title: storybookTitles.FEEDBACK,
  component: Dialog,
  argTypes: {
    onDismiss: { action: "dismissed" },
  },
} as Meta;

const Template: Story<DialogFProps> = ({
  isShown: isOpen,
  confirm,
  loading,
  allowDismissOnLoading = true,
  overlayProps,
  onDismiss,
  ...args
}) => {
  const [isShown, setIsShown] = useState(isOpen);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Button onClick={() => setIsShown(true)}>Open dialog</Button>
      <Dialog
        isShown={isShown}
        confirm={confirm}
        overlayProps={overlayProps}
        loading={isLoading}
        allowDismissOnLoading={allowDismissOnLoading}
        onDismiss={(e, { cancel }) => {
          if (loading !== undefined) {
            if (onDismiss) onDismiss(e, { cancel });
            if (!cancel) {
              setIsLoading(true);
              setTimeout(() => {
                setIsShown(false);
                setIsLoading(false);
              }, 2000);
            } else {
              if (!cancel) {
                setIsLoading(true);
                setTimeout(() => {
                  setIsShown(false);
                  setIsLoading(false);
                }, 2000);
              } else {
                if (allowDismissOnLoading) {
                  setIsShown(false);
                }
              }
            }
          } else {
            if (onDismiss) onDismiss(e, { cancel });
            setIsShown(false);
          }
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
          <Dialog.Btn>Cancel</Dialog.Btn>
          <Dialog.Btn confirm>Confirm</Dialog.Btn>
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

export const Loading = Template.bind({});
Loading.args = {
  isShown: true,
  loading: true,
};

export const LoadingWithAllowDismissFalse = Template.bind({});
LoadingWithAllowDismissFalse.args = {
  isShown: true,
  loading: true,
  allowDismissOnLoading: false,
};
LoadingWithAllowDismissFalse.storyName = "Loading with allowDismissOnLoading={false}";
