import { Meta, Story } from "@storybook/react";
import { titleGroups } from "../../../../config/storybook";
import { ButtonSBProps } from "../../../Button";
import Dialog, { DialogProps } from "../../index";

export default {
  title: `${titleGroups.FEEDBACK}/Btn`,
  component: Dialog.Btn,
  argTypes: {
    onDismiss: { action: "dismissed" },
  },
} as Meta;

const Children: React.FC = () => {
  return (
    <>
      <Dialog.Btn variant="secondary">Cancel</Dialog.Btn>
      <Dialog.Btn>Confirm</Dialog.Btn>
    </>
  );
};

const Template: Story<Pick<DialogProps, "onDismiss"> & { insideGroup?: boolean }> = ({
  insideGroup = false,
  onDismiss,
}) => (
  <Dialog isShown bgColor="light" onDismiss={onDismiss}>
    <Dialog.Content>
      <Dialog.Title>Dialog content here. Dialog content here</Dialog.Title>
    </Dialog.Content>
    {insideGroup ? (
      <Dialog.Btn.Group>
        <Children />
      </Dialog.Btn.Group>
    ) : (
      <div className="flex-row-center-center" style={{ gap: "8px", marginBottom: "2em" }}>
        <Children />
      </div>
    )}
  </Dialog>
);

export const Default = Template.bind({});

export const InsideGroup = Template.bind({});
InsideGroup.args = {
  insideGroup: true,
};
InsideGroup.storyName = "Inside group";
