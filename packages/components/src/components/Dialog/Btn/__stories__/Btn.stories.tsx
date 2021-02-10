import { Meta, Story } from "@storybook/react";
import { storybookTitles } from "../../../../config";
import Dialog, { DialogBtnFProps, DialogProps } from "../../index";
export default {
  title: `${storybookTitles.FEEDBACK}/Btn`,
  component: Dialog.Btn,
  argTypes: {
    onDismiss: { action: "dismissed" },
  },
} as Meta;

const Children: React.FC<Pick<DialogBtnFProps, "confirm">> = ({ confirm }) => {
  return (
    <>
      <Dialog.Btn>Cancel</Dialog.Btn>
      <Dialog.Btn confirm={confirm}>Confirm</Dialog.Btn>
    </>
  );
};

const Template: Story<Pick<DialogProps, "onDismiss"> & { insideGroup?: boolean } & Pick<DialogBtnFProps, "confirm">> = ({
  insideGroup = false,
  confirm,
  onDismiss,
}) => (
  <Dialog isShown onDismiss={onDismiss}>
    <Dialog.Content>
      <Dialog.Title>Dialog content here. Dialog content here</Dialog.Title>
    </Dialog.Content>
    {insideGroup ? (
      <Dialog.Btn.Group>
        <Children confirm={confirm} />
      </Dialog.Btn.Group>
    ) : (
      <div className="flex-row-center-center" style={{ gap: "8px", marginBottom: "2em" }}>
        <Children confirm={confirm} />
      </div>
    )}
  </Dialog>
);

export const Default = Template.bind({});

export const Confirm = Template.bind({});
Confirm.args = {
  confirm: true,
};

export const InsideGroup = Template.bind({});
InsideGroup.args = {
  insideGroup: true,
};
InsideGroup.storyName = "Inside group";
